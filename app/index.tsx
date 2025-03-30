import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { AuthContext } from "@/context/auth";
import LoginScreen from "./screens/login";
import { useFetchUserById } from "@/hooks/common/fetchUserById";
import { View, ActivityIndicator } from "react-native";

const index = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { data: userData, isLoading } = useFetchUserById({ id: user?.uid });

  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted || isLoading) return;

    if (user) {
      if (userData?.type !== "seller") {
        router.replace("/screens/(admin)/dashboard/dashboard");
      } else {
        router.replace("/_sitemap");
      }
    }
  }, [user, userData, isLoading, isMounted, router]);

  if (isLoading || !isMounted) {
    return (
      <View className="flex-1 items-center justify-center bg-white">
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return <LoginScreen />;
};

export default index;
