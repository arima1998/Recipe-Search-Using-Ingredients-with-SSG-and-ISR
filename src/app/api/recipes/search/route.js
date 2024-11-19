export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const ingredients = searchParams.get("ingredients");

  if (!ingredients) {
    return new Response(JSON.stringify({ error: "Ingredients are required" }), {
      status: 400,
    });
  }

  // Construct the API request
  const url = `${process.env.NEXT_PUBLIC_SPOONACULAR_API_URL}/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`;

  try {
    const response = await fetch(url);

    // Check if the response is ok
    if (!response.ok) {
      throw new Error(`Error fetching data: ${response.statusText}`);
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
