"use server";
import User from "../model/User";
import Session from "../model/Sessions";
import bcrypt from "bcrypt";
import { lucia } from "./instance";
import { connect } from "./connectDB";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { uploadImage } from "./cloudinary";
import { revalidatePath } from "next/cache";
import mongoose, { Mongoose } from "mongoose";

export async function signup({ username, email, password }) {
  await connect();

  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new Error("User already exists!");
  }

  const nameRegex = /^[a-zA-Z ]{2,30}$/;
  if (username.length < 3 || !nameRegex.test(username)) {
    throw new Error(
      "Name must contain only alphabets and spaces.Also, atleast 2 character and atmost 30 characters."
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error("Invalid email address");
  }

  if (email.length > 256) {
    throw new Error("Email address is too long");
  }

  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character"
    );
  }

  const hashedPw = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    email,
    password: hashedPw,
  });

  await newUser.save();

  return newUser;
}

export async function Login({ email, password }) {
  await connect();

  const existingUser = await User.findOne({ email });
  if (!existingUser) {
    throw new Error("Register your account!");
  }

  const validPassword = await bcrypt.compare(password, existingUser.password);
  if (!validPassword) {
    throw new Error("Invalid email or password");
  }

  const session = await lucia.createSession(existingUser._id.toString(), {});

  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

  return existingUser;
}

export async function validateSession(sessionId) {
  await connect();

  const session = await Session.findOne({ _id: sessionId });

  if (!session || new Date(session.expires_at) < new Date()) {
    return { session: null, user: null };
  }

  const user = { id: session.user_id }; //user detail
  return { session: { id: session._id, fresh: true }, user: user };
}

export async function VerifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  // console.log(sessionCookie);
  if (!sessionCookie) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;
  // console.log(sessionId);
  if (!sessionId) {
    return {
      user: null,
      session: null,
    };
  }

  const result = await validateSession(sessionId);
  // console.log(result);

  // const result = await lucia.validateSession(sessionId);
  // console.log(result)

  try {
    if (result.session && result.session.fresh) {
      const sessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
    if (!result.session) {
      const sessionCookie = lucia.createBlankSessionCookie();
      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes
      );
    }
  } catch {}

  return result;
}

export async function destroySession() {
  const { session } = await VerifyAuth();

  if (!session) {
    return {
      error: "Unauthorized!",
    };
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie = lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );
}

export async function logout() {
  await destroySession();
  redirect("/");
}

export async function getUserDetails(userID) {
  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      warning: "Failed to connect to the database. Please try again later.",
    };
  }

  try {
    const user = await User.findById(userID).select("-__v").lean().exec();
    if (user && user._id) {
      user._id = user._id.toString();
    }
    // Convert other complex fields to strings if necessary
    return user;

    // const plainUser = JSON.parse(JSON.stringify(user));

    // // console.log(JSON.parse(JSON.stringify(user)));

    // return plainUser;
  } catch (e) {
    console.log(e);
  }
}

export async function EditUserDetails(userId, updatedData) {
  // console.log("Backend",updatedData);

  try {
    await connect();
  } catch (error) {
    console.error("Error connecting to the database:", error);
    return {
      warning: "Failed to connect to the database. Please try again later.",
    };
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    })
      .select("-__v")
      .lean()
      .exec();

    revalidatePath("/user");

    if (updatedUser) {
      return { success: true, user: updatedUser };
    } else {
      return { success: false, error: "User not found" };
    }
  } catch (error) {
    console.error("Error updating user:", error);
    return { success: false, error: "Internal Server Error" };
  }
}

export async function ChangePassword(userId, current_pw, new_pw, re_pw) {
  const found_user = await User.findById(userId).exec();

  if (found_user) {
    const validPassword = await bcrypt.compare(current_pw, found_user.password);

    if (validPassword) {
      if (new_pw === re_pw) {
        // const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(new_pw, 10);

        found_user.password = hashedPassword;
        await found_user.save();

        return { success: "Password updated successfully!" };
      } else {
        return {
          warning: "New password and re-entered password do not match!",
        };
      }
    } else {
      return { warning: "Current password is incorrect!" };
    }
  } else {
    return { warning: "User not found!" };
  }
}

export async function ChangeProfilePhoto(userId,ImageUrl){
  
    console.log("(BACKEND) user Id:", userId);
    console.log("(BACKEND) Photo Url:", ImageUrl);
  
    try {
   
      const found_user = await User.findByIdAndUpdate(
        userId,
        { profile_img_url: ImageUrl },
        { new: true } 
      ).exec();

      revalidatePath("/user");
  
      if (found_user) {
        console.log("Profile photo updated successfully");
        return { success: "Profile photo updated successfully"};
      } else {
        console.log("User not found");
        return { error: "User not found" };
      }
    } catch (error) {
      console.error("Error updating profile photo:", error);
      return { error: "An error occurred while updating the profile photo" };
    }
  
}