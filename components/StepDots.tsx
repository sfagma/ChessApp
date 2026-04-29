import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, spacing } from "../constants/theme";

type Props = {
  totalSteps: number;
  currentStep: number;
  highestUnlockedStep: number;
  stepIcons: string[];
  onStepPress: (stepIndex: number) => void;
};

export default function StepDots({
  totalSteps,
  currentStep,
  highestUnlockedStep,
  stepIcons,
  onStepPress,
}: Props) {
  return (
    <View style={styles.row}>
      {Array.from({ length: totalSteps }).map((_, index) => {
        const isCurrent = index === currentStep;
        const isUnlocked = index <= highestUnlockedStep;
        const isLocked = !isUnlocked;

        return (
          <Pressable
            key={`step-dot-${index}`}
            onPress={() => isUnlocked && onStepPress(index)}
            style={[
              styles.dot,
              isCurrent && styles.currentDot,
              isLocked && styles.lockedDot,
            ]}
          >
            <Text style={styles.dotText}>{isLocked ? "🔒" : stepIcons[index] ?? "⭐"}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: spacing.xs,
    flexWrap: "wrap",
    marginBottom: spacing.s,
  },
  dot: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#B9EEF4",
    borderWidth: 2,
    borderColor: colors.turquoise,
    alignItems: "center",
    justifyContent: "center",
  },
  currentDot: {
    backgroundColor: "#FFE6BF",
    borderColor: colors.orange,
  },
  lockedDot: {
    backgroundColor: "#E8EAF2",
    borderColor: "#CDD2E1",
  },
  dotText: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
});
