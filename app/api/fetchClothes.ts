import { supabase } from "./supabase";

const fetchImages = async (brand_name: string, id: string) => {
    const { data, error } = await supabase.storage.from("clothes-images").list(`${brand_name}/${id}`);
    // console.warn("Fetching images for:", brand_name, id, data);
    if (error) {
        console.warn("Error fetching images:", error);
        return [];
    }
    const images = data
    .filter(file => !file.name.endsWith("/")) // ignore folders
    .map(file => {
      const publicUrl = supabase.storage.from("clothes-images").getPublicUrl(`${brand_name}/${id}/${file.name}`).data.publicUrl;
      return {
        name: file.name,
        url: publicUrl,
      };
    });
  return images; // [{ name: string, url: string }, ...]
};

export default async function fetchClothesAPI(): Promise<any[]> {
    const { data, error } = await supabase
        .from("clothes")
        .select("*, brand:brands(name)");

    if (error) {
        console.warn("Error fetching data:", error);
        throw error;
    }

    const clothesWithImages = await Promise.all(
        data.map(async (item) => {
            const images = await fetchImages(item.brand?.name ?? "", item.id.toString());
            return {
                ...item,
                images, // add fetched images to the item
            };
        })
    );

    console.warn("Fetched clothes with images:", clothesWithImages[0].images);

    return clothesWithImages;
}