// "use client";
// import { useState } from "react";

// export default function Home() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       alert("Please fill in all fields");
//       return;
//     }
//     if (email === "user@example.com" && password === "password123") {
//       alert("Login successful!");
//     } else {
//       alert("Invalid email or password");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-orange-100">
//       <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
//         <div className="text-center">
//           <div className="text-4xl font-bold text-black mb-2">🛒 ShopMate</div>
//           {/* <h2 className="text-2xl font-semibold">Welcome Back</h2> */}
//           <p className="text-gray-500 mb-6">Login to continue shopping</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Email */}
//           <div>
//             <label
//               htmlFor="email"
//               className="block mb-1 text-gray-700 font-medium"
//             >
//               Email
//             </label>
//             <input
//               id="email"
//               type="email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               placeholder="Enter your email"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
//             />
//           </div>

//           {/* Password */}
//           <div>
//             <label
//               htmlFor="password"
//               className="block mb-1 text-gray-700 font-medium"
//             >
//               Password
//             </label>
//             <input
//               id="password"
//               type="password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               placeholder="Enter your password"
//               className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
//             />
//           </div>

//           <button
//             type="submit"
//             className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors"
//           >
//             Login
//           </button>
//         </form>

//         <div className="mt-4 text-center text-sm text-gray-600">
//           <a href="#" className="text-red-500 hover:underline">
//             Forgot password?
//           </a>
//           <p className="mt-2">
//             Don’t have an account?{" "}
//             <a href="#" className="text-red-500 hover:underline">
//               Sign up
//             </a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const [username, setUsername] = useState(""); // Backend uses username, not email
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in all fields");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const response = await axios.post("http://localhost:7000/login", {
        username,
        password,
      });
      const { token, user } = response.data;

      // Save auth data
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));

      router.push("/dashboard"); // Redirect to main products/cart page
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-orange-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md">
        <div className="text-center">
          <div className="text-4xl font-bold text-black mb-2">🛒 ShopMate</div>
          <p className="text-gray-500 mb-6">Login to continue shopping</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block mb-1 text-gray-700 font-medium"
            >
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block mb-1 text-gray-700 font-medium"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-pink-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        <div className="mt-4 text-center text-sm text-gray-600">
          <a href="#" className="text-red-500 hover:underline">
            Forgot password?
          </a>
          <p className="mt-2">
            Don’t have an account?{" "}
            <a href="#" className="text-red-500 hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
