"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/productType";
import Image from "next/image";

interface ProductDetailsModalProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  toggleProduct: Product | null;
}

export default function ProductDetailsModal({
  isOpen,
  setIsOpen,
  toggleProduct,
}: ProductDetailsModalProps) {
  if (!toggleProduct) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent id="default-modal" aria-hidden="true">
        <DialogHeader>
          <DialogTitle>{toggleProduct?.name}</DialogTitle>
        </DialogHeader>

        <div className="p-4 md:p-5 space-y-4">
          <Image
            width={200}
            height={200}
            unoptimized
            className="w-2/3 object-contain mx-auto"
            src={toggleProduct?.image || ""}
            alt={toggleProduct?.name || ""}
          />
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            {toggleProduct?.description}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
