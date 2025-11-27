"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Play, Info } from "lucide-react";
import { movie } from "@/types/movie";
import { getImagePath } from "@/lib/data";

interface HeroCarouselProps {
  data: movie[];
}

export default function CarouselPlugin({ data }: HeroCarouselProps) {
  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );
  const img = getImagePath(true);

  return (
    <Carousel
      opts={{
        loop: true,
      }}
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {data.map((item) => (
          <CarouselItem key={item.id}>
            <div className="relative h-[50vh] w-full md:h-[70vh]">
              <Image
                src={`${img}${item.backdrop_path || item.poster_path}`}
                alt={item.title || item.name || "Media"}
                fill
                className="object-cover brightness-50"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 w-full p-6 md:p-12 lg:p-16">
                <div className="container mx-auto space-y-4">
                  <Badge variant="secondary" className="mb-2">
                    Trending
                  </Badge>
                  <h2 className="max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
                    {item.title || item.name}
                  </h2>
                  <p className="line-clamp-3 max-w-2xl text-base text-zinc-200 md:text-lg">
                    {item.overview}
                  </p>
                  <div className="flex gap-4 pt-4">
                    <Button size="lg" className="gap-2">
                      <Play className="h-5 w-5" /> Watch Trailer
                    </Button>
                    <Button
                      size="lg"
                      variant="secondary"
                      asChild
                      className="gap-2"
                    >
                      <Link href={`/${item.media_type || "movie"}/${item.id}`}>
                        <Info className="h-5 w-5" /> More Info
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-4 hidden md:flex" />
      <CarouselNext className="right-4 hidden md:flex" />
    </Carousel>
  );
}
