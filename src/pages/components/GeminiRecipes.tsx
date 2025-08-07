import { useEffect, useState } from "react";

export default function GeminiRecipes() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchRecipes() {
      setLoading(true);
      try {
        const res = await fetch("/api/gemini");
        const data = await res.json();
        setRecipes(data);
      } catch (e) {
        console.error("Fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchRecipes();
  }, []);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">🍪 Recettes de cookies</h1>
      {loading ? (
        <p className="text-center text-blue-500">Chargement...</p>
      ) : (
        recipes.map((recipe: any, i: number) => (
          <div key={i} className="bg-white p-4 rounded shadow mb-4">
            <h2 className="text-xl font-semibold text-purple-700">{recipe.recipeName}</h2>
            <ul className="list-disc list-inside mt-2">
              {recipe.ingredients.map((ing: string, j: number) => (
                <li key={j}>{ing}</li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
