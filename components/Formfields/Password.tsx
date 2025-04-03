import { View, Text, TouchableOpacity, TextInput, StyleSheet } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface PasswordProps{
    label: string,
    marginTop: number

}
const Password: React.FC<PasswordProps> = ({
    label,
    marginTop

}) => {
  return (
    <View>
      <Text style={[styles.label, { marginTop }]}>{label}</Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="********"
          placeholderTextColor="#999"
        />
        <TouchableOpacity>
          <Ionicons size={22} color="#999" name={"eye-outline"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: 10,
  },
});

export default Password;
