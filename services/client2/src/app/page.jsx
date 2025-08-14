"use client";

import Image from "next/image";
import Link from "next/link";

import Logo from "../../public/cart logo.jpg";

export default function LandingPage() {
  return (
    <div className="h-screen flex flex-col">
      {/* Hero Section */}
      <section className="border  h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-20 py-16 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Welcome to <span className="text-yellow-300">ShopMate</span>
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Your one-stop shop for amazing products, unbeatable prices, and fast
            delivery.
          </p>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-6 py-3 bg-yellow-400 text-black rounded-lg font-semibold hover:bg-yellow-300 transition duration-300"
            >
              Get Started
            </Link>
            <Link
              href="/dashboard"
              className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition duration-300"
            >
              Explore
            </Link>
          </div>
        </div>

        <div className="md:w-1/2 mt-10 md:mt-0">
          <Image
            src={Logo}
            alt="Shopping"
            width={500}
            height={500}
            priority
            className="rounded-xl shadow-lg"
          />
        </div>
      </section>

      {/* Features Section */}
      {/* <section className="py-16 px-6 md:px-20 bg-white text-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <Image
              src="/fast-delivery.png"
              alt="Fast Delivery"
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p>
              Get your products delivered to your doorstep quickly and safely.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <Image
              src="/best-prices.png"
              alt="Best Prices"
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">Best Prices</h3>
            <p>Enjoy high-quality products at the most affordable prices.</p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow hover:shadow-lg transition">
            <Image
              src="/support.png"
              alt="Support"
              width={60}
              height={60}
              className="mb-4"
            />
            <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
            <p>We are here to help you anytime you need assistance.</p>
          </div>
        </div>
      </section> */}
    </div>
  );
}
