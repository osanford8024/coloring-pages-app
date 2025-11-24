export default function CategoriesPage() {
  const categories = [
    "Animals",
    "Sports",
    "Cars",
    "Fantasy",
    "Food",
    "People",
    "Dinosaurs",
    "Space",
    "Flowers"
  ];

  return (
    <main className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Browse by Category</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {categories.map((cat) => (
          <a
            key={cat}
            href={`/gallery?category=${encodeURIComponent(cat)}`}
            className="border rounded p-4 text-center hover:bg-gray-100 font-medium"
          >
            {cat}
          </a>
        ))}
      </div>
    </main>
  );
}
