"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CustomInput from "./CustomInput";
import { authFormSchema } from "@/lib/utils";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, signUp } from "@/lib/actions/user.actions";
import PlaidLink from "./PlaidLink";

const AuthForm = ({ type }: { type: string }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // 1. Define your form.

  const formSchema = authFormSchema(type);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  const  onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log(data);
    try{
      const userData = {
        firstName: data.firstName!,
        lastName: data.lastName!,
        address1: data.address1!,
        city: data.city!,
        state: data.state!,
        postalCode: data.postalCode!,
        dateOfBirth: data.dateOfBirth!,
        ssn: data.ssn!,
        email: data.email,
        password: data.password
      }
      //Sign up with Appwrite & create plaid token

      if(type === 'sign-up'){
        const newUser = await signUp(userData);
        setUser(newUser);
      }

      if(type === 'sign-in'){
        const response = await signIn({
          email: data.email,
          password: data.password,
        })
        
        if(response){
          router.push('/');
        }
      }
    }
    catch(error){
      console.log(error);
    }
    finally{
      setIsLoading(false);
    }
    setIsLoading(false);
  }

  return (
    <section className="auth-form">
      <header className="flex flex-col gap-5 md:gap-8">
        <Link href={"/"} className=" flex cursor-pointer items-center gap-1">
          <Image src={"/icons/logo.svg"} width={34} height={34} alt="Horizon" />
          <h1 className="text-26 font-plex font-bold text-black-1">Horizon</h1>
        </Link>

        <div className="flex flex-col gap-1 md:gap-3">
          <h1 className="text-24 lg:text-36 font-semibold text-gray-900">
            {user ? "Link Account" : type === "sign-in" ? "Sign In" : "Sign Up"}

            <p className="text-16 font-normal text-gray-600">
              {user
                ? "Link your account to get started"
                : "Please enter your details"}
            </p>
          </h1>
        </div>
      </header>

      {user ? (
        <div className="flex flex-col gap-4">
          {/* Plaid Link  */}
          <PlaidLink 
          user={user}
          variant="primary" />
          </div>
      ) : (
        <>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="!space-y-8">
              {type === "sign-up" && (
                <>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"firstName"}
                      label={"First Name"}
                      type={"text"}
                      placeholder={"ex: John"}
                      />
                    <CustomInput
                      control={form.control}
                      name={"lastName"}
                      label={"Last Name"}
                      type={"text"}
                      placeholder={"ex: Doe"}
                    />
                  </div>

                  <CustomInput
                    control={form.control}
                    name={"address1"}
                    label={"Address"}
                    type={"text"}
                    placeholder={"ex: Sector 62, Noida, Uttar Pradesh"}
                  />
                  <CustomInput
                    control={form.control}
                    name={"city"}
                    label={"City"}
                    type={"text"}
                    placeholder={"ex: Noida"}
                  />
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"state"}
                      label={"state"}
                      type={"text"}
                      placeholder={"ex: UP"}
                    />
                    <CustomInput
                      control={form.control}
                      name={"postalCode"}
                      label={"Postal Code"}
                      type={"text"}
                      placeholder={"ex: 111111"}
                    />
                  </div>
                  <div className="flex gap-4">
                    <CustomInput
                      control={form.control}
                      name={"dateOfBirth"}
                      label={"Date Of Birth"}
                      type={"text"}
                      placeholder={"ex: YYYY/MM/DD"}
                    />
                    <CustomInput
                      control={form.control}
                      name={"ssn"}
                      label={"SSN"}
                      type={"text"}
                      placeholder={"ex: 1234"}
                    />
                  </div>
                </>
              )}
              <CustomInput
                control={form.control}
                name={"email"}
                label={"Email"}
                type={"email"}
                placeholder={"Enter your email"}
              />

              <CustomInput
                control={form.control}
                name={"password"}
                label={"Password"}
                type={"password"}
                placeholder={"Enter your password"}
              />

              <div className="flex flex-col gap-4">
                <Button
                  type="submit"
                  className="form-btn text-16 border-bank-gradient"
                  disabled={isLoading}
                  suppressHydrationWarning={true}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      Loading...{" "}
                    </>
                  ) : type === "sign-in" ? (
                    "Sign In"
                  ) : (
                    "Sign Up"
                  )}
                </Button>
                <footer className="flex justify-center gap-1">
                  <p className="text-14 font-normal text-gray-600 ">
                    {type === "sign-in"
                      ? "Don't have an account?"
                      : "Already have an account?"}
                  </p>
                  <Link
                    href={type === "sign-in" ? "/sign-up" : "/sign-in"}
                    className="form-link text-14"
                  >
                    {type === "sign-in" ? "Sign Up" : "Sign In"}
                  </Link>
                </footer>
              </div>
            </form>
          </Form>
        </>
      )}
    </section>
  );
};

export default AuthForm;
