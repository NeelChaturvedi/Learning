import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Button from "@/components/Buttons/Button";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface SignInFormData {
  email: string;
  password: string;
}

const Login = () => {
  const router = useRouter();

  const gotoSignUp = () => {
    router.navigate("/")
  }

  const [showPassword, setShowPassword] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>();

  const handleSignIn = async (data: SignInFormData) => {
    try {
      console.log(data);
      const response = await axios.post(
        "http://192.168.1.34:6900/api/auth/",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response)
      await AsyncStorage.setItem("user", JSON.stringify(response?.data.user))
      router.replace("/upload");
      Alert.alert("Sign In Successful")
      // ToastAndroid.show("Sign In successful", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("User does not exist", ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={["#c31432", "#240b36"]} style={styles.header}>
        <Text style={styles.headerText}>Log In</Text>
      </LinearGradient>

      <View style={styles.form}>
        <View style={[styles.inputForm, { marginTop: 40 }]}>
          <Text style={styles.label}>Email</Text>
          <Controller
            control={control}
            name="email"
            rules={{
              required: "Email is required",
              pattern: { value: /\S+@\S+.\S+/, message: "Invalid email" },
            }}
            render={({ field: { onChange, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor={"#999"}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && <Text>{errors.email.message}</Text>}
        </View>

        <View style={[styles.inputForm, { marginTop: 20 }]}>
          <Text style={styles.label}>Password</Text>
          <View style={styles.passwordContainer}>
            <Controller
              control={control}
              name="password"
              rules={{ required: "Password is required" }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={[styles.input, { flex: 1 }]}
                  placeholder="********"
                  placeholderTextColor="#999"
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry={!showPassword}
                />
              )}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons size={22} color="#999" name={showPassword ? "eye-off-outline" : "eye-outline"} />
            </TouchableOpacity>
            
          </View>
          {errors.password && <Text>{errors.password.message}</Text>}
        </View>

        <TouchableOpacity>
          <Text style={styles.forgotPassword}>Forgot password?</Text>
        </TouchableOpacity>

        <Button title={"SIGN IN"} onPress={handleSubmit(handleSignIn)} />

        <View style={styles.signUpContainer}>
          <Text style={styles.signUpText}>Don’t have account?</Text>
          <TouchableOpacity onPress={gotoSignUp}>
            <Text style={styles.signUpLink}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputForm:{
    gap:6
  },
  header: {
    height: 200,
    paddingHorizontal: 30,
    justifyContent: "flex-end",
    gap: 4,
    paddingBottom: 50,
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
  form: {
    backgroundColor: "#fff",
    flex: 1,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 30,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
  },

  forgotPassword: {
    alignSelf: "flex-end",
    color: "#555",
    marginTop: 10,
    fontSize: 14,
  },
  signInButton: {
    marginTop: 30,
    backgroundColor: "red",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 25,
  },
  signUpText: {
    fontSize: 14,
    color: "#555",
  },
  signUpLink: {
    fontSize: 14,
    color: "#c31432",
    fontWeight: "bold",
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333"
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
  },
});

export default Login;
