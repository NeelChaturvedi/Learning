import Button from "@/components/Buttons/Button";
import useOrderStore from "@/store/orderStore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet,
  ScrollView,
  ToastAndroid,
  Alert,
} from "react-native";

const Cart = () => {
  const {
    user,
    image,
    paper,
    shippingAddress,
    size,
    frame,
    price,
    setPrice,
    setTotalAmount,
    totalAmount,
    setPincode,
    setShippingAddress,
    setUser,
  } = useOrderStore();
  const order = useOrderStore((state) => state);

  const router = useRouter();

  const [recipient, setRecipient] = useState<any | null>({});

  const placeOrder = async () => {
    try {
      const response = await axios.post(
        "http://192.168.1.34:6900/api/orders/create",
        {
          user: user,
          image: image,
          paper: paper?.name,
          frame: frame?.name,
          size: size?.size,
          price: price,
          totalAmount: totalAmount,
          shippingAddress: shippingAddress,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      router.replace("/upload");
      // ToastAndroid.show("Sign In successful", ToastAndroid.SHORT);
      Alert.alert("Order Placed Successfully");
    } catch (error) {
      console.log(error);
      // ToastAndroid.show("Unknow error: Please try again", ToastAndroid.SHORT);
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user) {
          setRecipient(JSON.parse(user));
        } else {
          setRecipient({});
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
      }
    };
    getUser();
  }, []);

  useEffect(() => {
    if (recipient) {
      setUser(recipient?._id);
    }
  }, [recipient]);

  console.log(recipient);

  useEffect(() => {
    if (size) {
      const initialPrice =
        size.price + size.width * size.height * (frame?.basePrice || 1);
      setPrice(initialPrice);
      const priceWithGST = initialPrice + initialPrice * 0.18;
      setTotalAmount(priceWithGST);
    }
  }, [frame, size]);

  console.log(order);

  return (
    <ScrollView>
      <SafeAreaView>
        <LinearGradient colors={["#c31432", "#240b36"]} style={styles.header}>
          <Text style={styles.subHeaderText}>Your Payable amount</Text>
          <Text style={styles.headerText}>INR. {totalAmount || 0}</Text>
        </LinearGradient>

        <View style={styles.container}>
          <View style={styles.subHeader}>
            <Text style={styles.title}>Add Your Details</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                editable={false}
                value={recipient?.name}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Mobile</Text>
              <TextInput
                editable={false}
                value={recipient?.mobile}
                keyboardType="numeric"
                style={styles.input}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>PinCode</Text>
              <TextInput
                onChangeText={(newPincode) => setPincode(Number(newPincode))}
                keyboardType="numeric"
                style={styles.input}
                placeholder="Enter your pincode"
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Address</Text>
              <TextInput
                onChangeText={(newAddress) => setShippingAddress(newAddress)}
                editable
                multiline
                numberOfLines={4}
                maxLength={40}
                style={styles.input}
                placeholder="Enter your address"
              />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button title={"Place Order"} onPress={placeOrder} />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    marginHorizontal: "auto",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  header: {
    height: 200,
    paddingHorizontal: 30,
    justifyContent: "flex-end",
    gap: 6,
    paddingBottom: 50,
  },
  subHeader: {
    paddingTop: 50,
    justifyContent: "center",
    gap: 4,
    paddingBottom: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 32,
    fontWeight: "bold",
  },
  subHeaderText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "500",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  formContainer: {
    gap: 20,
    marginTop: 40,
  },
  inputGroup: {
    flexDirection: "column",
    justifyContent: "flex-start",
    gap: 10,
  },
  label: {
    fontSize: 18,
  },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: "#9ca3af",
    borderRadius: 6,
  },
  buttonContainer: {
    marginTop: 50,
    width: "60%",
    marginHorizontal: "auto",
  },
  placeOrderButton: {
    width: "66.66%",
    height: 56,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  placeOrderText: {
    fontSize: 20,
    color: "white",
    textAlign: "center",
  },
});

export default Cart;
