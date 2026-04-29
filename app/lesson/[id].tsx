import { Redirect, useLocalSearchParams } from "expo-router";

export default function LegacyLessonRoute() {
  const { id } = useLocalSearchParams<{ id: string }>();
  return <Redirect href={`/episode/${id ?? "1"}`} />;
}
