import { View, Text } from "react-native";
import React from "react";
import RegisterBackground from "./components/registerBackground/RegisterBackground";
import RegisterController from "./components/registerController/RegisterController";
import RegisterIconText from "./components/registerIconText/RegisterIconText";

const Register = () => {
  return (
    <View className="h-screen w-full">
      <RegisterBackground />
      <RegisterIconText />
      <RegisterController />
    </View>
  );
};

export default Register;
