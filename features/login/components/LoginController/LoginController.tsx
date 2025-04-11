import React from "react";
import { useForm, SubmitHandler, FieldValues } from "react-hook-form";
import { useLogin } from "@/hooks/login";
import { LoginRequest } from "@/utils/types";
import Typo from "@/components/common/typo";
import { View } from "react-native";
import LoginInputContainer from "./components/LoginInputContainer/LoginInputContainer";
import LoginActionContainer from "./components/LoginActionContainer/LoginActionContainer";
import { useRouter } from "expo-router";

const LoginController = () => {
  const { control, handleSubmit } = useForm();
  const { mutate: login, error, isPending } = useLogin();
  const router = useRouter();

  if (!router) return;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    login(data as LoginRequest, {
      onSuccess: () => {
        router.replace("/screens/(admin)/dashboard/dashboard");
      },
    });
  };

  return (
    <View className="pt-6 px-5 gap-2">
      <Typo className="text-white text-[24px] font-bold text-center">
        BCC Canteen Order App
      </Typo>
      <LoginInputContainer control={control} />
      <LoginActionContainer
        handleSubmit={handleSubmit}
        isPending={isPending}
        onSubmit={onSubmit}
      />
      <Typo>{error && <Typo className="text-red">{error.message}</Typo>}</Typo>
    </View>
  );
};

export default LoginController;
