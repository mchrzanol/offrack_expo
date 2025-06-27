import { supabase } from "./supabase";

export default async function fetchBrandsAPI(): Promise<any[]> {
    const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("name", { ascending: true });

    if (error) {
        console.warn("Error fetching data:", error);
        throw error;
    }
    console.warn("Fetched brands:", data);
    return data;
}