import fetchImages from "./fetchImages";
import { supabase } from "./supabase";

const fetchClothesByBrandAPI = async (brandId: number, brandName:string) => {
    const { data, error } = await supabase
        .from("clothes")
        .select("*")
        .eq("brand_id", brandId);

    if (error) {
        console.warn("Error fetching clothes by brand:", error);
        throw error;
    }
    const clothesWithImages = await Promise.all(
        data.map(async (item) => {
            const images = await fetchImages(brandName ?? "", item.id.toString());
            return {
                ...item,
                images, // add fetched images to the item
            };
        })
    );
    console.warn("Fetched clothes with images:", clothesWithImages);
    return clothesWithImages;
}

export default fetchClothesByBrandAPI;