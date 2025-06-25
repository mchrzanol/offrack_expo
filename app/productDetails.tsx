import { Button, ButtonText } from '@/components/ui/button'
import ImageGallery from '@/components/ui/productDetails/imageGallery'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { BlurView } from 'expo-blur'
import { useNavigation } from 'expo-router'
import React from 'react'
import { Linking, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const productDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, name, brand_name, description,price,original_price,buy_link, images} = route.params as {id: string, name: string, brand_name: string,price:number,original_price:number, description:string,buy_link:string, images: string[]};

  if(!id || !name || !brand_name || !price || !original_price || !buy_link || !images || images.length === 0) {
    return (
      <SafeAreaView className="flex-1 bg-app-background items-center justify-center">
        <Text className="text-app-secondary text-lg">Nie znaleziono produktu</Text>
      </SafeAreaView>
    )
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
        style={{ position: 'relative' }}
        edges={['top']}
        >
        <View className="w-full h-full relative">
          {/* Top absolute view */}
          {/* <View className='absolute top-0 left-0 bg-transparent z-20 p-2 w-full flex-row justify-between'>
            <Ionicons name="chevron-back" className='p-3' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
              <View className='flex-col items-center'>
                <Ionicons name="heart-outline" className='p-3' size={28} color="app-secondary" />
                <Ionicons name="share-outline" className='p-3' size={28} color="app-secondary" />
              </View>
          </View> */}
          {/* Bottom absolute view */}
          <View className='absolute bottom-0 left-0 bg-transparent z-20 w-full justify-center items-center'>
              <BlurView
                intensity={2}
                tint="default"
                className="absolute bottom-0 w-full h-11 z-10"
              />
              <Button 
              style ={{width:'40%'}} 
              className='z-30 h-12 mb-10 bg-app-background border border-black flex-row justify-center items-center rounded-xl'
              onPress={()=> {
                Linking.openURL(buy_link)
              }}
              >
                <ButtonText className='text-black text-lg font-semibold'>
                  Kup Teraz
                </ButtonText>
                {/* <Ionicons name="cart-outline" size={20} color="app-secondary" /> */}
              </Button>
            {/* <Ionicons name="cart-outline" size={28} color="app-secondary" /> */}
          </View>
          {/* Main content */}
          <ScrollView
            showsVerticalScrollIndicator={false}
            className='w-full relative'
          >
          <View className='absolute top-0 left-0 bg-transparent z-20 p-2 w-full flex-row justify-between'>
            <Ionicons name="chevron-back" className='p-3' size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
              <View className='flex-col items-center'>
                <Ionicons name="heart-outline" className='p-3' size={28} color="app-secondary" />
                <Ionicons name="share-outline" className='p-3' size={28} color="app-secondary" />
              </View>
          </View>
            <ImageGallery productImages={images} />
            <View className="w-full h-auto px-5 mt-5 pb-32">
              <Text className="text-app-secondary text-2xl font-semibold">{name}</Text>
              <Text className="text-app-secondary text-lg mt-1">{brand_name}</Text>
              {original_price == price ? (
                <Text className="text-app-secondary text-lg mt-1">{formatPrice(price)}zł</Text>
              ): (
                <Text className="text-app-secondary text-lg mt-1 space-x-2">
                  <Text className="line-through text-sm">{formatPrice(original_price)}zł </Text>
                  <Text className="text-red-500 font-semibold">{formatPrice(price)}zł</Text>
                </Text>
              )}
              <Text className="text-app-secondary text-base mt-3">Opis produktu</Text>
              <Text className="text-app-secondary text-base mt-1">
                {description || "Brak opisu"}
              </Text>
            </View>
          </ScrollView>
        </View>
    </SafeAreaView>
  )
}

export default productDetails