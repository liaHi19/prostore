"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { Cart, CartItem } from "@/types";
import { ArrowRight, Loader, Minus, Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PlusMinusBtn from "@/components/shared/plus-minus-btn";

import { addItemToCart, removeItemFromCart } from "@/lib/actions/cart.actions";
import { formatCurrency } from "@/lib/utils";

const CartTable = ({ cart }: { cart?: Cart }) => {
  const router = useRouter();
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [isCheckoutPending, startCheckoutTransition] = useTransition();

  useTransition();
  const [buttonId, setButtonId] = useState<string | null>(null);

  const handleRemoveFromCart = (productId: string) => {
    setButtonId(productId);
    startTransition(async () => {
      const res = await removeItemFromCart(productId);
      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    });
  };

  const handleAddToCart = (item: CartItem) => {
    setButtonId(item.productId);
    startTransition(async () => {
      const res = await addItemToCart(item);

      if (!res.success) {
        toast({
          variant: "destructive",
          description: res.message,
        });
      }
    });
  };
  return (
    <>
      <h1 className="py-4 h2-bold">Shopping Cart</h1>
      {!cart || cart.items.length === 0 ? (
        <div>
          Cart is empty. <Link href="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item</TableHead>
                  <TableHead className="text-center">Quantity</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {cart.items.map((item) => (
                  <TableRow key={item.slug}>
                    <TableCell>
                      <Link
                        href={`/product/${item.slug}`}
                        className="flex items-center"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          width={50}
                          height={50}
                        />
                        <span className="px-2">{item.name}</span>
                      </Link>
                    </TableCell>
                    <TableCell className="flex-center gap-2">
                      <PlusMinusBtn
                        isButtonPending={buttonId === item.productId}
                        isPending={isPending}
                        Icon={Minus}
                        onClick={() => handleRemoveFromCart(item.productId)}
                      />

                      <span>{item.qty}</span>
                      <PlusMinusBtn
                        isButtonPending={buttonId === item.productId}
                        isPending={isPending}
                        Icon={Plus}
                        onClick={() => handleAddToCart(item)}
                      />
                    </TableCell>
                    <TableCell className="text-right">{item.price}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <Card>
            <CardContent className="p-4 gap-4">
              <div className="pb-3 text-xl">
                Subtotal ({cart.items.reduce((acc, c) => acc + c.qty, 0)}):{" "}
                <span className="font-bold">
                  {formatCurrency(cart.itemsPrice)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={isPending || isCheckoutPending}
                onClick={() =>
                  startCheckoutTransition(() =>
                    router.push("/shipping-address")
                  )
                }
              >
                {isCheckoutPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <ArrowRight className="size-4" />
                )}{" "}
                Proceed to Checkout
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default CartTable;
