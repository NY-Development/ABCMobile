import { Pressable, Text, View, type PressableProps } from 'react-native';

type OrderCardProps = PressableProps & {
  orderId: string;
  date: string;
  amount: string;
  status: string;
};

export default function OrderCard({ orderId, date, amount, status, ...props }: OrderCardProps) {
  return (
    <Pressable className="mb-3 rounded-2xl border border-border bg-card p-4" {...props}>
      <View className="mb-1 flex-row items-center justify-between">
        <Text className="text-sm font-bold text-card-foreground">#{orderId}</Text>
        <Text className="text-xs font-semibold uppercase text-primary">{status}</Text>
      </View>
      <Text className="text-xs text-muted-foreground">{date}</Text>
      <Text className="mt-2 text-base font-bold text-card-foreground">{amount}</Text>
    </Pressable>
  );
}
