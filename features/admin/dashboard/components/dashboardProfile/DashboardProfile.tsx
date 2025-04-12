import { TouchableOpacity, Image, View } from "react-native";
import React from "react";
import Icon from "@/components/common/icon";

const DashboardProfile = () => {
  return (
    <View>
      <TouchableOpacity className="flex relative justify-center items-center">
        <Icon name="user" className="" size={30} color="cyan" />
      </TouchableOpacity>
    </View>
  );
};

export default DashboardProfile;
