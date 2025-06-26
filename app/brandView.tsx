import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { Image } from 'expo-image';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

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
  return (
  <SafeAreaView
      className="flex-1 bg-app-background items-center"
      edges={['top', 'bottom']}
  >
      <View className="w-full h-full relative flex-col">
          {/* Top absolute view */}
          <View className='z-20 p-2 w-full flex-row items-center justify-center bg-transparent relative'>
              <Ionicons name="chevron-back" className='p-3 absolute -top-1 left-0' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
              <View className='flex-1 items-center justify-center flex-col w-full bg-transparent mt-8'>
                  {brand_logo_url ? (
                    <Image
                      source={{ uri: brand_logo_url}}
                      style={{ width: '100%', height: 40}}
                      contentFit="contain"
                    />
                  ) : (
                    <Text className="text-black text-2xl ml-1 font-medium">{brand_name}</Text>
                  )}
                  <Text className='text-app-secondary text-xl font-semibold'>{brand_name}</Text>
                  {brand_description && <Text className='text-app-secondary text-base mt-1'>{brand_description}</Text>}
              </View>
          </View>
          <Text className="text-xl font-semibold mb-2 mt-5 self-start ml-3">Produkty marki</Text>
      </View>
  </SafeAreaView>
  )
}

export default brandView