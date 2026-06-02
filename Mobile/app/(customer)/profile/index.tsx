import { router } from 'expo-router';
import { View, Text, ScrollView, Pressable, ActivityIndicator, Image as RnImage } from 'react-native';
import { useThemeStore } from '@/src/features/theme/theme.store';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMeQuery, useLogoutMutation } from '@/src/features/auth/auth.hooks';
import {
  ChevronLeft,
  Bell,
  Sun,
  Moon,
  LogOut,
  ChevronRight,
  Package,
  MapPin,
  CreditCard,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  Crown,
  Camera
} from 'lucide-react-native';
import { Icon as UiIcon } from '@/components/ui/icon';

export default function CustomerProfileScreen() {
  const isDark = useThemeStore((state) => state.isDark);
  const { toggleTheme } = useThemeStore();
  const { mutate: logout } = useLogoutMutation();
  const { data: profileResponse, isLoading, error } = useMeQuery();

  // The backend returns the user object directly for /auth/profile
  const user = profileResponse;

  const handleLogout = () => {
    logout();
    router.replace('/(global)/login');
  };

  if (isLoading) {
    return (
      <SafeAreaView className={`flex-1 items-center justify-center ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <ActivityIndicator size="large" color="#f97015" />
      </SafeAreaView>
    );
  }

  if (error || !user) {
     return (
      <SafeAreaView className={`flex-1 items-center justify-center p-6 ${isDark ? 'bg-background-dark' : 'bg-background-light'}`}>
        <Text className={`text-lg font-bold mb-4 ${isDark ? 'text-white' : 'text-slate-900'}`}>
          Failed to load profile
        </Text>
        <Pressable 
          onPress={() => router.replace('/(global)/login')}
          className="bg-primary px-6 py-3 rounded-xl"
        >
          <Text className="text-white font-bold">Go to Login</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const menuItems = [
    { icon: Package, label: 'Order History', route: '/(customer)/orders/history' },
    { icon: MapPin, label: 'My Addresses', route: '#' },
    { icon: CreditCard, label: 'Payment Methods', route: '#' },
    { icon: Settings, label: 'Account Settings', route: '#' },
    { icon: HelpCircle, label: 'Help Center', route: '#' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      {/* Header */}
      <View className="flex-row items-center border-b border-border bg-card px-4 py-4">
        <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <UiIcon as={ChevronLeft} size={20} className="text-primary" />
        </Pressable>
        <Text className="flex-1 text-center text-lg font-bold text-foreground">My Profile</Text>
        <Pressable className="relative h-10 w-10 items-center justify-center rounded-xl bg-muted">
          <UiIcon as={Bell} size={20} className="text-primary" />
          <View className="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-primary border-2 border-background" />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Profile Info */}
        <View className="bg-card p-6 border-b border-border">
          <View className="flex-row items-center gap-5">
            <View className="relative">
              <View className="h-24 w-24 rounded-[32px] border-4 border-primary/20 bg-primary/5 items-center justify-center overflow-hidden">
                {user.avatar || user.image ? (
                   <RnImage source={{ uri: user.avatar || user.image }} className="h-full w-full" />
                ) : (
                  <Text className="text-4xl font-black text-primary">
                    {(user.firstname || user.name)?.charAt(0) || 'U'}
                  </Text>
                )}
              </View>
              <Pressable className="absolute -bottom-1 -right-1 h-8 w-8 items-center justify-center rounded-2xl bg-foreground border-4 border-background">
                <UiIcon as={Camera} size={14} className="text-background" />
              </Pressable>
            </View>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="text-2xl font-black text-foreground tracking-tight">
                  {user.firstname || user.name || 'Customer'}
                </Text>
                <Pressable 
                  onPress={() => router.push('/(customer)/profile/edit')}
                  className="rounded-lg bg-primary/10 px-3 py-1.5 active:bg-primary/20"
                >
                  <Text className="text-xs font-bold text-primary">Edit</Text>
                </Pressable>
              </View>
              <View className="mt-1.5 flex-row items-center gap-1.5 bg-amber-50 self-start px-2.5 py-1 rounded-full border border-amber-100">
                <UiIcon as={Crown} size={12} className="text-amber-600 fill-amber-600" />
                <Text className="text-[10px] font-black uppercase tracking-widest text-amber-700">
                  {user.role || 'Member'}
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Contact Info */}
        <View className="p-6 bg-card border-b border-border">
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-4">Contact Information</Text>
          <View className="gap-5">
            <View className="flex-row items-center gap-4">
              <View className="h-10 w-10 rounded-xl bg-muted items-center justify-center">
                <UiIcon as={Mail} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Email</Text>
                <Text className="text-sm font-black text-foreground">{user.email || 'N/A'}</Text>
              </View>
            </View>
            <View className="flex-row items-center gap-4">
              <View className="h-10 w-10 rounded-xl bg-muted items-center justify-center">
                <UiIcon as={Phone} size={18} className="text-primary" />
              </View>
              <View>
                <Text className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Phone</Text>
                <Text className="text-sm font-black text-foreground">{user.phone || 'Not provided'}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Menu Items */}
        <View className="p-4 gap-2">
          <Text className="text-xs font-black text-muted-foreground uppercase tracking-widest mb-2 px-2">Account Settings</Text>
          {menuItems.map((item) => (
            <Pressable
              key={item.label}
              onPress={() => item.route !== '#' && router.push(item.route as any)}
              className="flex-row items-center gap-4 bg-card px-4 py-4 rounded-2xl border border-transparent active:bg-muted/50 active:border-border">
              <View className="h-10 w-10 rounded-xl bg-primary/5 items-center justify-center">
                <UiIcon as={item.icon} size={20} className="text-primary" />
              </View>
              <Text className="flex-1 font-bold text-foreground">{item.label}</Text>
              <UiIcon as={ChevronRight} size={16} className="text-muted-foreground" />
            </Pressable>
          ))}
          
          {/* Theme Toggle */}
          <Pressable
            onPress={toggleTheme}
            className="flex-row items-center gap-4 bg-card px-4 py-4 rounded-2xl border border-transparent active:bg-muted/50">
            <View className="h-10 w-10 rounded-xl bg-primary/5 items-center justify-center">
              <UiIcon as={isDark ? Moon : Sun} size={20} className="text-primary" />
            </View>
            <Text className="flex-1 font-bold text-foreground">{isDark ? 'Dark Mode' : 'Light Mode'}</Text>
            <View className={`h-6 w-11 rounded-full px-1 justify-center ${isDark ? 'bg-primary' : 'bg-muted border border-border'}`}>
              <View className={`h-4 w-4 rounded-full ${isDark ? 'bg-white self-end' : 'bg-muted-foreground self-start'}`} />
            </View>
          </Pressable>
        </View>

        {/* Logout */}
        <View className="px-6 py-8 pb-32">
          <Pressable
            onPress={handleLogout}
            className="h-16 flex-row items-center justify-center gap-3 rounded-2xl border border-red-100 bg-red-50 active:bg-red-100">
            <UiIcon as={LogOut} size={20} className="text-red-500" />
            <Text className="text-sm font-black uppercase tracking-[2px] text-red-600">Logout</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
