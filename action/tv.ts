"use server";

import { getDiscoverTV, searchTv } from "@/lib/data";

export default async function getSearchTvData(
  initial: any,
  formData: FormData
) {
  const query = formData.get("query")?.toString() || "";
  const page = Number(formData.get("page") || 1);

  let tvRaw;
  if (query) {
    tvRaw = await searchTv(query, page);
  } else {
    tvRaw = await getDiscoverTV({ page }); // default movies
  }

  const tvs = tvRaw.results;

  return {
    tvs,
    query,
    page,
    total_pages: tvRaw.total_pages,
  };
}
