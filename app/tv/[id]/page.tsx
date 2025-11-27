import { Separator } from "@/components/ui/separator";
import {
  getImagePath,
  getMTvCredits,
  getMTvDetails,
  getTrailer,
} from "@/lib/data";
import { credits, video } from "@/types/movie";
import MovieMain from "@/components/movie-main";
import CastCard from "@/components/cast-card";
import InfoCard from "@/components/info-card";
import TvMain from "@/components/tv-main";
import Image from "next/image";
import Link from "next/link";

interface TvPageProps {
  params: Promise<{ id: string }>;
}

export default async function TvShowPage({ params }: TvPageProps) {
  const { id } = await params;

  const [tvShow, credits, videos] = await Promise.all([
    getMTvDetails("tv", parseInt(id)),
    getMTvCredits("tv", parseInt(id)),
    getTrailer("tv", parseInt(id)),
  ]);

  const trailer =
    videos && (videos.find((v: video) => v.type === "Trailer") || videos[0]);

  if (!tvShow) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-zinc-400">TV Show not found.</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <TvMain tv={tvShow} trailer={trailer} />
      {/* Seasons Section */}
      {tvShow.seasons && tvShow.seasons.length > 0 && (
        <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Seasons</h2>
            <div className="overflow-x-auto pb-4 -mx-4 sm:-mx-8 md:-mx-12 lg:-mx-20 px-4 sm:px-8 md:px-12 lg:px-20">
              <div className="flex gap-4 min-w-min">
                {tvShow.seasons.map((season: any) => (
                  <Link
                    key={season.id}
                    href={`/tv/${tvShow.id}-${tvShow.name
                      ?.toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-")}/season/${season.season_number}`}
                    className="relative shrink-0 w-40 h-56 rounded-lg overflow-hidden border border-zinc-800 hover:border-primary/50 transition-colors cursor-pointer group"
                  >
                    {/* Poster */}
                    {season.poster_path ? (
                      <Image
                        src={`${getImagePath()}${season.poster_path}`}
                        alt={season.name}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="bg-zinc-700 w-full h-full flex items-center justify-center text-zinc-400 text-sm">
                        No Image
                      </div>
                    )}

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity p-2 flex flex-col justify-end">
                      <h3 className="text-white font-semibold text-sm mb-1 truncate">
                        {season.name}
                      </h3>
                      <p className="text-zinc-300 text-xs mb-1 truncate">
                        {season.overview || "No description available."}
                      </p>
                      <div className="flex justify-between text-zinc-400 text-xs">
                        <span>Episodes: {season.episode_count}</span>
                        {season.vote_average && (
                          <span>⭐ {season.vote_average.toFixed(1)}</span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TV Show Details Section */}
      <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tvShow.tagline && (
              <div className="lg:col-span-3">
                <p className="text-lg italic text-primary/80">
                  "{tvShow.tagline}"
                </p>
              </div>
            )}

            {tvShow.first_air_date && (
              <InfoCard
                label="First Air Date"
                value={formatDate(tvShow.first_air_date)}
              />
            )}

            {tvShow.last_air_date && (
              <InfoCard
                label="Last Air Date"
                value={formatDate(tvShow.last_air_date)}
              />
            )}

            {tvShow.number_of_seasons && (
              <InfoCard
                label="Seasons"
                value={tvShow.number_of_seasons.toString()}
              />
            )}

            {tvShow.number_of_episodes && (
              <InfoCard
                label="Episodes"
                value={tvShow.number_of_episodes.toString()}
              />
            )}

            {tvShow.status && <InfoCard label="Status" value={tvShow.status} />}

            {tvShow.spoken_languages && tvShow.spoken_languages.length > 0 && (
              <InfoCard
                label="Languages"
                value={tvShow.spoken_languages
                  .map((lang: any) => lang.english_name)
                  .join(", ")}
              />
            )}

            {tvShow.production_companies &&
              tvShow.production_companies.length > 0 && (
                <InfoCard
                  label="Production Companies"
                  value={tvShow.production_companies
                    .map((comp: any) => comp.name)
                    .join(", ")}
                />
              )}

            {tvShow.origin_country && tvShow.origin_country.length > 0 && (
              <InfoCard
                label="Country"
                value={tvShow.origin_country.join(", ")}
              />
            )}

            {tvShow.original_language && (
              <InfoCard
                label="Original Language"
                value={tvShow.original_language.toUpperCase()}
              />
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

/** Format date for display */
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
