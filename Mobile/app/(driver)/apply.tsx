import { View } from 'react-native';
import InputField from '@/src/components/InputField';
import PrimaryButton from '@/src/components/PrimaryButton';
import { ScreenShell } from '@/src/components/ScreenPrimitives';

export default function DeliveryPartnerApplicationScreen() {
  return (
    <ScreenShell
      title="Delivery Partner Application"
      subtitle="Apply to start delivering bakery orders.">
      <View className="gap-4">
        <InputField label="Full Name" placeholder="Your full name" />
        <InputField label="Phone Number" placeholder="+251 9XX XXX XXX" keyboardType="phone-pad" />
        <InputField label="Vehicle Type" placeholder="Bike / Motorcycle / Car" />
      </View>
      <View className="mt-8">
        <PrimaryButton label="Submit Application" />
      </View>
    </ScreenShell>
  );
}
