import { useUserQuery } from "@/features/user/user-api";
import Link from "next/link";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { ShoppingCartIcon } from "lucide-react";
import { Badge } from "../ui/badge";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";
import { motion } from "motion/react";

export default function UserNav() {
  const { data } = useUserQuery();
  const [navOpen, setNavOpen] = useState(false);

  const { itemCount } = useAppSelector((state) => state.cart);

  return (
    <ul className="flex gap-3 items-center justify-center">
      <Link href={"/profile"}>
        <Avatar
          title={data?.username}
          className="border-2 border-blue-400 cursor-pointer"
        >
          <AvatarFallback>
            {data?.username?.charAt(0).toUpperCase() || "NA"}
          </AvatarFallback>
        </Avatar>
      </Link>

      <li className="h-9 w-[1px] rounded-full bg-blue-100"></li>
      <div className="flex gap-4 items-center">
        <Link
          href="/cart"
          className="relative flex items-center justify-center py-2"
        >
          <ShoppingCartIcon strokeWidth={1.5} size={20} />
          {itemCount > 0 && (
            <Badge
              variant={"destructive"}
              className="absolute -right-2 -top-0 h-4 min-w-4 flex items-center justify-center px-1"
            >
              {itemCount}
            </Badge>
          )}
        </Link>
      </div>
      <button onClick={() => setNavOpen(!navOpen)} className="md:hidden">
        <svg
          className="w-6 h-6 text-black"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <motion.path
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            exit={{ pathLength: 0 }}
            transition={{ duration: 0.3 }}
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </ul>
  );
}
