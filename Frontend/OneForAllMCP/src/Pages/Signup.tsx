import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import googleLogo from "../../public/google.svg";
import githubLogo from "../../public/github.svg";
import microsoftLogo from "../../public/microsoft.svg";

const formSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match!",
  path: ["confirmPassword"],
});

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    // Handle signup logic here
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
                <Input id="password" placeholder="Your password" type="password" className="text-lg py-6" {...register("password")} />
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="confirm-password" className="text-lg">Confirm Password</Label>
                <Input id="confirm-password" placeholder="Confirm your password" type="password" className="text-lg py-6" {...register("confirmPassword")} />
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
            <Button variant="outline" className="text-lg py-6">
              <img src={googleLogo} alt="Google Logo" className="mr-2 h-5 w-5" />
              Google
            </Button>
            <Button variant="outline" className="text-lg py-6">
              <img src={githubLogo} alt="GitHub Logo" className="mr-2 h-5 w-5" />
              GitHub
            </Button>
            <Button variant="outline" className="text-lg py-6">
              <img src={microsoftLogo} alt="Microsoft Logo" className="mr-2 h-5 w-5" />
              Microsoft
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup; 