import { Image } from 'expo-image';
import React, { useRef, useState } from 'react';
import { LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, useWindowDimensions, View } from 'react-native';


interface ImageGalleryProps {
  productImages: string[];
}

const ImageGallery: React.FC<ImageGalleryProps> = ({ productImages }) => {
  const scrollRef = useRef<ScrollView>(null);
  const { width } = useWindowDimensions();
  const padding = 20; // 1.25rem = 20px
  const imageWidth = width - padding * 2;
  const [activeIndex, setActiveIndex] = useState(0);
    const [containerWidth, setContainerWidth] = useState(0);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const newIndex = Math.round(scrollPosition / imageWidth);
    setActiveIndex(newIndex);
  };

  const handleLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    setContainerWidth(width);
  };

  return (
    <View className='z-10 relative' onLayout={handleLayout}>
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        style={{ width:containerWidth, height: '60%' }}
      >
        {productImages.map((uri, index) => (
          <Image
            key={index}
            source={{ uri:uri }}
            style={{ width: containerWidth, height: '100%', zIndex: 1 }}
            contentFit='cover'
          />
        ))}
      </ScrollView>

      <View className="flex-row justify-center mt-3 absolute bottom-2 left-1/2 transform -translate-x-1/2 z-20">
        {productImages.map((_, index) => (
          <View
            key={index}
            className={`w-10 h-1 mx-1 ${
              activeIndex === index ? 'bg-black' : 'bg-gray-300'
            }`}
          />
        ))}
      </View>
    </View>
  );
};

export default ImageGallery;
