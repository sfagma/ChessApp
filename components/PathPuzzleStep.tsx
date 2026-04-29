import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";
import { GridCell, PathPuzzleData } from "../types/lesson";

type Props = {
  puzzle: PathPuzzleData;
  onSolved: () => void;
};

const getCellKey = (cell: GridCell) => `${cell.row}-${cell.col}`;

const isSameCell = (a: GridCell, b: GridCell) => a.row === b.row && a.col === b.col;

const isNeighbor = (a: GridCell, b: GridCell) => {
  const rowDiff = Math.abs(a.row - b.row);
  const colDiff = Math.abs(a.col - b.col);
  return rowDiff + colDiff === 1;
};

export default function PathPuzzleStep({ puzzle, onSolved }: Props) {
  // Start with A selected to guide the child.
  const [selectedPath, setSelectedPath] = useState<GridCell[]>([puzzle.start]);
  const [feedback, setFeedback] = useState("");

  const cellSize = 58;
  const boardSize = puzzle.size * cellSize;

  const obstacleSet = new Set(puzzle.obstacles.map(getCellKey));
  const selectedSet = new Set(selectedPath.map(getCellKey));

  const onCellPress = (cell: GridCell) => {
    const cellKey = getCellKey(cell);
    const lastCell = selectedPath[selectedPath.length - 1];

    if (obstacleSet.has(cellKey)) {
      return;
    }

    setFeedback("");

    if (isSameCell(cell, lastCell) && selectedPath.length > 1) {
      setSelectedPath((current) => current.slice(0, current.length - 1));
      return;
    }

    if (selectedSet.has(cellKey)) {
      return;
    }

    if (!isNeighbor(cell, lastCell)) {
      return;
    }

    setSelectedPath((current) => [...current, cell]);
  };

  const clearPath = () => {
    setSelectedPath([puzzle.start]);
    setFeedback("");
  };

  const checkAnswer = () => {
    const sameLength = selectedPath.length === puzzle.correctPath.length;
    const sameCellsInOrder =
      sameLength &&
      selectedPath.every((cell, index) => isSameCell(cell, puzzle.correctPath[index]));

    if (sameCellsInOrder) {
      setFeedback("Correct! 🎉");
      onSolved();
      return;
    }

    setFeedback("Try again 🙂");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructions}>
        Tap neighbor cells to build a path from A to B.
      </Text>

      <View style={[styles.board, { width: boardSize, height: boardSize }]}>
        {Array.from({ length: puzzle.size }).map((_, row) =>
          Array.from({ length: puzzle.size }).map((__, col) => {
            const cell = { row, col };
            const key = getCellKey(cell);
            const isObstacle = obstacleSet.has(key);
            const isPathCell = selectedSet.has(key);
            const isStart = isSameCell(cell, puzzle.start);
            const isEnd = isSameCell(cell, puzzle.end);

            return (
              <Pressable
                key={`path-cell-${key}`}
                style={[
                  styles.cell,
                  {
                    width: cellSize,
                    height: cellSize,
                    left: col * cellSize,
                    top: row * cellSize,
                  },
                  isPathCell && styles.pathCell,
                  isObstacle && styles.obstacleCell,
                ]}
                onPress={() => onCellPress(cell)}
              >
                <Text style={styles.cellText}>
                  {isObstacle ? "🪨" : isStart ? "A" : isEnd ? "B" : ""}
                </Text>
              </Pressable>
            );
          }),
        )}
      </View>

      <View style={styles.buttonRow}>
        <Pressable style={styles.secondaryButton} onPress={clearPath}>
          <Text style={styles.secondaryText}>🧹</Text>
        </Pressable>
        <Pressable style={styles.primaryButton} onPress={checkAnswer}>
          <Text style={styles.primaryText}>✅</Text>
        </Pressable>
      </View>

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
    borderColor: colors.blue,
    borderRadius: radii.input,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  cell: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "#D8DDEB",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FDFEFF",
  },
  cellText: {
    fontSize: 24,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
  },
  pathCell: {
    backgroundColor: "#FFE6F1",
  },
  obstacleCell: {
    backgroundColor: "#E7EBF5",
  },
  buttonRow: {
    flexDirection: "row",
    gap: spacing.s,
  },
  primaryButton: {
    backgroundColor: colors.orange,
    borderRadius: radii.button,
    paddingHorizontal: spacing.s,
    paddingVertical: 14,
  },
  primaryText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.headingSemiBold,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: radii.button,
    paddingHorizontal: spacing.s,
    paddingVertical: 14,
    borderWidth: 2,
    borderColor: colors.blue,
  },
  secondaryText: {
    color: colors.blue,
    fontSize: 18,
    fontFamily: fonts.headingSemiBold,
  },
  feedback: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.green,
  },
});
