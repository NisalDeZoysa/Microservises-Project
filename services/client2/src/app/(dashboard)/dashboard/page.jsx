"use client";

import { Plus } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

import { CartContext } from "@/context/CartContext";

// import Pay from "../../../components/Pay.jsx";

function Page() {
  const { addToCart } = useContext(CartContext);

  const cart = [
    {
      id: 1,
      name: "Nike Air Max",
      price: 129.9,
      image: "/product1.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 2,
      name: "Adidas Superstar Cap",
      price: 29.9,
      image: "/product2.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 3,
      name: "Puma Yellow T-Shirt",
      price: 49.9,
      image: "/product3.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 4,
      name: "Nike Air Max",
      price: 129.9,
      image: "/product1.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 5,
      name: "Adidas Superstar Cap",
      price: 29.9,
      image: "/product2.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 6,
      name: "Puma Yellow T-Shirt",
      price: 49.9,
      image: "/product3.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 7,
      name: "Nike Air Max",
      price: 129.9,
      image: "/product1.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 8,
      name: "Adidas Superstar Cap",
      price: 29.9,
      image: "/product2.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
    {
      id: 9,
      name: "Puma Yellow T-Shirt",
      price: 49.9,
      image: "/product3.png",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos. Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    },
  ];
  return (
    <div className="mb-16">
      {/* <h1 className="text-2xl font-bold">Cart Products</h1> */}
      <div className="flex flex-col lg:flex-row justify-between gap-16 mt-16">
        <div className="grid grid-cols-4 gap-16 w-full">
          {cart.map((item) => (
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
                    <Plus className="w-2 h-2 text-green-300 font-bold" />
                    <span className="text-[10px] text-green-300 font-bold">
                      Add to cart
                    </span>
                  </buttton>
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* <div className="w-full lg:w-1/3">
          <Pay cart={cart} />
        </div> */}
      </div>
    </div>
  );
}

export default Page;
