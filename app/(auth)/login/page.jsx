"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Login = () => {
  // ======================== variables =========================
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ======================== submit function =========================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const res = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        redirect: false,
      });

      if (res.error) {
        setError(res.error);
        return;
      }
      setLoading(false);
      router.replace("/userinfo");
    } catch (e) {
      setError(e.message || e);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // ======================== change function =========================

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // ======================== html elements =========================

  return (
    <form
      className="flex flex-col gap-5 p-5 text-gray-600"
      onSubmit={(e) => handleSubmit(e)}
    >
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={(e) => handleChange(e)}
      ></input>
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={(e) => handleChange(e)}
      ></input>
      <button type="submit" className="btn">
        {isLoading ? "Loading..." : "Login"}
      </button>
      <div>{error}</div>
      <Link href="/register">Go to register</Link>
    </form>
  );
};

export default Login;
