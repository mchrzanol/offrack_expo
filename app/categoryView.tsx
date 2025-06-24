import { Button, ButtonText } from '@/components/ui/button';
import ScrollingText from '@/components/ui/ScrollingText';
import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchClothesByCategoryAPI from './api/fetchClothesByCategory';

const categoryView = () => {
    const navigation:any = useNavigation();
    const route = useRoute();
    const {category_id, category_name} = route.params as {category_id: number, category_name:string};

    const [clothes, setClothes] = useState<(Tables<'clothes'>  & {
        brand: {
        name: string;
        };
        images: { name: string; url: string }[];
    })[]>([]);

    if (!category_id) {
        return (
            <SafeAreaView className="flex-1 bg-app-background items-center justify-center">
                <Text className="text-app-secondary text-lg">Nie znaleziono kategorii</Text>
            </SafeAreaView>
        )
    }

    useEffect(() => {
        const fetchClothesByCategory = async ()=> {
            fetchClothesByCategoryAPI(category_id)
                .then(data => {
                    setClothes(data);
                });
        }

        fetchClothesByCategory();
    }, [category_id]);
    
    const onPressClothe = (clothe: Tables<'clothes'> & {
        brand: {
            name: string;
        };
        images: { name: string; url: string }[];
    }) => {
        navigation.navigate('productDetails' as never, {
            id: clothe.id,
            name: clothe.name,
            brand_name: clothe.brand?.name,
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
            <View className="w-full h-full relative">
                {/* Top absolute view */}
                <View className='z-20 p-2 w-full flex-row items-center justify-center bg-transparent relative'>
                    <Ionicons name="chevron-back" className='p-3 absolute -top-1 left-0' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
                    <View className='flex-1 items-center justify-center flex-col w-full bg-transparent'>
                        <Text className='text-app-secondary text-2xl font-semibold'>{category_name}</Text>
                        <Text className='text-app-secondary text-lg'>{clothes.length} elementów</Text>
                    </View>
                </View>
                {/* Filters and sorting */}
                <View className='z-20 mt-2 w-full flex-row items-center justify-center bg-transparent'>
                    <Button className='bg-app-background border border-black rounded-lg'>
                        <Ionicons name="filter" size={24} color="app-secondary" />
                        <ButtonText className='text-app-secondary text-lg'>Filtruj</ButtonText>
                    </Button>
                    <Button className='bg-app-background border border-black ml-10 rounded-lg'>
                        <Ionicons name="options" size={24} color="app-secondary" />
                        <ButtonText className='text-app-secondary text-lg'>Sortuj</ButtonText>
                    </Button>
                </View>
                <FlatList
                data={clothes}
                numColumns={2}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 8 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
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
                                />
                                <Text className="text-app-secondary text-sm">
                                {clothe.brand?.name || 'Brak marki'}
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

export default categoryView