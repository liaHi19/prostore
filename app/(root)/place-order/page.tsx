import { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { auth } from "@/auth";
import { ShippingAddress } from "@/types";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CardPrice from "@/components/shared/card-price";
import CheckoutSteps from "@/components/shared/checkout-steps";
import OrderTable from "@/components/shared/order-table";

import { getMyCart } from "@/lib/actions/cart.actions";
import { getUserById } from "@/lib/actions/user.actions";

import PlaceOrderForm from "./place-order-form";

export const metadata: Metadata = {
  title: "Place Order",
};
const PlaceOrderPage = async () => {
  const cart = await getMyCart();
  const session = await auth();
  const userId = session?.user?.id;

  if (!userId) throw new Error("User not found");
  const user = await getUserById(userId);

  if (!cart || cart.items.length === 0) redirect("/cart");
  if (!user.address) redirect("/shipping-address");
  if (!user.paymentMethod) redirect("/payment-method");

  const userAddress = user.address as ShippingAddress;

  return (
    <>
      <CheckoutSteps current={3} />
      <h1 className="py-4 text-2xl">Place Order</h1>
      <div className="grid md:grid-cols-3 md:gap-5">
        <div className="md:col-span-2 overflow-x-auto space-y-4">
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Shipping Address</h2>
              <p>
                {userAddress.streetAddress}, {userAddress.city}{" "}
                {userAddress.postalCode}, {userAddress.country}
              </p>
              <div className="mt-3">
                <Link href="/shipping-address">
                  <Button variant="outline" className="cursor-pointer">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Payment method</h2>
              <div className="mt-3">
                <Link href="/payment-method">
                  <Button variant="outline" className="cursor-pointer">
                    Edit
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 gap-4">
              <h2 className="text-xl pb-4">Order Items</h2>
              <OrderTable items={cart.items} />
            </CardContent>
          </Card>
        </div>
        <div>
          <CardPrice
            shippingPrice={cart.shippingPrice}
            taxPrice={cart.taxPrice}
            itemsPrice={cart.itemsPrice}
            totalPrice={cart.totalPrice}
          >
            <PlaceOrderForm />
          </CardPrice>
        </div>
      </div>
    </>
  );
};

export default PlaceOrderPage;
