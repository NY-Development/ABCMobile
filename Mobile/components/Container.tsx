import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

type ContainerProps = {
  children: React.ReactNode;
};

export const Container = ({ children }: ContainerProps) => {
  return (
    <SafeAreaView
      edges={["top", "bottom"]}
      className="flex-1 px-6"
    >
      {children}
    </SafeAreaView>
  );
};