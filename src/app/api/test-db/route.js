import db from "@/lib/db";

export async function GET() {
  try {
    const connection = await db.getConnection();
    const [rows] = await connection.query("SELECT 1 + 1 AS result");

    return new Response(
      JSON.stringify({ success: true, result: rows[0].result }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Database connection error:", error);
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      { status: 500 }
    );
  }
}
