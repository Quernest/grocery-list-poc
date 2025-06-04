import { GroceryItemForm, useGroceryItemForm } from "@/components/grocery-item-form"
import { Box } from "@/components/ui/box"
import { Spinner } from "@/components/ui/spinner"
import { useLocalSearchParams } from "expo-router"
import React from "react"

export default function GroceryItemScreen() {
  const { groceryId } = useLocalSearchParams<{ groceryId: string }>();
  const {
    control,
    handleSubmit,
    onSubmit,
    onDelete,
    isItemLoading,
    isEditMode,
    isSubmitting,
    isProcessing,
    isDeleting,
  } = useGroceryItemForm(groceryId);

  if (isEditMode && isItemLoading) {
    return (
      <Box className="flex-1 justify-center items-center">
        <Spinner size="large" />
      </Box>
    );
  }

  return (
    <GroceryItemForm
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onDelete={onDelete}
      isEditMode={isEditMode}
      isSubmitting={isSubmitting}
      isProcessing={isProcessing}
      isDeleting={isDeleting}
    />
  );
}
