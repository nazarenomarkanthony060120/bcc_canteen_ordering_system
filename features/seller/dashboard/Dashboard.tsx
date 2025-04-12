import { Text } from "react-native";
import React from "react";
import Layout from "@/features/common/Layout";
import { useLocalSearchParams } from "expo-router";

const Dashboard = () => {
  const params = useLocalSearchParams();

  return (
    <Layout>
      <Text className="text-white">Dashboard {params.name}</Text>
    </Layout>
  );
};

export default Dashboard;
