import db from "@/lib/db";

export async function POST(request) {
  try {
    const { id } = await request.json();

    if (!id) {
      return new Response(
        JSON.stringify({ success: false, error: "Recipe ID is required" }),
        { status: 400 }
      );
    }

    const connection = await db.getConnection();

    // Ensure the connection is valid
    if (!connection) {
      return new Response(
        JSON.stringify({ success: false, error: "Database connection failed" }),
        { status: 500 }
      );
    }

    // Query to insert or update the `recipe_views` table
    const [result] = await connection.query(
      `
      INSERT INTO recipe_app.recipe_views (recipe_id, view_count) 
      VALUES (?, 1)
      ON DUPLICATE KEY UPDATE 
        view_count = view_count + 1, 
        last_viewed = CURRENT_TIMESTAMP
      `,
      [id]
    );

    return new Response(JSON.stringify({ success: true, result }), {
      status: 200,
    });
  } catch (error) {
    console.error("Database query error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
