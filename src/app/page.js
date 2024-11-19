"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [debouncedIngredients, setDebouncedIngredients] = useState("");
  const router = useRouter();

  // Debounce the user input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedIngredients(ingredients);
    }, 500); // Wait 500ms after the user stops typing

    return () => {
      clearTimeout(handler); // Clear timeout if the user types within the debounce period
    };
  }, [ingredients]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (debouncedIngredients.trim()) {
      router.push(
        `/search?ingredients=${encodeURIComponent(debouncedIngredients)}`
      );
    }
  };

  return (
    <main className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Recipes by Ingredients</h1>
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Enter ingredients (comma-separated)"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="flex-1 border border-gray-300 p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Search
        </button>
      </form>
    </main>
  );
}
