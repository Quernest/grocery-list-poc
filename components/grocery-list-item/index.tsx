import { Badge } from "@/components/ui/badge"
import {
  Checkbox,
  CheckboxIcon,
  CheckboxIndicator,
  CheckboxLabel,
} from "@/components/ui/checkbox"
import { HStack } from "@/components/ui/hstack"
import { CheckIcon, EditIcon, Icon } from "@/components/ui/icon"
import { Text } from "@/components/ui/text"
import { GroceryItem as GroceryItemType } from "@/types"
import * as Haptics from "expo-haptics"
import { Pressable, PressableProps } from "react-native"

export interface GroceryListItemProps {
  item: GroceryItemType;
  onToggle?: (id: string) => void;
  onEdit?: PressableProps["onPress"];
}

export default function GroceryListItem({
  item,
  onToggle,
  onEdit,
}: GroceryListItemProps) {
  const handleToggle = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    onToggle?.(item.id);
  };

  return (
    <Pressable
      className="mb-2.5 px-5 py-2.5 bg-white rounded-xl border border-gray-300 w-full active:opacity-90 active:scale-98"
      onPress={handleToggle}
    >
      <HStack className="items-center justify-between space-x-4">
        <Checkbox
          size="lg"
          isInvalid={false}
          isDisabled={false}
          isChecked={!!item.bought}
          value={item.bought?.toString()}
          pointerEvents="none"
        >
          <CheckboxIndicator>
            <CheckboxIcon as={CheckIcon} />
          </CheckboxIndicator>
          <CheckboxLabel
            className={`text-medium ${
              item.bought
                ? "text-gray-400 line-through opacity-40"
                : "text-black"
            }`}
          >
            {item.title}
          </CheckboxLabel>
        </Checkbox>
        <HStack space="sm" className="items-center">
          {item.amount && (
            <Badge className="bg-gray-200 px-3 py-1.5 rounded-full">
              <Text className="text-lg font-semibold text-gray-700">
                {item.amount}
              </Text>
            </Badge>
          )}
          <Pressable onPress={onEdit} hitSlop={10}>
            <Icon as={EditIcon} size="xl" className="text-typography-black" />
          </Pressable>
        </HStack>
      </HStack>
    </Pressable>
  );
}
