import SearchResultsList from "@/components/SearchResultsList";

export default async function SearchPage(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';

  return (
    <div>
      <h1 className="text-lg font-medium py-4">Search Results</h1>
      <SearchResultsList query={query} />
    </div>
  );
}
