import { Input, InputField, InputSlot } from "@/components/ui/input";
import { Tables } from "@/database.types";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
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

  const formatPrice = (price: number) => {
  const str = price.toString().replace('.', ',');
  const [whole, fraction] = str.split(',');

  if (!fraction) return `${whole},00`;
  if (fraction.length === 1) return `${whole},${fraction}0`;
  return `${whole},${fraction}`;
};

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
        <View className="w-full h-auto mt-10 flex-col">
          <View className="flex-row w-full items-center">
            <Ionicons name="heart" size={28} color="app-secondary"/>
            <Text className="text-app-secondary text-2xl font-medium ml-2">Trendujące teraz</Text>
          </View>
          <ScrollView className="w-full mt-3 h-auto" horizontal showsHorizontalScrollIndicator={false}>
              {clothes.map((clothe, index) => (
                <Pressable onPress={()=>navigation.navigate('productDetails' as never)} key={index}>
                  <View
                    key={index}
                    className="w-64 h-auto bg-transparent m-1"
                  >
                    <View
                      key={index}
                      className="w-64 h-96 bg-app-card rounded-lg justify-center items-center relative"
                    >
                      <Ionicons name="heart-outline" size={28} color="#000000" className="absolute top-4 right-4" style={{zIndex:10}} />
                      {/* <Text className="text-black text-lg">Produkt {index + 1}</Text> */}
                      <Image 
                        source={{ uri: clothe.images.find(item => item.name.startsWith("front"))?.url || "https://via.placeholder.com/150" }}
                        style={{ width: '100%', height: '100%', borderRadius: 12, zIndex: 1 }}
                        contentFit="cover"
                        />
                    </View>
                    <Text className="text-app-secondary text-lg mt-3 font-semibold">{clothe.brand?.name || ""}</Text>
                    <Text className="text-app-secondary text-base">{clothe.name}</Text>
                    <Text className="text-app-secondary text-lg mt-1">{formatPrice(clothe.is_discounted ? clothe.price : clothe.original_price)} zł</Text>
                  </View>
                </Pressable>
              ))}
          </ScrollView>
        </View>

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
