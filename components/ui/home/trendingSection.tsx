import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

interface trendingSectionProps {
    clothes:(Tables<'clothes'>  & {
        brand: {
          name: string;
        };
        images: { name: string; url: string }[];
      })[],
      navigation: any; // Assuming you pass navigation prop from parent component
}

const TrendingSection:React.FC<trendingSectionProps> = ({clothes, navigation}) => {

    const formatPrice = (price: number) => {
        const str = price.toString().replace('.', ',');
        const [whole, fraction] = str.split(',');

        if (!fraction) return `${whole},00`;
        if (fraction.length === 1) return `${whole},${fraction}0`;
        return `${whole},${fraction}`;
    };

    const onPress = (index: number) => {
        // Handle the press action, e.g., navigate to product details
        const clothe = clothes[index];

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
    }
  return (
        <View className="w-full h-auto mt-10 flex-col">
          <View className="flex-row w-full items-center">
            <Ionicons name="heart" size={28} color="app-secondary"/>
            <Text className="text-app-secondary text-2xl font-medium ml-2">Trendujące teraz</Text>
          </View>
          <ScrollView className="w-full mt-3 h-auto" horizontal showsHorizontalScrollIndicator={false}>
              {clothes.map((clothe, index) => (
                <Pressable onPress={() => onPress(index)} key={index}>
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
  )
}

export default TrendingSection