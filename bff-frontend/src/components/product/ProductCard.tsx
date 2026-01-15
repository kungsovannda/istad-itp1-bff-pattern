"use client";
import { addToCart } from "@/features/cart/cartSlice";
import { useAppDispatch } from "@/lib/hooks";
import { Product } from "@/types/product";
import { Eye, ShoppingCart } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import React, { useState } from "react";
import { toast } from "sonner";
import ProductDetailsModal from "./ProductDetailsModal";

type Props = {
  index?: number;
  product: Product;
};

export default function ProductCard({ index = 0, product }: Props) {
  const dispatch = useAppDispatch();
  const [isOpenProduct, setIsOpenProduct] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(addToCart(product));
    toast.success("Product has been added to cart!", {
      description: new Date().toLocaleString(),
    });
  };

  return (
    <motion.div
      initial={{ y: 10, opacity: 0.8 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: false, amount: 0.2 }}
      transition={{ delay: (index % 4) * 0.1 }}
      className="rounded-md bg-white p-4 flex flex-col border-1 border-gray-200"
    >
      <div className="relative hover:bg-gray-200 transition-colors ease-in duration-300 rounded-xl">
        <Image
          unoptimized
          width={196}
          height={196}
          src={
            product.image ||
            "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=600&h=600&fit=crop&auto=format"
          }
          alt={product?.name}
          className="rounded-xl w-full object-cover h-56"
          loading="lazy"
        />
      </div>

      <div className="mt-4 flex flex-col flex-grow gap-1">
        <h3 className="text-md font-semibold text-gray-800 line-clamp-1">
          {product?.name}
        </h3>
        <div className="flex items-center justify-between">
          <p className="text-xs text-gray-500">Kuika • {product?.category}</p>
        </div>
      </div>

      <div className="mt-2 text-gray-500 line-clamp-2 text-sm">
        <p>{product?.description}</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div>
          <span className="text-base font-bold text-primary">
            ${product?.price}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleAddToCart}
            className="bg-gray-900 text-white p-2 rounded-md hover:bg-opacity-80"
          >
            <ShoppingCart size={16} />
          </button>
          <button
            onClick={() => setIsOpenProduct(true)}
            className="bg-gray-200 text-gray-900 p-2 rounded-md hover:bg-opacity-80"
          >
            <Eye size={16} />
          </button>
        </div>
      </div>
      {isOpenProduct && (
        <ProductDetailsModal
          isOpen={isOpenProduct}
          setIsOpen={setIsOpenProduct}
          toggleProduct={product}
        />
      )}
    </motion.div>
  );
}
