export default async function SearchResults({ searchParams }) {
  const { ingredients } = await searchParams;

  if (!ingredients) {
    return (
      <p className="text-center mt-4">
        Please provide ingredients to search for recipes.
      </p>
    );
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_SPOONACULAR_API_URL}/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY}`
  );

  if (!response.ok) {
    return (
      <p className="text-center mt-4">
        Failed to fetch recipes. Try again later.
      </p>
    );
  }

  const recipes = await response.json();

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Search Results</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <li key={recipe.id} className="border p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{recipe.title}</h2>
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-auto mt-2 rounded-md"
            />
            <a
              href={`/recipes/${recipe.id}`}
              className="block mt-2 text-blue-500 underline"
            >
              View Recipe
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
