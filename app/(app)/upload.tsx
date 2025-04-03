import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ScrollView,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import {useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Link, useRouter } from "expo-router";
import Button from "@/components/Buttons/Button";
import useOrderStore from "@/store/orderStore";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Index() {
  const router = useRouter();
  const { image, setImage } = useOrderStore();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const fixedWidth = 300;
  const maxHeight = 400;

  const [user, setUser] = useState<any | null>({})

  useEffect(() => {
    const getUser = async () => {
      try {
        const user = await AsyncStorage.getItem("user");
        if (user){
          setUser(JSON.parse(user))
        } else {
          setUser({})
        }
      } catch (error) {
        console.error("Error retrieving user:", error);
      }
    };
    getUser();
  }, []);

  console.log(user)
  
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: false,
      quality: 1,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      setImageUri(uri);
      setImage(uri);
      Image.getSize(uri, (width, height) => {
        const aspectRatio = height / width;
        const calculatedHeight = fixedWidth * aspectRatio;
        const finalHeight =
          calculatedHeight > maxHeight ? maxHeight : calculatedHeight;
        setImageSize({ width: fixedWidth, height: finalHeight });
      });
    }
  };

  const removeImage = () => {
    setImage("");
    setImageUri(null);
    setImageSize(null);
  };

  const handleImageUpload = () => {
    if (imageUri) {
      router.push("/choose");
    }
  };

  console.log(image);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Image Upload</Text>
        <Text style={styles.subtitle}>
          Upload a Photo of your liking that you want to sell
        </Text>
      </View>

      <View style={styles.imageContainer}>
        <View style={styles.imageUploadBox}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={{
                width: imageSize?.width || fixedWidth,
                height: imageSize?.height || fixedWidth,
                resizeMode: "contain",
              }}
            />
          ) : (
            <Pressable onPress={pickImage} style={styles.uploadButton}>
              <View style={styles.uploadIconContainer}>
                <FontAwesome5 name="cloud-upload-alt" size={34} color="black" />
              </View>
              <Text style={styles.uploadText}>Upload Image</Text>
              <Text style={styles.uploadHintText}>
                PNG, JPG, or JPEG (max, 500MB)
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      <View style={styles.footer}>
        <View style={{ width: "40%" }}>
          <Button title={"Clear"} onPress={removeImage} />
        </View>
        <View style={{ width: "40%" }}>
          <Button title={"Next"} onPress={handleImageUpload} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
    marginHorizontal: "auto",
    paddingVertical: 30,
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
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageUploadBox: {
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#9ca3af",
    borderRadius: 10,
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  uploadButton: {
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  uploadIconContainer: {
    width: 80,
    height: 80,
    backgroundColor: "#e5e5e5",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 18,
  },
  uploadHintText: {
    fontSize: 14,
    color: "#7f7f7f",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  optionButton: {
    width: "48%",
    height: 56,
    backgroundColor: "#3b82f6",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  optionButtonText: {
    fontSize: 18,
    color: "white",
    textAlign: "center",
  },
});
