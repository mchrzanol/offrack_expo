import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Ionicons } from '@expo/vector-icons';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Tables } from "@/database.types";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import fetchCategoryAPI from "../api/fetchCategory";
import { useFilterStore } from "../store/filterStore";


export default function Tab() {
  const navigation:any = useNavigation();
  const [categories, setCategories] = useState<Tables<'category'>[]>([]);

  const {resetFilters} = useFilterStore();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await fetchCategoryAPI();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
    resetFilters(); // Reset filters when entering the search tab
  }, []);
  return (
    <SafeAreaView
      className="flex-1 bg-app-background px-5"
      edges={['top']}
    >
        <Text className="text-3xl font-semibold mb-2 mt-10">Search</Text>
          <Input
            variant="outline"
            size="md"
            className="bg-app-primary border-0 mt-3 relative"
            isDisabled={false}
            isInvalid={false}
            isReadOnly={false}
          >
            <Pressable onPress={() => navigation.navigate('findClothes' as never)} className="bg-transparent absolute top-0 w-full h-14 z-20"/>
            <InputSlot>
                <Ionicons name="search-outline" className="ml-2" size={20} color="#b6b6b6" />
            </InputSlot>
            <InputField placeholder="Czego szukasz?" className="text-[#b6b6b6]" pointerEvents="none" />
          </Input>
        <ScrollView className="flex-1 w-full h-full flex-col mt-4" showsVerticalScrollIndicator={false}>
        <Text className="text-app-secondary text-2xl font-medium mb-3">Kategorie</Text>
        {categories.map((category, index) => (
          <Pressable onPress={() =>navigation.navigate('categoryView', { category_id: category.id, category_name: category.name })} key={index}>
            <View
                key={index}
                className="w-full h-12 rounded-lg justify-center relative border-b border-app-secondary"
            >
                <Text className="text-black text-lg ml-1">{category.name}</Text>
                <Ionicons name="chevron-forward-outline" size={22} color="#000000" className="absolute right-4" />
            </View>
          </Pressable>
        ))}
        </ScrollView>
    </SafeAreaView>
  );
}
