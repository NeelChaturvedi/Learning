import { Link } from "expo-router";
import { useState } from "react";
import { View, Text, SafeAreaView, Pressable, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

const Cart = () => {
  const [selected, setSelected] = useState("");
  
  const pageTypes = [
    {
      key: "1", value: "Hahnemuhle Museum Etching 350 GSM 100% Acid Free Cotton Paper"},
    { key: "2", value: "Hahnemuhle Photo Canvas 320 GSM" },
    { key: "3", value: "Hahnemuhle Photo Pearl 310 GSM Photo Paper" },
    { key: "4", value: "Hahnemühle Photo Rag® Baryta 315 GSM" },
    { key: "5", value: "Strathmore Clean White 300gsm 100% Cotton Paper" },
  ];

  const dimensions = [
    { key: "1", value: "12 x 18 inch" },
    { key: "2", value: "18 x 24 inch" },
    { key: "3", value: "24 x 36 inch" },
    { key: "4", value: "20 x 30 inch" },
    { key: "5", value: "36 x 48 inch" },
    { key: "6", value: "36 x 60 inch" },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Choose Paper and Size</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Page Type</Text>
            <SelectList
              setSelected={(val: any) => setSelected(val)}
              data={pageTypes}
              save="value"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dimensions</Text>
            <SelectList
              setSelected={(val: any) => setSelected(val)}
              data={dimensions}
              save="value"
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button}>
          <Link href="/user">
            <Text style={styles.buttonText}>Add Delivery Address &gt;</Text>
          </Link>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
    paddingVertical: 30,
    flex: 1,
    justifyContent: "space-between",
  },
  header: {
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 10,
    width: "100%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    marginTop: 40,
    gap: 20,
  },
  inputGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
  },
  label: {
    fontSize: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  button: {
    width: "65%",
    height: 56, 
    backgroundColor: "#3b82f6",
    borderRadius: 6, 
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 20, 
    color: "white",
    textAlign: "center",
  },
});

export default Cart;
