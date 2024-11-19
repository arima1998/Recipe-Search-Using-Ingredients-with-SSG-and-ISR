import db from "@/lib/db";

async function fetchRecipeById(id) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_API_URL}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch recipe details");
  }
  return response.json();
}

export async function generateStaticParams() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_API_URL}/random?number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch popular recipes");
  }

  const data = await response.json();

  // Extract recipe IDs
  return data.recipes.map((recipe) => ({ id: recipe.id.toString() }));
}

// This replaces getStaticProps
export default async function RecipePage({ params }) {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);
  const connection = await db.getConnection();
  await connection.query(
    `
    INSERT INTO recipe_app.recipe_views (recipe_id, view_count) 
    VALUES (?, 1)
    ON DUPLICATE KEY UPDATE 
      view_count = view_count + 1, 
      last_viewed = CURRENT_TIMESTAMP
    `,
    [id]
  );
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="w-full h-auto mt-4 rounded-md"
      />
      <p className="mt-4">{recipe.summary.replace(/<[^>]*>/g, "")}</p>

      {/* Ingredients */}
      <h2 className="text-2xl font-semibold mt-6">Ingredients</h2>
      <ul className="list-disc pl-6">
        {recipe.extendedIngredients.map((ingredient) => (
          <li key={ingredient.id}>{ingredient.original}</li>
        ))}
      </ul>

      {/* Instructions */}
      <h2 className="text-2xl font-semibold mt-6">Instructions</h2>
      <ol className="list-decimal pl-6">
        {recipe.analyzedInstructions[0]?.steps.map((step, index) => (
          <li key={index}>{step.step}</li>
        )) || <p>No instructions available</p>}
      </ol>
    </div>
  );
}

export const revalidate = 3600;
