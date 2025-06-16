const RestaurentCategory = ({ data }) => {
  return (
    <div className="w-6/12 mx-auto my-4 bg-grey shadow-lg p-4 flex justify-between">
      <div className="font-bold text-lg"> {data}</div>
      <span>⬇️</span>
    </div>
  );
};

export default RestaurentCategory;
