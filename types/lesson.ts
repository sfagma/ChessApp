export type StepType =
  | "video"
  | "image"
  | "borderPuzzle"
  | "pathPuzzle"
  | "success";

export type GridCell = {
  row: number;
  col: number;
};

export type AnimalPlacement = GridCell & {
  emoji: string;
};

export type BorderPuzzleData = {
  size: number;
  animals: AnimalPlacement[];
  correctBorders: string[];
};

export type PathPuzzleData = {
  size: number;
  start: GridCell;
  end: GridCell;
  obstacles: GridCell[];
  correctPath: GridCell[];
};

export type LessonStep = {
  id: string;
  title: string;
  type: StepType;
  subtitle?: string;
  imageEmoji?: string;
  borderPuzzle?: BorderPuzzleData;
  pathPuzzle?: PathPuzzleData;
};

export type Lesson = {
  id: string;
  title: string;
  description: string;
  color: string;
  steps: LessonStep[];
};
