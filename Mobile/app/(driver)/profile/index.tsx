import { Text } from 'react-native';
import { Card, ScreenShell } from '@/src/components/ScreenPrimitives';

const stats = ['Deliveries: 128', 'Rating: 4.9', 'Active Since: 2024'];

export default function DeliveryProviderProfileScreen() {
  return (
    <ScreenShell title="Driver Profile" subtitle="Manage your courier account.">
      <Card>
        <Text className="text-lg font-bold text-card-foreground">Samuel Bekele</Text>
        <Text className="mt-1 text-sm text-muted-foreground">samuel.driver@example.com</Text>
      </Card>
      {stats.map((item) => (
        <Card key={item}>
          <Text className="text-base text-card-foreground">{item}</Text>
        </Card>
      ))}
    </ScreenShell>
  );
}
