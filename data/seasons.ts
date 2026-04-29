import { episodes } from "./episodes";
import { Season } from "../types/season";

export const seasons: Season[] = [
  {
    id: "1",
    title: "Season 1",
    status: "available",
    episodeIds: episodes.map((episode) => episode.id),
  },
  {
    id: "2",
    title: "Season 2",
    status: "comingSoon",
    episodeIds: [],
  },
];

export const getSeasonById = (id: string) =>
  seasons.find((season) => season.id === id);
