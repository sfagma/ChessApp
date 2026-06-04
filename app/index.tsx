import { Link } from "expo-router";
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";
import { seasons } from "../data/seasons";

export default function HomeScreen() {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.heroCard}>
        <Image
          source={require("../assets/thinkchess-logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.title}>ThinkChess</Text>
        <Text style={styles.subtitle}>Pick a season to start</Text>
      </View>

      {seasons.map((season) => {
        if (season.status === "comingSoon") {
          return (
            <View key={season.id} style={[styles.card, styles.comingSoonCard]}>
              <Text style={styles.cardTitle}>🔒 {season.title}</Text>
              <Text style={styles.cardDescription}>Coming Soon</Text>
              <Text style={[styles.cardCta, styles.pendingCta]}>⏳</Text>
            </View>
          );
        }

        return (
          <Link key={season.id} href={`/season/${season.id}`} asChild>
            <Pressable style={styles.card}>
              <Text style={styles.cardTitle}>🌟 {season.title}</Text>
              <Text style={styles.cardDescription}>
                {season.episodeIds.length} Episodes
              </Text>
              <Text style={styles.cardCta}>▶️</Text>
            </Pressable>
          </Link>
        );
      })}
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
    paddingTop: spacing.xl,
    paddingBottom: spacing.xl,
    gap: spacing.s,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.softBorder,
    paddingVertical: spacing.l,
    paddingHorizontal: spacing.s,
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  logoImage: {
    width: 160,
    height: 160,
    marginBottom: spacing.s,
  },
  title: {
    fontSize: 34,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 17,
    fontFamily: fonts.bodyMedium,
    textAlign: "center",
    color: colors.blue,
    marginTop: spacing.xs,
  },
  card: {
    backgroundColor: "#D9F7FA",
    borderRadius: radii.card,
    paddingVertical: spacing.m,
    paddingHorizontal: spacing.s,
    borderWidth: 1,
    borderColor: colors.softBorder,
  },
  comingSoonCard: {
    backgroundColor: "#EEF1F8",
  },
  cardTitle: {
    fontSize: 30,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
    textAlign: "center",
  },
  cardDescription: {
    fontSize: 24,
    fontFamily: fonts.bodyRegular,
    marginTop: spacing.xs,
    color: colors.darkText,
    textAlign: "center",
  },
  cardCta: {
    marginTop: spacing.s,
    alignSelf: "center",
    color: colors.white,
    backgroundColor: colors.orange,
    borderRadius: radii.button,
    overflow: "hidden",
    paddingHorizontal: spacing.l,
    paddingVertical: spacing.xs,
    fontSize: 28,
    fontFamily: fonts.headingSemiBold,
  },
  pendingCta: {
    backgroundColor: "#BFC6D9",
  },
});
