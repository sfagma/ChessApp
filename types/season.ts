export type SeasonStatus = "available" | "comingSoon";

export type Season = {
  id: string;
  title: string;
  status: SeasonStatus;
  episodeIds: string[];
};
