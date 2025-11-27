import CarouselPlugin from "@/components/movie-carousel";
import ShowMoTV from "@/components/show-mtv";
import {
  getPopularMovie,
  getPopularTv,
  getTopMovie,
  getTopTV,
  getTrendingMovie,
  getUpcomingMovie,
  getUpcomingTV,
} from "@/lib/data";

export default async function Home() {
  // --- Fetch all data from TMDB ---
  const TrendingMovies = await getTrendingMovie();
  const PopularMovies = await getPopularMovie();
  const PopularTV = await getPopularTv();
  const TopMovies = await getTopMovie();
  const TopTV = await getTopTV();
  const UpcomingMovies = await getUpcomingMovie();
  const UpcomingTV = await getUpcomingTV();

  return (
    <main>
      {/* 1️⃣ Trending Carousel */}
      <section>
        <CarouselPlugin data={TrendingMovies} />
      </section>
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* 2️⃣ Trending Movies / TV Tabs */}
        <section>
          <ShowMoTV movie={PopularMovies} tv={PopularTV} title="Trending" />
        </section>

        {/* 3️⃣ Top Rated Movies / TV Tabs */}
        <section>
          <ShowMoTV movie={TopMovies} tv={TopTV} title="Top Rated" />
        </section>

        {/* 4️⃣ Upcoming Movies / TV Tabs */}
        <section>
          <ShowMoTV movie={UpcomingMovies} tv={UpcomingTV} title="Upcoming" />
        </section>
      </div>
    </main>
  );
}
