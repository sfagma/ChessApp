import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../../constants/theme";
import { episodes } from "../../data/episodes";
import { getSeasonById } from "../../data/seasons";

export default function SeasonScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id: string }>();
  const season = getSeasonById(String(id));

  if (!season) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyTitle}>Season not found</Text>
        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeEmoji}>🏠</Text>
        </Pressable>
      </View>
    );
  }

  if (season.status === "comingSoon") {
    return (
      <View style={styles.emptyState}>
        <Stack.Screen options={{ title: season.title }} />
        <Text style={styles.emptyTitle}>🔒 {season.title}</Text>
        <Text style={styles.emptySubtitle}>Coming Soon</Text>
        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeEmoji}>🏠</Text>
        </Pressable>
      </View>
    );
  }

  const seasonEpisodes = season.episodeIds
    .map((episodeId) => episodes.find((episode) => episode.id === episodeId))
    .filter((episode): episode is NonNullable<typeof episode> => Boolean(episode));

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Stack.Screen options={{ title: season.title }} />
      <View style={styles.topNav}>
        <Pressable style={styles.homeButton} onPress={() => router.replace("/")}>
          <Text style={styles.homeEmoji}>🏠</Text>
        </Pressable>
        <Text style={styles.topTitle}>{season.title}</Text>
      </View>

      {seasonEpisodes.map((episode) => (
        <Link
          key={episode.id}
          href={{ pathname: "/episode/[id]", params: { id: episode.id, seasonId: season.id } }}
          asChild
        >
          <Pressable style={styles.episodeCard}>
            <Text style={styles.episodeTitle}>🎯 {episode.title}</Text>
            <Text style={styles.episodeCta}>▶️</Text>
          </Pressable>
        </Link>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.grayBackground,
  },
  content: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.l,
    gap: spacing.s,
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  topTitle: {
    fontSize: 30,
    color: colors.darkText,
    fontFamily: fonts.headingBold,
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
  homeEmoji: {
    fontSize: 30,
  },
  episodeCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.softBorder,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.m,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  episodeTitle: {
    fontSize: 28,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  episodeCta: {
    fontSize: 30,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: radii.button,
    overflow: "hidden",
    backgroundColor: colors.orange,
    color: colors.white,
  },
  emptyState: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.s,
    backgroundColor: colors.grayBackground,
    padding: spacing.s,
  },
  emptyTitle: {
    fontSize: 32,
    color: colors.darkText,
    fontFamily: fonts.headingBold,
    textAlign: "center",
  },
  emptySubtitle: {
    fontSize: 22,
    color: colors.blue,
    fontFamily: fonts.bodyMedium,
  },
});
