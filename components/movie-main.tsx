"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { movieDetails, video } from "@/types/movie";
import { getImagePath } from "@/lib/data";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Play, Plus } from "lucide-react";
import TrailerButton from "./trailer-button";

interface MovieMainProps {
  movie: movieDetails;
  trailer: video;
  onPlayTrailer?: (trailer: video) => void;
  onAddToList?: () => void;
}

const MovieMain: React.FC<MovieMainProps> = ({
  movie,
  trailer,
  onAddToList,
}) => {
  // Memoize image paths to avoid recalculation
  const { imgPath, posterPath } = useMemo(
    () => ({
      imgPath: getImagePath(true),
      posterPath: getImagePath(),
    }),
    []
  );

  // Format rating if available
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : null;

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };
  console.log("Trailer in MovieMain:", trailer);

  return (
    <section className="relative w-full bg-black">
      {/* Backdrop Image */}
      <div className="relative w-full h-auto md:h-[75vh]">
        <Image
          src={`${imgPath}${movie.backdrop_path}`}
          alt={movie.title}
          fill
          className="object-cover brightness-[0.35]"
          priority
          sizes="100vw"
        />
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-linear-to-r from-black via-transparent to-transparent hidden sm:block" />
      </div>

      {/* Content Container */}
      <div className="relative md:absolute md:inset-0 w-full flex items-center justify-center md:justify-start px-4 sm:px-8 md:px-12 lg:px-20 py-12 sm:py-16 md:py-8">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center gap-6 sm:gap-8 md:gap-12 lg:gap-16">
          {/* Poster Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="shrink-0"
          >
            <div className="rounded-xl overflow-hidden shadow-2xl hover:shadow-3xl transition-shadow duration-300">
              <Image
                src={`${posterPath}${movie.poster_path}`}
                alt={movie.title}
                width={280}
                height={420}
                className="w-32 h-48 sm:w-48 sm:h-72 md:w-56 md:h-80 lg:w-80 lg:h-[480px] object-cover"
                sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, (max-width: 1024px) 224px, 320px"
                priority
              />
            </div>
          </motion.div>

          {/* Movie Information */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-6 text-center md:text-left"
          >
            {/* Title */}
            <motion.h1
              variants={itemVariants}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg leading-tight"
            >
              {movie.title}{" "}
              {movie.release_date
                ? `(${new Date(movie.release_date).getFullYear()})`
                : ""}
            </motion.h1>

            {/* Meta Info Row */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4 justify-center md:justify-start items-center text-sm sm:text-base text-zinc-300"
            >
              {rating && (
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400 font-semibold">★</span>
                  <span>{rating}/10</span>
                </div>
              )}
              {movie.release_date && <span>{movie.release_date}</span>}
              {movie.runtime && <span>{movie.runtime} min</span>}
            </motion.div>

            {/* Genres */}
            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-2 justify-center md:justify-start"
            >
              {movie.genres?.slice(0, 4).map((g) => (
                <span
                  key={g.id}
                  className="inline-block bg-primary/15 text-primary/90 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full border border-primary/30 hover:bg-primary/25 transition-colors"
                >
                  {g.name}
                </span>
              ))}
            </motion.div>

            {/* Overview */}
            {movie.overview && (
              <motion.p
                variants={itemVariants}
                className="text-zinc-200 text-xs sm:text-sm md:text-base lg:text-lg line-clamp-3 sm:line-clamp-4 leading-relaxed drop-shadow-md"
              >
                {movie.overview}
              </motion.p>
            )}

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start pt-4"
            >
              {trailer && (
                <div>
                  <TrailerButton
                    videoKey={trailer.key}
                    title={`${movie.title || movie.original_title} - Trailer`}
                  />
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MovieMain;
