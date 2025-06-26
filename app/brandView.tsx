import ScrollingText from '@/components/ui/ScrollingText';
import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchClothesByBrandAPI from './api/fetchClothesByBrand';

const brandView = () => {
  const navigation:any = useNavigation();
  const route = useRoute();
  const {brand_id, brand_name, brand_logo_url, brand_description} = route.params as {brand_id: number, brand_name:string, brand_logo_url?: string, brand_description?: string};

  if (!brand_id || !brand_name) {
    return (
      <View>
        <Text className="text-app-secondary text-lg">Nie znaleziono marki</Text>
      </View>
    )
  }
  const [clothes, setClothes] = React.useState<(Tables<'clothes'>& {
    images: { name: string; url: string }[];
  })[]>([]);

  useEffect(() => {
    const fetchClothesByBrand = async () => {
      fetchClothesByBrandAPI(brand_id, brand_name)
        .then((data) => {
          setClothes(data);
        })
      }
    fetchClothesByBrand();
  },[]);

  const onPressClothe = (clothe: Tables<'clothes'> & {
      images: { name: string; url: string }[];
  }) => {
      navigation.navigate('productDetails' as never, {
          id: clothe.id,
          name: clothe.name,
          brand_name: brand_name,
          description: clothe.description || 'Brak opisu',
          price: clothe.is_discounted ? clothe.price : clothe.original_price,
          original_price: clothe.original_price,
          buy_link: clothe.buy_link,
          images: clothe.images.map((image) => image.url),
      });
  }
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
      edges={['top', 'bottom']}
  >
      <View className="w-full h-full relative flex-col">
          {/* Top absolute view */}
          <View className='z-20 p-2 w-full flex-row items-center justify-center bg-transparent relative'>
              <Ionicons name="chevron-back" className='p-3 absolute -top-1 left-0' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
              <View className='flex-1 items-center justify-center flex-col w-full bg-transparent mt-10'>
                  {brand_logo_url ? (
                    <Image
                      source={{ uri: brand_logo_url}}
                      style={{ width: '100%', height: 60}}
                      contentFit="contain"
                    />
                  ) : (
                    <Text className="text-black text-2xl ml-1 font-medium">{brand_name}</Text>
                  )}
                  <Text className='text-app-secondary text-xl font-semibold mt-1'>{brand_name}</Text>
                  {brand_description && <Text className='text-app-secondary text-base mt-1'>{brand_description}</Text>}
              </View>
          </View>
          <Text className="text-2xl font-semibold mb-2 mt-5 self-start ml-3">Produkty marki</Text>
          <FlatList
            data={clothes}
            numColumns={2}
            keyExtractor={(item) => item.id.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ padding: 8 }}
            columnWrapperStyle={{ justifyContent: 'space-between', marginLeft:8, marginRight:8 }}
            renderItem={({ item: clothe }) => (
                    <View className="w-[48%] mb-4 p-2 bg-app-background overflow-hidden">
                    <Pressable onPress={() => onPressClothe(clothe)}>
                        <Image
                            source={{ uri: clothe.images?.[0]?.url || 'https://via.placeholder.com/150' }}
                            style={{ width: '100%', height: 200 }}
                        />
                        <View className="p-2">
                            {/* <Text className="text-app-secondary font-semibold">{clothe.name}</Text> */}
                            <ScrollingText
                                text={clothe.name || ""}
                                fontSize={15}
                                textStyle={{ color: 'black', fontWeight: 'semibold' }}
                            />
                            <Text className="text-app-secondary text-sm">
                            {brand_name}
                            </Text>
                            {clothe.original_price == clothe.price ? (
                                <Text className="text-app-secondary text-lg mt-1">{formatPrice(clothe.price)}zł</Text>
                            ): (
                                <Text className="text-app-secondary text-lg mt-1 space-x-2">
                                    <Text className="line-through text-sm">{formatPrice(clothe.original_price)}zł </Text>
                                    <Text className="text-red-500 font-semibold">{formatPrice(clothe.price)}zł</Text>
                                </Text>
                            )}
                        </View>
                    </Pressable>
                    </View>
                  )}
      />
      </View>
  </SafeAreaView>
  )
}

export default brandView