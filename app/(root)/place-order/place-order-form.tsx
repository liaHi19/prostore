"use client";

import { useRouter } from "next/navigation";

import { Check, Loader } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Button } from "@/components/ui/button";

import { createOrder } from "@/lib/actions/order.actions";

const PlaceOrderButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} className="w-full">
      {pending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Check className="size-4" />
      )}{" "}
      Place Order
    </Button>
  );
};

const PlaceOrderForm = () => {
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const res = await createOrder();

    if (res.redirectTo) {
      router.push(res.redirectTo);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <PlaceOrderButton />
    </form>
  );
};

export default PlaceOrderForm;
