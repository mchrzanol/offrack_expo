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

    const frontImage = images.find(image => image.name.startsWith("front"));
    const otherImages = images.filter(image => image !== frontImage);

    return frontImage ? [frontImage, ...otherImages] : otherImages;
};
export default fetchImages;