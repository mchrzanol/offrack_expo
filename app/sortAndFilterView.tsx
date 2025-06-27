import { Button, ButtonText } from '@/components/ui/button';
import { Tables } from '@/database.types';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { useNavigation } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import fetchBrandsAPI from './api/fetchBrands';
import { useFilterStore } from './store/filterStore';

const sortOptions = [
  { label: 'Najnowsze', value: 'newest' },
  { label: 'Cena rosnąco', value: 'priceLow' },
  { label: 'Cena malejąco', value: 'priceHigh' },
  { label: 'Popularność', value: 'popularity' },
] as const;

const sortAndFilterView = () => {
    const navigation:any = useNavigation();
    const { brandIds, setBrandIds,priceRange, setPriceRange, sortBy, setSortBy, resetFilters } = useFilterStore();
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
            className="flex-1 bg-app-background items-center"
            style={{ position: 'relative' }}
            edges={['top', 'bottom']}
            >
            <View className="w-full h-full relative flex-col mt-2">
                <View className="w-full h-14 justify-center items-center">
                    {/* Top row */}
                    <View className="w-full h-full flex-row justify-between items-center px-5">
                        <Ionicons name="close" size={24} color="black" onPress={() => {
                            resetFilters();
                            navigation.goBack()
                            }} />
                        <Text className="text-app-secondary font-medium" onPress={resetFilters}>Wyczyść</Text>
                    </View>

                    {/* Centered title */}
                    <Text className="absolute text-app-secondary text-lg font-semibold">Sortowanie i filtry</Text>
                </View>
                {/* Bottom absolute button */}
                <View className='absolute bottom-0 left-0 bg-transparent z-20 w-full justify-center items-center'>
                    <BlurView
                        intensity={2}
                        tint="default"
                        className="absolute bottom-0 w-full h-11 z-10"
                    />
                    <Button 
                    style ={{width:'40%'}} 
                    className='z-30 h-12 mb-10 bg-app-secondary flex-row justify-center items-center rounded-xl'
                    onPress={()=> {
                        navigation.goBack();
                    }}
                    >
                        <ButtonText className='text-app-background text-lg font-semibold'>
                            Pokaż wyniki
                        </ButtonText>
                    </Button>
                </View>
                {/* Main content */}
                <ScrollView className="w-full bg-app-background px-4 mt-6"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Sortowanie */}
                    <Text className='text-app-secondary font-semibold text-2xl'>Sortuj według</Text>
                    {/* <Text>{sortBy}</Text> */}
                        {sortOptions.map((option) => {
                            const selected = sortBy === option.value;

                            return (
                            <Pressable
                                key={option.value}
                                onPress={() => setSortBy(option.value)}
                                className="flex-row items-center justify-between px-4 border-b border-app-secondary/50 py-3"
                            >
                            <Text className="text-app-secondary text-base font-medium">{option.label}</Text>
                                <View
                                className={`w-4 h-4 rounded-full border-2 ${
                                    selected ? 'bg-app-secondary border-app-secondary' : 'border-app-primary'
                                }`}
                                />
                            </Pressable>
                            );
                        })}
                        {/* Filtrowanie */}
                    <Text className='text-app-secondary font-semibold text-2xl mt-6'>Filtruj według</Text>
                    <Text className='text-app-secondary text-lg font-medium mt-4'>Zakres ceny (zł)</Text>
                    <View className="flex-row justify-center items-center mt-2 px-4">
                        <TextInput
                            keyboardType="numeric"
                            className="border border-app-secondary rounded-md px-2 py-2 mr-4 text-app-secondary w-1/3"
                            value={priceRange[0].toString()}
                            onChangeText={(text) => {
                                const value = parseFloat(text);
                                if (!isNaN(value)) {
                                    setPriceRange([value, priceRange[1]]);
                                }
                            }}
                            placeholder="Min"
                        />
                        <Text className="text-app-secondary font-semibold text-xl">-</Text>
                        <TextInput
                            keyboardType="numeric"
                            className="border border-app-secondary rounded-md ml-4 px-2 py-2 text-app-secondary w-1/3"
                            value={priceRange[1].toString()}
                            onChangeText={(text) => {
                                const value = parseFloat(text);
                                if (!isNaN(value)) {
                                    setPriceRange([priceRange[0], value]);
                                }
                            }}
                            placeholder="Max"
                        />
                    </View>
                    <Text className='text-app-secondary text-lg font-medium mt-4'>Marki</Text>
                    <View className="flex-col mt-2">
                        {brands.map((brand) => {
                            const isSelected = brandIds.includes(brand.id);
                            return (
                            <Pressable
                                key={brand.id}
                                onPress={() => {
                                    if (isSelected) {
                                        setBrandIds(brandIds.filter((id) => id !== brand.id));
                                    } else {
                                        setBrandIds([...brandIds, brand.id]);
                                    }
                                }}
                                className={`flex-row h-12 items-center justify-between px-4 py-3 border-b border-app-secondary/60`}
                            >
                                <Text className={`text-app-secondary text-base font-medium`}>{brand.name}</Text>
                                {isSelected && <Ionicons name="checkmark" size={23} color="app-secondary" />}
                            </Pressable>
                            );
                        }
                        )}
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default sortAndFilterView