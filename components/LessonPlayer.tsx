import { useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";
import { Lesson } from "../types/lesson";
import BorderPuzzleStep from "./BorderPuzzleStep";
import ImageStep from "./ImageStep";
import PathPuzzleStep from "./PathPuzzleStep";
import StepDots from "./StepDots";
import SuccessStep from "./SuccessStep";
import VideoStep from "./VideoStep";

type Props = {
  lesson: Lesson;
};

export default function LessonPlayer({ lesson }: Props) {
  const [currentStep, setCurrentStep] = useState(0);
  const [highestUnlockedStep, setHighestUnlockedStep] = useState(0);

  const step = lesson.steps[currentStep];
  const canGoBack = currentStep > 0;
  const canGoForward = currentStep < highestUnlockedStep;

  const stepIcons = lesson.steps.map((lessonStep) => {
    if (lessonStep.type === "video") return "🎬";
    if (lessonStep.type === "image") return "🖼️";
    if (lessonStep.type === "borderPuzzle") return "🧩";
    if (lessonStep.type === "pathPuzzle") return "🛤️";
    return "🏆";
  });

  const unlockNextStep = () => {
    setHighestUnlockedStep((currentUnlocked) =>
      Math.min(Math.max(currentUnlocked, currentStep + 1), lesson.steps.length - 1),
    );
  };

  const completeCurrentStepAndMove = () => {
    unlockNextStep();
    setCurrentStep((current) => Math.min(current + 1, lesson.steps.length - 1));
  };

  const stepContent = useMemo(() => {
    if (step.type === "video") {
      return <VideoStep onVideoFinished={completeCurrentStepAndMove} />;
    }

    if (step.type === "image") {
      return <ImageStep emoji={step.imageEmoji} onNext={completeCurrentStepAndMove} />;
    }

    if (step.type === "borderPuzzle" && step.borderPuzzle) {
      return (
        <BorderPuzzleStep
          puzzle={step.borderPuzzle}
          onSolved={completeCurrentStepAndMove}
        />
      );
    }

    if (step.type === "pathPuzzle" && step.pathPuzzle) {
      return (
        <PathPuzzleStep puzzle={step.pathPuzzle} onSolved={completeCurrentStepAndMove} />
      );
    }

    return <SuccessStep />;
  }, [step]);

  return (
    <View style={styles.container}>
      <StepDots
        totalSteps={lesson.steps.length}
        currentStep={currentStep}
        highestUnlockedStep={highestUnlockedStep}
        stepIcons={stepIcons}
        onStepPress={setCurrentStep}
      />

      <View style={styles.stepCard}>
        <Text style={styles.guideText}>♞ Coach says: keep going!</Text>
        <Text style={styles.stepTitle}>{step.title}</Text>
        {step.subtitle ? <Text style={styles.stepSubtitle}>{step.subtitle}</Text> : null}
        <View style={styles.stepContent}>{stepContent}</View>
        <View style={styles.navRow}>
          <Pressable
            onPress={() => canGoBack && setCurrentStep((value) => value - 1)}
            style={[styles.navButton, !canGoBack && styles.disabledButton]}
          >
            <Text style={styles.navIcon}>⬅️</Text>
          </Pressable>
          <Pressable
            onPress={() => canGoForward && setCurrentStep((value) => value + 1)}
            style={[styles.navButton, !canGoForward && styles.disabledButton]}
          >
            <Text style={styles.navIcon}>➡️</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  stepCard: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.s,
    borderWidth: 1,
    borderColor: colors.softBorder,
  },
  guideText: {
    alignSelf: "center",
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.pink,
    marginBottom: spacing.xs,
  },
  stepTitle: {
    fontSize: 28,
    fontFamily: fonts.headingSemiBold,
    textAlign: "center",
    color: colors.darkText,
  },
  stepSubtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.s,
    fontSize: 16,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
    color: colors.blue,
  },
  stepContent: {
    flex: 1,
    justifyContent: "center",
    marginBottom: spacing.s,
  },
  navRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xs,
  },
  navButton: {
    minWidth: 110,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E9FBFE",
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.turquoise,
    paddingVertical: 12,
  },
  disabledButton: {
    opacity: 0.35,
  },
  navIcon: {
    fontSize: 28,
  },
});
