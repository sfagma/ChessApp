import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";

type Props = {
  onVideoFinished: () => void;
};

export default function VideoStep({ onVideoFinished }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.videoBox}>
        <Text style={styles.videoEmoji}>🎬</Text>
        <Text style={styles.videoTitle}>Local Video Placeholder</Text>
        <Text style={styles.videoSubtitle}>
          Later you can replace this with a real local video file.
        </Text>
      </View>

      <Pressable style={styles.button} onPress={onVideoFinished}>
        <Text style={styles.buttonText}>✅</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.s,
  },
  videoBox: {
    width: "100%",
    minHeight: 230,
    borderRadius: radii.card,
    backgroundColor: "#E6FAFC",
    borderWidth: 2,
    borderColor: colors.turquoise,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.s,
  },
  videoEmoji: {
    fontSize: 64,
    marginBottom: spacing.xs,
  },
  videoTitle: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
    textAlign: "center",
  },
  videoSubtitle: {
    marginTop: spacing.xs,
    fontSize: 16,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
    color: colors.blue,
  },
  button: {
    backgroundColor: colors.orange,
    paddingHorizontal: spacing.m,
    paddingVertical: 14,
    borderRadius: radii.button,
  },
  buttonText: {
    color: colors.white,
    fontSize: 18,
    fontFamily: fonts.headingSemiBold,
  },
});
