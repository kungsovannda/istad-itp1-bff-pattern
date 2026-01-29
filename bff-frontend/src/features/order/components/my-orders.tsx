"use client";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useGetProductByIdQuery } from "@/features/product/productApi";
import Image from "next/image";
import { useEffect, useState } from "react";

type OrderResponse = {
  uuid: number;
  orderDate: string;
  username: string;
  status: string;
  items: OrderItemResponse[];
};

type OrderItemResponse = {
  id: number;
  productUuid: string;
  quantity: number;
  price: number;
};

type OrderItemRowProps = {
  productUuid: string;
  quantity: number;
  price: number;
};

function OrderItemRow({ productUuid, quantity, price }: OrderItemRowProps) {
  const { data: product, isLoading } = useGetProductByIdQuery(productUuid);

  return (
    <div className="flex justify-between text-sm">
      <div className="flex gap-4">
        <Image
          unoptimized
          src={product?.image ?? ""}
          width={64}
          height={64}
          alt={product?.name ?? ""}
          className="h-full aspect-square rounded-md object-cover border-1 "
        />

        <div className="flex flex-col">
          <span className="font-medium">
            {isLoading ? "Loading product..." : product?.name}
          </span>
          <span className="text-muted-foreground">Qty: {quantity}</span>
          <span className="text-muted-foreground">
            Price: $ {product?.price.toFixed(2)}
          </span>
        </div>
      </div>

      <span className="font-medium">${(price * quantity).toFixed(2)}</span>
    </div>
  );
}

export default function MyOrders() {
  const [orders, setOrders] = useState<OrderResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch("/api/v1/orders", {
          credentials: "include",
        });
        const data = (await res.json()) as OrderResponse[];
        setOrders(
          data.sort(
            (a, b) =>
              new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime(),
          ),
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading your orders...
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="h-screen flex items-center justify-center">
        You have no orders yet
      </div>
    );
  }

  return (
    <main className="pt-24 px-5 md:px-20 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">My Orders</h1>
        <p className="text-muted-foreground">
          View your past purchases and order details
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => {
          const orderTotal = order.items.reduce(
            (sum, item) => sum + item.price * item.quantity,
            0,
          );

          return (
            <Card
              key={order.uuid}
              className="border-2 border-gray-200 rounded-md"
            >
              <CardHeader className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                <div>
                  <h2 className="text-lg font-semibold">
                    Order #{order.uuid.toString().substring(0, 8)}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Placed on {new Date(order.orderDate).toLocaleDateString()} -{" "}
                    {new Date(order.orderDate).toLocaleTimeString()}
                  </p>
                </div>

                <Badge variant="outline" className="w-fit">
                  {order.status}
                </Badge>
              </CardHeader>

              <CardContent className="space-y-4">
                <Separator />

                {/* Order items */}
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <OrderItemRow
                      key={item.id}
                      productUuid={item.productUuid}
                      quantity={item.quantity}
                      price={item.price}
                    />
                  ))}
                </div>

                <Separator />

                {/* Order total */}
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>${orderTotal.toFixed(2)}</span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </main>
  );
}
