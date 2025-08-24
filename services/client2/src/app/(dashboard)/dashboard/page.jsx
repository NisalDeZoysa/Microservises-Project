"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { CartContext } from "../../../context/CartContext";

function Page() {
  const { addToCart } = useContext(CartContext);

  const cart = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 129.9,
      image: "/product1.png",
      description: "Premium quality shoes perfect for sports and casual wear.",
    },
    {
      id: 2,
      name: "Adidas Superstar Cap",
      price: 29.9,
      image: "/product2.png",
      description: "Stylish cap to match your streetwear.",
    },
    {
      id: 3,
      name: "Puma Yellow T-Shirt",
      price: 49.9,
      image: "/product3.png",
      description: "Soft cotton t-shirt for all-day comfort.",
    },
    {
      id: 4,
      name: "Nike Blazer",
      price: 129.9,
      image: "/product4.jpg",
      description: "Classic Nike Blazer sneakers.",
    },
    {
      id: 5,
      name: "Titans Smart Watch",
      price: 29.9,
      image: "/product5.jpg",
      description: "Smartwatch with fitness tracking.",
    },
    {
      id: 6,
      name: "Adidas Superstar Hat",
      price: 49.9,
      image: "/product6.jpg",
      description: "Trendy Nike hat for everyday use.",
    },
    {
      id: 7,
      name: "Adidas Jacket",
      price: 129.9,
      image: "/product7.jpg",
      description: "Warm & stylish Adidas jacket.",
    },
    {
      id: 8,
      name: "Adidas Sport Shoe",
      price: 29.9,
      image: "/product8.jpg",
      description: "Premium quality shoes perfect for sports and casual wear.",
    },
    {
      id: 9,
      name: "Adidas Sunglass",
      price: 49.9,
      image: "/product9.jpg",
      description: "UV protected sunglasses with style",
    },
    {
      id: 10,
      name: "Dennim Trouser",
      price: 49.9,
      image: "/product10.jpg",
      description: "Comfort-fit trousers for casual & workout.",
    },
  ];

  const deals = cart.slice(0, 4); // first 3 as deals
  const otherProducts = cart.slice(4);

  return (
    <div className="px-6 lg:px-16 mt-16">
      <div className="relative h-[400px] w-full bg-[url('/banner.jpg')] bg-cover bg-center flex items-center justify-center"></div>

      {/* Deals Section */}
      <div className="mt-12">
        <h1 className="text-2xl font-bold">🔥 Hot Deals</h1>
        <div className="flex flex-col lg:flex-row justify-between gap-16 mt-6">
          <div className="grid grid-cols-4 gap-16 w-full">
            {deals.map((item) => (
              <div
                key={item.id}
                className="flex flex-col gap-4 border border-amber-400 rounded-[8px] items-center text-center"
              >
                <Image
                  src={item.image}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="rounded-lg"
                  quality={100}
                />
                <div className="flex flex-col gap-2">
                  <h3 className="text-lg font-bold">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  <div className="flex items-center justify-between px-2">
                    <h2 className="text-lg font-bold text-gray-800 text-center">
                      ${item.price.toFixed(2)}
                    </h2>
                    <buttton
                      className="flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-md p-1 cursor-pointer"
                      onClick={() => addToCart(item)}
                    >
                      <Plus className="w-4 h-4 text-green-600 font-bold" />
                      <span className="text-sm text-green-600 font-bold">
                        Add to cart
                      </span>
                    </buttton>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* All Products */}
      <div className="mt-10">
        <h2 className="text-2xl font-bold mb-6">🛍️ All Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
          {otherProducts.map((item) => (
            <div
              key={item.id}
              className="flex flex-col gap-4 border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition"
            >
              <Image
                src={item.image}
                alt={item.name}
                width={300}
                height={200}
                className="rounded-lg object-cover"
              />
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-bold">{item.name}</h3>
                <p className="text-sm text-gray-500">{item.description}</p>
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-800">
                    ${item.price.toFixed(2)}
                  </h2>
                  <button
                    className="flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-md px-2 py-1 cursor-pointer"
                    onClick={() => addToCart(item)}
                  >
                    <Plus className="w-4 h-4 text-green-600 font-bold" />
                    <span className="text-sm text-green-600 font-bold">
                      Add to cart
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
