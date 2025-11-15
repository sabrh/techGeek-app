"use client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setCredentials } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        
        dispatch(setCredentials({ token: data.token, email }));
        router.push("/");
      } else {
        setError(data.message || "Signin failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#EFF1F3]">
      <form
        onSubmit={handleSubmit}
        className="mt-10 p-10 bg-white shadow-lg rounded-lg w-100"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-[#0D1821]">SIGN IN</h2>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border-[#4E6E5D] px-3 py-2 rounded-md mb-3 focus:outline-none focus:ring focus:ring-[#4E6E5D]"
          required
        />
        {error && <p className="text-red-500 mb-2 text-center">{error}</p>}
        <button
          type="submit"
          className="w-full mt-4 bg-[#4E6E5D] text-white py-2 rounded-md hover:border-[#4E6E5D]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}