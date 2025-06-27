import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFilterStore } from './store/filterStore';

const sortOptions = [
  { label: 'Najnowsze', value: 'newest' },
  { label: 'Cena rosnąco', value: 'priceLow' },
  { label: 'Cena malejąco', value: 'priceHigh' },
  { label: 'Popularność', value: 'popularity' },
] as const;

const sortAndFilterView = () => {
    const { brandIds, setBrandIds, sortBy, setSortBy } = useFilterStore();
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
                        <Ionicons name="close" size={24} color="black" onPress={() => {}} />
                        <Text className="text-app-secondary">Clear All</Text>
                    </View>

                    {/* Centered title */}
                    <Text className="absolute text-app-secondary text-lg">Sortowanie i filtry</Text>
                </View>
                <ScrollView className="w-full bg-app-background px-4 mt-6"
                    showsVerticalScrollIndicator={false}
                >
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
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default sortAndFilterView