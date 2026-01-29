"use client";
import ProductCartItem from "@/components/product/ProductCartItem";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { removeFromCart } from "@/features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { useState } from "react";

type OrderItemRequest = {
  productUuid: string;
  price: number;
  quantity: number;
};

type OrderRequest = {
  items: OrderItemRequest[];
};

export default function CartPage() {
  const router = useRouter();
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const [isOrderLoading, setIsOrderLoading] = useState(false);
  const [orderState, setOrderState] = useState<string>(
    "We are preparing your order...",
  );
  const { total, itemCount } = useAppSelector((state) => state.cart);

  const shipping = total > 50 ? 0 : 9.99;
  const tax = total * 0.08;
  const finalTotal = total + shipping + tax;

  if (itemCount == 0) {
    return (
      <div className="h-screen w-full flex justify-center items-center ">
        Your cart is empty
      </div>
    );
  }

  const handleCheckoutOnClick = async () => {
    //   Prepare order
    setIsOrderLoading(true);
    const orderItems: OrderRequest = {
      items: [],
    };
    items.forEach((item) => {
      orderItems.items.push({
        productUuid: item.id,
        price: item.price,
        quantity: item.quantity,
      });
    });

    //   Submit order
    try {
      setOrderState("We are creating your order...");
      const response = await fetch("api/v1/orders", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        credentials: "include",
        body: JSON.stringify(orderItems),
      });

      if (!response.ok) {
        setOrderState("Failed to create order. Please try again.");
        return;
      }

      const data = await response.json();
      console.log(data);
      setOrderState("Your order created successfully!");
    } catch (e) {
      throw e;
    } finally {
      const sleep = (ms: number) =>
        new Promise((resolve) => setTimeout(resolve, ms));
      await sleep(3000);
      setIsOrderLoading(false);
      // Clear ordered products
      items.forEach((item) => {
        dispatch(removeFromCart({ id: item.id }));
      });
      // Redirect to profile orders page
      router.push("/profile");
    }
  };
  return (
    <main className=" pt-24 px-5 md:px-20 min-h-screen h-fit">
      <div className="flex flex-col mb-4">
        <h1 className="text-3xl font-bold">Your cart</h1>
        <p className="text-gray-600">{itemCount} Products in your cart</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        {/* Cart item list */}
        <div className="md:col-span-3 flex flex-col gap-4">
          <div className="w-full rounded-md border-2 border-gray-200">
            <div className="py-4 flex flex-col gap-4">
              {(items || []).map((item, index) => (
                <div className="flex flex-col gap-4 px-4" key={index}>
                  <ProductCartItem {...item} />
                  {index !== items.length - 1 ? <Separator /> : ""}
                </div>
              ))}
            </div>
          </div>
        </div>
        <Card className="w-full max-w-md rounded-md border-2 border-gray-200 h-fit">
          <CardHeader>
            <h1 className="text-xl font-bold">Order Summary</h1>
            <p className="text-sm text-muted-foreground">
              Review your items and check delivery details before proceeding to
              checkout.
            </p>
          </CardHeader>

          <CardContent className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Subtotal ({itemCount} items)</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>

            <div className="flex justify-between text-sm">
              <span>Tax</span>
              <span>${tax.toFixed(2)}</span>
            </div>

            <Separator />

            <div className="flex justify-between text-base font-semibold">
              <span>Total</span>
              <span>${finalTotal.toFixed(2)}</span>
            </div>

            {total < 50 && (
              <p className="text-sm text-muted-foreground">
                Add ${(50 - total).toFixed(2)} more for free shipping!
              </p>
            )}

            <Button
              onClick={handleCheckoutOnClick}
              className="w-full"
              size="lg"
            >
              Proceed to Checkout
            </Button>

            <div className="pt-4 text-xs text-muted-foreground space-y-1">
              <p>✓ Secure checkout</p>
              <p>✓ 30-day return policy</p>
              <p>✓ Customer support</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {isOrderLoading && (
        <Dialog onOpenChange={setIsOrderLoading} open={isOrderLoading}>
          <DialogContent
            onInteractOutside={(e) => e.preventDefault()}
            showCloseButton={false}
          >
            <DialogHeader>
              <DialogTitle>Processing your order</DialogTitle>
            </DialogHeader>
            <ul className="border-l-2 border-green-200 border-rounded-full pl-4 py-4 space-y-2">
              <li className="flex space-x-4 items-center">
                <span className="h-2 w-2 outline-4 outline-green-200 bg-linear-30 from-green-300 to-blue-500 animate-spin  block rounded-full bg-green-400"></span>
                <span>{orderState}</span>
              </li>
            </ul>
          </DialogContent>
        </Dialog>
      )}
    </main>
  );
}
