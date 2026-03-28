import { useLoginMutation } from "@/entities/user/mutations";
import { useState, type SubmitEvent } from "react";

export const useLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { mutateAsync, isPending } = useLoginMutation();

  const valusernameate = () =>
    username.trim().length > 0 && password.trim().length > 0;

  const handleLogin = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!valusernameate()) return;
    await mutateAsync({ username, password });
  };

  return {
    username,
    setUsername,
    password,
    setPassword,
    handleLogin,
    isPending,
  };
};
