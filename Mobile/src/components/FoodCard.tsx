import { Image, Pressable, Text, View, type PressableProps } from 'react-native';

type FoodCardProps = PressableProps & {
  name: string;
  price: string;
  subtitle?: string;
  image?: string;
};

const DEFAULT_IMAGE =
  'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80';

export default function FoodCard({ name, price, subtitle, image, ...props }: FoodCardProps) {
  return (
    <Pressable
      className="mb-3 flex-row overflow-hidden rounded-2xl border border-border bg-card"
      {...props}>
      <Image source={{ uri: image ?? DEFAULT_IMAGE }} className="h-24 w-24" resizeMode="cover" />
      <View className="flex-1 justify-center gap-1 px-3 py-2">
        <Text className="text-base font-bold text-card-foreground">{name}</Text>
        {subtitle ? <Text className="text-xs text-muted-foreground">{subtitle}</Text> : null}
        <Text className="text-sm font-semibold text-primary">{price}</Text>
      </View>
    </Pressable>
  );
}
