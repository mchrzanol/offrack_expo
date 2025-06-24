import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchClothesByCategoryAPI from './api/fetchClothesByCategory';

const categoryView = () => {
    const navigation = useNavigation();
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
    
    return (
        <SafeAreaView
            className="flex-1 bg-app-background items-center"
            edges={['top', 'bottom']}
        >
            <View className="w-full h-full relative">
                {/* Top absolute view */}
                <View className='absolute top-0 left-0 bg-transparent z-20 p-2 w-full flex-row'>
                    <Ionicons name="chevron-back" className='p-3' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
                    <Text className='text-app-secondary text-lg font-semibold p-3'>{category_name}</Text>
                </View>
            </View>
        </SafeAreaView>
    )
}

export default categoryView