// InventoryScreen.js
import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome5,
} from "@expo/vector-icons";
import { useContext } from "react";
import { EquipmentContext } from "../../../context/EquipmentContext";

export default function InventoryScreen() {
  const { equipment, equipItem, unequipItem } = useContext(EquipmentContext);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetail, setShowItemDetail] = useState(false);
  const [activeSlot, setActiveSlot] = useState(null);

  const EQUIPMENT_SLOTS = {
    weapon: {
      label: "STRENGTH",
      emptyIcon: { name: "sword", lib: "MaterialCommunityIcons" },
    },
    armor: {
      label: "DEFENSE",
      emptyIcon: { name: "shield", lib: "MaterialCommunityIcons" },
    },
    relic: {
      label: "RELIC",
      emptyIcon: { name: "gem", lib: "FontAwesome5" },
    },
  };

  // Backpack Items
  const [backpackItems, setBackpackItems] = useState([
    {
      id: "item_1",
      name: "Health Potion",
      icon: "flask",
      iconLib: "FontAwesome5",
      color: "#ff4b4b",
      type: "consumable",
      description: "Restores 50 HP",
    },
    {
      id: "item_2",
      name: "Mana Potion",
      icon: "flask-outline",
      iconLib: "MaterialCommunityIcons",
      color: "#4a90e2",
      type: "consumable",
      description: "Restores 30 Mana",
    },
    {
      id: "item_3",
      name: "Experience Gem",
      icon: "diamond",
      iconLib: "MaterialCommunityIcons",
      color: "#50fa7b",
      type: "material",
      description: "Grants 100 XP",
    },
  ]);

  const renderEmptyIcon = (icon) => {
    const props = { name: icon.name, size: 32, color: "#3d3d3d" };

    switch (icon.lib) {
      case "FontAwesome5":
        return <FontAwesome5 {...props} />;
      case "MaterialCommunityIcons":
      default:
        return <MaterialCommunityIcons {...props} />;
    }
  };

  const playerLevel = 12;

  const handleItemPress = (item, slot) => {
    setSelectedItem({ ...item, slot });
    setShowItemDetail(true);
  };

  const handleUseItem = () => {
    if (!selectedItem) return;

    Alert.alert("Use Item", `Do you want to use ${selectedItem.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Use",
        onPress: () => {
          // Remove item from backpack
          setBackpackItems(
            backpackItems.filter((item) => item.id !== selectedItem.id)
          );
          setShowItemDetail(false);
          Alert.alert("Success", `Used ${selectedItem.name}!`);
        },
      },
    ]);
  };

  const handleEquipItem = () => {
    equipItem(selectedItem.slot, selectedItem);
    setShowItemDetail(false);
  };

  const handleUnequipItem = () => {
    unequipItem(selectedItem.slot);
    setShowItemDetail(false);
  };

  const renderIcon = (item) => {
    const iconProps = {
      name: item.icon,
      size: 32,
      color: item.color,
    };

    switch (item.iconLib) {
      case "MaterialCommunityIcons":
        return <MaterialCommunityIcons {...iconProps} />;
      case "Ionicons":
        return <Ionicons {...iconProps} />;
      case "FontAwesome5":
        return <FontAwesome5 {...iconProps} />;
      default:
        return <MaterialCommunityIcons {...iconProps} />;
    }
  };

  return (
    <View>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <MaterialCommunityIcons
            name="treasure-chest"
            size={24}
            color="#ffd700"
          />
          <Text style={styles.headerTitle}>Power Up</Text>
        </View>
      </View>
      <View style={styles.container}>
        {/* Equipment Section */}
        <View style={styles.section}>
          <View style={styles.equipmentRow}>
            {Object.entries(EQUIPMENT_SLOTS).map(([slotKey, slotConfig]) => {
              const item = equipment[slotKey];

              return (
                <TouchableOpacity
                  key={slotKey}
                  style={styles.equipmentSlot}
                  onPress={() => item && handleItemPress(item, slotKey)}
                  activeOpacity={0.8}
                >
                  <View style={styles.slotContent}>
                    {item
                      ? renderIcon(item)
                      : renderEmptyIcon(slotConfig.emptyIcon)}
                  </View>

                  <Text style={styles.slotLabel}>{slotConfig.label}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Item Detail Modal */}
        <Modal
          visible={showItemDetail}
          transparent
          animationType="fade"
          onRequestClose={() => setShowItemDetail(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {selectedItem && (
                <>
                  {/* Item Icon */}
                  <View style={styles.modalIcon}>
                    {renderIcon(selectedItem)}
                  </View>

                  {/* Item Name */}
                  <Text style={styles.modalItemName}>{selectedItem.name}</Text>

                  {/* Rarity Badge */}
                  {selectedItem.rarity && (
                    <View style={styles.rarityBadge}>
                      <Text style={styles.rarityText}>
                        {selectedItem.rarity}
                      </Text>
                    </View>
                  )}

                  {/* Description */}
                  {selectedItem.description && (
                    <Text style={styles.modalDescription}>
                      {selectedItem.description}
                    </Text>
                  )}

                  {/* Stats */}
                  {selectedItem.stats && (
                    <View style={styles.statsContainer}>
                      {Object.entries(selectedItem.stats).map(
                        ([key, value]) => (
                          <View key={key} style={styles.statRow}>
                            <Text style={styles.statLabel}>
                              {key.toUpperCase()}:
                            </Text>
                            <Text style={styles.statValue}>+{value}</Text>
                          </View>
                        )
                      )}
                    </View>
                  )}

                  {/* Action Buttons */}
                  <View style={styles.modalButtons}>
                    {selectedItem.slot === "backpack" ? (
                      <TouchableOpacity
                        style={styles.useButton}
                        onPress={handleUseItem}
                        activeOpacity={0.8}
                      >
                        {isEquipped && (
                          <Text style={{ color: "#22c55e", fontSize: 12 }}>
                            EQUIPPED
                          </Text>
                        )}
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={styles.equipButton}
                        onPress={handleEquipItem}
                        activeOpacity={0.8}
                      >
                        <Text style={styles.equipButtonText}>UNEQUIP</Text>
                      </TouchableOpacity>
                    )}

                    <TouchableOpacity
                      style={styles.closeButton}
                      onPress={() => setShowItemDetail(false)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.closeButtonText}>CLOSE</Text>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1a1f3a",
    position: "relative",
    marginBottom: 20,
    padding: 10,
    borderWidth: 3,
    borderColor: "#3d5a80",
    borderRadius: 4,
  },

  // Header
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  headerTitle: {
    fontFamily: "Pixel-Bold",
    fontSize: 24,
    color: "#ffd700",
    textShadowColor: "#8b6914",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 0,
  },
  levelBadge: {
    backgroundColor: "#2a2520",
    borderWidth: 2,
    borderColor: "#8b6914",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 4,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  levelLabel: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#ffd700",
    fontWeight: "600",
  },
  levelValue: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
  },

  sectionTitle: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#d4af37",
    fontWeight: "600",
    marginBottom: 12,
    letterSpacing: 1,
  },

  // Equipment Row
  equipmentRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },

  equipmentSlot: {
    width: "25%", // 4 item per baris
    alignItems: "center",
    marginBottom: 16, // jarak antar baris
  },

  slotContent: {
    width: 72,
    height: 72,
    backgroundColor: "#0a0e27",
    borderWidth: 2,
    borderColor: "#4a3f30",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 6,
  },

  slotLabel: {
    fontFamily: "monospace",
    fontSize: 10,
    color: "#a89968",
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  // Backpack Grid
  backpackGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  backpackSlot: {
    width: 80,
    height: 80,
    backgroundColor: "#2a2520",
    borderWidth: 2,
    borderColor: "#4a3f30",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  modalContent: {
    backgroundColor: "#2a2520",
    borderWidth: 3,
    borderColor: "#8b6914",
    borderRadius: 8,
    padding: 24,
    width: "100%",
    maxWidth: 320,
    alignItems: "center",
  },
  modalIcon: {
    width: 80,
    height: 80,
    backgroundColor: "#1a1510",
    borderWidth: 2,
    borderColor: "#4a3f30",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  modalItemName: {
    fontFamily: "monospace",
    fontSize: 20,
    color: "#ffd700",
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  rarityBadge: {
    backgroundColor: "#8b6914",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 4,
    marginBottom: 12,
  },
  rarityText: {
    fontFamily: "monospace",
    fontSize: 11,
    color: "#fff",
    fontWeight: "bold",
    letterSpacing: 1,
  },
  modalDescription: {
    fontFamily: "monospace",
    fontSize: 13,
    color: "#d4c5a0",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },

  // Stats
  statsContainer: {
    width: "100%",
    backgroundColor: "#1a1510",
    borderWidth: 1,
    borderColor: "#4a3f30",
    borderRadius: 4,
    padding: 12,
    marginBottom: 20,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  statLabel: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#a89968",
    fontWeight: "600",
  },
  statValue: {
    fontFamily: "monospace",
    fontSize: 12,
    color: "#50fa7b",
    fontWeight: "bold",
  },

  // Modal Buttons
  modalButtons: {
    width: "100%",
    gap: 10,
  },
  useButton: {
    backgroundColor: "#8b6914",
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#ffd700",
  },
  useButtonText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  equipButton: {
    backgroundColor: "#4a3f30",
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#8b6914",
  },
  equipButtonText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#ffd700",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
  },
  closeButton: {
    backgroundColor: "#1a1510",
    paddingVertical: 12,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#4a3f30",
  },
  closeButtonText: {
    fontFamily: "monospace",
    fontSize: 14,
    color: "#d4c5a0",
    fontWeight: "600",
    textAlign: "center",
    letterSpacing: 1,
  },
});
