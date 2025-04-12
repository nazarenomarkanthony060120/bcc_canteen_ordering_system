import React from "react";
import { useSearchParams } from "expo-router/build/hooks";
import Foods from "@/features/admin/foods/Foods";

const FoodPage = () => {
  const params = useSearchParams();
  return <Foods params={params} />;
};

export default FoodPage;
