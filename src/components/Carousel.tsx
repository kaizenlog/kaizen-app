import React, { useState } from 'react';
import { ScrollView, ScrollViewProps, View, Dimensions } from 'react-native';
import { Card } from './Card';

interface CarouselItem {
  time: string;
  description: string;
}

interface CarouselProps extends Omit<ScrollViewProps, 'children'> {
  items: CarouselItem[];
  onItemChange: (index: number, newDescription: string) => void;
}

const { height: screenHeight } = Dimensions.get('window');

export const Carousel: React.FC<CarouselProps> = ({ items, onItemChange, ...props }) => {
  const [scrollY, setScrollY] = useState(0);
  const cardHeight = 100;
  const centerY = screenHeight / 2;

  const getCardTransform = (index: number) => {
    const cardY = index * (cardHeight + 16) - scrollY + cardHeight / 2;
    const distanceFromCenter = Math.abs(cardY - centerY);
    const maxDistance = screenHeight / 2;
    const normalizedDistance = Math.min(distanceFromCenter / maxDistance, 1);
    
    const scale = 1 - normalizedDistance * 0.2;
    const marginVertical = 8 + (1 - normalizedDistance) * 8;
    
    return { scale, marginVertical };
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      onScroll={(event) => setScrollY(event.nativeEvent.contentOffset.y)}
      scrollEventThrottle={16}
      {...props}
    >
      {items.map((item, index) => {
        const { scale, marginVertical } = getCardTransform(index);
        return (
          <View
            key={index}
            style={{
              transform: [{ scale }],
              marginVertical,
            }}
          >
            <Card
              time={item.time}
              description={item.description}
              onDescriptionChange={(newDescription) => onItemChange(index, newDescription)}
            />
          </View>
        );
      })}
    </ScrollView>
  );
};