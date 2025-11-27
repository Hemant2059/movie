"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import Image from "next/image";
import { movie, tv } from "@/types/movie";
import { getImagePath } from "@/lib/data";
import { Badge } from "./ui/badge";

type Props = {
  movie?: movie;
  tv?: tv;
  mediaType: string;
};

const CardDetail = ({ movie, tv, mediaType }: Props) => {
  const imgPath =
    movie?.poster_path ||
    movie?.backdrop_path ||
    tv?.poster_path ||
    tv?.backdrop_path;

  if (!imgPath) return null;

  const img = getImagePath();
  const href = mediaType === "Movie" ? "/movie/" : "/tv/";

  return (
    <Link
      href={`${href}${movie?.id || tv?.id}-${(movie?.title || tv?.name)
        ?.toLowerCase()
        .trim()
        .replace(/\s+/g, "-")}`}
      className="relative rounded-lg overflow-hidden shadow-lg w-full h-auto"
    >
      <Image
        className="w-full h-64 object-cover"
        src={`${img}${imgPath}`}
        alt={
          movie?.title ||
          movie?.original_title ||
          movie?.name ||
          movie?.original_name ||
          tv?.name ||
          tv?.original_name ||
          "Poster Image"
        }
        width={200}
        height={200}
      />
      <div className="p-4">
        <h3 className="text-md font-semibold py-1">
          {movie?.title ||
            movie?.original_title ||
            movie?.name ||
            movie?.original_name ||
            tv?.name ||
            tv?.original_name ||
            "Title"}
        </h3>
        <div className="flex justify-between items-center">
          <div>
            <span className="text-gray-500 text-sm">
              {movie?.release_date?.split("-")[0] ||
                tv?.first_air_date?.split("-")[0] ||
                "N/A"}
            </span>
            <span className="px-1">.</span>
            <span className="text-gray-500 text-sm ">
              {(movie?.vote_average || tv?.vote_average)?.toFixed(1) || "N/A"}
            </span>
          </div>
          <Button variant={"outline"} className="px-2">
            {mediaType}
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default CardDetail;
