import { FloatingAddButton } from "@/components/floating-add-button"
import GroceryList from "@/components/grocery-list"
import { Box } from "@/components/ui/box"
import { SafeAreaView } from "react-native"

export default function IndexScreen() {
  return (
    <SafeAreaView className="flex-1">
      <Box className="flex-1 p-4">
        <GroceryList />
      </Box>
      <FloatingAddButton />
    </SafeAreaView>
  );
}
