import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'; // 1. Imported TextInput
import { database } from '../../_data';
import { useTheme } from '../../theme/ThemeContext';

export default function RestaurantScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  
  // Theme state & bulletproof dark mode detection
  const { theme, colors } = useTheme(); 
  const isDark = 
    theme === 'dark' || 
    theme === true || 
    (typeof theme === 'string' && theme.toLowerCase() === 'dark') ||
    colors.text === '#ffffff' || 
    colors.text === '#fff';

  const currentRestaurant = database[id as string];

  // State engines for filtering
  const [excludedAllergens, setExcludedAllergens] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState(''); // 2. Added search query state

  if (!currentRestaurant) {
    return (
      <SafeAreaView style={[styles.centerContainer, { backgroundColor: colors.background || '#121212' }]}>
        <Text style={styles.errorText}>Restaurant profile not found.</Text>
      </SafeAreaView>
    );
  }

  // Collect unique allergens
  const availableAllergens = Array.from(
    new Set(
      currentRestaurant.items.flatMap((item: any) => Object.keys(item.allergens || {}))
    )
  ).sort();

  const toggleAllergenFilter = (allergen: string) => {
    if (excludedAllergens.includes(allergen)) {
      setExcludedAllergens(excludedAllergens.filter((a) => a !== allergen));
    } else {
      setExcludedAllergens([...excludedAllergens, allergen]);
    }
  };

  // 3. COMBINED FILTER STEP: Evaluates allergen flags AND searches item names/notes
  const filteredItems = currentRestaurant.items.filter((item: any) => {
  const matchesAllergens = !excludedAllergens.some(
    (allergen) => item.allergens?.[allergen] === true
  );

  const matchesSearch =
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

  return matchesAllergens && matchesSearch;
});


  // Group the filtered results by category
  const sections = filteredItems.reduce((acc: any, item: any) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  // Dynamic Theme Styling Map
  const dynamicStyles = {
    safeArea: { backgroundColor: colors.background || (isDark ? '#121212' : '#f2f2f7') },
    header: { backgroundColor: isDark ? '#1a1a1a' : '#ffffff', borderBottomColor: isDark ? '#222' : '#e5e5ea' },
    textMain: { color: colors.text || (isDark ? '#ffffff' : '#000000') },
    textMuted: { color: isDark ? '#aaa' : '#666' },
    card: { 
      backgroundColor: colors.card || (isDark ? '#1c1c1e' : '#ffffff'), 
      borderColor: colors.border || (isDark ? '#2c2c2e' : '#e5e5ea') 
    },
    noticeBox: { 
      backgroundColor: colors.card || (isDark ? '#1c1c1e' : '#f2f2f7'), 
      borderColor: colors.border || (isDark ? '#2c2c2e' : '#e5e5ea') 
    },
    categoryTitle: { 
      color: isDark ? '#ffd60a' : '#856404', 
      borderBottomColor: isDark ? '#333333' : '#e5e5ea' 
    },
    filterLabel: { color: isDark ? '#ebebf5' : '#3c3c43' },
    chipUnselected: {
      backgroundColor: isDark ? '#2c2c2e' : '#e5e5ea',
      borderColor: isDark ? '#3a3a3c' : '#d1d1d6',
    },
    // 4. Added Search Input dynamic styles so text stays visible across themes
    searchInput: {
      backgroundColor: isDark ? '#1c1c1e' : '#ffffff',
      borderColor: isDark ? '#2c2c2e' : '#e5e5ea',
      color: isDark ? '#ffffff' : '#000000'
    }
  };

  return (
    <SafeAreaView style={[styles.safeArea, dynamicStyles.safeArea]}>
      {/* Header Bar */}
      <View style={[styles.header, dynamicStyles.header]}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={[styles.title, dynamicStyles.textMain]}>{currentRestaurant.name}</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Important Restaurant Notes / Notices */}
        {currentRestaurant.restaurantNotes && (
          <View style={[styles.notesContainer, dynamicStyles.noticeBox]}>
            <Text style={[styles.notesText, dynamicStyles.textMuted]}>{currentRestaurant.restaurantNotes}</Text>
          </View>
        )}

        {/* 5. NEW: Search Input UI Control */}
        <View style={styles.searchContainer}>
          <TextInput
            style={[styles.searchInput, dynamicStyles.searchInput]}
            placeholder="Search menu items..."
            placeholderTextColor={isDark ? '#666' : '#999'}
            value={searchQuery}
            onChangeText={setSearchQuery}
            clearButtonMode="while-editing"
            autoCorrect={false}
          />
        </View>

        {/* Filter Controls Section */}
        {availableAllergens.length > 0 && (
          <View style={styles.filterSection}>
            <Text style={[styles.filterSectionTitle, dynamicStyles.filterLabel]}>
              Tap to Exclude Allergens:
            </Text>
            <View style={styles.filterContainer}>
              {availableAllergens.map((allergen) => {
                const isExcluded = excludedAllergens.includes(allergen);
                return (
                  <TouchableOpacity
                    key={allergen}
                    onPress={() => toggleAllergenFilter(allergen)}
                    style={[
                      styles.filterChip,
                      isExcluded ? styles.chipSelected : dynamicStyles.chipUnselected
                    ]}
                  >
                    <Text
                      style={[
                        styles.filterChipText,
                        { color: isExcluded ? '#ffffff' : (isDark ? '#ffffff' : '#000000') }
                      ]}
                    >
                      {allergen.toUpperCase()} {isExcluded ? '🛑' : '⚪'}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        {/* Dynamic Categories and Items List */}
        {Object.keys(sections).map((category) => (
          <View key={category} style={styles.categorySection}>
            <Text style={[styles.categoryTitle, dynamicStyles.categoryTitle]}>{category}</Text>
            
            {sections[category].map((item: any) => (
              <View key={item.id} style={[styles.itemCard, dynamicStyles.card]}>
                <View style={styles.itemHeader}>
                  <Text style={[styles.itemName, dynamicStyles.textMain]}>{item.name}</Text>
                </View>

                {/* Allergen Badges Layout */}
                <View style={styles.allergenRow}>
                  {Object.entries(item.allergens).map(([allergen, contains]) => (
                    <View 
                      key={allergen} 
                      style={[
                        styles.allergenBadge, 
                        { backgroundColor: contains ? '#4a151b' : '#1e3a1f' }
                      ]}
                    >
                      <Text style={[styles.allergenText, { color: contains ? '#ff8585' : '#85ff85' }]}>
                        {allergen.toUpperCase()}: {contains ? '❌' : '✅'}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* Individual Item Notes */}
                {item.notes ? (
                  <Text style={[styles.itemNotes, dynamicStyles.textMuted]}>Note: {item.notes}</Text>
                ) : null}
              </View>
            ))}
          </View>
        ))}

        {/* Fallback UI if filters/search clear out all menu items */}
        {filteredItems.length === 0 && (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, dynamicStyles.textMuted]}>
              No menu items match your search or filtering settings.
            </Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { padding: 20, borderBottomWidth: 1 },
  backButton: { marginBottom: 8 },
  backButtonText: { color: '#007AFF', fontSize: 16, fontWeight: '600' },
  title: { fontSize: 32, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  notesContainer: { padding: 16, borderRadius: 8, marginBottom: 24, borderWidth: 1 },
  notesText: { fontSize: 14, lineHeight: 22 },
  
  // Search UI Styles
  searchContainer: { marginBottom: 20 },
  searchInput: { paddingHorizontal: 16, paddingVertical: 12, borderRadius: 10, borderWidth: 1, fontSize: 16 },
  
  // Filter System Styles
  filterSection: { marginBottom: 24 },
  filterSectionTitle: { fontSize: 14, fontWeight: '600', marginBottom: 10, letterSpacing: 0.3 },
  filterContainer: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  filterChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1 },
  chipSelected: { backgroundColor: '#bd2c3d', borderColor: '#e63946' },
  filterChipText: { fontSize: 12, fontWeight: '700' },
  
  categorySection: { marginBottom: 24 },
  categoryTitle: { fontSize: 22, fontWeight: 'bold', marginBottom: 12, borderBottomWidth: 1, paddingBottom: 4 },
  itemCard: { padding: 14, borderRadius: 8, marginBottom: 10, borderWidth: 1 },
  itemHeader: { marginBottom: 8 },
  itemName: { fontSize: 18, fontWeight: '600' },
  allergenRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  allergenBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 4 },
  allergenText: { fontSize: 11, fontWeight: '700' },
  itemNotes: { fontSize: 13, marginTop: 8, fontStyle: 'italic' },
  errorText: { color: '#ff453a', fontSize: 16 },
  emptyContainer: { padding: 32, alignItems: 'center' },
  emptyText: { fontSize: 15, textAlign: 'center' }
});