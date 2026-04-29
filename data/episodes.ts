import { Lesson, LessonStep } from "../types/lesson";

const createTemplateSteps = (): LessonStep[] => [
  {
    id: "step-1",
    title: "Step 1: Watch Video",
    subtitle: "Tap the green check when video time is done.",
    type: "video",
  },
  {
    id: "step-2",
    title: "Step 2: Look at the Picture",
    subtitle: "Tap next to continue.",
    type: "image",
    imageEmoji: "🦁",
  },
  {
    id: "step-3",
    title: "Step 3: Border Puzzle",
    subtitle: "Draw the right walls.",
    type: "borderPuzzle",
    borderPuzzle: {
      size: 3,
      animals: [
        { row: 0, col: 0, emoji: "🐶" },
        { row: 0, col: 2, emoji: "🐱" },
        { row: 2, col: 0, emoji: "🦊" },
        { row: 2, col: 2, emoji: "🐰" },
      ],
      // Border ids use "r-c-R" (right edge) or "r-c-B" (bottom edge).
      correctBorders: ["0-0-R", "0-1-B", "1-1-R", "1-0-B"],
    },
  },
  {
    id: "step-4",
    title: "Step 4: Path Puzzle",
    subtitle: "Create a path from A to B.",
    type: "pathPuzzle",
    pathPuzzle: {
      size: 5,
      start: { row: 0, col: 0 },
      end: { row: 4, col: 4 },
      obstacles: [
        { row: 1, col: 1 },
        { row: 1, col: 3 },
        { row: 2, col: 3 },
        { row: 3, col: 1 },
      ],
      correctPath: [
        { row: 0, col: 0 },
        { row: 0, col: 1 },
        { row: 0, col: 2 },
        { row: 1, col: 2 },
        { row: 2, col: 2 },
        { row: 3, col: 2 },
        { row: 4, col: 2 },
        { row: 4, col: 3 },
        { row: 4, col: 4 },
      ],
    },
  },
  {
    id: "step-5",
    title: "Step 5: Great Job!",
    subtitle: "You finished this episode!",
    type: "success",
  },
];

const createEpisode = (episodeNumber: number): Lesson => ({
  id: String(episodeNumber),
  title: `Episode ${episodeNumber}`,
  description: "Play and learn with fun puzzles.",
  color: "#D9F7FA",
  // Each episode gets its own step objects so you can customize later.
  steps: createTemplateSteps(),
});

export const episodes: Lesson[] = Array.from({ length: 17 }, (_, index) =>
  createEpisode(index + 1),
);

export const getEpisodeById = (id: string) =>
  episodes.find((episode) => episode.id === id);
