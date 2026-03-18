import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useLogoutMutation } from '@/src/features/auth/auth.hooks';
import {
  ChevronLeft,
  Bell,
  Home,
  ShoppingBag,
  Users,
  MoreVertical,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react-native';

export default function CustomerProfileScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { toggleTheme } = useThemeStore();
  const { mutate: logout } = useLogoutMutation();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    { icon: '📦', label: 'Order History', route: '/(customer)/orders/history' },
    { icon: '📍', label: 'My Addresses', route: '#' },
    { icon: '💳', label: 'Payment Methods', route: '#' },
    { icon: '⚙️', label: 'Settings', route: '#' },
    { icon: '❓', label: 'Help Center', route: '#' },
  ];

  return (
    <SafeAreaView
      className={`max-w-md flex-1 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
      {/* Header with Notification Bell */}
      <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-4">
        <Pressable
          onPress={() => router.back()}
          style={{ cursor: 'pointer' }}
          className="flex size-10 items-center justify-center">
          <ChevronLeft size={24} color="#ec5b13" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">My Profile</Text>
        <Pressable
          style={{ cursor: 'pointer' }}
          className="relative flex size-10 items-center justify-center rounded-full">
          <Bell size={24} color="#ec5b13" />
          <View className="absolute right-1 top-1 h-2.5 w-2.5 rounded-full bg-red-500" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1 pb-24">
        {/* Profile Section */}
        <View className="border-b border-border bg-card p-6">
          <View className="flex-row items-end gap-4">
            {/* Avatar */}
            <View className="relative">
              <Image
                source={require('@/assets/images/placeholder.png')}
                className="size-20 rounded-full border-4 border-primary bg-primary/10"
              />
              <Pressable
                style={{ cursor: 'pointer' }}
                className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full border-2 border-card bg-primary">
                <Text className="text-lg">✎</Text>
              </Pressable>
            </View>
            {/* User Info */}
            <View className="flex-1 pb-1">
              <Text className="text-2xl font-bold text-foreground">Liya Tadesse</Text>
              <View className="mt-1 inline-flex flex-row items-center gap-1 rounded-full bg-yellow-100 px-2 py-0.5">
                <Text className="text-sm">👑</Text>
                <Text className="text-xs font-bold uppercase tracking-widest text-yellow-700">
                  Gold Member
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info Section */}
        <View className="border-b border-border bg-background p-6">
          <Text className="mb-4 text-lg font-bold text-foreground">Contact Info</Text>
          <View className="space-y-3">
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Text className="text-lg">📧</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Email
                </Text>
                <Text className="font-semibold text-foreground">liya.tadesse@email.com</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Text className="text-lg">📱</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Phone
                </Text>
                <Text className="font-semibold text-foreground">+251 91 123 4567</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-3">
              <View className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
                <Text className="text-lg">📍</Text>
              </View>
              <View>
                <Text className="text-xs uppercase tracking-wider text-muted-foreground">
                  Address
                </Text>
                <Text className="font-semibold text-foreground">Addis Ababa, Ethiopia</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Account Settings Menu */}
        <View className="bg-background p-4">
          <Text className="mb-3 text-lg font-bold text-foreground">Account Settings</Text>
          <View className="space-y-2">
            {menuItems.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => item.route !== '#' && router.push(item.route as any)}
                style={{ cursor: 'pointer' }}
                className="flex-row items-center gap-3 rounded-lg border-0 bg-card px-4 py-3">
                <Text className="text-xl">{item.icon}</Text>
                <View className="flex-1">
                  <Text className="font-medium text-foreground">{item.label}</Text>
                </View>
                <Text className={item.route !== '#' ? 'text-primary' : 'text-muted-foreground'}>
                  →
                </Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Theme Toggle */}
        <View className="border-t border-border bg-background p-4">
          <Pressable
            onPress={toggleTheme}
            style={{ cursor: 'pointer' }}
            className="flex-row items-center gap-3 rounded-lg border-0 bg-card px-4 py-3">
            {isDark ? <Moon size={24} color="#ec5b13" /> : <Sun size={24} color="#ec5b13" />}
            <View className="flex-1">
              <Text className="font-medium text-foreground">
                {isDark ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </View>
            <View className="h-6 w-11 rounded-full border-2 border-primary bg-primary/20">
              <View
                className={`h-4 w-4 rounded-full bg-primary transition-all ${
                  isDark ? 'translate-x-5' : 'translate-x-1'
                } mt-0.5`}
              />
            </View>
          </Pressable>
        </View>

        {/* Logout Button */}
        <View className="px-4 pb-8 pt-4">
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center justify-center gap-2 rounded-lg border border-red-300/30 bg-red-50 py-3.5"
            style={{ cursor: 'pointer' }}>
            <LogOut size={20} color="#dc2626" />
            <Text className="font-bold uppercase tracking-widest text-red-600">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View className="absolute bottom-0 left-0 right-0 border-t border-border bg-card px-4 pb-6 pt-2">
        <View className="flex-row items-center justify-around">
          <Pressable
            onPress={() => router.push('/(customer)/home')}
            style={{ cursor: 'pointer' }}
            className="flex-col items-center gap-1">
            <Home size={24} color="#6b7280" />
            <Text className="text-xs font-medium uppercase tracking-tighter text-muted-foreground">
              Home
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/restaurants/products')}
            style={{ cursor: 'pointer' }}
            className="flex-col items-center gap-1">
            <ShoppingBag size={24} color="#6b7280" />
            <Text className="text-xs font-medium uppercase tracking-tighter text-muted-foreground">
              Menu
            </Text>
          </Pressable>
          <Pressable
            onPress={() => router.push('/(customer)/orders/history')}
            style={{ cursor: 'pointer' }}
            className="flex-col items-center gap-1">
            <Users size={24} color="#6b7280" />
            <Text className="text-xs font-medium uppercase tracking-tighter text-muted-foreground">
              Orders
            </Text>
          </Pressable>
          <Pressable className="flex-col items-center gap-1">
            <Users size={24} color="#ec5b13" />
            <Text className="text-xs font-medium uppercase tracking-tighter text-primary">
              Profile
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
