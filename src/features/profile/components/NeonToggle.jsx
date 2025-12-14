import styles from "../styles/ProfileScreen";
import { View, TouchableOpacity } from "react-native";
const NeonToggle = ({ value, onValueChange }) => (
  <TouchableOpacity
    onPress={() => onValueChange(!value)}
    style={[styles.toggleContainer, value && styles.toggleContainerActive]}
    activeOpacity={0.8}
  >
    <View style={[styles.toggleThumb, value && styles.toggleThumbActive]} />
  </TouchableOpacity>
);

export default NeonToggle;
