import { Box } from "@/components/ui/box"
import { HStack } from "@/components/ui/hstack"
import { Spinner } from "@/components/ui/spinner"
import { Text } from "@/components/ui/text"
import { useGroceriesQuery, useUpdateGrocery } from "@/hooks/use-grocerices"
import { GroceryItem as GroceryItemType } from "@/types"
import { router } from "expo-router"
import React, { useCallback, useMemo } from "react"
import { FlatList, ListRenderItem } from "react-native"
import GroceryListItem from "../grocery-list-item"

export default function GroceryList() {
  const { data: groceries = [], isLoading } = useGroceriesQuery();
  const updateMutation = useUpdateGrocery();

  const onToggle = useCallback(
    (id: string) => {
      const item = groceries.find((g) => g.id === id);
      if (!item) return;
      updateMutation.mutate({ ...item, bought: !item.bought });
    },
    [groceries, updateMutation]
  );

  const ListHeader = useMemo(
    () => (
      <Box className="bg-white px-5 py-4 mb-3 border border-b border-gray-300 rounded-xl">
        <Text className="text-2xl font-bold text-gray-900 mb-4">
          Grocery List
        </Text>
        <HStack className="items-center justify-between">
          <Text className="text-sm font-medium text-gray-500 flex-1">
            Product Name
          </Text>
          <Text className="text-sm font-medium text-gray-500 mr-2">Amount</Text>
        </HStack>
      </Box>
    ),
    []
  );

  const ListEmptyComponent = useMemo(
    () => (
      <Box className="flex-1 justify-center items-center">
        <Text className="text-xl text-gray-500">
          Your grocery list is empty
        </Text>
      </Box>
    ),
    []
  );

  const renderItem: ListRenderItem<GroceryItemType> = useMemo(() => {
    const RenderItem = ({ item }: { item: GroceryItemType }) => (
      <GroceryListItem
        item={item}
        onToggle={onToggle}
        onEdit={() =>
          router.push({
            pathname: "/[groceryId]",
            params: { groceryId: item.id },
          })
        }
      />
    );

    return RenderItem;
  }, [onToggle]);

  const keyExtractor = useMemo(
    () => (item: GroceryItemType) => item.id.toString(),
    []
  );

  if (isLoading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" />
      </Box>
    );
  }

  return (
    <FlatList
      ListHeaderComponent={ListHeader}
      ListEmptyComponent={ListEmptyComponent}
      data={groceries}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      initialNumToRender={10}
      windowSize={10}
      removeClippedSubviews
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
    />
  );
}
