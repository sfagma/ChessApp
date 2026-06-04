import { useRef, useState } from "react";
import {
  Alert,
  Image,
  Linking,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { colors, fonts, radii, spacing } from "../constants/theme";

export default function HomeScreen() {
  const scrollRef = useRef<ScrollView>(null);
  const sectionY = useRef<Record<string, number>>({});

  const [selectedLanguage, setSelectedLanguage] = useState("EN");
  const [onlineChildName, setOnlineChildName] = useState("");
  const [onlinePhone, setOnlinePhone] = useState("");
  const [onlineEmail, setOnlineEmail] = useState("");
  const [onlineLang, setOnlineLang] = useState("");
  const [facilityName, setFacilityName] = useState("");

  const scrollToSection = (key: string) => {
    const y = sectionY.current[key] ?? 0;
    scrollRef.current?.scrollTo({ y: Math.max(0, y - 120), animated: true });
  };

  const sendOnlineRequest = () => {
    Alert.alert("Request sent", "Thank you. We will contact you soon.");
    setOnlineChildName("");
    setOnlinePhone("");
    setOnlineEmail("");
    setOnlineLang("");
  };

  const sendFacilityRequest = () => {
    Alert.alert("Request sent", "Thank you. We will contact your facility soon.");
    setFacilityName("");
  };

  const openLink = async (url: string) => {
    try {
      await Linking.openURL(url);
    } catch {
      Alert.alert("Link error", "Unable to open link right now.");
    }
  };

  return (
    <ScrollView ref={scrollRef} style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.logoRow}>
          <Image
            source={require("../assets/thinkchess-logo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
          />
          <Text style={styles.brandName}>ThinkChess</Text>
        </View>

        <View style={styles.menuRow}>
          <Pressable onPress={() => scrollToSection("online-lessons")}>
            <Text style={styles.menuText}>Online Lessons</Text>
          </Pressable>
          <Pressable onPress={() => scrollToSection("offline-lessons")}>
            <Text style={styles.menuText}>Offline Lessons</Text>
          </Pressable>
          <Pressable onPress={() => scrollToSection("how-it-works")}>
            <Text style={styles.menuText}>How It Works</Text>
          </Pressable>
          <Pressable onPress={() => scrollToSection("community")}>
            <Text style={styles.menuText}>Community</Text>
          </Pressable>
          <Pressable onPress={() => scrollToSection("faq")}>
            <Text style={styles.menuText}>FAQ</Text>
          </Pressable>
        </View>

        <View style={styles.langRow}>
          {["EN", "LV", "RU", "FR"].map((lang) => (
            <Pressable
              key={lang}
              onPress={() => setSelectedLanguage(lang)}
              style={[
                styles.langButton,
                selectedLanguage === lang && styles.langButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.langText,
                  selectedLanguage === lang && styles.langTextActive,
                ]}
              >
                {lang}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.heroCard}>
        <View style={styles.heroLogoWrap}>
          <Image
            source={require("../assets/thinkchess-logo-alt.png")}
            style={styles.heroLogo}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.heroTitle}>Teach your child to think before they move</Text>
        <Text style={styles.heroSubtitle}>
          ThinkChess is a chess-based thinking program for children aged 5-7. Children
          learn through animated stories, playful missions, and interactive chess
          challenges - online individually or offline in small groups.
        </Text>
        <Text style={styles.heroSubtitle}>
          It is not a traditional chess class. The format is visual, engaging, and
          designed especially for young children.
        </Text>
        <View style={styles.buttonRow}>
          <Pressable
            style={styles.primaryButton}
            onPress={() => scrollToSection("online-lessons")}
          >
            <Text style={styles.primaryButtonText}>Request online lessons</Text>
          </Pressable>
          <Pressable
            style={styles.secondaryButton}
            onPress={() => scrollToSection("offline-lessons")}
          >
            <Text style={styles.secondaryButtonText}>Add your school facility</Text>
          </Pressable>
        </View>
        <Text style={styles.smallNote}>
          Available in English, French, Russian, and Latvian.
        </Text>
      </View>

      <View
        style={styles.section}
        onLayout={(event) => {
          sectionY.current["online-lessons"] = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>
          Choose the format that works best for your child
        </Text>

        <View style={styles.formatCard}>
          <Text style={styles.cardHeading}>Online 1:1 chess lessons for children</Text>
          <Text style={styles.bodyText}>
            Personal online chess lessons for children who want individual attention and
            flexible learning.
          </Text>
          <Text style={styles.bodyText}>
            Each lesson is adapted to the child&apos;s age, level, language, and pace.
            Children can start from zero or continue improving their existing chess
            skills.
          </Text>
          <Text style={styles.bodyText}>
            The focus is not only on chess rules, but also on attention, logic,
            planning, memory, patience, and decision-making.
          </Text>
          <Text style={styles.detailText}>Age: 5-7</Text>
          <Text style={styles.detailText}>Price: EUR 25 per individual lesson</Text>
          <Text style={styles.detailText}>Format: online, 1:1</Text>
          <Text style={styles.detailText}>
            Languages: English, French, Russian, Latvian
          </Text>
          <Text style={styles.bodyTextStrong}>Why online lessons are different</Text>
          <Text style={styles.bodyText}>
            Children do not just listen to explanations. They learn through short
            stories, visual tasks, interactive puzzles, questions, and chess-based
            missions.
          </Text>
          <Text style={styles.bodyText}>
            The teacher keeps the lesson active and playful, so the child is involved
            throughout the session.
          </Text>

          <Pressable style={styles.primaryButton} onPress={() => scrollToSection("online-details")}>
            <Text style={styles.primaryButtonText}>Request online lessons</Text>
          </Pressable>

          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Quick Request Form</Text>
            <TextInput
              value={onlineChildName}
              onChangeText={setOnlineChildName}
              style={styles.input}
              placeholder="Child's name"
              placeholderTextColor="#6A738A"
            />
            <TextInput
              value={onlinePhone}
              onChangeText={setOnlinePhone}
              style={styles.input}
              placeholder="Parent's phone number"
              placeholderTextColor="#6A738A"
            />
            <TextInput
              value={onlineEmail}
              onChangeText={setOnlineEmail}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#6A738A"
            />
            <TextInput
              value={onlineLang}
              onChangeText={setOnlineLang}
              style={styles.input}
              placeholder="Preferred language"
              placeholderTextColor="#6A738A"
            />
            <Pressable style={styles.primaryButton} onPress={sendOnlineRequest}>
              <Text style={styles.primaryButtonText}>Send request</Text>
            </Pressable>
          </View>
        </View>

        <View
          style={styles.formatCard}
          onLayout={(event) => {
            sectionY.current["offline-lessons"] = event.nativeEvent.layout.y;
          }}
        >
          <Text style={styles.cardHeading}>
            Weekly chess + logic lessons at your child&apos;s school or kindergarten
          </Text>
          <Text style={styles.bodyText}>
            ThinkChess brings chess-based thinking lessons directly to the place where
            children already are.
          </Text>
          <Text style={styles.bodyText}>
            Children learn in small groups through teacher guidance, animated stories,
            interactive tasks, and iPad-based chess puzzles.
          </Text>
          <Text style={styles.bodyText}>
            For parents, this means no extra driving, no evening logistics, and no need
            to organise another activity after work.
          </Text>
          <Text style={styles.detailText}>Age: 5-7</Text>
          <Text style={styles.detailText}>Price: EUR 56/month</Text>
          <Text style={styles.detailText}>Format: 1-hour lesson once per week</Text>
          <Text style={styles.detailText}>Group size: small groups</Text>
          <Text style={styles.detailText}>
            Location: school, kindergarten, or child-friendly facility
          </Text>
          <Text style={styles.bodyTextStrong}>Why offline lessons are different</Text>
          <Text style={styles.bodyText}>
            Instead of a traditional chess club format, children join a structured
            learning adventure.
          </Text>
          <Text style={styles.bodyText}>
            Each lesson has a story, a mission, practical challenges, and interactive
            tasks. Children learn by doing, not by memorising rules.
          </Text>
          <Pressable
            style={styles.primaryButton}
            onPress={() => Alert.alert("Thanks", "We will contact your facility soon.")}
          >
            <Text style={styles.primaryButtonText}>Add your school facility</Text>
          </Pressable>
          <View style={styles.formBox}>
            <Text style={styles.formTitle}>Facility Form</Text>
            <TextInput
              value={facilityName}
              onChangeText={setFacilityName}
              style={styles.input}
              placeholder="School or kindergarten name"
              placeholderTextColor="#6A738A"
            />
            <Pressable style={styles.primaryButton} onPress={sendFacilityRequest}>
              <Text style={styles.primaryButtonText}>Send</Text>
            </Pressable>
            <Text style={styles.smallNote}>
              Parents, schools, and kindergartens can all add a facility.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Not just chess lessons. A thinking adventure.</Text>
        <Text style={styles.bodyText}>
          Traditional chess classes can feel too serious, abstract, or difficult for
          young children. ThinkChess is designed differently. Each lesson feels like a
          small adventure where children discover a new idea, meet a challenge, and
          solve it through play.
        </Text>
        <Text style={styles.bodyText}>Instead of long explanations, children learn through:</Text>
        {[
          "Animated stories - short visual stories introduce the topic in a way children can understand and remember.",
          "Missions and challenges - every lesson has a clear goal, so children feel like they are completing a task.",
          "Interactive puzzles - children practise ideas through games, quizzes, and chess-based logic tasks.",
          "Characters and storytelling - friendly characters and stories make abstract ideas easier.",
          "Teacher guidance - the teacher keeps children engaged and supports them during tasks.",
          "Learning by doing - children move, choose, solve, test, and think.",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
      </View>

      <View
        style={styles.section}
        onLayout={(event) => {
          sectionY.current["how-it-works"] = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>How a ThinkChess lesson works</Text>
        <Text style={styles.bodyText}>
          This structure is used in both online and offline lessons. The format is
          simple, visual, and designed for children aged 5-10.
        </Text>
        {[
          {
            step: "Step 1",
            title: "The teacher opens the mission",
            text: "The lesson starts with a short introduction. Example: Today we help the hero find the safest path across the chessboard.",
          },
          {
            step: "Step 2",
            title: "Children watch a short animated story",
            text: "A 6-10 minute story explains the chess or logic idea in a way children can understand and remember.",
          },
          {
            step: "Step 3",
            title: "Children solve interactive tasks",
            text: "After the story, children practise through puzzles, quizzes, chess missions, and games.",
          },
          {
            step: "Step 4",
            title: "Children learn to think before they move",
            text: "Each task teaches children to pause, observe, compare options, and make a decision.",
          },
        ].map((entry) => (
          <View key={entry.step} style={styles.stepCard}>
            <Text style={styles.stepBadge}>{entry.step}</Text>
            <Text style={styles.stepTitle}>{entry.title}</Text>
            <Text style={styles.bodyText}>{entry.text}</Text>
          </View>
        ))}
      </View>

      <View
        style={styles.section}
        onLayout={(event) => {
          sectionY.current["online-details"] = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>Online 1:1 lessons in four languages</Text>
        <Text style={styles.bodyText}>
          Individual online lessons are ideal for children who need personal attention,
          flexible learning, or lessons in a specific language.
        </Text>
        {[
          "One-to-one lesson with a teacher",
          "Chess rules and tactics",
          "Logic and thinking exercises",
          "Interactive puzzles and missions",
          "Friendly pace for children",
          "Available in English, French, Russian, and Latvian",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
        <Text style={styles.priceText}>EUR 25 per individual lesson</Text>
        <Pressable style={styles.primaryButton} onPress={sendOnlineRequest}>
          <Text style={styles.primaryButtonText}>Request online lessons</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offline lessons at schools and kindergartens</Text>
        <Text style={styles.bodyText}>
          Offline lessons are designed for children who enjoy learning together in a
          small group. ThinkChess can be organised directly at a school, kindergarten,
          or other child-friendly facility.
        </Text>
        {[
          "One 1-hour lesson per week",
          "Small group format",
          "Teacher-led introduction",
          "Short animated story",
          "iPad-based chess and logic tasks",
          "Playful missions and challenges",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
        <Text style={styles.priceText}>EUR 56/month</Text>
        <Pressable style={styles.primaryButton} onPress={sendFacilityRequest}>
          <Text style={styles.primaryButtonText}>Add your school facility</Text>
        </Pressable>
        <Text style={styles.smallNote}>
          Parents, schools, and kindergartens can all suggest a facility.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>What children develop</Text>
        {[
          "Focus - observe the board, notice details, and stay with a task.",
          "Logic - understand simple rules, patterns, cause and effect.",
          "Memory - remember piece movement and strategies.",
          "Problem-solving - try, make mistakes, and find another way.",
          "Planning - think one step ahead.",
          "Confidence - small missions create visible progress.",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Useful for children. Flexible for parents.</Text>
        {[
          "Online lessons from anywhere in the language that suits your child.",
          "No extra driving for offline lessons at school or kindergarten.",
          "A meaningful activity that trains focus, patience, and decisions.",
          "Fun and age-friendly stories, characters, and visual games.",
          "Suitable for beginners with a clear lesson structure.",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>A modern educational activity for your facility</Text>
        <Text style={styles.bodyText}>
          ThinkChess gives schools and kindergartens an easy way to offer a chess +
          logic program without creating it from scratch.
        </Text>
        {[
          "Adds value to your extracurricular offer",
          "Suitable for children aged 5-7",
          "Small group format with teacher-led lessons",
          "Modern iPad-based activities",
          "Easy to explain to parents",
          "No need for the school to build its own chess program",
        ].map((item) => (
          <Text key={item} style={styles.bulletText}>
            • {item}
          </Text>
        ))}
        <Pressable style={styles.primaryButton} onPress={sendFacilityRequest}>
          <Text style={styles.primaryButtonText}>Add your school facility</Text>
        </Pressable>
      </View>

      <View
        style={styles.section}
        onLayout={(event) => {
          sectionY.current.community = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>Join the ThinkChess community</Text>
        <Text style={styles.bodyText}>
          Our community is open to both kids and parents. We share daily chess tasks,
          brain challenges, fun facts, learning ideas, and simple exercises to improve
          thinking skills in a playful way.
        </Text>
        <Pressable
          style={styles.primaryButton}
          onPress={() => Alert.alert("Great", "Community join request sent.")}
        >
          <Text style={styles.primaryButtonText}>Join the community</Text>
        </Pressable>
        <Text style={styles.smallNote}>
          Daily chess tasks, brain games, fun facts, and learning inspiration for
          families.
        </Text>
      </View>

      <View
        style={styles.section}
        onLayout={(event) => {
          sectionY.current.faq = event.nativeEvent.layout.y;
        }}
      >
        <Text style={styles.sectionTitle}>FAQ</Text>
        {[
          {
            q: "What age is ThinkChess for?",
            a: "ThinkChess is designed for children aged 5-7.",
          },
          {
            q: "Does my child need to know chess already?",
            a: "No. Children can start from zero. The program explains everything step by step.",
          },
          {
            q: "Is this a normal chess class?",
            a: "No. ThinkChess is different from traditional chess classes. Children learn through stories, cartoons, games, missions, and interactive tasks.",
          },
          {
            q: "What is the difference between online and offline lessons?",
            a: "Online lessons are individual 1:1 lessons. Offline lessons are small group lessons at schools, kindergartens, or child-friendly facilities.",
          },
          {
            q: "How much do offline lessons cost?",
            a: "Offline group lessons cost EUR 56 per month for one 1-hour lesson per week.",
          },
          {
            q: "How much do online lessons cost?",
            a: "Online individual lessons cost EUR 25 per lesson.",
          },
          {
            q: "Which languages are available?",
            a: "ThinkChess is available in English, French, Russian, and Latvian.",
          },
          {
            q: "Can parents add a school to the list?",
            a: "Yes. Parents, schools, and kindergartens can all add a facility.",
          },
        ].map((item) => (
          <View key={item.q} style={styles.faqCard}>
            <Text style={styles.faqQuestion}>{item.q}</Text>
            <Text style={styles.bodyText}>{item.a}</Text>
          </View>
        ))}
      </View>

      <View style={[styles.section, styles.finalSection]}>
        <Text style={styles.sectionTitle}>
          Start online or bring ThinkChess to your child&apos;s school
        </Text>
        <Text style={styles.bodyText}>
          Choose individual online lessons or help us bring ThinkChess offline group
          lessons to your school or kindergarten.
        </Text>
        <View style={styles.buttonRow}>
          <Pressable style={styles.primaryButton} onPress={() => scrollToSection("online-details")}>
            <Text style={styles.primaryButtonText}>Request online lessons</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => scrollToSection("offline-lessons")}>
            <Text style={styles.secondaryButtonText}>Add your school facility</Text>
          </Pressable>
          <Pressable style={styles.secondaryButton} onPress={() => scrollToSection("community")}>
            <Text style={styles.secondaryButtonText}>Join the community</Text>
          </Pressable>
        </View>
        <Text style={styles.positioningText}>
          ThinkChess helps children aged 5-10 develop logic, focus, and problem-solving
          through chess-based stories, games, and interactive challenges - available as
          individual online lessons or offline group lessons at schools and
          kindergartens.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Pitch by slides</Text>
        <View style={styles.slideCard}>
          <Text style={styles.slideTitle}>Slide 1 - Logo and name</Text>
          <Text style={styles.bodyText}>ThinkChess</Text>
        </View>
        <View style={styles.slideCard}>
          <Text style={styles.slideTitle}>Slide 2 - Hook/problem</Text>
          <Text style={styles.quoteText}>
            "AI is getting smarter. So the most valuable thing you can teach your child
            is how to think."
          </Text>
        </View>
        <View style={styles.slideCard}>
          <Text style={styles.slideTitle}>Slide 3 - Data to back it</Text>
          <Text style={styles.bodyText}>
            The World Economic Forum Future of Jobs Report highlights analytical thinking
            as the #1 core skill for the future workforce.
          </Text>
          <Pressable
            style={styles.linkButton}
            onPress={() =>
              openLink(
                "https://www.weforum.org/reports/the-future-of-jobs-report-2025/",
              )
            }
          >
            <Text style={styles.linkButtonText}>Open WEF report</Text>
          </Pressable>
          <Text style={styles.bodyText}>
            Peer-reviewed studies report improvements in attention, memory, and logical
            thinking for children receiving chess instruction.
          </Text>
          <Pressable
            style={styles.linkButton}
            onPress={() => openLink("https://pmc.ncbi.nlm.nih.gov/")}
          >
            <Text style={styles.linkButtonText}>Open PubMed Central</Text>
          </Pressable>
        </View>
      </View>
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
    paddingTop: spacing.s,
    paddingBottom: spacing.xl,
    gap: spacing.s,
  },
  header: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.softBorder,
    marginTop: spacing.s,
    padding: spacing.s,
    gap: spacing.s,
  },
  logoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs,
  },
  headerLogo: {
    width: 48,
    height: 48,
  },
  brandName: {
    fontSize: 24,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
  },
  menuRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.s,
  },
  menuText: {
    fontSize: 16,
    color: colors.blue,
    fontFamily: fonts.bodyMedium,
  },
  langRow: {
    flexDirection: "row",
    gap: spacing.xs,
  },
  langButton: {
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    borderRadius: radii.button,
    borderWidth: 1,
    borderColor: colors.softBorder,
    backgroundColor: colors.white,
  },
  langButtonActive: {
    backgroundColor: "#E8F6FF",
    borderColor: colors.blue,
  },
  langText: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.darkText,
  },
  langTextActive: {
    color: colors.blue,
  },
  heroCard: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.softBorder,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.s,
    alignItems: "center",
    gap: spacing.s,
  },
  heroLogoWrap: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    padding: spacing.m,
  },
  heroLogo: {
    width: 132,
    height: 132,
  },
  heroTitle: {
    fontSize: 34,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
    textAlign: "center",
  },
  heroSubtitle: {
    fontSize: 18,
    fontFamily: fonts.bodyRegular,
    textAlign: "center",
    color: colors.darkText,
    lineHeight: 27,
  },
  buttonRow: {
    width: "100%",
    gap: spacing.s,
  },
  primaryButton: {
    backgroundColor: colors.orange,
    borderRadius: radii.button,
    paddingHorizontal: spacing.s,
    paddingVertical: 14,
    alignItems: "center",
  },
  primaryButtonText: {
    color: colors.white,
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
  },
  secondaryButton: {
    backgroundColor: colors.white,
    borderRadius: radii.button,
    borderWidth: 2,
    borderColor: colors.blue,
    paddingHorizontal: spacing.s,
    paddingVertical: 14,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: colors.blue,
    fontFamily: fonts.headingSemiBold,
    fontSize: 18,
  },
  section: {
    backgroundColor: colors.white,
    borderRadius: radii.card,
    paddingVertical: spacing.xl,
    paddingHorizontal: spacing.s,
    borderWidth: 1,
    borderColor: colors.softBorder,
    gap: spacing.s,
  },
  sectionTitle: {
    fontSize: 28,
    lineHeight: 36,
    fontFamily: fonts.headingBold,
    color: colors.darkText,
  },
  formatCard: {
    borderWidth: 1,
    borderColor: colors.softBorder,
    borderRadius: radii.card,
    padding: spacing.s,
    gap: spacing.xs,
    backgroundColor: "#FCFEFF",
  },
  cardHeading: {
    fontSize: 24,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  bodyText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.bodyRegular,
    color: colors.darkText,
  },
  bodyTextStrong: {
    fontSize: 18,
    lineHeight: 26,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  detailText: {
    fontSize: 16,
    fontFamily: fonts.bodyMedium,
    color: colors.blue,
  },
  bulletText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.bodyRegular,
    color: colors.darkText,
  },
  formBox: {
    marginTop: spacing.xs,
    borderWidth: 1,
    borderColor: "#DDE3F1",
    borderRadius: radii.card,
    padding: spacing.s,
    gap: spacing.xs,
    backgroundColor: "#F7FAFF",
  },
  formTitle: {
    fontSize: 20,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#CCD5E8",
    borderRadius: radii.input,
    backgroundColor: colors.white,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    fontSize: 16,
    color: colors.darkText,
    fontFamily: fonts.bodyRegular,
  },
  smallNote: {
    fontSize: 14,
    fontFamily: fonts.bodyRegular,
    color: "#55607A",
    textAlign: "center",
  },
  stepCard: {
    backgroundColor: "#F8FCFF",
    borderWidth: 1,
    borderColor: "#DCEBFA",
    borderRadius: radii.card,
    padding: spacing.s,
    gap: spacing.xs,
  },
  stepBadge: {
    alignSelf: "flex-start",
    backgroundColor: colors.turquoise,
    color: colors.white,
    borderRadius: radii.button,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    overflow: "hidden",
    fontSize: 14,
    fontFamily: fonts.headingSemiBold,
  },
  stepTitle: {
    fontSize: 20,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  priceText: {
    fontSize: 24,
    fontFamily: fonts.headingBold,
    color: colors.green,
  },
  faqCard: {
    borderWidth: 1,
    borderColor: colors.softBorder,
    borderRadius: radii.card,
    padding: spacing.s,
    backgroundColor: "#FCFDFF",
    gap: spacing.xs,
  },
  faqQuestion: {
    fontSize: 19,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  finalSection: {
    borderColor: "#F6D4B6",
    backgroundColor: "#FFF9F2",
  },
  slideCard: {
    borderWidth: 1,
    borderColor: colors.softBorder,
    borderRadius: radii.card,
    backgroundColor: "#FCFDFF",
    padding: spacing.s,
    gap: spacing.xs,
  },
  slideTitle: {
    fontSize: 22,
    fontFamily: fonts.headingSemiBold,
    color: colors.darkText,
  },
  quoteText: {
    fontSize: 20,
    lineHeight: 30,
    fontFamily: fonts.headingSemiBold,
    color: colors.blue,
  },
  linkButton: {
    alignSelf: "flex-start",
    borderWidth: 1,
    borderColor: colors.blue,
    borderRadius: radii.button,
    paddingHorizontal: spacing.s,
    paddingVertical: spacing.xs,
    backgroundColor: colors.white,
  },
  linkButtonText: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.blue,
  },
  positioningText: {
    marginTop: spacing.s,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.bodyMedium,
    color: colors.blue,
  },
});
