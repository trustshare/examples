import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { RootStackParamList } from "../types";

type Props = NativeStackScreenProps<RootStackParamList, "Complete">;

export const Complete = ({ navigation, route }: Props) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {"checkout_id" in route.params && (
          <>
            <Text style={styles.text}>Checkout Complete!</Text>
            <Text style={styles.text}>
              Checkout ID: {route.params.checkout_id}
            </Text>
          </>
        )}
        {"project_id" in route.params && (
          <Text style={styles.text}>Project ID: {route.params.project_id}</Text>
        )}
        {"verification_id" in route.params && (
          <>
            <Text style={styles.text}>Verification Complete!</Text>
            <Text style={styles.text}>
              Verification ID: {route.params.verification_id}
            </Text>
          </>
        )}
        <Button
          title="Back to Home"
          onPress={() => {
            navigation.navigate("Home");
          }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    marginBottom: 20,
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  safeArea: {
    flex: 1,
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
