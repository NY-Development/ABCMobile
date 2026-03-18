import { Image, Pressable, Text, View, type PressableProps } from 'react-native';

type RestaurantCardProps = PressableProps & {
  name: string;
  meta: string;
  rating?: string;
  image?: string;
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1200&q=80';

export default function RestaurantCard({
  name,
  meta,
  rating,
  image,
  ...props
}: RestaurantCardProps) {
  return (
    <Pressable className="mb-4 overflow-hidden rounded-2xl border border-border bg-card" {...props}>
      <Image source={{ uri: image ?? DEFAULT_IMAGE }} className="h-36 w-full" resizeMode="cover" />
      <View className="gap-1 p-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-lg font-bold text-card-foreground">{name}</Text>
          {rating ? <Text className="text-sm font-semibold text-primary">{rating}</Text> : null}
        </View>
        <Text className="text-sm text-muted-foreground">{meta}</Text>
      </View>
    </Pressable>
  );
}
