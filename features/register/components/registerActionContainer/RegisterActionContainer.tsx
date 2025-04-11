import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import Typo from "@/components/common/typo";
import {
  FieldValues,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";
import { useRouter } from "expo-router";
import Button from "@/components/common/button";

interface RegisterActionContainerProps {
  handleSubmit: UseFormHandleSubmit<FieldValues, undefined>;
  onSubmit: SubmitHandler<FieldValues>;
  isPending: boolean;
}

const RegisterActionContainer = ({
  handleSubmit,
  onSubmit,
  isPending,
}: RegisterActionContainerProps) => {
  const router = useRouter();

  const navigateToLogin = () => {
    router.replace("/screens/login");
  };

  return (
    <View className="gap-2 mb-32">
      <Button
        className="w-full flex-row bg-sky-300 p-5 rounded-2xl"
        onPress={handleSubmit(onSubmit)}
        loading={isPending}
      >
        Register
      </Button>
      <TouchableOpacity onPress={navigateToLogin}>
        <Text className="text-center text-white mt-10">
          Already have an account
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterActionContainer;
