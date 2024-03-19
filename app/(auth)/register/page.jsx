"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const Register = () => {
  // ======================== variables function =========================
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  // ======================== submit function =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    // fetch
    setLoading(true);
    try{
      const res = await fetch("api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      // get user data
      const data = await res.json();
      // if getting is successful
      if (data.status === 201) {
        e.target.reset();
        router.push("/login");
      }
      // error
      else {
        setError(data.error);
      }
      setLoading(false);
    }catch(e){
      setError(e.message || e);
      setLoading(false);
    }finally{
      setLoading(false);
    }
    
  };
  // ======================== change function =========================
  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  // ========================   HTML elements =========================
  return (
    <form className="flex flex-col gap-5 p-5 text-gray-600" onSubmit={(e) => handleSubmit(e)}>
      <input
        name="username"
        type="text"
        placeholder="Username"
        onChange={(e) => handleChange(e)}
      ></input>
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
        Register
      </button>
      <div>{error}</div>
      <Link href="/login">Go to login</Link>
    </form>
  );
};

export default Register;
