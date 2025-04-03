import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import Button from "@/components/Buttons/Button";
import axios from "axios";
import { useForm, Controller } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface SignUpFormData {
  email: string;
  name: string;
  password: string;
  mobile: string;
}

const Register = () => {
  const router = useRouter();
  // const [formData, setFormData] = useState({
  //   email: "",
  //   name: "",
  //   password: "",
  //   mobile: "",
  // });

  const [showPassword, setShowPassword] = useState(false)

  const gotoSignIn = () => {
    router.navigate("/(tab)/login")
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>();

  const handleSignUp = async (data: SignUpFormData) => {
    try {
      const response = await axios.post(
        "http://192.168.1.34:6900/api/users/signup",
        data,
        { headers: { "Content-Type": "application/json" } }
      );
      console.log(response);
      router.replace("/upload");
      ToastAndroid.show("Sign In successful", ToastAndroid.SHORT);
    } catch (error) {
      console.log(error);
      ToastAndroid.show("Unknow error: Please try again", ToastAndroid.SHORT);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <LinearGradient colors={["#c31432", "#240b36"]} style={styles.header}>
          <Text style={styles.headerText}>Get Started</Text>
          <Text style={styles.subHeaderText}>Here</Text>
        </LinearGradient>

        <View style={styles.form}>
          <View style={[styles.inputForm, {marginTop: 20}]}>
            <Text style={styles.label}>Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{
                required: "Name is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Name"
                  placeholderTextColor={"#999"}
                  onChangeText={onChange}
                  value={value}
                />
              )}
            />
            {errors.name && <Text>{errors.name?.message}</Text>}
          </View>

          <View style={styles.inputForm}>
            <Text style={styles.label}>Contact</Text>
            <Controller
              control={control}
              name="mobile"
              rules={{
                required: "Contact is required",
              }}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  style={styles.input}
                  placeholder="Contact Details"
                  placeholderTextColor={"#999"}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="numeric"
                />
              )}
            />
            {errors.mobile && <Text>{errors.mobile?.message}</Text>}
          </View>

          <View style={styles.inputForm}>
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

          <View style={styles.inputForm}>
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
              <TouchableOpacity onPress={() => {setShowPassword(!showPassword)}}>
                <Ionicons size={22} color="#999" name={showPassword ? "eye-off-outline": "eye-outline"} />
              </TouchableOpacity>
            </View>
            {errors.password && <Text>{errors.password.message}</Text>}
          </View>

          <Button title="Sign Up" onPress={handleSubmit(handleSignUp)} />

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Don't have account?</Text>
            <TouchableOpacity onPress={gotoSignIn} >
              <Text style={styles.signInLink}> Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
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
    flex: 1,
    paddingHorizontal: 30,
    borderTopStartRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 30,
    gap: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#333",
  },
  input: {
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    paddingHorizontal: 15,
    outline: "none",
    height: 50,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "transparent",
  },
  signInContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 15,
  },
  signInText: {
    fontSize: 14,
    color: "#555",
  },
  signInLink: {
    fontSize: 14,
    color: "#c31432",
    fontWeight: "bold",
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

export default Register;
