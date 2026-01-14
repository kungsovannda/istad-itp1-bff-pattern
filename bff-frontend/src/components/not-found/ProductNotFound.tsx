import Image from "next/image";
import React from "react";

export default function ProductNotFound() {
  return (
    <div className="w-full h-[60vh] flex flex-col justify-center items-center col-span-4 gap-4 px-4">
      <div className="relative w-64 h-64 animate-float">
        <Image
          width={256}
          height={256}
          src="/product.svg" // Consider using a more modern illustration
          alt="Product not found"
          className="drop-shadow-lg"
          priority
        />
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-2xl font-semibold text-gray-800 dark:text-gray-100">
          No products found
        </h3>
        <p className="text-gray-500 dark:text-gray-400 max-w-md">
          {`We couldn't find what you're looking for. Try adjusting your search or
          filters.`}
        </p>
      </div>
    </div>
  );
}
