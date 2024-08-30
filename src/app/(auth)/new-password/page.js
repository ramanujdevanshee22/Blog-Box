import PasswordPage from "../../../../components/PasswordForm";
import { ChangePassword, VerifyAuth } from "../../../../lib/User";

export default async function NewPassword() {
  const result = await VerifyAuth();

  if (!result.user) {
    return redirect("/");
  }

  return <PasswordPage action={newPassword} />;
}

async function newPassword(prevState, formData) {
  "use server";
  const current_pw = formData.get("current_pw");
  const new_pw = formData.get("new_pw");
  const re_pw = formData.get("re_pw");

  
  let errors = [];
  let result = await VerifyAuth();
  if (!result || !result.user || !result.user.id) {
    return { errors: ["User authentication failed"] };
  }

  const userId = result.user.id;

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (!passwordRegex.test(new_pw) || !passwordRegex.test(re_pw)) {
    errors.push(
      "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, one number, and one special character."
    );
  }

  if (errors.length > 0) {
    return { errors };
  }

  try {
    const changedPw = await ChangePassword(userId, current_pw, new_pw, re_pw);

    if (changedPw && changedPw.success) {
      return { msg: changedPw.success };
    }

    if (changedPw && changedPw.warning) {
      return { errors: [changedPw.warning] };
    }
  } catch (e) {
    console.error(e);
    return { errors: [e.message || "An error occurred while changing the password"] };
  }
}

