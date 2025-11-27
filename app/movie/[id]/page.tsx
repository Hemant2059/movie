import { Separator } from "@/components/ui/separator";
import {
  getImagePath,
  getMTvCredits,
  getMTvDetails,
  getTrailer,
} from "@/lib/data";
import { credits, video } from "@/types/movie";
import MovieMain from "@/components/movie-main";
import Image from "next/image";
import CastCard from "@/components/cast-card";
import InfoCard from "@/components/info-card";

interface MoviePageProps {
  params: Promise<{ id: string }>;
}

export default async function MoviePage({ params }: MoviePageProps) {
  const { id } = await params;

  const [movie, credits, videos] = await Promise.all([
    getMTvDetails("movie", parseInt(id)),
    getMTvCredits("movie", parseInt(id)),
    getTrailer("movie", parseInt(id)),
  ]);

  const trailer = videos.find((v: video) => v.type === "Trailer") || videos[0];

  if (!movie) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-zinc-400">Movie not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full ">
      {/* Hero Section */}
      <MovieMain movie={movie} trailer={trailer} />

      {/* Movie Details Section */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Tagline */}
            {movie.tagline && (
              <div className="lg:col-span-3">
                <p className="text-lg italic text-primary/80">
                  "{movie.tagline}"
                </p>
              </div>
            )}

            {/* Release Info */}
            {movie.release_date && (
              <InfoCard
                label="Release Date"
                value={formatDate(movie.release_date)}
              />
            )}

            {movie.runtime && (
              <InfoCard label="Runtime" value={`${movie.runtime} minutes`} />
            )}

            {/* Financial Info - Only show if greater than 0 */}
            {movie.budget > 0 && (
              <InfoCard label="Budget" value={formatCurrency(movie.budget)} />
            )}
            {movie.revenue > 0 && (
              <InfoCard label="Revenue" value={formatCurrency(movie.revenue)} />
            )}

            {movie.status && <InfoCard label="Status" value={movie.status} />}

            {/* Languages */}
            {movie.spoken_languages && movie.spoken_languages.length > 0 && (
              <InfoCard
                label="Languages"
                value={movie.spoken_languages
                  .map((lang: any) => lang.english_name)
                  .join(", ")}
              />
            )}

            {/* Production Companies */}
            {movie.production_companies &&
              movie.production_companies.length > 0 && (
                <InfoCard
                  label="Production Companies"
                  value={movie.production_companies
                    .map((comp: any) => comp.name)
                    .join(", ")}
                />
              )}

            {/* Origin Country */}
            {movie.origin_country && movie.origin_country.length > 0 && (
              <InfoCard
                label="Country"
                value={movie.origin_country.join(", ")}
              />
            )}

            {/* Original Language */}
            {movie.original_language && (
              <InfoCard
                label="Original Language"
                value={movie.original_language.toUpperCase()}
              />
            )}

            {/* Original Title */}
            {movie.original_title && movie.original_title !== movie.title && (
              <InfoCard label="Original Title" value={movie.original_title} />
            )}

            {/* Collection */}
            {movie.belongs_to_collection && (
              <div className="lg:col-span-3 mt-4 p-4 rounded-lg border border-zinc-800 hover:border-primary/50 transition-colors">
                <p className="text-sm font-semibold text-zinc-400 uppercase tracking-wide mb-3">
                  Part of Collection
                </p>
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                  {movie.belongs_to_collection.poster_path && (
                    <img
                      src={`${getImagePath()}${
                        movie.belongs_to_collection.poster_path
                      }`}
                      alt={movie.belongs_to_collection.name}
                      className="w-16 h-24 rounded object-cover"
                    />
                  )}
                  <div className="flex-1">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-1">
                      {movie.belongs_to_collection.name}
                    </h3>
                    <p className="text-sm text-zinc-400">
                      This movie is part of a collection
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <Separator className="my-8" />

        {/* Cast Section */}
        {credits?.cast && credits.cast.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold my-6">Crew</h3>
            <div className="flex gap-4 overflow-x-auto">
              {credits.crew.map((c: any, i: number) => (
                <CastCard key={i} member={c} />
              ))}
            </div>
          </section>
        )}

        {/* Crew Section */}
        {credits?.crew && credits.crew.length > 0 && (
          <section>
            <h3 className="text-2xl font-bold my-6">Crew</h3>
            <div className="flex gap-4 overflow-x-auto">
              {credits.crew.map((c: any, i: number) => (
                <CastCard key={i} member={c} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

/**
 * Format currency to readable format
 */
function formatCurrency(value: number): string {
  if (!value || value === 0) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/**
 * Format date to readable format
 */
function formatDate(dateString: string): string {
  try {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return dateString;
  }
}
