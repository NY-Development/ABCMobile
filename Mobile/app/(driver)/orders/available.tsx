import { Text } from 'react-native';
import PrimaryButton from '@/src/components/PrimaryButton';
import { Card, ScreenShell } from '@/src/components/ScreenPrimitives';

export default function DeliveryRequestsScreen() {
  return (
    <ScreenShell title="Delivery Requests" subtitle="Nearby deliveries waiting for pickup.">
      <Card>
        <Text className="text-base font-bold text-card-foreground">Order #2026-1043</Text>
        <Text className="mt-1 text-sm text-muted-foreground">
          Pickup: Golden Crust • Dropoff: Bole
        </Text>
        <Text className="mt-2 text-sm font-semibold text-primary">ETB 120 payout</Text>
      </Card>
      <PrimaryButton label="Accept Request" />
    </ScreenShell>
  );
}
