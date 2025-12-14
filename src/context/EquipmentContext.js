import React, { createContext, useState } from "react";

export const EquipmentContext = createContext();

const initialEquipment = {
  weapon: {
    id: "weapon_1",
    name: "Code Sword",
    icon: "sword",
    iconLib: "MaterialCommunityIcons",
    color: "#ffd700",
    rarity: "Legendary",
    stats: { attack: 50, speed: 10 },
  },
  armor: {
    id: "armor_1",
    name: "Debug Shield",
    icon: "shield",
    iconLib: "MaterialCommunityIcons",
    color: "#4a90e2",
    rarity: "Epic",
    stats: { defense: 40, hp: 100 },
  },
  relic: {
    id: "relic_1",
    name: "Memory Crystal",
    icon: "gem",
    iconLib: "FontAwesome5",
    color: "#c77dff",
    rarity: "Rare",
    stats: { mana: 80, wisdom: 15 },
  },
};

export const EquipmentProvider = ({ children }) => {
  const [equipment, setEquipment] = useState(initialEquipment);

  const equipItem = (slot, item) => {
    setEquipment((prev) => ({
      ...prev,
      [slot]: item,
    }));
  };

  const unequipItem = (slot) => {
    setEquipment((prev) => ({
      ...prev,
      [slot]: null,
    }));
  };

  return (
    <EquipmentContext.Provider value={{ equipment, equipItem, unequipItem }}>
      {children}
    </EquipmentContext.Provider>
  );
};
