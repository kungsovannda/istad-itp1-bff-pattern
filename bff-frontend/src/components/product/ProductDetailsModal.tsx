"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
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

        <div className="h-80 rounded-xl overflow-hidden">
          <figure className="w-full h-full">
            <Image
              width={200}
              height={200}
              unoptimized
              className="h-full w-full object-cover mx-auto"
              src={toggleProduct?.image || ""}
              alt={toggleProduct?.name || ""}
            />
          </figure>
        </div>
        <DialogFooter className="flex justify-start">
          <p className="leading-relaxed text-gray-500 dark:text-gray-400">
            {toggleProduct?.description}
          </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
