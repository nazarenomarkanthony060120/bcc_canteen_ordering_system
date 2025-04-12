import { useMutation } from "@tanstack/react-query";
import { registerUser } from "@/api";

export const userRegister = () => {
  return useMutation({
    mutationFn: registerUser,
  });
};
