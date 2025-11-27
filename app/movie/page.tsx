"use client";
import getSearchMovieData from "@/action/movie";
import CardDetail from "@/components/card-details";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupButton,
} from "@/components/ui/input-group";
import { movie } from "@/types/movie";
import React, { useEffect, useState } from "react";

const MoviePage = () => {
  const [state, setState] = useState<{
    movies: movie[];
    query: string;
    page: number;
    total_pages: number;
  }>({ movies: [], query: "", page: 1, total_pages: 1 });

  const [isPending, setIsPending] = useState(false);

  // Fetch default movies on mount
  useEffect(() => {
    const fetchDefaultMovies = async () => {
      setIsPending(true);
      const data = await getSearchMovieData(undefined, new FormData());
      setState({
        movies: data.movies || [],
        query: "",
        page: 1,
        total_pages: data.total_pages || 1,
      });
      setIsPending(false);
    };
    fetchDefaultMovies();
  }, []);

  const fetchMovies = async (query: string, page: number) => {
    const formData = new FormData();
    formData.append("query", query);
    formData.append("page", page.toString());
    setIsPending(true);

    const data = await getSearchMovieData(undefined, formData);

    setState((prev) => ({
      movies: data.movies || [],
      query,
      page,
      total_pages: data.total_pages || prev.total_pages || 1,
    }));

    setIsPending(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchMovies(state.query, 1);
  };

  const renderPagination = () => {
    const { page, total_pages, query } = state;
    if (total_pages <= 1) return null;

    // Cap total pages to 100
    const maxPages = Math.min(total_pages, 100);

    const items: React.ReactNode[] = [];
    const delta = 2; // current ±2 pages

    for (let i = 1; i <= maxPages; i++) {
      // Always show first and last page
      if (i === 1 || i === maxPages) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === page}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                fetchMovies(query, i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
        continue;
      }

      // Show current ± delta pages
      if (i >= page - delta && i <= page + delta) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink
              href="#"
              isActive={i === page}
              onClick={(e: React.MouseEvent) => {
                e.preventDefault();
                fetchMovies(query, i);
              }}
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
        continue;
      }

      // Ellipses for skipped pages
      if (
        (i === 2 && page - delta > 2) ||
        (i === maxPages - 1 && page + delta < maxPages - 1)
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
          <PaginationPrevious
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (page > 1 && !isPending) fetchMovies(query, page - 1);
            }}
            aria-disabled={page === 1 || isPending}
            tabIndex={page === 1 || isPending ? -1 : 0}
            className={
              page === 1 || isPending ? "pointer-events-none opacity-50" : ""
            }
          />
          {items}
          <PaginationNext
            href="#"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              if (page < maxPages && !isPending) fetchMovies(query, page + 1);
            }}
            aria-disabled={page === maxPages || isPending}
            tabIndex={page === maxPages || isPending ? -1 : 0}
            className={
              page === maxPages || isPending
                ? "pointer-events-none opacity-50"
                : ""
            }
          />
        </PaginationContent>
      </Pagination>
    );
  };

  return (
    <div className="p-4">
      <form
        className="p-4 flex items-center gap-2 max-w-xl mx-auto"
        onSubmit={handleSubmit}
      >
        <InputGroup>
          <InputGroupInput
            placeholder="Type to search..."
            name="query"
            value={state.query}
            onChange={(e) =>
              setState((prev) => ({ ...prev, query: e.target.value }))
            }
          />
          <InputGroupAddon align="inline-end">
            <InputGroupButton variant="secondary" type="submit">
              {isPending ? "Searching..." : "Search"}
            </InputGroupButton>
          </InputGroupAddon>
        </InputGroup>
      </form>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 2xl:grid-cols-8 3xl:grid-cols-10 gap-4 px-5 mt-4">
        {state.movies.map((movie: movie) => (
          <CardDetail key={movie.id} movie={movie} mediaType="Movie" />
        ))}
      </div>

      {/* Shadcn Pagination */}
      {renderPagination()}
    </div>
  );
};

export default MoviePage;
