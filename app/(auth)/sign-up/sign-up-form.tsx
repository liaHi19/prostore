"use client";

import { startTransition, useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useFormStatus } from "react-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { PasswordField } from "@/components/PasswordField";
import EyeButton from "@/components/shared/EyeButton";

import { signUpUser } from "@/lib/actions/user.actions";
import { signUpDefaultValues } from "@/lib/constants";
import { signUpFormSchema } from "@/lib/validators";

const SignUpButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      disabled={pending}
      className="w-full cursor-pointer"
      variant="default"
    >
      {pending ? "Submitting..." : "Sign Up"}
    </Button>
  );
};

const SignUpForm = () => {
  const [data, action] = useActionState(signUpUser, {
    success: false,
    message: "",
  });
  const [show, setShow] = useState(false);

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: signUpDefaultValues,
    mode: "onBlur",
  });

  const onSubmit = form.handleSubmit((data) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, String(value));
    });
    formData.append("callbackUrl", callbackUrl ? String(callbackUrl) : "/");

    startTransition(() => {
      action(formData);
    });
  });

  return (
    <>
      <Form {...form}>
        <form onSubmit={onSubmit}>
          <div className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="h-17">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Enter Name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="h-17">
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} type="email" placeholder="Enter email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <PasswordField control={form.control} name="password" />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem className="h-17">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        type={show ? "text" : "password"}
                        placeholder="Confirm Password"
                      />
                      <EyeButton show={show} setShow={setShow} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SignUpButton />
          </div>
        </form>
      </Form>
      <div className="space-y-4">
        {data && !data.success && (
          <div className="text-center text-destructive h-6">{data.message}</div>
        )}
        <div className="text-sm text-center text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={
              callbackUrl ? `/sign-in?callbackUrl=${callbackUrl}` : "/sign-in"
            }
            target="_self"
            className="link"
          >
            Sign In
          </Link>
        </div>
      </div>
    </>
  );
};

export default SignUpForm;
