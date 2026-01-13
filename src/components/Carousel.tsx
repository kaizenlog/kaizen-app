import React from 'react';
import { ScrollView, ScrollViewProps } from 'react-native';
import { Card } from './Card';

interface CarouselItem {
  time: string;
  description: string;
}

interface CarouselProps extends Omit<ScrollViewProps, 'children'> {
  items: CarouselItem[];
  onItemChange: (index: number, newDescription: string) => void;
}

export const Carousel: React.FC<CarouselProps> = ({ items, onItemChange, ...props }) => {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      {...props}
    >
      {items.map((item, index) => (
        <Card
          key={index}
          time={item.time}
          description={item.description}
          onDescriptionChange={(newDescription) => onItemChange(index, newDescription)}
        />
      ))}
    </ScrollView>
  );
};