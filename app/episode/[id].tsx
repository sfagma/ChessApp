import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, StyleSheet, Text, View } from "react-native";
import LessonPlayer from "../../components/LessonPlayer";
import { colors, fonts, spacing } from "../../constants/theme";
import { getEpisodeById } from "../../data/episodes";

export default function EpisodeScreen() {
  const router = useRouter();
  const { id, seasonId } = useLocalSearchParams<{ id: string; seasonId?: string }>();
  const episode = getEpisodeById(String(id));

  if (!episode) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Episode not found</Text>
        <Text style={styles.emptySubtitle}>Please choose an episode again.</Text>
        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeEmoji}>🏠</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Stack.Screen options={{ title: episode.title }} />
      <View style={styles.topNav}>
        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeEmoji}>🏠</Text>
        </Pressable>
        <Pressable
          style={styles.seasonButton}
          onPress={() => router.replace(`/season/${seasonId ?? "1"}`)}
        >
          <Text style={styles.seasonEmoji}>📺</Text>
        </Pressable>
      </View>
      <LessonPlayer lesson={episode} />
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: spacing.s,
    backgroundColor: colors.grayBackground,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.s,
  },
  homeButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E9FBFE",
    borderWidth: 2,
    borderColor: colors.turquoise,
    alignItems: "center",
    justifyContent: "center",
  },
  seasonButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#E9FBFE",
    borderWidth: 2,
    borderColor: colors.blue,
    alignItems: "center",
    justifyContent: "center",
  },
  homeEmoji: {
    fontSize: 30,
  },
  seasonEmoji: {
    fontSize: 28,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.s,
    backgroundColor: colors.grayBackground,
  },
  emptyTitle: {
    fontSize: 30,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
  },
  emptySubtitle: {
    marginTop: 8,
    fontSize: 18,
    color: colors.blue,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
  },
});
