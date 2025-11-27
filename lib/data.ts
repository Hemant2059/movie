async function fetchFromTmdb(
  url: URL,
  options?: {
    page?: number;
    language?: string;
    cacheTime?: number;
  }
) {
  const { page = 1, language = "en-US", cacheTime } = options || {};

  url.searchParams.set("language", language);
  url.searchParams.set("page", String(page));

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // default: 24h
    },
  };

  const res = await fetch(url.toString(), requestOptions);
  const data = await res.json();

  return data;
}
export async function getPopularMovie(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/popular");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getPopularTv(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/tv/popular");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getTrendingMovie(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/trending/movie/day");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getTopMovie(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/top_rated");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getTopTV(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/tv/top_rated");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getUpcomingMovie(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/movie/upcoming");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getUpcomingTV(page?: number, language?: string) {
  const url = new URL("https://api.themoviedb.org/3/tv/on_the_air");
  const data = await fetchFromTmdb(url, { page, language });
  return data.results;
}

export async function getMTvDetails(
  type: string,
  movie_id: number,
  language?: string
) {
  const url = new URL(`https://api.themoviedb.org/3/${type}/${movie_id}`);
  const data = await fetchFromTmdb(url, { language });
  return data;
}

export const getImagePath = (fullSize?: boolean) => {
  return `http://image.tmdb.org/t/p/${fullSize ? "original" : "w500"}/`;
};

export async function getMTvCredits(
  type: string,
  movie_id: number,
  language?: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/${type}/${movie_id}/credits`
  );
  const data = await fetchFromTmdb(url, { language });
  return data;
}

export async function getRecommendations(
  type: string,
  movie_id: number,
  language?: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/${type}/${movie_id}/recommendations`
  );
  const data = await fetchFromTmdb(url, { language });
  return data.results;
}

export async function getTrailer(
  type: string,
  movie_id: number,
  language?: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/${type}/${movie_id}/videos`
  );
  const data = await fetchFromTmdb(url, { language });
  return data.results;
}

export async function getWatchProviders(type: string, movie_id: number) {
  const url = new URL(
    `https://api.themoviedb.org/3/${type}/${movie_id}/watch/providers`
  );
  const data = await fetchFromTmdb(url);
  return data.results;
}

export async function searchMTv(
  query: string,
  page?: number,
  language?: string
) {
  const url = new URL("https://api.themoviedb.org/3/search/multi");
  url.searchParams.set("query", query);
  const data = await fetchFromTmdb(url, { page, language });
  return data;
}
export async function searchMovie(
  query: string,
  page?: number,
  language?: string
) {
  const url = new URL("https://api.themoviedb.org/3/search/movie");
  url.searchParams.set("query", query);
  const data = await fetchFromTmdb(url, { page, language });
  return data;
}
export async function searchTv(
  query: string,
  page?: number,
  language?: string
) {
  const url = new URL("https://api.themoviedb.org/3/search/tv");
  url.searchParams.set("query", query);
  const data = await fetchFromTmdb(url, { page, language });
  return data;
}

// for discover movie/tv with all filters
async function fetchFromTmdbDiscover(
  url: URL,
  options?: {
    page?: number;
    language?: string;
    with_genres?: string[];
    with_keywords?: string[];
    with_cast?: string[];
    with_crew?: string[];
    with_companies?: string[];
    with_people?: string[];
    sort_by?: string;
    include_adult?: boolean;
    include_video?: boolean;
    year?: number;
    primary_release_year?: number;
    primary_release_date_gte?: string;
    primary_release_date_lte?: string;
    release_date_gte?: string;
    release_date_lte?: string;
    vote_count_gte?: number;
    vote_count_lte?: number;
    vote_average_gte?: number;
    vote_average_lte?: number;
    region?: string;
    certification_country?: string;
    with_origin_country?: string;
    with_original_language?: string;
    with_watch_providers?: string[];
    cacheTime?: number;
  }
) {
  const { page = 1, language = "en-US", cacheTime } = options || {};

  url.searchParams.set("language", language);
  url.searchParams.set("page", String(page));

  // Set other filters
  if (options) {
    Object.entries(options).forEach(([key, value]) => {
      if (
        value !== undefined &&
        key !== "page" &&
        key !== "language" &&
        key !== "cacheTime"
      ) {
        if (Array.isArray(value)) {
          url.searchParams.set(key, value.join(","));
        } else {
          url.searchParams.set(key, String(value));
        }
      }
    });
  }

  const requestOptions: RequestInit = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${process.env.TMDB_API_KEY}`,
    },
    next: {
      revalidate: cacheTime || 60 * 60 * 24, // default: 24h
    },
  };

  const res = await fetch(url.toString(), requestOptions);
  const data = await res.json();

  return data;
}

export async function getDiscoverMovie(options?: {
  page?: number;
  language?: string;
  with_genres?: string[];
  with_keywords?: string[];
  with_cast?: string[];
  with_crew?: string[];
  with_companies?: string[];
  with_people?: string[];
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  year?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  vote_count_gte?: number;
  vote_count_lte?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  region?: string;
  certification_country?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_watch_providers?: string[];
  cacheTime?: number;
}) {
  const url = new URL("https://api.themoviedb.org/3/discover/movie");
  const data = await fetchFromTmdbDiscover(url, options);
  return data;
}

export async function getDiscoverTV(options?: {
  page?: number;
  language?: string;
  with_genres?: string[];
  with_keywords?: string[];
  with_cast?: string[];
  with_crew?: string[];
  with_companies?: string[];
  with_people?: string[];
  sort_by?: string;
  include_adult?: boolean;
  include_video?: boolean;
  year?: number;
  primary_release_year?: number;
  primary_release_date_gte?: string;
  primary_release_date_lte?: string;
  release_date_gte?: string;
  release_date_lte?: string;
  vote_count_gte?: number;
  vote_count_lte?: number;
  vote_average_gte?: number;
  vote_average_lte?: number;
  region?: string;
  certification_country?: string;
  with_origin_country?: string;
  with_original_language?: string;
  with_watch_providers?: string[];
  cacheTime?: number;
}) {
  const url = new URL("https://api.themoviedb.org/3/discover/tv");
  const data = await fetchFromTmdbDiscover(url, options);
  return data;
}

export async function getSeasonDetails(
  tv_id: number,
  season_number: number,
  language?: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}`
  );
  const data = await fetchFromTmdb(url, { language });
  return data;
}

export async function getSeasonTailer(
  tv_id: number,
  season_number: number,
  language?: string
) {
  const url = new URL(
    `https://api.themoviedb.org/3/tv/${tv_id}/season/${season_number}/videos`
  );
  const data = await fetchFromTmdb(url, { language });
  return data;
}
