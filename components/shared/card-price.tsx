import { Prices } from "@/types";

import { formatCurrency } from "@/lib/utils";

import { Card, CardContent } from "../ui/card";

const CardPrice = ({
  itemsPrice,
  taxPrice,
  shippingPrice,
  totalPrice,
  children,
}: Prices & { children?: React.ReactNode }) => {
  return (
    <Card>
      <CardContent className="p-4 gap-4 space-y-4">
        <div className="flex justify-between">
          <div>Items</div>
          <div>{formatCurrency(itemsPrice)}</div>
        </div>
        <div className="flex justify-between">
          <div>Tax</div>
          <div>{formatCurrency(taxPrice)}</div>
        </div>{" "}
        <div className="flex justify-between">
          <div>Shipping</div>
          <div>{formatCurrency(shippingPrice)}</div>
        </div>{" "}
        <div className="flex justify-between">
          <div>Total</div>
          <div>{formatCurrency(totalPrice)}</div>
        </div>
        {children && children}
      </CardContent>
    </Card>
  );
};

export default CardPrice;
