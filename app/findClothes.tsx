import { Input, InputField, InputSlot } from '@/components/ui/input';
import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { searchClothes } from './api/searchClothes';

type ClothesWithImages = Tables<'clothes'> & {
  brand: {
    name: string | null;
  } | null;
  images: { name: string; url: string }[];
};

const findClothes = () => {
  const navigation:any = useNavigation();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ClothesWithImages[]>([]);

  useEffect(() => {
    if (query.length > 2) {
      const delayDebounceFn = setTimeout(() => {
        searchClothes(query).then(data => setResults(data));
      }, 300);

      return () => clearTimeout(delayDebounceFn);
    }
  }, [query]);

    const onDetailPress = (clothe: ClothesWithImages) => {
      console.warn("Navigating to details for:", clothe);
      navigation.navigate('productDetails' as never, {
        id: clothe.id,
        name: clothe.name, 
        brand_name: clothe.brand?.name,
        description: clothe.description || "Brak opisu",
        price: clothe.is_discounted ? clothe.price : clothe.original_price,
        original_price: clothe.original_price,
        buy_link:clothe.buy_link,
        images: clothe.images.map(image => image.url),
      });
    };
  return (
    <SafeAreaView
      className="flex-1 bg-app-background items-center"
      edges={['top', 'bottom']}
    >
      <View className='w-full flex-row justify-between px-5 mt-3 h-auto items-center'>
        <Input
          variant="outline"
          size="md"
          className="bg-app-primary border-0 w-4/5"
          isDisabled={false}
          isInvalid={false}
          isReadOnly={false}
        >
          <InputSlot>
              <Ionicons name="search-outline" className="ml-2" size={20} color="#b6b6b6" />
          </InputSlot>
          <InputField placeholder="Czego szukasz?" className="text-[#b6b6b6]" value={query} onChangeText={setQuery}/>
        </Input>
        <Text className="text-app-secondary text-lg font-semibold text-center" onPress={()=>navigation.goBack()}>Wyjdz</Text>
      </View>
        {results.length > 0 ? (
          <ScrollView className="w-full h-full mt-3" showsHorizontalScrollIndicator={false}>
            {results.map((item) => (
              <Pressable onPress={() => onDetailPress(item)} className="w-full" key={item.id}>
                <View
                  key={item.id}
                  className="flex-row h-24 w-full p-3 py-5 border-b border-gray-200 bg-transparent items-center"
                >
                  <Image
                    source={{ uri: item.images[0]?.url || 'https://via.placeholder.com/150' }}
                    style={{ width: 60, height: 70, zIndex: 1 }}
                    contentFit="cover"
                  />
                  <View className="flex-col ml-3">
                    <Text className="text-lg font-semibold">{item.name}</Text>
                    <Text className="text-sm text-gray-500">{item.brand?.name || 'Nieznana marka'}</Text>
                  </View>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        ) : (
          <Text className="text-center text-gray-500 mt-5">Brak wyników dla "{query}"</Text>
        )}
    </SafeAreaView>
  )
}

export default findClothes