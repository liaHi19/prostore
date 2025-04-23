"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { Cart, CartItem } from "@/types";
import { ToastAction } from "@radix-ui/react-toast";
import { Loader, Minus, Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";

import PlusMinusBtn from "../../plus-minus-btn";

const AddToCart = ({ item, cart }: { cart?: Cart; item: CartItem }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = async () => {
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({ variant: "destructive", description: res.message });
        return;
      }

      toast({
        description: res.message,
        action: (
          <ToastAction
            className="bg-primary text-white hover:bg-gray-800"
            altText="Go to Cart"
            onClick={() => router.push("/cart")}
          >
            {" "}
            Go To Cart
          </ToastAction>
        ),
      });
    });
  };

  const handleRemoveFromCart = async () => {
    startTransition(async () => {
      const res = await removeItemFromCart(item.productId);

      toast({
        variant: res.success ? "default" : "destructive",
        description: res.message,
      });

      return;
    });
  };

  // Check if item in the cart
  const existItem =
    cart && cart.items.find((x) => x.productId === item.productId);

  return existItem ? (
    <div>
      <PlusMinusBtn
        isButtonPending
        isPending={isPending}
        onClick={handleRemoveFromCart}
        Icon={Minus}
      />
      <span className="px-2">{existItem.qty}</span>
      <PlusMinusBtn
        isButtonPending
        isPending={isPending}
        onClick={handleAddToCart}
        Icon={Plus}
      />
    </div>
  ) : (
    <Button className="w-full" type="button" onClick={handleAddToCart}>
      {isPending ? (
        <Loader className="size-4 animate-spin" />
      ) : (
        <Plus className="size-4" />
      )}{" "}
      Add to cart
    </Button>
  );
};

export default AddToCart;
