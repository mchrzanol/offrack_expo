import React, { useEffect, useRef, useState } from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
    TextStyle,
    View,
    ViewStyle
} from 'react-native';

interface ScrollingTextProps {
  text: string;
  speed?: number; // pixels per second
  fontSize?: number;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
}

const ScrollingText: React.FC<ScrollingTextProps> = ({
  text,
  speed = 50,
  containerStyle,
  fontSize = 16,
  textStyle,
}) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const [containerWidth, setContainerWidth] = useState(0);
  const [textWidth, setTextWidth] = useState(0);

  useEffect(() => {
    if (textWidth > containerWidth) {
      const distance = textWidth + containerWidth;
      const duration = (distance / speed) * 1000;

      const loopAnimation = () => {
        translateX.setValue(containerWidth);
        Animated.timing(translateX, {
          toValue: -textWidth,
          duration,
          easing: Easing.linear,
          useNativeDriver: true,
        }).start(() => {
          loopAnimation(); // loop again
        });
      };

      loopAnimation();
    }
  }, [containerWidth, textWidth, speed]);

  return (
    <View
      style={[styles.container, containerStyle]}
      onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)}
    >
      <Animated.Text
        onLayout={(e) => setTextWidth(e.nativeEvent.layout.width)}
        numberOfLines={1}
        style={[
          { transform: [{ translateX }] },
          styles.text,
          { fontSize: fontSize, width: fontSize * text.length },
          textStyle,
        ]}
      >
        {text}
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    width: '100%',
    height: 24,
  },
  text: {
    position: 'absolute'
  },
});

export default ScrollingText;
