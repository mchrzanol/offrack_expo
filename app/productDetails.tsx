import { Button, ButtonText } from '@/components/ui/button'
import ImageGallery from '@/components/ui/productDetails/imageGallery'
import { Ionicons } from '@expo/vector-icons'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React from 'react'
import { Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const productDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const {id, name, brand_name} = route.params as {id: string, name: string, brand_name: string};

  const images = [
    "https://nbyhskkxmekplrhtwckq.supabase.co/storage/v1/object/public/clothes-images/ENRAGE/2/camo_hoodie_model_1.png",
    "https://nbyhskkxmekplrhtwckq.supabase.co/storage/v1/object/public/clothes-images/ENRAGE/2/camomaterial_82e60e2f-1182-4e40-ae39-1c43680bc28b.png",
    "https://nbyhskkxmekplrhtwckq.supabase.co/storage/v1/object/public/clothes-images/ENRAGE/2/front.png"
  ]
  return (
    <SafeAreaView
        className="flex-1 bg-app-background items-center"
        style={{ position: 'relative' }}
        edges={['top']}
        >
        <View className="w-full h-full relative">
          {/* Top absolute view */}
          <View className='absolute top-0 left-0 bg-transparent z-20 p-5 w-full flex-row justify-between'>
            <Ionicons name="chevron-back" size={28} color="app-secondary" onPress={()=>navigation.goBack()}/>
              <View className='flex-col items-center'>
                <Ionicons name="heart-outline" size={28} color="app-secondary" />
                <Ionicons name="share-outline" size={28} color="app-secondary" />
              </View>
          </View>
          {/* Bottom absolute view */}
          <View className='absolute bottom-5 left-0 bg-transparent z-20 p-5 w-full justify-center items-center'>
              <Button className='w-auto h-10 bg-app-background border border-app-secondary flex-row justify-center items-center rounded-lg'>
                <ButtonText className='text-app-secondary text-lg font-semibold'>
                  Kup Teraz
                </ButtonText>
                <Ionicons name="cart-outline" size={20} color="app-secondary" />
              </Button>
            {/* <Ionicons name="cart-outline" size={28} color="app-secondary" /> */}
          </View>
          {/* Main content */}
          <ImageGallery productImages={images} />
          <View className="w-full h-auto px-5 mt-5">
            <Text className="text-app-secondary text-2xl font-semibold">{name}</Text>
            <Text className="text-app-secondary text-lg mt-1">{brand_name}</Text>
            <Text className="text-app-secondary text-lg mt-1">249,99 zł</Text>
            <Text className="text-app-secondary text-base mt-3">Opis produktu</Text>
            <Text className="text-app-secondary text-base mt-1">
              To jest przykładowy opis produktu. Tutaj możesz dodać szczegóły dotyczące materiału, rozmiaru, koloru i innych cech produktu.
            </Text>
          </View>
        </View>
    </SafeAreaView>
  )
}

export default productDetails