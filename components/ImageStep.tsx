import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";

type Props = {
  emoji?: string;
  onNext: () => void;
};

export default function ImageStep({ emoji = "🦁", onNext }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageBox}>
        <Text style={styles.bigEmoji}>{emoji}</Text>
        <Text style={styles.caption}>Big Picture Placeholder</Text>
      </View>

      <Pressable style={styles.button} onPress={onNext}>
        <Text style={styles.buttonText}>➡️</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.s,
  },
  imageBox: {
    width: "100%",
    minHeight: 280,
    borderRadius: radii.card,
    backgroundColor: "#FFF9DE",
    borderWidth: 2,
    borderColor: colors.yellow,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.s,
  },
  bigEmoji: {
    fontSize: 120,
    marginBottom: spacing.xs,
  },
  caption: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  button: {
    backgroundColor: colors.orange,
    paddingHorizontal: spacing.xl,
    paddingVertical: 14,
    borderRadius: radii.button,
  },
  buttonText: {
    color: colors.white,
    fontSize: 20,
    fontFamily: fonts.headingSemiBold,
  },
});
