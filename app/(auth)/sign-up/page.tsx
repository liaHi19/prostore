import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { APP_NAME } from "@/lib/constants";

import SignUpForm from "./sign-up-form";

export const metadata: Metadata = {
  title: "Sign Up",
};

const SignUpPage = async (props: {
  searchParams: Promise<{ callbackUrl: string }>;
}) => {
  const { callbackUrl } = await props.searchParams;
  const session = await auth();

  if (session) {
    redirect(callbackUrl || "/");
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="mx-2">
        <CardHeader>
          <Link href="/" className="flex-center mb-2 md:mb-4">
            <Image
              src="/images/logo.svg"
              width={0}
              height={0}
              alt={`${APP_NAME} logo`}
              priority={true}
              fetchPriority="high"
              className="size-16 md:size-25 h-auto aspect-square"
            />
          </Link>
          <CardTitle className="text-center capitalize mb-2 md:mb-4">
            Create Account
          </CardTitle>
          <CardDescription className="text-center">
            Enter your information below to sign up
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
