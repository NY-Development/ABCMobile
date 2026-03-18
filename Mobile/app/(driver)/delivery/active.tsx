import { Text, View } from 'react-native';
import { Card, ScreenShell } from '@/src/components/ScreenPrimitives';

export default function ActiveDeliveryTrackingScreen() {
  return (
    <ScreenShell title="Active Delivery" subtitle="Track current route and order status.">
      <View className="mb-4 h-56 rounded-2xl border border-border bg-muted/30" />
      <Card>
        <Text className="text-base font-bold text-card-foreground">Order #2026-1043</Text>
        <Text className="mt-2 text-sm text-muted-foreground">Estimated arrival: 12 minutes</Text>
      </Card>
    </ScreenShell>
  );
}
