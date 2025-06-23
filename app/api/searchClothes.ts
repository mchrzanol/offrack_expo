import { Tables } from "@/database.types";
import fetchImages from "./fetchImages";
import { supabase } from "./supabase";

type ClothesWithImages = Tables<'clothes'> & {
  brand: {
    name: string | null;
  } | null;
  images: { name: string; url: string }[];
};

export const searchClothes = async (searchTerm: string) => {
  const { data, error } = await supabase.rpc('prefix_search' as never, { term: searchTerm.trimEnd() }as any);

  // console.warn('Searching for clothes with term:', searchTerm, 'Result:', data, 'Error:', error);
  if (error) {
    console.warn('Search error:', error);
    return [];
  }
  if (!data) return [];

  const clothesWithImages = await Promise.all(
    (data as any[]).map(async (item) => {
      const images = await fetchImages(item.brand?.name ?? "", item.id.toString());
      return {
        ...item,
        images, // add fetched images to the item
      };
    })
  );
  return clothesWithImages as ClothesWithImages[];
};
