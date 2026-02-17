import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Image, ScrollView, Text, View } from 'react-native';
import { Container } from '../../components/layout/Container';
import { ProductCard } from '../../components/customer/ProductCard';

const heroImages = [
  'https://images.unsplash.com/photo-1542826438-5c8d5ad2a547?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1481391032119-d89fee407e44?q=80&w=1200&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=1200&auto=format&fit=crop',
];

const products = [
  {
    id: '1',
    title: 'Chocolate Delight',
    description: 'Rich cocoa sponge with silky ganache.',
    price: 'ETB 450',
    imageUrl:
      'https://images.unsplash.com/photo-1601972599720-b0a82607c44d?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '2',
    title: 'Strawberry Cream',
    description: 'Fresh berries with whipped cream.',
    price: 'ETB 390',
    imageUrl:
      'https://images.unsplash.com/photo-1519869325930-281384150729?q=80&w=1200&auto=format&fit=crop',
  },
  {
    id: '3',
    title: 'Vanilla Dream',
    description: 'Classic vanilla sponge with buttercream.',
    price: 'ETB 330',
    imageUrl:
      'https://images.unsplash.com/photo-1505253213348-5f10f9347b47?q=80&w=1200&auto=format&fit=crop',
  },
];

export const HomeScreen = () => {
  const listRef = useRef<FlatList<string>>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    listRef.current?.scrollToIndex({ index: activeIndex, animated: Boolean(true) });
  }, [activeIndex]);

  return (
    <ScrollView className="flex-1 bg-background-light dark:bg-background-dark">
      <FlatList
        ref={listRef}
        data={heroImages}
        keyExtractor={(item) => item}
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={Boolean(false)}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} className="h-64 w-screen" />
        )}
      />

      <Container className="py-6">
        <Text className="text-3xl font-extrabold text-gray-900 dark:text-gray-100">
          Fresh from ABC
        </Text>
        <Text className="mt-2 text-base text-gray-600 dark:text-gray-400">
          Discover our most loved cakes and bakery treats.
        </Text>

        <View className="mt-6">
          <Text className="text-xl font-semibold text-gray-900 dark:text-gray-100">Popular cakes</Text>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={Boolean(false)}
            className="mt-4"
          >
            <View className="flex-row space-x-4">
              {products.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </View>
          </ScrollView>
        </View>
      </Container>
    </ScrollView>
  );
};
