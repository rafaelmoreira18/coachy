import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import { SafeAreaView } from 'react-native-safe-area-context';

// --- Type Definitions ---
interface Session {
  image: string;
  title: string;
  instructor: string;
}

interface User {
  image: string;
  name: string;
  level: string;
}

interface Stat {
  title: string;
  value: string;
}

interface EngagementData {
  label: string;
  height: string;
}

// --- Data ---
const upcomingSessions: Session[] = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD_mZwmO3h1P55Dcfbl7etA5BVICMcV_c2KMwnj97_7fiWiucyTY4tcOD8LGj51aHvEw3gvb3u8Ii5KlZ3chn6NWbg4jmhCxPNr6j2Plhp84X6w7DEvbuig-vU7QbVObFzwwPBduRgGGsFtw4BYns55B4XWKu8RGYOq0aaeW_1lvXS-VF6L5qN3jMAdso0GjiY75w00ph9dwCY_WstViyDihJjp9tzCW-ZpgDg5DnXQZaE_1_Aoy0CRnNWySeRLX-ooE03ZGKPsI8VT',
    title: 'Strength Training',
    instructor: 'with Alex',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA4iJgnfmM7i2onH6xPsn19QZOBO2GSNbKhHHceomDAg0WVZ6bLhJOtRco4sBj0F7VHBWHmZ80dyg1CXkXRuhbPwY4y1OzLWuRdvQiPA3RSnix4VDxcxfdryB7WAozYhcXQxxXpMDkbOkvtaHPgaOfk5BKftP5gxdLkYFI8tvKVdv-P2agqCkXxTa6i4_HQSVkOg7cnoMOZl7jNyKDrPdZJNJyi3icQO3tILzuEeSwNtpFuq89SeO0UKWY6YZ7ESjhSnmUygL_SbYB9',
    title: 'Yoga',
    instructor: 'with Sarah',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8kY4SaNdPUIjGCbLsSE0IcEj4CDj1eyNA2oKXP59am1tXZ5FOizSBMVVpm6mal21YibcGEiNeWJyHKgZJV8Ey7wP3ykcz10FsDhBubMmw2UkYMt0SrFAThEBy2VpQHZqGKtG8tR2T8PpX0Kxx0nEMY2n7u2BFqnUttwvvS86pTRA3TccVx2E-Qm8NpQouj9GoSBt2MpASOk2XJD-WOl8yGJHPVqYcoIOxDxOb6FS6SHnRy6VcdSg2oZrh4fG5z43PrtArESDHnjcO',
    title: 'Cardio',
    instructor: 'with Mike',
  },
];

const dashboardUsers: User[] = [
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsXBGqZIqAjdrtNlvNmzA4wWFDIRguhQ9WWuxiDK1jkeH7QZ9izzqz4Hii2z1hpZY3_howagL7OjMFCxmtuMNdVpKkyL9_nUY180tdfNs_2p2eAmqNRR5QRKu-1GhbIxTuBlKeDRFHpYMVfZTbIumdpwix0ZgvLIdXN86ySi-RX0CArdGiCBZHULIl_FVLCaotd8qEoQPrEgTfRF2mpSa-jRVxbjZn4GN2RMzzgi3rcrliP6jzbO4P0ej9nNu-m3UZSWvPIKEouBb3',
    name: 'Emily',
    level: 'Beginner',
  },
  {
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0tJdC96N2wUmo7p5xehCgRpOcm9RD23stFaI0wUzFcaVMCqIdQtOG0b6xN93mb53XMTNPw2NIfsjOsyhcQUQDSzMk2EyrI0l78I-VxLdRYT0rNtbcV8tmLr4GS5meMx271gHgsFV7bVEXUd6L6jf1gBXZMhh0GY3OOGqA42rBWa1lZSnXM7NxRUBupPb39d1pl4GTirAd2Bbr8NkPHlknfcPzHKx3dqIrBOQ9UMhVnHkiCuxyrplx8y0HfBXS3ZYwwryWm-5g6hkW',
    name: 'David',
    level: 'Intermediate',
  },
];

const stats: Stat[] = [
    { title: 'Total Earnings', value: '$5,200' },
    { title: 'Active Clients', value: '15' },
    { title: 'Avg. Client Rating', value: '4.8' },
];

const engagementData: EngagementData[] = [
  { label: 'Week 1', height: '50' },
  { label: 'Week 2', height: '20' },
  { label: 'Week 3', height: '80' },
  { label: 'Week 4', height: '100' },
];

const { width } = Dimensions.get('window');
const cardGutter = 16;
const cardAndGutterWidth = (width - cardGutter * 3) / 2; // Gutter left, between, and right

// --- Component ---
const PersonalScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerIconContainer}>
            <Image
                style={styles.headerAvatar}
                source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAntQb8EEOuKtZ1v-6DH3HujY_LWufGKejHdm1Hg1EJo4hxjAOMDw33xjP3YWD-xOlJI6IwThOX2XERa5YD4v-fCn3DD0l795z7xgoz0okeJdMLH_bqQPgUqn18oLTDT98vUjF0csyYd2LUKeuOu_pjyGCTtQUztLHhmyuwPHJf2eHPWj590IiexotVLxenkBJfUHQIo-dAOeS4Wd0Z9LQ0QQdIvrk2Oto_YcjSrxlV-ahpcEc2Eh9467hAVbm2oQEpZJTDJo86dsvB' }}
            />
          </View>
          <Text style={styles.headerTitle}>Home</Text>
        </View>

        {/* Section Title: Upcoming Sessions */}
        <Text style={styles.sectionTitle}>Upcoming Sessions</Text>

        {/* Upcoming Sessions List */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.horizontalScroll}>
          {upcomingSessions.map((session, index) => (
            <View key={index} style={styles.sessionCard}>
              <ImageBackground
                style={styles.sessionImage}
                imageStyle={{ borderRadius: 12 }}
                source={{ uri: session.image }}
              />
              <View>
                <Text style={styles.sessionTitle}>{session.title}</Text>
                <Text style={styles.sessionSubtitle}>{session.instructor}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Section Title: Dashboard */}
        <Text style={styles.sectionTitle}>Dashboard</Text>

        {/* Dashboard User List */}
        {dashboardUsers.map((user, index) => (
          <View key={index} style={styles.userRow}>
            <View style={styles.userInfo}>
                <Image style={styles.userAvatar} source={{uri: user.image}} />
                <View>
                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userLevel}>{user.level}</Text>
                </View>
            </View>
            <TouchableOpacity style={styles.acceptButton}>
                <Text style={styles.acceptButtonText}>Accept</Text>
            </TouchableOpacity>
          </View>
        ))}
        
        {/* View All Button */}
        <View style={styles.viewAllContainer}>
            <TouchableOpacity style={styles.viewAllButton}>
                <Text style={styles.viewAllButtonText}>View All</Text>
            </TouchableOpacity>
        </View>
        
        {/* Stats Cards */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <View key={index} style={[styles.statCard, {minWidth: cardAndGutterWidth, flex: 1}]}>
              <Text style={styles.statCardTitle}>{stat.title}</Text>
              <Text style={styles.statCardValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        {/* Charts Container */}
        <View style={styles.chartsContainer}>
            {/* Earnings Trend Chart */}
            <View style={styles.chartCard}>
                <Text style={styles.chartTitle}>Earnings Trend</Text>
                <Text style={styles.chartMainValue}>+12%</Text>
                <View style={styles.chartSubtitleContainer}>
                    <Text style={styles.chartSubtitleText}>Last 3 Months</Text>
                    <Text style={styles.chartSubtitlePercent}>+12%</Text>
                </View>
                <View style={styles.lineChartContainer}>
                    <Svg height="148" width="100%" viewBox="-3 0 478 150" preserveAspectRatio="none">
                        <Defs>
                            <LinearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                                <Stop offset="0" stopColor="#293238" stopOpacity="0.8"/>
                                <Stop offset="1" stopColor="#293238" stopOpacity="0"/>
                            </LinearGradient>
                        </Defs>
                        <Path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25V149H0V109Z" fill="url(#gradient)"/>
                        <Path d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 1 363.077 1C381.231 1 381.231 81 399.385 81C417.538 81 417.538 129 435.692 129C453.846 129 453.846 25 472 25" stroke="#9dadb8" strokeWidth="3"/>
                    </Svg>
                    <View style={styles.chartXAxisLabels}>
                        <Text style={styles.chartLabel}>Jan</Text>
                        <Text style={styles.chartLabel}>Feb</Text>
                        <Text style={styles.chartLabel}>Mar</Text>
                    </View>
                </View>
            </View>

            {/* Client Engagement Chart */}
            <View style={[styles.chartCard, {marginTop: 16}]}>
                <Text style={styles.chartTitle}>Client Engagement</Text>
                <Text style={styles.chartMainValue}>20%</Text>
                 <View style={styles.chartSubtitleContainer}>
                    <Text style={styles.chartSubtitleText}>This Month</Text>
                    <Text style={styles.chartSubtitlePercent}>+20%</Text>
                </View>
                <View style={styles.barChartContainer}>
                    {engagementData.map((week) => {
                      // Altura máxima da barra (em px)
                      const maxBarHeight = 120;
                      const percent = Number(week.height) / 100;
                      return (
                        <View key={week.label} style={styles.barWrapper}>
                          <View style={[styles.bar, {height: maxBarHeight * percent}]} />
                          <Text style={styles.chartLabel}>{week.label}</Text>
                        </View>
                      );
                    })}
                </View>
            </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

// --- Stylesheet ---
const colors = {
    background: '#111518',
    surface: '#293238',
    border: '#3C4953',
    textPrimary: '#FFFFFF',
    textSecondary: '#9DADB8',
    accentGreen: '#0BDA5B',
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
        fontFamily: 'Lexend_400Regular'
    },
    scrollView: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 16,
        paddingBottom: 8,
    },
    headerIconContainer: {
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    headerAvatar: {
        width: 32,
        height: 32,
        borderRadius: 16,
    },
    headerTitle: {
        flex: 1,
        color: colors.textPrimary,
        fontSize: 18,
        fontFamily: 'Lexend_700Bold',
        textAlign: 'center',
        marginRight: 48, // To offset the icon container and truly center the title
    },
    sectionTitle: {
        color: colors.textPrimary,
        fontSize: 22,
        fontFamily: 'Lexend_700Bold',
        paddingHorizontal: 16,
        paddingBottom: 12,
        paddingTop: 20,
    },
    horizontalScroll: {
        paddingHorizontal: 16,
        paddingVertical: 4,
        gap: 12,
    },
    sessionCard: {
        width: 160,
        gap: 16,
    },
    sessionImage: {
        width: '100%',
        aspectRatio: 1,
        borderRadius: 12,
    },
    sessionTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    sessionSubtitle: {
        color: colors.textSecondary,
        fontSize: 14,
        fontFamily: 'Lexend_400Regular',
    },
    userRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 8,
    },
    userInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    userAvatar: {
        width: 56,
        height: 56,
        borderRadius: 28,
    },
    userName: {
        color: colors.textPrimary,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    userLevel: {
        color: colors.textSecondary,
        fontSize: 14,
    },
    acceptButton: {
        backgroundColor: colors.surface,
        minWidth: 84,
        height: 32,
        borderRadius: 16,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    acceptButtonText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontFamily: 'Lexend_500Medium',
    },
    viewAllContainer: {
        alignItems: 'flex-end',
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4
    },
    viewAllButton: {
        backgroundColor: colors.surface,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 16,
    },
    viewAllButtonText: {
        color: colors.textPrimary,
        fontSize: 14,
        fontFamily: 'Lexend_700Bold',
        letterSpacing: 0.2,
    },
    statsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 16,
        gap: 16,
    },
    statCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 24,
        gap: 8,
    },
    statCardTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    statCardValue: {
        color: colors.textPrimary,
        fontSize: 24,
        fontFamily: 'Lexend_700Bold',
        letterSpacing: -0.2,
    },
    chartsContainer: {
        paddingHorizontal: 16,
        paddingVertical: 24,
    },
    chartCard: {
        borderRadius: 12,
        borderWidth: 1,
        borderColor: colors.border,
        padding: 24,
        gap: 4
    },
    chartTitle: {
        color: colors.textPrimary,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium'
    },
    chartMainValue: {
        color: colors.textPrimary,
        fontSize: 32,
        fontFamily: 'Lexend_700Bold',
        letterSpacing: -0.3,
    },
    chartSubtitleContainer: {
        flexDirection: 'row',
        gap: 4,
        alignItems: 'center',
    },
    chartSubtitleText: {
        color: colors.textSecondary,
        fontSize: 16,
    },
    chartSubtitlePercent: {
        color: colors.accentGreen,
        fontSize: 16,
        fontFamily: 'Lexend_500Medium',
    },
    lineChartContainer: {
        minHeight: 180,
        paddingVertical: 16,
        gap: 32,
    },
    chartXAxisLabels: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    chartLabel: {
        color: colors.textSecondary,
        fontSize: 13,
        fontFamily: 'Lexend_700Bold',
    },
    barChartContainer: {
        minHeight: 180,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingTop: 16,
        paddingHorizontal: 12,
        gap: 24
    },
    barWrapper: {
        flex: 1,
        alignItems: 'center',
        gap: 8,
    },
    bar: {
        width: '100%',
        backgroundColor: colors.surface,
        borderTopWidth: 2,
        borderColor: colors.border,
    }
});

export default PersonalScreen;
