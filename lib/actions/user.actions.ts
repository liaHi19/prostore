"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/db/prisma";
import { hashSync } from "bcrypt-ts-edge";

import { signInFormSchema, signUpFormSchema } from "../validators";

//  Sign in User with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);

    return { success: true, message: "Sign in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "User was not registered" };
  }
}

// sign user out
export async function signOutUser() {
  await signOut();
}

// sign up user
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    const user = signUpFormSchema.parse({
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      confirmPassword: formData.get("confirmPassword"),
    });

    const plainPassword = user.password;

    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    await signIn("credentials", {
      email: user.email,
      password: plainPassword,
    });

    return { success: true, message: "User registered successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    return { success: false, message: "Invalid email or password" };
  }
}
