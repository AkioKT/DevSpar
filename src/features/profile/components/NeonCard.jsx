import { View } from "react-native";
import styles from "../styles/ProfileScreen";
const NeonCard = ({ children, style, glowColor = "#3d5a80" }) => (
  <View
    style={[
      styles.neonCard,
      {
        shadowColor: glowColor,
        borderColor: glowColor,
      },
      style,
    ]}
  >
    {children}
  </View>
);

export default NeonCard;
