import { StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";

export default function SuccessStep() {
  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>🎉🥳🌟</Text>
      <Text style={styles.title}>Amazing work!</Text>
      <Text style={styles.subtitle}>You completed the lesson.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    minHeight: 240,
    borderRadius: radii.card,
    backgroundColor: "#F1FBE5",
    borderWidth: 2,
    borderColor: colors.green,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.s,
  },
  emoji: {
    fontSize: 56,
    marginBottom: spacing.xs,
  },
  title: {
    fontSize: 32,
    fontFamily: fonts.headingBold,
    color: colors.green,
  },
  subtitle: {
    fontSize: 18,
    marginTop: spacing.xs,
    fontFamily: fonts.bodyMedium,
    color: colors.darkText,
  },
});
