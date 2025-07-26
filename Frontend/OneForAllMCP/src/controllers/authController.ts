import { signIn, signUp } from "../services/authService";

export const handleSignIn = async (email: string, password: string) => {
  try {
    const user = await signIn(email, password);
    console.log("User signed in:", user);
    return { success: true, user };
  } catch (error: any) {
    console.error("Login error:", error.message);
    return { success: false, error: error.message };
  }
};

export const handleSignUp = async (email: string, password: string) => {
  try {
    const user = await signUp(email, password);
    console.log("User signed up:", user);
    return { success: true, user };
  } catch (error: any) {
    console.error("Signup error:", error.message);
    return { success: false, error: error.message };
  }
}; 