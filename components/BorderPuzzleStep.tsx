import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";
import { BorderPuzzleData } from "../types/lesson";

type Props = {
  puzzle: BorderPuzzleData;
  onSolved: () => void;
};

type BorderEdge = {
  id: string;
  row: number;
  col: number;
  direction: "R" | "B";
};

export default function BorderPuzzleStep({ puzzle, onSolved }: Props) {
  const [selectedBorders, setSelectedBorders] = useState<string[]>([]);
  const [feedback, setFeedback] = useState("");

  const cellSize = 80;
  const boardSize = puzzle.size * cellSize;

  const edges = useMemo(() => {
    const allEdges: BorderEdge[] = [];

    for (let row = 0; row < puzzle.size; row++) {
      for (let col = 0; col < puzzle.size; col++) {
        if (col < puzzle.size - 1) {
          allEdges.push({ id: `${row}-${col}-R`, row, col, direction: "R" });
        }
        if (row < puzzle.size - 1) {
          allEdges.push({ id: `${row}-${col}-B`, row, col, direction: "B" });
        }
      }
    }
    return allEdges;
  }, [puzzle.size]);

  const toggleBorder = (id: string) => {
    setFeedback("");
    setSelectedBorders((current) =>
      current.includes(id)
        ? current.filter((borderId) => borderId !== id)
        : [...current, id],
    );
  };

  const checkAnswer = () => {
    const selectedSet = new Set(selectedBorders);
    const correctSet = new Set(puzzle.correctBorders);

    const hasEveryCorrectBorder = puzzle.correctBorders.every((id) =>
      selectedSet.has(id),
    );
    const hasOnlyCorrectBorders = selectedBorders.every((id) =>
      correctSet.has(id),
    );

    if (hasEveryCorrectBorder && hasOnlyCorrectBorders) {
      setFeedback("Correct! 🎉");
      onSolved();
      return;
    }

    setFeedback("Try again 🙂");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Tap the border lines between cells to draw walls.
      </Text>

      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {Array.from({ length: puzzle.size }).map((_, row) =>
          Array.from({ length: puzzle.size }).map((__, col) => (
            <View
              key={`cell-${row}-${col}`}
              style={[
                styles.cell,
                {
                  width: cellSize,
                  height: cellSize,
                  left: col * cellSize,
                  top: row * cellSize,
                },
              ]}
            />
          )),
        )}

        {puzzle.animals.map((animal) => (
          <View
            key={`animal-${animal.row}-${animal.col}`}
            style={[
              styles.animalContainer,
              {
                left: animal.col * cellSize,
                top: animal.row * cellSize,
                width: cellSize,
                height: cellSize,
              },
            ]}
          >
            <Text style={styles.animal}>{animal.emoji}</Text>
          </View>
        ))}

        {edges.map((edge) => {
          const isSelected = selectedBorders.includes(edge.id);

          if (edge.direction === "R") {
            return (
              <Pressable
                key={edge.id}
                onPress={() => toggleBorder(edge.id)}
                style={[
                  styles.verticalEdgeTapArea,
                  {
                    left: (edge.col + 1) * cellSize - 10,
                    top: edge.row * cellSize + 6,
                    height: cellSize - 12,
                  },
                ]}
              >
                <View
                  style={[
                    styles.verticalEdgeLine,
                    isSelected && styles.selectedEdgeLine,
                  ]}
                />
              </Pressable>
            );
          }

          return (
            <Pressable
              key={edge.id}
              onPress={() => toggleBorder(edge.id)}
              style={[
                styles.horizontalEdgeTapArea,
                {
                  left: edge.col * cellSize + 6,
                  top: (edge.row + 1) * cellSize - 10,
                  width: cellSize - 12,
                },
              ]}
            >
              <View
                style={[
                  styles.horizontalEdgeLine,
                  isSelected && styles.selectedEdgeLine,
                ]}
              />
            </Pressable>
          );
        })}
      </View>

      <Pressable style={styles.checkButton} onPress={checkAnswer}>
        <Text style={styles.checkText}>✅</Text>
      </Pressable>
      {feedback ? <Text style={styles.feedback}>{feedback}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.s,
  },
  instructions: {
    fontSize: 16,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
    color: colors.blue,
  },
  board: {
    position: "relative",
    borderWidth: 2,
    borderRadius: radii.input,
    borderColor: colors.blue,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  cell: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#D8DDEB",
  },
  animalContainer: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  animal: {
    fontSize: 36,
  },
  verticalEdgeTapArea: {
    position: "absolute",
    width: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  horizontalEdgeTapArea: {
    position: "absolute",
    height: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  verticalEdgeLine: {
    width: 4,
    height: "100%",
    borderRadius: 2,
    backgroundColor: "#D8DDEB",
  },
  horizontalEdgeLine: {
    width: "100%",
    height: 4,
    borderRadius: 2,
    backgroundColor: "#D8DDEB",
  },
  selectedEdgeLine: {
    backgroundColor: colors.pink,
  },
  checkButton: {
    backgroundColor: colors.orange,
    borderRadius: radii.button,
    paddingHorizontal: spacing.m,
    paddingVertical: 14,
  },
  checkText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.headingSemiBold,
  },
  feedback: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.green,
  },
});
