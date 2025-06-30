function RestaurantCard({ data }) {
  const { photoUrl, name, cuisineTitles, rating } = data;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <img src={photoUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4 space-y-2">
        <h2 className="text-xl font-bold text-gray-800">{name}</h2>
        <p className="text-gray-600 text-sm">
          {Array.isArray(cuisineTitles)
            ? cuisineTitles.join(", ")
            : cuisineTitles}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <span className="flex items-center gap-1">
            ⭐{" "}
            <span className="font-medium text-gray-700">{rating || "4.5"}</span>
          </span>
          <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded-full text-xs font-semibold">
            {rating >= 4 ? "Popular" : "New"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default RestaurantCard;
