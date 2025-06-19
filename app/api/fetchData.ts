import { supabase } from "./supabase";

export default async function fetchData(table: string): Promise<any> {
    const {data, error} = await supabase.from("clothes").select();

    console.warn("Fetching data from table:", data);

    if (error) {
        console.warn("Error fetching data:", error);
        throw error;
    }
    return data;
}