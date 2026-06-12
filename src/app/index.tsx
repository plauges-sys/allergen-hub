import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../theme/ThemeContext'; // Matches your local context path

// Unified data directory index import
import { database } from '../_data';

const tags = ["All", "Burgers", "Mexican", "Fast Casual", "Classic"];

export default function DashboardScreen() {
  const { colors, themeMode, setExplicitTheme } = useTheme();
  const router = useRouter(); // Expo Router link hook instance
  
  // UI Control State
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  // Quick helper to close menu and change theme
  const handleThemeChange = (mode: 'light' | 'dark' | 'system') => {
    setExplicitTheme(mode);
  };

  // Filter Logic over local data files
  const filteredRestaurants = Object.keys(database).filter((key) => {
    const restaurant = database[key];
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTag = selectedTag === "All" || restaurant.tags.includes(selectedTag);
    return matchesSearch && matchesTag;
  });

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      
      {/* APP HEADER ROW */}
      <View style={[styles.header, { backgroundColor: colors.cardBackground, borderBottomColor: colors.background }]}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
          <View>
            <Text style={[styles.headerTitle, { color: colors.text }]}>SafeDine Menu</Text>
            <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>Find allergen transparency instantly</Text>
          </View>

          {/* HAMBURGER MENU BUTTON */}
          <TouchableOpacity 
            onPress={() => setIsMenuOpen(true)}
            style={{ padding: 10, borderRadius: 8, backgroundColor: colors.background }}
          >
            <Ionicons name="menu" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>
      </View>

      {/* --- FLEXIBLE SLIDE-OUT MENU DRAWER --- */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isMenuOpen}
        onRequestClose={() => setIsMenuOpen(false)}
      >
        <View style={drawerStyles.modalBackdrop}>
          <TouchableOpacity 
            style={drawerStyles.backdropCloseArea} 
            activeOpacity={1} 
            onPress={() => setIsMenuOpen(false)} 
          />
          
          <View style={[drawerStyles.drawerSheet, { backgroundColor: colors.cardBackground }]}>
            <View style={[drawerStyles.drawerHeader, { borderBottomColor: colors.background }]}>
              <Text style={[drawerStyles.drawerTitle, { color: colors.text }]}>App Options</Text>
              <TouchableOpacity onPress={() => setIsMenuOpen(false)} style={drawerStyles.closeButton}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <ScrollView contentContainerStyle={drawerStyles.drawerContent}>
              <Text style={[drawerStyles.sectionLabel, { color: colors.textMuted }]}>APPEARANCE</Text>
              
              <View style={[drawerStyles.themeContainer, { backgroundColor: colors.background }]}>
                {(['system', 'light', 'dark'] as const).map((mode) => {
                  const isSelected = themeMode === mode;
                  const iconMap = { light: 'sunny', dark: 'moon', system: 'contrast' };
                  
                  return (
                    <TouchableOpacity
                      key={mode}
                      onPress={() => handleThemeChange(mode)}
                      style={[
                        drawerStyles.themeOption,
                        isSelected && { backgroundColor: colors.primaryButton }
                      ]}
                    >
                      <Ionicons 
                        name={iconMap[mode] as any} 
                        size={18} 
                        color={isSelected ? colors.buttonText : colors.text} 
                      />
                      <Text style={[
                        drawerStyles.themeText, 
                        { color: isSelected ? colors.buttonText : colors.text, fontWeight: isSelected ? '700' : '500' }
                      ]}>
                        {mode === 'system' ? 'System' : mode === 'light' ? 'Light' : 'Dark'}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>

              <Text style={[drawerStyles.sectionLabel, { color: colors.textMuted, marginTop: 24 }]}>
                FEATURES COMING SOON
              </Text>

              <View style={[drawerStyles.futureRow, { borderBottomColor: colors.background }]}>
                <Ionicons name="heart-outline" size={20} color={colors.textMuted} />
                <Text style={[drawerStyles.futureText, { color: colors.textMuted }]}>Favorite Items</Text>
              </View>

              <View style={[drawerStyles.futureRow, { borderBottomColor: colors.background }]}>
                <Ionicons name="options-outline" size={20} color={colors.textMuted} />
                <Text style={[drawerStyles.futureText, { color: colors.textMuted }]}>Default Allergen Profile</Text>
              </View>

              <View style={[drawerStyles.futureRow, { borderBottomColor: colors.background }]}>
                <Ionicons name="information-circle-outline" size={20} color={colors.textMuted} />
                <Text style={[drawerStyles.futureText, { color: colors.textMuted }]}>About SafeDine</Text>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* --- MAIN DASHBOARD CONTENT AREA --- */}
      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.searchInput, { backgroundColor: colors.cardBackground, color: colors.text, borderColor: colors.background }]}
          placeholder="Search restaurants by name..."
          placeholderTextColor={colors.textMuted}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <View style={styles.categoryOuterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryScroll}>
          {tags.map((tag) => {
            const isActive = selectedTag === tag;
            return (
              <TouchableOpacity
                key={tag}
                style={[
                  styles.categoryTab, 
                  { backgroundColor: isActive ? colors.primaryButton : colors.cardBackground }
                ]}
                onPress={() => setSelectedTag(tag)}
              >
                <Text style={[
                  styles.categoryTabText, 
                  { color: isActive ? colors.buttonText : colors.text }
                ]}>
                  {tag}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      <ScrollView style={styles.listContainer}>
        {filteredRestaurants.map((key) => {
          const restaurant = database[key];
          return (

            <TouchableOpacity
              key={key}
              style={[styles.restaurantCard, { backgroundColor: colors.cardBackground }]}
              onPress={() => router.push(`/restaurants/${key}`)} // Points to src/app/restaurants/[id].tsx
            >
              <View style={styles.restaurantCardRow}>
                <View>
                  <Text style={[styles.restaurantName, { color: colors.text }]}>{restaurant.name}</Text>
                  <View style={{ flexDirection: "row", gap: 4, marginTop: 6 }}>
                    {restaurant.tags.map((t) => (
                      <Text key={t} style={[styles.miniTag, { backgroundColor: colors.background, color: colors.textMuted }]}>{t}</Text>
                    ))}
                  </View>
                </View>
                <Text style={[styles.updateBadge, { backgroundColor: colors.background, color: colors.text }]}>Updated: {restaurant.lastUpdated}</Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

    </SafeAreaView>
  );
}

// --- MASTER APPLICATION STYLESHEET ---
const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  header: { padding: 20, borderBottomWidth: 1 },
  headerTitle: { fontSize: 24, fontWeight: "bold" },
  headerSubtitle: { fontSize: 14, marginTop: 4 },
  searchContainer: { paddingHorizontal: 16, marginTop: 12 },
  searchInput: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, fontSize: 15, borderWidth: 1 },
  categoryOuterContainer: { marginTop: 10, marginBottom: 5 },
  categoryScroll: { paddingHorizontal: 16, gap: 8 },
  categoryTab: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: 20 },
  categoryTabText: { fontSize: 13, fontWeight: "600" },
  listContainer: { flex: 1, paddingHorizontal: 16 },
  restaurantCard: { padding: 16, borderRadius: 12, marginTop: 12, borderWidth: 1 },
  restaurantCardRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  restaurantName: { fontSize: 16, fontWeight: "bold" },
  miniTag: { fontSize: 11, paddingHorizontal: 6, paddingVertical: 2, borderRadius: 4, overflow: "hidden" },
  updateBadge: { fontSize: 11, paddingVertical: 4, paddingHorizontal: 8, borderRadius: 6, fontWeight: "500" },
  restaurantTitleRow: { flexDirection: "row", alignItems: "baseline", gap: 10, marginTop: 4 },
  headerDateLabel: { fontSize: 12, fontStyle: "italic" },
  backButton: { marginBottom: 10 },
  backButtonText: { fontWeight: "600", fontSize: 14 },
  
  // --- COLLAPSIBLE FILTER BOX STYLES ---
  multiFilterBox: { 
    paddingHorizontal: 16, 
    paddingVertical: 12,
    marginVertical: 10, 
    borderBottomWidth: 1, 
    borderTopWidth: 1, 
  },
  filterHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 4,
  },
  filterGroupTitle: { 
    fontSize: 12, 
    fontWeight: "700", 
    textTransform: "uppercase",
    marginBottom: 0
  },
  filterToggleArrow: {
    fontSize: 12,
    fontWeight: "600",
  },
  filterGrid: { 
    paddingHorizontal: 2,
    marginTop: 8,
  },
  toggleRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 6, borderBottomWidth: 1 },
  filterLabel: { fontSize: 15, fontWeight: "500" },
  
  // --- MENU CARDS & BADGES ---
  card: { borderRadius: 10, padding: 16, marginBottom: 12, borderWidth: 1 },
  cardHeader: { marginBottom: 6 },
  itemName: { fontSize: 16, fontWeight: "bold" },
  categoryText: { fontSize: 11, textTransform: "uppercase", fontWeight: "600", marginTop: 2, marginBottom: 8 },
  notesText: { fontSize: 13, lineHeight: 18 },
  emptyText: { textAlign: "center", marginTop: 40, fontSize: 15 },
  badgeRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginBottom: 8,
    marginTop: 2,
  },
  allergenBadge: {
    fontSize: 11,
    fontWeight: "700",
    color: "#c92a2a",
    backgroundColor: "#fff5f5",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ffc9c9",
    overflow: "hidden",
  },
  // --- DISCLAIMER BANNER STYLES ---
  globalNotesBox: {
    backgroundColor: "#fff3cd", 
    padding: 14,
    paddingTop: 16,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#ffeeba",
    position: "relative",
  },
  globalNotesText: {
    fontSize: 13,
    color: "#856404", 
    lineHeight: 18,
    paddingRight: 20,
  },
  dismissBannerButton: {
    position: "absolute",
    top: 8,
    right: 12,
    zIndex: 10,
  },
  dismissBannerText: {
    fontSize: 22,
    fontWeight: "600",
    color: "#856404",
  }
});

// --- SEPARATE SETTINGS DRAWER STYLES ---
const drawerStyles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    flexDirection: 'row',
  },
  backdropCloseArea: {
    flex: 0.3,
  },
  drawerSheet: {
    flex: 0.7,
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 16,
    paddingTop: 40,
  },
  drawerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
    borderBottomWidth: 1,
  },
  drawerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  closeButton: {
    padding: 4,
  },
  drawerContent: {
    padding: 16,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 10,
  },
  themeContainer: {
    borderRadius: 10,
    padding: 6,
    gap: 4,
  },
  themeOption: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderRadius: 8,
  },
  themeText: {
    fontSize: 14,
    textTransform: 'capitalize',
  },
  futureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 14,
    borderBottomWidth: 1,
    opacity: 0.6,
  },
  futureText: {
    fontSize: 14,
  },
});