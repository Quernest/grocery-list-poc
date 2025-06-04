import { Fab, FabIcon } from "@/components/ui/fab"
import { AddIcon } from "@/components/ui/icon"
import { useRouter } from "expo-router"
import React from "react"

export function FloatingAddButton() {
  const router = useRouter();

  const handlePress = () => {
    router.push({ pathname: "/[groceryId]", params: { groceryId: "new" } });
  };

  return (
    <Fab
      onPress={handlePress}
      size="lg"
      className="bg-primary-600 hover:bg-primary-700 active:bg-primary-800 w-16 h-16"
      placement="bottom center"
    >
      <FabIcon as={AddIcon} color="white" size="xl" />
    </Fab>
  );
}
