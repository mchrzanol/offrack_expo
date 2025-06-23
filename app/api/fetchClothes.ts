import fetchImages from "./fetchImages";
import { supabase } from "./supabase";

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