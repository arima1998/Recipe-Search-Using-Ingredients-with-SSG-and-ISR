import db from "@/lib/db";

export async function POST(request) {
  try {
    const { dm } = await request.json();

    if (!dm) {
      return new Response(
        JSON.stringify({ success: false, error: "dm is required" }),
        { status: 400 }
      );
    }

    const connection = await db.getConnection();
    await connection.query(
      "INSERT INTO recipe_app.visit_logs (dm_value) VALUES (?)",
      [dm]
    );

    return new Response(
      JSON.stringify({ success: true, message: "Logged successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging dm:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
