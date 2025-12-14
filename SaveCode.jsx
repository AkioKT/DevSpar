export default function SaveCode() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [showItemDetail, setShowItemDetail] = useState(false);
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
  const handleItemPress = (item, slot) => {
    setSelectedItem({ ...item, slot });
    setShowItemDetail(true);
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
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>BACKPACK ITEMS</Text>
      <View style={styles.backpackGrid}>
        {backpackItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.backpackSlot}
            onPress={() => handleItemPress(item, "backpack")}
            activeOpacity={0.8}
          >
            <View style={styles.slotContent}>{renderIcon(item)}</View>
          </TouchableOpacity>
        ))}

        {/* Empty Slots */}
        {[...Array(9 - backpackItems.length)].map((_, index) => (
          <View key={`empty_${index}`} style={styles.backpackSlot}>
            <View style={styles.slotContent} />
          </View>
        ))}
      </View>
    </View>
  );
}


import styles from "./styles/QuickResumeCard";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useContext } from "react";
import { ProgressContext } from "../../../context/ProgressOverview";
import allLevels from "../../../../assets/data/HTML/AllLevel";
import HtmlIcon from "../../../../assets/image/HTML.png";
import CssIcon from "../../../../assets/image/CSS.png";
import JsIcon from "../../../../assets/image/JS.png";
import PythonIcon from "../../../../assets/image/PYTHON.png";
import PhpIcon from "../../../../assets/image/PHP.png";

export default function QuickResumeCard() {
  const navigation = useNavigation();
  const { recentActivity } = useContext(ProgressContext);
  const level = Number(recentActivity?.lesson?.match(/\d+/)?.[0] ?? 0);
  const levelMinusOne = level - 1;
  const totalLevel = Object.keys(allLevels).length;
  const progress = (levelMinusOne * 100) / totalLevel;
  const courseIcons = {
    HTML: HtmlIcon,
    CSS: CssIcon,
    JavaScript: JsIcon,
    Python: PythonIcon,
    PHP: PhpIcon,
  };
  const courseName = recentActivity?.course;
  const courseIcon = courseIcons[courseName] || DefaultIcon;

  return (
    <View style={styles.quickresumecard}>
      <TouchableOpacity
        style={styles.continueBtn}
        onPress={() => {
          if (!recentActivity) return;
          navigation.navigate("LearningScreen", {
            levelId: recentActivity.levelId,
          });
        }}
      >
        {/* Text Section */}
        <View style={{ flex: 1 }}>
          <Text style={styles.cardTitle}>
            {recentActivity?.course ?? "No recent"}
          </Text>
          <Text style={styles.cardSub}>Level: {levelMinusOne}</Text>
          <Text style={styles.continueText}>Tap to continue</Text>
        </View>

        {/* Course Icon */}
        <Image
          source={courseIcon}
          style={{ width: 60, height: 60, resizeMode: "contain" }}
        />
      </TouchableOpacity>
    </View>
  );
}
