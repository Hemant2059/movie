import CardDetail from "@/components/card-details";
import { searchMTv } from "@/lib/data";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import React from "react";

// app/search/page.tsx
export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}) {
  // Unwrap searchParams
  const params = searchParams ? await searchParams : {};
  const query = typeof params?.query === "string" ? params.query : "";
  const page = params?.page ? parseInt(params.page as string, 10) : 1;

  // Fetch data
  const data = await searchMTv(query, page);

  // Normalize API response
  const results: any[] = Array.isArray(data) ? data : data?.results || [];
  const totalPages: number = data?.total_pages || 1;

  // Pagination rendering with ellipsis
  const renderPagination = () => {
    if (!query || totalPages <= 1) return null;

    const items: React.ReactNode[] = [];

    for (let i = 1; i <= totalPages; i++) {
      // Show first, last, and current ±1
      if (i === 1 || i === totalPages || (i >= page - 1 && i <= page + 1)) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href={`/search?query=${encodeURIComponent(query)}&page=${i}`}
              isActive={i === page}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
      // Ellipsis for skipped pages
      else if (
        (i === 2 && page > 3) ||
        (i === totalPages - 1 && page < totalPages - 2)
      ) {
        items.push(
          <PaginationItem key={`ellipsis-${i}`}>
            <PaginationEllipsis />
          </PaginationItem>
        );
      }
    }

    return (
      <Pagination className="mt-6 flex justify-center">
        <PaginationContent>
          {/* Previous */}
          <PaginationPrevious
            href={
              page > 1
                ? `/search?query=${encodeURIComponent(query)}&page=${page - 1}`
                : undefined
            }
          />

          {/* Page numbers */}
          {items}

          {/* Next */}
          <PaginationNext
            href={
              page < totalPages
                ? `/search?query=${encodeURIComponent(query)}&page=${page + 1}`
                : undefined
            }
          />
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="p-4">
      {query ? (
        <p className="mb-4">
          Showing results for: <strong>{query}</strong>
        </p>
      ) : (
        <p className="mb-4">No search query provided.</p>
      )}

      {results.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-10 gap-4 px-5 mt-4">
            {results.map((item: any) => (
              <CardDetail
                key={item.id}
                movie={item.media_type === "movie" ? item : undefined}
                tv={item.media_type === "tv" ? item : undefined}
                mediaType={item.media_type === "movie" ? "Movie" : "Tv Show"}
              />
            ))}
          </div>

          {/* Pagination */}
          {renderPagination()}
        </>
      ) : query ? (
        <p className="mt-4">No results found.</p>
      ) : null}
    </div>
  );
}
