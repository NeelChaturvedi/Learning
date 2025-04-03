import Button from "@/components/Buttons/Button";
import useOrderStore from "@/store/orderStore";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import paperDetails from "@/data/paper";
import frameDetails from "@/data/frame";

const Cart = () => {
  const router = useRouter();

  const { image, setPaper, paper, setSize, setFrame, size, frame } = useOrderStore();
  const order = useOrderStore((state) => state);


  const fixedWidth = 300;
  const maxHeight = 400;

  const updateDelivery = () => {
    if (paper && size && frame){
      router.push("/user")
    }
  };

  
  const paperOptions = paperDetails?.map((paper) => ({
    value: paper.name,
    key: paper.id,
    fullData: paper,
  }));

  const frameOptions = frameDetails?.map((frame) => ({
    value: frame.name,
    fullData: frame,
  }));

  const sizeOptions =
    paper &&
    paper?.customDimensions?.map((dimension: any) => ({
      value: dimension?.size,
      key: dimension?.size,
      fullData: dimension,
    }));
    

  
  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View>
          <View style={styles.header}>
            <Text style={styles.title}>Choose Paper and Size</Text>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              marginTop: 30,
            }}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: fixedWidth,
                height: maxHeight,
                resizeMode: "contain",
              }}
            />
          </View>
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Page Type</Text>
              <SelectList
                setSelected={(val: any) => {
                  const selectedItem = paperOptions.find(
                    (item) => item.value === val
                  );
                  setPaper(selectedItem?.fullData || null);
                }}
                data={paperOptions}
                save="value"
              />
            </View>
            {paper && paper.customDimensions && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Dimensions</Text>
                <SelectList
                  setSelected={(val: any) => {
                    const selectedItem = sizeOptions.find(
                      (item: any) => item.value === val
                    );
                    setSize(selectedItem?.fullData || null);
                  }}
                  data={sizeOptions}
                  save="value"
                />
              </View>
            )}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Frame Type</Text>
              <SelectList
                setSelected={(val: any) => {
                  const selectedItem = frameOptions.find(
                    (item) => item.value === val
                  );
                  setFrame(selectedItem?.fullData || null);
                }}
                data={frameOptions}
                save="value"
              />
            </View>
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title={"Add Delivery Address"} onPress={updateDelivery} />
        </View>
      </SafeAreaView>
    </ScrollView>
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
    marginTop: 20,
    width: "60%",
    marginHorizontal: "auto",
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
