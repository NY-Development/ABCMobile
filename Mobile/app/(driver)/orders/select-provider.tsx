import { Text } from 'react-native';
import PrimaryButton from '@/src/components/PrimaryButton';
import { Card, ScreenShell } from '@/src/components/ScreenPrimitives';

export default function DeliveryProviderSelectionScreen() {
  return (
    <ScreenShell title="Delivery Provider" subtitle="Select your delivery service profile.">
      <Card>
        <Text className="text-base font-semibold text-card-foreground">Independent Driver</Text>
      </Card>
      <Card>
        <Text className="text-base font-semibold text-card-foreground">Fleet Partner</Text>
      </Card>
      <PrimaryButton label="Continue" />
    </ScreenShell>
  );
}
