import { View, Text } from "react-native";
import React from "react";
import ImageWrapper from "@/components/parts/Image";

const RegisterIconText = () => {
  return (
    <View className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-row items-center">
      <ImageWrapper
        source={require("@/assets/images/logo.jpeg")}
        style={{ width: "10%", height: "60%", borderRadius: 10 }}
        resizeMode="cover"
      />
      <Text>RegisterIconText</Text>
    </View>
  );
};

export default RegisterIconText;
