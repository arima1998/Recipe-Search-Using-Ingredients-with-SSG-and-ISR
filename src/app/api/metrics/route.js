import db from "@/lib/db";

export async function GET(request) {
  try {
    const connection = await db.getConnection();

    // Total recipe views
    const [totalViews] = await connection.query(`
      SELECT SUM(view_count) AS total_views FROM recipe_views
    `);

    // Most viewed recipe
    const [mostViewed] = await connection.query(`
      SELECT recipe_id, view_count FROM recipe_views
      ORDER BY view_count DESC LIMIT 1
    `);

    // Recently viewed recipes
    const [recentlyViewed] = await connection.query(`
      SELECT recipe_id, last_viewed FROM recipe_views
      ORDER BY last_viewed DESC LIMIT 5
    `);

    return new Response(
      JSON.stringify({
        totalViews: totalViews[0]?.total_views || 0,
        mostViewed: mostViewed[0] || null,
        recentlyViewed,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching metrics:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch metrics" }), {
      status: 500,
    });
  }
}
