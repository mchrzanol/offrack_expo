import { supabase } from "./supabase";

export default async function fetchCategoryAPI(): Promise<any[]> {
    const { data, error } = await supabase
        .from("category")
        .select("*");

    if (error) {
        console.warn("Error fetching data:", error);
        throw error;
    }
    console.warn("Fetched categories:", data);
    return data;
}