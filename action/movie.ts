"use server";

import { getDiscoverMovie, searchMovie } from "@/lib/data";

export default async function getSearchMovieData(
  initial: any,
  formData: FormData
) {
  const query = formData.get("query")?.toString() || "";
  const page = Number(formData.get("page") || 1);

  let moviesRaw;
  if (query) {
    moviesRaw = await searchMovie(query, page);
  } else {
    moviesRaw = await getDiscoverMovie({ page }); // default movies
  }
  const movies = moviesRaw.results;

  return {
    movies,
    query,
    page,
    total_pages: moviesRaw.total_pages,
  };
}
