import { Metadata } from "next";
import Link from "next/link";

import { auth } from "@/auth";
import {
  BadgeDollarSign,
  Barcode,
  CreditCard,
  LucideIcon,
  User,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { getOrderSummary } from "@/lib/actions/order.actions";
import { formatCurrency, formatDateTime, formatNumber } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin Overview",
};

const AdminOverViewPage = async () => {
  const session = await auth();

  if (session?.user?.role !== "admin") {
    throw new Error("User is not authorized");
  }
  const summary = await getOrderSummary();

  type AdminCard = {
    title: string;
    Icon: LucideIcon;
    content: string | number;
  };

  const cards: AdminCard[] = [
    {
      title: "Total Revenue",
      Icon: BadgeDollarSign,
      content: formatCurrency(
        summary.totalSales._sum.totalPrice?.toString() || 0
      ),
    },
    {
      title: "Sales",
      Icon: CreditCard,
      content: formatNumber(summary.ordersCount),
    },
    {
      title: "Customers",
      Icon: User,
      content: formatNumber(summary.usersCount),
    },
    {
      title: "Products",
      Icon: Barcode,
      content: formatNumber(summary.productsCount),
    },
  ];

  return (
    <div className="space-y-2">
      <h2 className="h2-bold">Dashboard</h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.length > 0 &&
          cards.map((card) => (
            <Card key={card.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {card.title}
                </CardTitle>
                {<card.Icon />}
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.content}</p>
              </CardContent>
            </Card>
          ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
            <CardContent>{/* Chart here */}</CardContent>
          </CardHeader>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>BUYER</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead>TOTAL</TableHead>
                    <TableHead>ACTIONS</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {summary.latestSales.map((order) => (
                    <TableRow key={order.id}>
                      <TableCell>
                        {order.user?.name ? order.user.name : "Deleted User"}
                      </TableCell>
                      <TableCell>
                        {formatDateTime(order.createdAt).dateOnly}
                      </TableCell>
                      <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
                      <TableCell>
                        <Link href={`/order/${order.id}`}>
                          <span className="px-2">Details</span>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverViewPage;
