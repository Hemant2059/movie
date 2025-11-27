import React from "react";
import { movie, tv } from "@/types/movie";
import CardDetail from "./card-details";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

type Props = {
  movies?: movie[];
  tvs?: tv[];
  mediaType: string;
};

const ShowCard = ({ movies, tvs, mediaType }: Props) => {
  return (
    <ScrollArea className="w-full whitespace-nowrap px-5">
      <div className="flex gap-4 py-3">
        {movies?.map((movie) => (
          <CardDetail key={movie.id} movie={movie} mediaType={mediaType} />
        ))}

        {tvs?.map((tv) => (
          <CardDetail key={tv.id} tv={tv} mediaType={mediaType} />
        ))}
      </div>

      {/* horizontal scrollbar */}
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default ShowCard;
