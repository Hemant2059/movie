import { Button } from "./ui/button";
import { movie, tv } from "@/types/movie";
import ShowCard from "./show-card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
type Props = {
  movie: movie[];
  tv: tv[];
  title: string;
};

const ShowMoTV = ({ movie, tv, title }: Props) => {
  return (
    <div className="">
      <Tabs defaultValue="movies">
        <div className="flex justify-between p-4">
          <h1 className="font-semibold text-xl md:text-4xl">{title}</h1>
          <div>
            <TabsList>
              <TabsTrigger value="movies">Movies</TabsTrigger>
              <TabsTrigger value="tv">TV Shows</TabsTrigger>
            </TabsList>
          </div>
        </div>

        {/* Movies Content */}
        <TabsContent value="movies">
          <ShowCard movies={movie} mediaType="Movie" />
        </TabsContent>

        {/* TV Content */}
        <TabsContent value="tv">
          <ShowCard tvs={tv} mediaType="TV Show" />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ShowMoTV;
