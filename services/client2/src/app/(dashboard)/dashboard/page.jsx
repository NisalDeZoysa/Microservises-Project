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
      id: 9,
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
      {/* Deals Section */}
      <div className="mb-16">
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
          {/* <div className="w-full lg:w-1/3">
          <Pay cart={cart} />
        </div> */}
        </div>
      </div>
      {/* All Products */}
      <div className="">
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
                      Add
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

// "use client";
// import { Plus } from "lucide-react";
// import Image from "next/image";
// import { useContext } from "react";
// import { CartContext } from "@/context/CartContext";

// function Page() {
//   const { addToCart } = useContext(CartContext);

//   const cart = [
//     { id: 1, name: "Nike Air Max", price: 129.9, image: "/shoe.jpg", description: "Premium quality shoes perfect for sports and casual wear." },
//     { id: 2, name: "Adidas Superstar Cap", price: 29.9, image: "/cap.jpg", description: "Stylish cap to match your streetwear." },
//     { id: 3, name: "Puma Yellow T-Shirt", price: 49.9, image: "/tshirtb.jpg", description: "Soft cotton t-shirt for all-day comfort." },
//     { id: 4, name: "Nike Blazer", price: 129.9, image: "/blazer.jpg", description: "Classic Nike Blazer sneakers." },
//     { id: 5, name: "Adidas Jacket", price: 79.9, image: "/jacket.jpg", description: "Warm & stylish Adidas jacket." },
//     { id: 6, name: "Puma Trouser", price: 59.9, image: "/trouser.jpg", description: "Comfort-fit trousers for casual & workout." },
//     { id: 7, name: "Nike Hat", price: 19.9, image: "/hat.jpg", description: "Trendy Nike hat for everyday use." },
//     { id: 8, name: "Adidas Sunglass", price: 39.9, image: "/sunglass.jpg", description: "UV protected sunglasses with style." },
//     { id: 9, name: "Puma T-Shirt", price: 49.9, image: "/tshirt.jpg", description: "Casual Puma t-shirt with modern design." },
//     { id: 10, name: "Smart Watch", price: 99.9, image: "/watch.jpg", description: "Smartwatch with fitness tracking." },
//   ];

//   const deals = cart.slice(0, 4); // first 3 as deals
//   const otherProducts = cart.slice(4);

//   return (
//     <div className="mb-16">
//       {/* Banner */}
//       {/* <div className="relative h-[400px] w-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center">
//         <div className="text-center text-white px-4">
//           <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Welcome to Shop Mate</h1>
//           <p className="text-lg mb-6">Your one-stop shop for the latest fashion & lifestyle products</p>
//           <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100">
//             Shop Now
//           </button>
//         </div>
//       </div> */}

//       <div className="relative h-[400px] w-full bg-[url('/banner.jpg')] bg-cover bg-center flex items-center justify-center">
//         {/* <div className="text-center text-white px-4 bg-black/40 rounded-lg p-4">
//           <h1 className="text-4xl lg:text-5xl font-extrabold mb-4">Welcome to Shop Mate</h1>
//           <p className="text-lg mb-6">Your one-stop shop for the latest fashion & lifestyle products</p>
//           <button className="bg-white text-blue-600 font-semibold px-6 py-3 rounded-md shadow-md hover:bg-gray-100">
//             Shop Now
//           </button>
//         </div> */}
//       </div>

//       {/* Deals Section */}
//       <div className="px-6 lg:px-16 mt-12">
//         <h2 className="text-2xl font-bold mb-6">🔥 Hot Deals</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
//           {deals.map((item) => (
//             <div key={item.id} className="flex flex-col gap-4 border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition">
//               <Image src={item.image} alt={item.name} width={250} height={200} className="rounded-lg object-fit" />
//               <div className="flex flex-col gap-2">
//                 <h3 className="text-lg font-bold">{item.name}</h3>
//                 <p className="text-sm text-gray-500">{item.description}</p>
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-bold text-gray-800">${item.price.toFixed(2)}</h2>
//                   <button
//                     className="flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-md px-2 py-1 cursor-pointer"
//                     onClick={() => addToCart(item)}
//                   >
//                     <Plus className="w-4 h-4 text-green-600 font-bold" />
//                     <span className="text-sm text-green-600 font-bold">Add</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* All Products */}
//       <div className="px-6 lg:px-16 mt-16">
//         <h2 className="text-2xl font-bold mb-6">🛍️ All Products</h2>
//         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-10">
//           {otherProducts.map((item) => (
//             <div key={item.id} className="flex flex-col gap-4 border border-gray-200 rounded-lg shadow-md p-4 hover:shadow-lg transition">
//               <Image src={item.image} alt={item.name} width={300} height={200} className="rounded-lg object-cover" />
//               <div className="flex flex-col gap-2">
//                 <h3 className="text-lg font-bold">{item.name}</h3>
//                 <p className="text-sm text-gray-500">{item.description}</p>
//                 <div className="flex items-center justify-between">
//                   <h2 className="text-lg font-bold text-gray-800">${item.price.toFixed(2)}</h2>
//                   <button
//                     className="flex items-center gap-1 bg-green-100 hover:bg-green-200 rounded-md px-2 py-1 cursor-pointer"
//                     onClick={() => addToCart(item)}
//                   >
//                     <Plus className="w-4 h-4 text-green-600 font-bold" />
//                     <span className="text-sm text-green-600 font-bold">Add</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Page;
