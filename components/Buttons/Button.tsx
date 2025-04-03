import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  textStyle?: object;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  disabled,
  textStyle,
}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.signUpButton}>
      <LinearGradient
        colors={["#c31432", "#240b36"]}
        style={styles.gradientButton}
      >
        <Text style={styles.signInButtonText}>{title}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  signUpButton: {
    marginTop: 30,
    borderRadius: 25,
    overflow: "hidden",
  },
  gradientButton: {
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  signInButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  }
});

export default Button;
