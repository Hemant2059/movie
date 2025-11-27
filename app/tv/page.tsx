"use client";
import getSearchTvData from "@/action/tv";
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
import { tv } from "@/types/movie";
import React, { useEffect, useState } from "react";

const TvPage = () => {
  const [state, setState] = useState<{
    tvs: tv[];
    query: string;
    page: number;
    total_pages: number;
  }>({ tvs: [], query: "", page: 1, total_pages: 1 });

  const [isPending, setIsPending] = useState(false);

  // Fetch default TV shows on mount
  useEffect(() => {
    const fetchDefaultTv = async () => {
      setIsPending(true);
      const data = await getSearchTvData(undefined, new FormData());
      setState({
        tvs: data.tvs || [],
        query: "",
        page: 1,
        total_pages: data.total_pages || 1,
      });
      setIsPending(false);
    };
    fetchDefaultTv();
  }, []);

  const fetchTv = async (query: string, page: number) => {
    const formData = new FormData();
    formData.append("query", query);
    formData.append("page", page.toString());
    setIsPending(true);

    const data = await getSearchTvData(undefined, formData);

    setState((prev) => ({
      tvs: data.tvs || [],
      query,
      page,
      total_pages: data.total_pages || prev.total_pages || 1,
    }));

    setIsPending(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetchTv(state.query, 1);
  };

  // Shadcn Pagination for TV
  const renderPagination = () => {
    const { page, total_pages, query } = state;
    if (total_pages <= 1) return null;

    const maxPages = Math.min(total_pages, 100);
    const items: React.ReactNode[] = [];
    const delta = 2; // show current ±2 pages

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
                fetchTv(query, i);
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
                fetchTv(query, i);
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
              if (page > 1 && !isPending) fetchTv(query, page - 1);
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
              if (page < maxPages && !isPending) fetchTv(query, page + 1);
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
        {state.tvs.map((tv: tv) => (
          <CardDetail key={tv.id} tv={tv} mediaType="Tv Show" />
        ))}
      </div>

      {/* Shadcn Pagination */}
      {renderPagination()}
    </div>
  );
};

export default TvPage;
