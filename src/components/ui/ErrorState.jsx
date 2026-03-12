export default function ErrorState({ message }) {
  return (
    <div className="text-font-main text-center py-10 max-w-md mx-auto">
      <h3 className="text-2xl font-bold tracking-wide text-error">
        {message || "No search result found!"}
      </h3>
    </div>
  );
}
