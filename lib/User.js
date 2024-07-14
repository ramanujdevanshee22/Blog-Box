"use server";
import User from "../model/User";
import Session from "../model/Sessions";
import bcrypt from "bcrypt";
import { lucia } from "./instance";
import { connect } from "./connectDB";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

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

export async function destroySession(){
  const {session} = await VerifyAuth();

  if(!session){
    return{
      error: "Unauthorized!"
    }
  }

  await lucia.invalidateSession(session.id);

  const sessionCookie= lucia.createBlankSessionCookie();
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  );

}

export async function logout(){
  await destroySession();
  redirect('/')
}