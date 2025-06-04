import * as api from "@/api"
import { GroceryItem as GroceryItemType } from "@/types"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

export const useGroceriesQuery = () => {
  return useQuery({
    queryKey: ["groceries"],
    queryFn: api.getGroceries,
  });
};

export const useAddGrocery = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: api.addGrocery,
    onSuccess: () => client.invalidateQueries({ queryKey: ["groceries"] }),
  });
};

export const useUpdateGrocery = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: api.updateGrocery,
    // Optimistic update
    onMutate: async (updatedItem) => {
      await client.cancelQueries({ queryKey: ["groceries"] });
      const previous = client.getQueryData<GroceryItemType[]>(["groceries"]);
      client.setQueryData<GroceryItemType[]>(["groceries"], (old = []) =>
        old.map((item) =>
          item.id === updatedItem.id
            ? { ...item, bought: Boolean(updatedItem.bought) }
            : item
        )
      );
      return { previous };
    },
    onError: (_err, _item, context) => {
      if (context?.previous) {
        client.setQueryData(["groceries"], context.previous);
      }
    },
    onSettled: () => {
      client.invalidateQueries({ queryKey: ["groceries"] });
    },
  });
};

export const useDeleteGrocery = () => {
  const client = useQueryClient();

  return useMutation({
    mutationFn: api.deleteGrocery,
    onSuccess: () => client.invalidateQueries({ queryKey: ["groceries"] }),
  });
};

export const useGetGroceryById = (id: string) => {
  return useQuery({
    queryKey: ["groceries", id],
    queryFn: () => api.getGroceryById(id),
    enabled: !!id,
  });
};
