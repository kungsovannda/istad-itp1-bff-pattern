import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { removeFromCart, updateQuantity } from "@/features/cart/cartSlice";

type CartItem = {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  description: string;
};

export default function ProductCartItem(cart: CartItem) {
  const dispatch = useDispatch();

  const handleQuantityChange = (qty: number) => {
    dispatch(updateQuantity({ id: cart.id, quantity: qty }));
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart({ id: cart.id }));
  };
  return (
    <div className="flex items-start justify-between w-full">
      {/* Image */}

      <div className="flex items-start gap-5 justify-start">
        <Image
          unoptimized
          className="object-cover rounded-md h-24 w-24 bg-gray-100 flex items-center justify-center"
          width={200}
          height={200}
          src={cart.image}
          alt={cart.title}
        />

        <div className="flex flex-col justify-between h-24 w-2/3 items-start">
          <span className=" font-semibold">{cart.title}</span>
          <span className="text-sm text-gray-500">
            Price {cart.price} USD per item
          </span>
          <p className="line-clamp-2 text-gray-400 text-sm">
            {cart.description}
          </p>
        </div>
      </div>

      <div className="flex flex-col h-24 w-1/3 justify-between items-end">
        <span className="font-semibold">
          {(cart.price * cart.quantity).toFixed(2)} USD
        </span>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg  border-1">
            <Button
              onClick={() => handleQuantityChange(cart.quantity - 1)}
              variant={"secondary"}
              className="h-8 w-8 text-lg flex justify-center items-center rounded-r-none bg-white"
            >
              <Minus size={12} />
            </Button>
            <span className="h-8 w-8 text-sm font-semibold flex justify-center items-center border-x-1 ">
              {cart.quantity}
            </span>
            <Button
              onClick={() => handleQuantityChange(cart.quantity + 1)}
              variant={"secondary"}
              className="h-8 w-8 text-lg flex justify-center items-center rounded-l-none bg-white"
            >
              <Plus size={12} />
            </Button>
          </div>

          <Button
            onClick={handleRemoveItem}
            className="h-8 w-8"
            variant={"outline"}
          >
            <Trash2 color="#FF0000" />
          </Button>
        </div>
      </div>
    </div>
  );
}
