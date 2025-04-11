import { View } from "react-native";
import React from "react";
import { Control, Controller, FieldValues } from "react-hook-form";
import Input from "@/components/common/input";
import IconMaterialUi from "@/components/common/iconMaterialUi";

interface LoginInputContainerProps {
  control: Control<FieldValues>;
}

const LoginInputContainer = ({ control }: LoginInputContainerProps) => {
  return (
    <View className="gap-2 pt-11">
      <Controller
        control={control}
        name="email"
        rules={{ required: "Email is required" }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={"w-full py-3 placeholder:text-slate-400 "}
            placeholder={"Email"}
            value={value}
            onChangeText={onChange}
            secureTextEntry={false}
            icon={
              <IconMaterialUi name={"alternate-email"} size={20} color="gray" />
            }
          />
        )}
      />
      <Controller
        control={control}
        name="password"
        rules={{ required: "Password is required" }}
        render={({ field: { onChange, value } }) => (
          <Input
            className={"w-full py-3 placeholder:text-slate-400 "}
            placeholder={"Password"}
            value={value}
            onChangeText={onChange}
            secureTextEntry={true}
            icon={<IconMaterialUi name={"key"} size={20} color="gray" />}
            isPassword={true}
          />
        )}
      />
    </View>
  );
};

export default LoginInputContainer;
