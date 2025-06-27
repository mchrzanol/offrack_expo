import { useFilterStore } from "../store/filterStore";
import fetchImages from "./fetchImages";
import { supabase } from "./supabase";


export default async function fetchClothesByCategoryAPI(category_id: number): Promise<any[]> {
  const { brandIds, priceRange, sortBy } = useFilterStore.getState();

  let query = supabase
    .from("clothes")
    .select("*, brand:brands(name)")
    .eq("category_id", category_id);

  // Filter by selected brands
  if (brandIds.length > 0) {
    query = query.in("brand_id", brandIds);
  }

  // Filter by price range
  query = query.gte("price", priceRange[0]).lte("price", priceRange[1]);

  // Sort
  switch (sortBy) {
    case "priceLow":
      query = query.order("price", { ascending: true });
      break;
    case "priceHigh":
      query = query.order("price", { ascending: false });
      break;
    case "popularity":
    //   query = query.order("popularity", { ascending: false }); // assumes you have a "popularity" column
      break;
    case "newest":
    default:
      query = query.order("created_at", { ascending: false });
      break;
  }

  const { data, error } = await query;

  if (error) {
    console.warn("Error fetching data:", error);
    throw error;
  }

  const clothesWithImages = await Promise.all(
    data.map(async (item) => {
      const images = await fetchImages(item.brand?.name ?? "", item.id.toString());
      return {
        ...item,
        images,
      };
    })
  );

  return clothesWithImages;
}
