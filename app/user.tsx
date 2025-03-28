import { useState } from "react";
import { View, Text, SafeAreaView, Pressable, TextInput, StyleSheet } from "react-native";

const Cart = () => {
  const [selected, setSelected] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.header}>
          <Text style={styles.title}>Add Your Details</Text>
        </View>
        <View style={styles.formContainer}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name</Text>
            <TextInput style={styles.input} placeholder="Enter your name" />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Mobile</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter your number"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>PinCode</Text>
            <TextInput
              keyboardType="numeric"
              style={styles.input}
              placeholder="Enter your pincode"
            />
          </View>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              editable
              multiline
              numberOfLines={4}
              maxLength={40}
              style={styles.input}
              placeholder="Enter your address"
            />
          </View>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Pressable style={styles.placeOrderButton}>
          <Text style={styles.placeOrderText}>Place Order</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginHorizontal: 'auto',
    paddingVertical: 30,
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
    gap: 10,
    width: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  formContainer: {
    gap: 20,
    marginTop: 40,
  },
  inputGroup: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#9ca3af',
    borderRadius: 6,
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderButton: {
    width: '66.66%',
    height: 56, 
    backgroundColor: '#3b82f6', 
    borderRadius: 6, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeOrderText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});

export default Cart;
