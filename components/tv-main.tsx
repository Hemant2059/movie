"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { getImagePath } from "@/lib/data";
import { motion } from "framer-motion";
import TrailerButton from "./trailer-button";
import { tvDetails, video } from "@/types/movie";

interface TvMainProps {
  tv: tvDetails; // still using tvDetails type for TMDB API response
  trailer?: video;
}

const TvMain: React.FC<TvMainProps> = ({ tv, trailer }) => {
  const { imgPath, posterPath } = useMemo(
    () => ({
      imgPath: getImagePath(true),
      posterPath: getImagePath(),
    }),
    []
  );

  const rating = tv.vote_average ? tv.vote_average.toFixed(1) : null;

  return (
    <section className="relative w-full bg-black">
      {/* Backdrop */}
      <div className="relative w-full h-auto md:h-[75vh]">
        {tv.backdrop_path && (
          <Image
            src={`${imgPath}${tv.backdrop_path}`}
            alt={tv.name || tv.original_name}
            fill
            className="object-cover brightness-[0.35]"
            priority
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Content */}
      <div className="relative md:absolute md:inset-0 w-full flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Poster */}
          {tv.poster_path && (
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="shrink-0 rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300"
            >
              <Image
                src={`${posterPath}${tv.poster_path}`}
                alt={tv.name || tv.original_name}
                width={280}
                height={420}
                className="w-32 h-48 sm:w-48 sm:h-72 md:w-56 md:h-80 lg:w-80 lg:h-[480px] object-cover"
                priority
              />
            </motion.div>
          )}

          {/* Info */}
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight">
              {tv.name || tv.original_name}{" "}
              {tv.first_air_date
                ? `(${new Date(tv.first_air_date).getFullYear()})`
                : ""}
            </h1>

            <div className="flex flex-wrap gap-4 justify-center md:justify-start items-center text-sm sm:text-base text-zinc-300">
              {rating && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">★</span>
                  <span>{rating}/10</span>
                </div>
              )}
              {tv.first_air_date && <span>{tv.first_air_date}</span>}
              {tv.episode_run_time?.length > 0 && (
                <span>{tv.episode_run_time[0]} min/episode</span>
              )}
            </div>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {tv.genres?.slice(0, 4).map((g) => (
                <span
                  key={g.id}
                  className="inline-block bg-primary/15 text-primary/90 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border border-primary/30 hover:bg-primary/25 transition-colors"
                >
                  {g.name}
                </span>
              ))}
            </div>

            {tv.overview && (
              <p className="text-zinc-200 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-3 sm:line-clamp-4 leading-relaxed drop-shadow-md">
                {tv.overview}
              </p>
            )}

            {trailer && (
              <div className="flex justify-center md:justify-start pt-4">
                <TrailerButton
                  videoKey={trailer.key}
                  title={`${tv.name || tv.original_name} - Trailer`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TvMain;
