import CastCard from "@/components/cast-card";
import TrailerButton from "@/components/trailer-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { getImagePath, getSeasonDetails, getSeasonTailer } from "@/lib/data";
import { video } from "@/types/movie";
import { get } from "http";
import Image from "next/image";

interface SeasonPageProps {
  params: { id: string; seasonno: string };
}

export default async function SeasonPage({ params }: SeasonPageProps) {
  const { id, seasonno } = await params;
  const tvIdNum = parseInt(id, 10);
  const seasonNum = parseInt(seasonno, 10);

  const seasonDetails = await getSeasonDetails(tvIdNum, seasonNum);
  const { poster_path, name, air_date, vote_average, overview, episodes } =
    seasonDetails;

  const tailerData = await getSeasonTailer(tvIdNum, seasonNum);
  const tailer =
    (tailerData &&
      tailerData.results.find(
        (v: video) => v.type === "Trailer" || v.type === "Teaser"
      )) ||
    tailerData[0];

  if (!seasonDetails) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-xl text-zinc-400">TV Show not found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Season Header */}
      <div className="flex flex-col md:flex-row gap-4 p-6 items-start">
        <Image
          src={`${getImagePath()}${poster_path}`}
          alt={name}
          width={150}
          height={150}
          className="object-cover rounded-lg group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            {name} ({air_date.split("-")[0]})
            <Badge>{vote_average.toFixed(2)}</Badge>
          </h1>
          <p className="text-sm font-semibold mt-4">
            {episodes.length} Episodes * {seasonDetails.air_date}
          </p>
          <p className="mt-4">{overview}</p>
          <div>
            {tailer && (
              <div className="flex justify-center md:justify-start pt-4">
                <TrailerButton
                  videoKey={tailer.key}
                  title={`${seasonDetails.name} - Trailer`}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Episodes Accordion */}
      <Accordion type="single" collapsible className="space-y-4 px-4">
        {episodes.map((episode: any) => {
          const {
            id,
            episode_number,
            name: epName,
            vote_average: epVote,
            episode_type,
            air_date: epAir,
            runtime,
            overview: epOverview,
            still_path,
            crew,
            guest_stars,
          } = episode;

          return (
            <AccordionItem key={id} value={`episode-${id}`}>
              <AccordionTrigger className="flex gap-4 items-center no-underline hover:no-underline focus:no-underline">
                <div className="flex gap-4 items-center">
                  <Image
                    src={`${getImagePath()}${still_path}`}
                    alt={epName}
                    width={100}
                    height={100}
                    className="object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <div className="flex flex-col">
                    <div className="flex gap-2 items-center">
                      <span className="font-bold text-sm md:text-lg">
                        {episode_number}
                      </span>
                      <h2 className="text-sm md:text-lg font-semibold">
                        {epName}
                      </h2>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mt-1 text-xs md:text-md">
                      <Badge>{epVote.toFixed(2)}</Badge>
                      {episode_type !== "standard" && (
                        <Badge>{episode_type}</Badge>
                      )}
                      <span>
                        {epAir} • {runtime}m
                      </span>
                    </div>
                    <p className="mt-1 text-xs md:text-lg">{epOverview}</p>
                  </div>
                </div>
              </AccordionTrigger>

              <AccordionContent>
                <div className="space-y-6 mt-4">
                  {crew?.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-4">Crew</h3>
                      <div className="flex gap-4 overflow-x-auto">
                        {crew.map((c: any, i: number) => (
                          <CastCard key={i} member={c} />
                        ))}
                      </div>
                    </section>
                  )}
                  {guest_stars?.length > 0 && (
                    <section>
                      <h3 className="text-2xl font-bold mb-4">Guest Stars</h3>
                      <div className="flex gap-4 overflow-x-auto">
                        {guest_stars.map((c: any, i: number) => (
                          <CastCard key={i} member={c} />
                        ))}
                      </div>
                    </section>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
