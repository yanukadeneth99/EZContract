"use client";
import React, { useEffect } from "react";

export default function User() {
  useEffect(() => {
    window.location.href = "/user/deploy";
  }, []);
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <p>Loading...</p>
    </div>
  );
}
