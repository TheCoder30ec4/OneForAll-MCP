import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import googleLogo from "../../public/google.svg?url";
import githubLogo from "../../public/github.svg?url";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../FireBase/Config";
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match!",
  path: ["confirmPassword"],
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const navigate = useNavigate();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      const idToken = await userCredential.user.getIdToken();

      // Send token to backend for session creation
      const res = await fetch('http://localhost:8000/sessionLogin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        // credentials: 'include', // ⬅️ VERY IMPORTANT
        body: JSON.stringify({ idToken }),
      });

      // const data = await res.json();
      // alert(data.message);

      console.log("Signup successful! User ID Token:", idToken);
      localStorage.setItem('idToken', idToken);
      toast.success("Signup successful!");
      navigate('/');

    } catch (err: any) {
      console.error(err);
      toast.error(`Error during signup: ${err.message}`);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("Google Login successful!");
      if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('idToken', idToken);
        console.log("Google User ID Token:", idToken);
      }
      toast.success("Google Login successful!");
      navigate('/');
    } catch (error: any) {
      console.error("Error during Google login:", error);
      toast.error(`Google Login Error: ${error.message}`);
    }
  };

  const handleGithubLogin = async () => {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("GitHub Login successful!");
      if (userCredential.user) {
        const idToken = await userCredential.user.getIdToken();
        localStorage.setItem('idToken', idToken);
        console.log("GitHub User ID Token:", idToken);
      }
      toast.success("GitHub Login successful!");
      navigate('/');
    } catch (error: any) {
      console.error(error);
      toast.error(`GitHub Login Error: ${error.message}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle className="text-3xl">Sign Up</CardTitle>
          <CardDescription className="text-lg">Create a new account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email" className="text-lg">Email</Label>
                <Input id="email" placeholder="Your email address" type="email" className="text-lg py-6" {...register("email")} />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password" className="text-lg">Password</Label>
                <div className="relative">
                  <Input id="password" placeholder="Your password" type={showPassword ? "text" : "password"} className="text-lg py-6 pr-10" {...register("password")} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password" className="text-lg">Confirm Password</Label>
                <div className="relative">
                  <Input id="confirm-password" placeholder="Confirm your password" type={showConfirmPassword ? "text" : "password"} className="text-lg py-6 pr-10" {...register("confirmPassword")} />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                  >
                    {showConfirmPassword ? "Hide" : "Show"}
                  </Button>
                </div>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
              </div>
            </div>
            <CardFooter className="flex justify-end mt-4">
              <Button type="submit" className="text-lg py-6">Sign Up</Button>
            </CardFooter>
          </form>
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <Button variant="outline" className="text-lg py-6" onClick={handleGoogleLogin}>
              <img src={googleLogo} alt="Google Logo" className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" className="text-lg py-6" onClick={handleGithubLogin}>
              <img src={githubLogo} alt="GitHub Logo" className="mr-2 h-5 w-5" />
              GitHub
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup; 