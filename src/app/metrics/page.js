"use client";

import { useEffect, useState } from "react";

export default function MetricsPage() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await fetch("/api/metrics");
        if (!response.ok) throw new Error("Failed to fetch metrics");
        const data = await response.json();
        setMetrics(data);
      } catch (error) {
        console.error("Error fetching metrics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMetrics();
  }, []);

  if (loading) {
    return <div>Loading metrics...</div>;
  }

  if (!metrics) {
    return <div>Failed to load metrics</div>;
  }

  const { totalViews, mostViewed, recentlyViewed } = metrics;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Site Metrics</h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Total Recipe Views</h2>
        <p className="text-lg">{totalViews}</p>
      </div>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold">Most Viewed Recipe</h2>
        {mostViewed ? (
          <p className="text-lg">
            Recipe ID: {mostViewed.recipe_id} with {mostViewed.view_count} views
          </p>
        ) : (
          <p className="text-lg">No data available</p>
        )}
      </div>

      <div>
        <h2 className="text-2xl font-semibold">Recently Viewed Recipes</h2>
        {recentlyViewed && recentlyViewed.length > 0 ? (
          <ul className="list-disc pl-6">
            {recentlyViewed.map((recipe) => (
              <li key={recipe.recipe_id}>
                Recipe ID: {recipe.recipe_id}, Last Viewed:{" "}
                {new Date(recipe.last_viewed).toLocaleString()}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-lg">No data available</p>
        )}
      </div>
    </div>
  );
}
