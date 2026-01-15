"use client";
import ProductCard from "@/components/product/ProductCard";
import { Product } from "@/types/product";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useRouter, useSearchParams } from "next/navigation";
import ProductNotFound from "@/components/not-found/ProductNotFound";
import { useGetProductsQuery } from "@/features/product/productApi";

export default function ProductPage() {
  const [category, setCategory] = useState<Dropdown>();
  const [open, setOpen] = useState(false);
  const [filterProduct, setFilterProduct] = useState<Product[]>([]);
  const searchParam = useSearchParams();
  const [query, setQuery] = useState("");
  const router = useRouter();

  const { data, isLoading, error } = useGetProductsQuery();
  console.log(data);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const param = new URLSearchParams();
    if (query.trim()) {
      param.set("search", query.trim().toLowerCase());
    } else {
      param.delete("search");
    }
    router.push(`/product?${param.toString()}`);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setCategory(CategoriesMenu[0]);
    const param = new URLSearchParams();
    if (value.trim()) {
      param.set("search", value);
    } else {
      param.delete("search");
    }
    router.push(`/product?${param.toString()}`);
  };

  useEffect(() => {
    if (!data) return;
    const s = searchParam.get("search");

    if (!s) {
      setFilterProduct(data);
    } else {
      setQuery(s);
      setFilterProduct(
        data.filter((p: Product) =>
          p.name.toLowerCase().includes(s.toLowerCase())
        )
      );
    }
  }, [data, searchParam]);

  useEffect(() => {
    if (!data) return;
    if (category?.value === "all-products" || !category) {
      setFilterProduct(data);
    } else {
      setFilterProduct(
        data.filter((p: Product) => p.category === category.value)
      );
    }
  }, [data, category]);

  return (
    <>
      <main className="flex flex-col pt-16">
        <div className="bg-blue-50 w-full h-64 px-5 md:px-20 flex items-center">
          <div className="flex flex-col">
            <h1 className="font-bold text-3xl">All Products</h1>
            <ol className="flex items-center whitespace-nowrap">
              <li className="inline-flex items-center">
                <Link
                  className="flex items-center text-sm text-gra hover:text-blue-600"
                  href="/"
                >
                  Home
                </Link>
                <svg
                  className="shrink-0 mx-2 size-4 text-gray-400 dark:text-neutral-600"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </li>
              <li
                className="inline-flex items-center text-sm text-gray-600"
                aria-current="page"
              >
                Products
              </li>
            </ol>
          </div>
        </div>
        <div className="flex items-center justify-between gap-4 py-5 px-5 md:px-20">
          <div className="relative">
            <button
              onClick={() => setOpen(!open)}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="text-gray-800 border-1 border-gray-200  font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {category?.label || "All Products"}{" "}
              <svg
                className="w-2.5 h-2.5 ms-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>

            <div
              id="dropdown"
              className={`absolute top-15 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700 ${
                open ? "block" : "hidden"
              }`}
            >
              <ul
                className="py-2 h-80 overflow-y-scroll text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                {CategoriesMenu.map((c, index) => (
                  <li
                    onClick={() => {
                      setCategory(c);
                      setOpen(false);
                    }}
                    key={index}
                  >
                    <span className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                      {c.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div>
            <label
              htmlFor="hs-trailing-button-add-on-with-icon-and-button"
              className="sr-only"
            >
              Label
            </label>
            <form
              onSubmit={handleSearchSubmit}
              className="relative flex rounded-lg"
            >
              <input
                type="text"
                placeholder="Search..."
                value={query}
                onChange={handleSearchChange}
                className="py-2.5 px-4 ps-11 block w-full border-2 border-blue-200 rounded-s-lg rounded-e-lg md:rounded-e-none text-sm active:z-10 focus:outline-blue-500 "
              />
              <div className="absolute inset-y-0 start-0 flex items-center pointer-events-none ps-4">
                <svg
                  className="shrink-0 size-4 text-blue-400 dark:text-neutral-500"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </svg>
              </div>
              <button
                type="submit"
                className="py-3 px-4 hidden md:inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-e-md border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-hidden focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
              >
                Search
              </button>
            </form>
          </div>
        </div>
        {isLoading ? (
          <Loading />
        ) : error ? (
          <div className="text-center py-10 h-80 flex justify-center items-center">
            <p className="text-red-500">
              Error: Error while fetching products.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 px-5 md:px-20 w-full">
            {(filterProduct || []).length === 0 ? (
              <ProductNotFound />
            ) : (
              filterProduct.map((product, index) => (
                <ProductCard
                  key={product.uuid}
                  index={index}
                  product={product}
                />
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
}

type Dropdown = {
  value: string;
  label: string;
};

const CategoriesMenu: Dropdown[] = [
  "all-products",
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches",
].map((item) => ({
  value: item,
  label: item.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
}));
