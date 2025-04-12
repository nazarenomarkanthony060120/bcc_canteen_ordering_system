import React from "react";
import { View } from "react-native";
import ImageWrapper from "@/components/parts/Image";
import Button from "@/components/common/button";
import Typo from "@/components/common/typo";
import { useRouter } from "expo-router";

const index = () => {
  const router = useRouter();

  if (!router) return;
  const navigateToLogin = () => {
    router.replace("/screens/login");
  };

  return (
    <View className="flex-1 px-10 bg-[#f0faf1]">
      <View className="h-1/2 flex items-center justify-center">
        <ImageWrapper
          source={require("@/assets/images/logo-removebg-preview.png")}
        />
      </View>
      <View className="flex justify-between h-1/2 pb-5 ">
        <View className="flex gap-5">
          <View>
            <Typo className="text-center text-2xl font-bold text-[#02bf15]">
              BCC Canteen Ordering APP
            </Typo>
          </View>
          <View>
            <Typo className="text-center text-md font-bold text-[#4b9653] leading-7">
              Satisfy your cravings in seconds—order your favorite meals
              effortlessly with the BCC Canteen App, where convenience meets
              deliciousness! 🍔📱✨
            </Typo>
          </View>
        </View>

        <View className="flex gap-5">
          <Button
            className="bg-emerald-800 rounded-3xl p-5"
            onPress={navigateToLogin}
          >
            <Typo className="text-white">Sign In</Typo>
          </Button>
          <Button className="p-5">
            <Typo className="">Create an account</Typo>
          </Button>
        </View>
      </View>

      {/* <ActivityIndicator size="large" color="#0000ff" /> */}
    </View>
  );
  // }

  // return <LoginScreen />;
};

export default index;
