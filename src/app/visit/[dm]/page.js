"use client";

import { useEffect, use } from "react";

export default function DynamicPage({ params }) {
  const { dm } = use(params);

  useEffect(() => {
    async function logVisit() {
      try {
        const response = await fetch("/api/log-dm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ dm }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.error("Error logging visit:", result.error);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    }

    logVisit();
  }, [dm]);

  return (
    <div>
      <h1>This is {dm}</h1>
    </div>
  );
}
