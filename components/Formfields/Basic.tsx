import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";

interface BasicProps {
  label: string;
  placeholder: string;
  marginTop?: number;
  textStyle?: object;
  onchange?: () => void;
  value: string;
  inputName: string;
}
const Basic: React.FC<BasicProps> = ({
  label,
  placeholder,
  marginTop,
  onchange,
  value,
  inputName,
}) => {
  return (
    <View>
      <Text style={[styles.label, { marginTop }]}>{label}</Text>
      <TextInput
        onChange={onchange}
        value={value}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#999"
      />
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
});
export default Basic;
