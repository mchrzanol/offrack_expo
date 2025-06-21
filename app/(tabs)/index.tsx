import TrendingSection from "@/components/ui/home/trendingSection";
import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Tables } from "@/database.types";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import fetchClothesAPI from "../api/fetchClothes";


export default function Index() {
  const navigation = useNavigation();

  const [clothes, setClothes] = useState<(Tables<'clothes'>  & {
    brand: {
      name: string;
    };
    images: { name: string; url: string }[];
  })[]>([]);

  useEffect(() => {
    // Simulate fetching clothes data
    const fetchClothes = async () => {
      const data = await fetchClothesAPI();
      setClothes(data);
    }
    fetchClothes();
  },[]);

  return (
    <SafeAreaView
      className="flex-1 bg-app-background items-center"
      edges={['top']}
    >
        <Text className="text-3xl font-bold mb-2">OffRack</Text>
        <Text className="text-sm text-gray-400">
          {clothes.length ? `${clothes.length} produktów załadowanych` : "Ładowanie..."}
        </Text>
      <ScrollView className="flex-1 w-full h-full flex-col px-5 " showsVerticalScrollIndicator={false}>
        <Input
          variant="outline"
          size="md"
          className="bg-app-primary border-0 mt-3"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot>
              <Ionicons name="search-outline" className="ml-2" size={20} color="#b6b6b6" />
          </InputSlot>
          <InputField placeholder="Czego szukasz?" className="text-[#b6b6b6]" />
        </Input>
        <View className="w-full h-60 bg-app-primary rounded-lg mt-5 justify-center items-center">
          <Text className="text-[#b6b6b6] text-lg">Tutaj będą promocje dnia/wyprzedaże</Text>
        </View>
        <TrendingSection clothes={clothes} navigation={navigation} />

        <View className="w-full h-auto mt-10 flex-col">
          <View className="flex-row w-full mb-3 items-center">
            <Ionicons name="compass" size={28} color="app-secondary"/>
            <Text className="text-app-secondary text-2xl font-medium ml-3">Nowe Kolekcje</Text>
          </View>
              {Array.from({ length: 10 }).map((_, index) => (
                <View
                  key={index}
                  className="w-full h-44 bg-app-card rounded-lg justify-center items-center relative m-1"
                >
                  <Text className="text-black text-lg">Kolekcja {index + 1}</Text>
                </View>
              ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
