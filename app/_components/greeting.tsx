"use client";
import { cn } from "@/lib/utils";
import React, { useEffect, useState } from "react";

const greetings = [
  "안녕하세요", // Korean
  "Hello", // English
  "こんにちは", // Japanese
  "你好", // Chinese
  "Hola", // Spanish
  "Bonjour", // French
  "Guten Tag", // German
  "Привет", // Russian
  "Ciao", // Italian
];

const Greeting = () => {
  const [index, setIndex] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    const greetingInterval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % greetings.length);
    }, 250);

    const hideTimeout = setTimeout(() => {
      setHide(true);
    }, 2500);

    return () => {
      clearInterval(greetingInterval);
      clearTimeout(hideTimeout);
    };
  }, []);

  return (
    <div
      className={cn(
        "flex justify-center items-center h-screen bg-black",
        hide && "animate-slideUp"
      )}
    >
      <div className="text-white text-4xl">{greetings[index]}</div>
    </div>
  );
};

export default Greeting;
