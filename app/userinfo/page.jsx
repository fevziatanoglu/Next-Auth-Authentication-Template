"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UserInfo = () => {
  const { data: session } = useSession();
  const router = useRouter();

  // useEffect(() => {
  //   if (!session) {
  //     router.replace("/login");
  //   }
  // }, [router, session]);

  return (
    <div>
      <div>{session?.user?.email}</div>
      <div>{session?.user?.username}</div>
      <button
        onClick={() => signOut({ redirect: true, callbackUrl: "/login" })}
      >
        {" "}
        Logout{" "}
      </button>
    </div>
  );
};

export default UserInfo;
