import { Box } from "@/components/ui/box"
import { Button, ButtonText } from "@/components/ui/button"
import { Input, InputField } from "@/components/ui/input"
import { Text } from "@/components/ui/text"
import { VStack } from "@/components/ui/vstack"
import React from "react"
import { Controller } from "react-hook-form"

export interface GroceryItemFormProps {
  control: any;
  handleSubmit: (fn: (data: any) => void) => (e?: any) => Promise<void>;
  onSubmit: (data: any) => Promise<void>;
  onDelete: () => Promise<void>;
  isEditMode: boolean;
  isSubmitting: boolean;
  isProcessing: boolean;
  isDeleting: boolean;
}

export function GroceryItemForm({
  control,
  handleSubmit,
  onSubmit,
  onDelete,
  isEditMode,
  isSubmitting,
  isProcessing,
  isDeleting,
}: GroceryItemFormProps) {
  return (
    <Box className="p-4">
      <VStack className="mb-2">
        <Text className="text-typography-500" size="lg">
          Product name
        </Text>
        <Controller
          name="title"
          control={control}
          rules={{
            required: "Product name is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input className="min-w-[250px]" size="lg">
                <InputField
                  type="text"
                  placeholder="Enter product name"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </Input>
              {error?.message && (
                <Text className="text-red-600 mt-1" size="sm">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </VStack>

      <VStack>
        <Text className="text-typography-500" size="lg">
          Amount
        </Text>
        <Controller
          name="amount"
          control={control}
          rules={{
            required: "Amount is required",
            validate: (value) => {
              const num = Number(value);
              if (isNaN(num)) return "Amount must be a number";
              if (num <= 0) return "Amount must be greater than 0";
              return true;
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <>
              <Input className="min-w-[250px]" size="lg">
                <InputField
                  type="text"
                  keyboardType="number-pad"
                  placeholder="Enter amount"
                  value={field.value}
                  onChangeText={field.onChange}
                />
              </Input>
              {error?.message && (
                <Text className="text-red-600 mt-1" size="sm">
                  {error.message}
                </Text>
              )}
            </>
          )}
        />
      </VStack>

      <Button
        className="mt-4"
        size="xl"
        onPress={handleSubmit(onSubmit)}
        disabled={isProcessing}
      >
        <ButtonText>
          {isSubmitting ? "Saving..." : isEditMode ? "Update" : "Create"}
        </ButtonText>
      </Button>

      {isEditMode && (
        <Button
          className="mt-2 bg-red-800"
          size="xl"
          onPress={onDelete}
          disabled={isProcessing}
        >
          <ButtonText>{isDeleting ? "Deleting..." : "Delete"}</ButtonText>
        </Button>
      )}
    </Box>
  );
}

export { useGroceryItemForm } from './use-grocery-item-form'
