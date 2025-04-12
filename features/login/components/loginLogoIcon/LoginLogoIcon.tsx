import { Image, View } from "react-native";
import React from "react";
import { LOGO_ICON } from "@/constants/image";

const LoginLogoIcon = () => {
  return (
    <View className="relative items-center w-full pt-16">
      <Image
        className="h-[100px] w-[100px] rounded-full"
        resizeMode="contain"
        source={LOGO_ICON}
      />
    </View>
  );
};

export default LoginLogoIcon;
