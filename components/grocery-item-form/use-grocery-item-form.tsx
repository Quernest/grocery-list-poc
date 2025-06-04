import {
  useAddGrocery,
  useDeleteGrocery,
  useGetGroceryById,
  useUpdateGrocery,
} from "@/hooks/use-grocerices"
import { GroceryItem as GroceryItemType } from "@/types"
import { useRouter } from "expo-router"
import { useEffect } from "react"
import { useForm } from "react-hook-form"

interface FormValues extends Omit<GroceryItemType, "amount"> {
  amount: string;
}

export function useGroceryItemForm(groceryId: string) {
  const isCreateMode = groceryId === "new";
  const isEditMode = !isCreateMode;
  const router = useRouter();

  const { data: item, isLoading: isItemLoading } = useGetGroceryById(
    isEditMode ? groceryId : ''
  );
  const { mutateAsync: addGrocery, isPending: isAdding } = useAddGrocery();
  const { mutateAsync: updateGrocery, isPending: isUpdating } =
    useUpdateGrocery();
  const { mutateAsync: deleteGrocery, isPending: isDeleting } =
    useDeleteGrocery();

  const { control, handleSubmit, reset } = useForm<FormValues>({
    defaultValues: {
      title: "",
      amount: "",
      bought: false,
    },
  });

  useEffect(() => {
    if (item) {
      reset({
        title: item.title,
        amount: String(item.amount),
        bought: item.bought,
      });
    }
  }, [item, reset]);

  const isSubmitting = isAdding || isUpdating;
  const isProcessing = isSubmitting || isDeleting;

  const onSubmit = async (data: FormValues) => {
    const payload: Pick<GroceryItemType, "title" | "amount" | "bought"> = {
      title: data.title.trim() || "-",
      amount: Number(data.amount),
      bought: data.bought,
    };

    try {
      router.back();
      if (isEditMode && groceryId) {
        await updateGrocery({ id: groceryId, ...payload });
      } else {
        await addGrocery({ ...payload, bought: false });
      }
    } catch (err) {
      console.error("Save failed", err);
    }
  };

  const onDelete = async () => {
    if (!groceryId) return;
    router.back();
    try {
      await deleteGrocery(groceryId);
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return {
    control,
    handleSubmit,
    onSubmit,
    onDelete,
    isItemLoading,
    isEditMode,
    isSubmitting,
    isProcessing,
    isDeleting,
  };
}
