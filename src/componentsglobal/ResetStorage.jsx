import React, { useState } from "react";
import { TouchableOpacity, Text, Modal, View, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Updates from "expo-updates";

export default function ResetStorage() {
  const [visible, setVisible] = useState(false);

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      alert("Storage berhasil direset!");
      // setVisible(false);
      await Updates.reloadAsync();
    } catch (error) {
      console.log("Gagal menghapus storage:", error);
    }
  };

  return (
    <>
      {/* Button Reset */}
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={styles.resetBtn}
      >
        <Text style={styles.textFont}>Reset Storage</Text>
      </TouchableOpacity>

      {/* Modal Confirm */}
      <Modal
        transparent
        animationType="fade"
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.overlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Are you sure want to reset?</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.cancel]}
                onPress={() => setVisible(false)}
              >
                <Text style={styles.btnText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalBtn, styles.confirm]}
                onPress={clearStorage}
              >
                <Text style={styles.btnText}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  resetBtn: {
    width: "100%",
    backgroundColor: "#dc1a1aff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    borderRadius: 6,
  },
  textFont: {
    color: "#fff",
    fontFamily: "Pixel-Bold",
    fontSize: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#1e1e2e",
    padding: 20,
    borderRadius: 12,
  },
  modalTitle: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Pixel-Bold",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  cancel: {
    backgroundColor: "#444",
    marginRight: 10,
  },
  confirm: {
    backgroundColor: "#e63946",
  },
  btnText: {
    color: "#fff",
    fontFamily: "Pixel-Bold",
    fontSize: 16,
  },
});
