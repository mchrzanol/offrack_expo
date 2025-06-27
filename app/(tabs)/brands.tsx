import { Tables } from '@/database.types';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchBrandsAPI from '../api/fetchBrands';

const brands = () => {
    const navigation:any = useNavigation();
    const [brands, setBrands] = useState<Tables<'brands'>[]>([]);
  
    useEffect(() => {
      const fetchBrands = async () => {
        try {
          const data = await fetchBrandsAPI();
          setBrands(data);
        } catch (error) {
          console.error("Error fetching brands:", error);
        }
      };
  
      fetchBrands();
    }, []);
  return (
    <SafeAreaView
      className="flex-1 bg-app-background px-5"
      edges={['top']}
    >
        <Text className="text-3xl font-semibold mb-2 mt-10">Brands</Text>
        <Text className="text-app-secondary text-lg mb-3">Wybierz markę, aby zobaczyć produkty</Text>
        <View className='w-full h-0.5 bg-app-secondary mb-3' />
        <ScrollView 
          className="flex-1 w-full h-full flex-col"
          showsVerticalScrollIndicator={false}
          >
          {brands.map((brand, index) => (
            <Pressable onPress={() =>navigation.navigate('brandView', { brand_id: brand.id, brand_name: brand.name, brand_logo_url:brand.logo_url, brand_description:brand.description })} key={index}>
              <View
                  key={index}
                  className="w-full h-24 justify-center relative border border-app-secondary rounded-xl flex-col items-center mb-5"
              >
              {brand.logo_url ? (
                <Image
                  source={{ uri: brand.logo_url}}
                  style={{ width: '100%', height: 40}}
                  contentFit="contain"
                />
              ) : (
                <Text className="text-black text-2xl ml-1 font-medium">{brand.name}</Text>
              )}
                {/* <Ionicons name="chevron-forward-outline" size={22} color="#000000" className="absolute right-4" /> */}
                <Text className="text-black text-lg ml-1">{brand.name}</Text>
              </View>
            </Pressable>
          ))}
      </ScrollView>
    </SafeAreaView>
  )
}

export default brands