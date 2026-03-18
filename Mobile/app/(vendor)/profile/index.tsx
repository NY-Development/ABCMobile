import React from 'react';
import { View, Text, ScrollView, Pressable, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import {
  Phone,
  Mail,
  MapPin,
  CheckCircle,
  TrendingUp,
  Edit,
  Eye,
  Boxes,
} from 'lucide-react-native';

export default function VendorProfileScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        {/* Header with Theme Toggle */}
        <View className="flex-row items-center justify-between border-b border-border bg-card px-4 py-3">
          <View className="flex-1">
            <Text className="text-lg font-bold text-foreground">My Profile</Text>
          </View>
        </View>

        {/* Hero Section with Bakery Image */}
        <View className="relative h-48 w-full overflow-hidden bg-gradient-to-b from-primary/10 to-background">
          <ImageBackground
            source={{
              uri: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=300&fit=crop',
            }}
            className="h-full w-full">
            <View className="flex-1 bg-black/40" />
          </ImageBackground>

          {/* Bakery Logo Overlay */}
          <View className="absolute bottom-4 left-4 flex-row items-end gap-4">
            <View className="h-20 w-20 items-center justify-center rounded-xl border-2 border-primary bg-card p-2 shadow-lg">
              <Text className="text-2xl">🍞</Text>
            </View>
            <View className="mb-1 flex-1">
              <View className="flex-row items-center gap-2">
                <Text className="text-2xl font-bold text-white">Golden Grain</Text>
                <View className="inline-flex flex-row items-center gap-1 rounded-full bg-primary px-2 py-1">
                  <CheckCircle size={12} color="#fff" />
                  <Text className="text-[10px] font-bold text-white">PRO</Text>
                </View>
              </View>
              <Text className="text-sm text-gray-200">Artisan Sourdough Specialist</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View className="relative z-10 mx-4 -mt-4 mb-4 flex-row gap-3">
          <View className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Text className="text-xs font-semibold uppercase text-muted-foreground">
              Active Products
            </Text>
            <View className="mt-2 flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-foreground">24</Text>
              <Text className="text-xs font-bold text-green-600">+2</Text>
            </View>
          </View>

          <View className="flex-1 rounded-2xl border border-border bg-card p-4 shadow-sm">
            <Text className="text-xs font-semibold uppercase text-muted-foreground">
              Total Orders
            </Text>
            <View className="mt-2 flex-row items-baseline gap-1">
              <Text className="text-2xl font-bold text-foreground">1.2k</Text>
              <Text className="text-xs font-bold text-primary">↑12%</Text>
            </View>
          </View>
        </View>

        {/* Trading License Verified Banner */}
        <View className="mx-4 mb-4 flex-row items-center gap-3 rounded-2xl border border-green-200 bg-green-50 p-4 dark:border-green-900/30 dark:bg-green-900/10">
          <View className="h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-800/40">
            <CheckCircle size={20} color="#16a34a" />
          </View>
          <View className="flex-1">
            <Text className="text-sm font-bold text-green-900 dark:text-green-100">
              Trading License Verified
            </Text>
            <Text className="text-xs text-green-700 dark:text-green-400">ID: BL-2024-8892-XT</Text>
          </View>
        </View>

        {/* Business Details Section */}
        <View className="mx-4 mb-4 rounded-2xl border border-border bg-card shadow-sm">
          <View className="flex-row items-center justify-between border-b border-border px-5 py-4">
            <Text className="text-lg font-bold text-foreground">Business Details</Text>
            <Pressable>
              <Text className="text-sm font-semibold text-primary">Edit</Text>
            </Pressable>
          </View>

          <View className="space-y-5 px-5 py-5">
            {/* Phone */}
            <View className="flex-row gap-4">
              <Phone size={20} color="#9ca3af" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Phone</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">
                  +1 (555) 234-5678
                </Text>
              </View>
            </View>

            {/* Email */}
            <View className="flex-row gap-4">
              <Mail size={20} color="#9ca3af" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Email</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">
                  orders@goldengrain.com
                </Text>
              </View>
            </View>

            {/* Address */}
            <View className="flex-row gap-4">
              <MapPin size={20} color="#9ca3af" />
              <View className="flex-1">
                <Text className="text-xs text-muted-foreground">Address</Text>
                <Text className="mt-1 text-sm font-semibold text-foreground">
                  42 Baker Street, Flour District, NY 10012
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Performance Chart */}
        <View className="mx-4 mb-4 rounded-2xl border border-border bg-card p-5 shadow-sm">
          <View className="mb-6 flex-row items-end justify-between">
            <View>
              <Text className="text-lg font-bold text-foreground">Performance</Text>
              <Text className="text-xs text-muted-foreground">Weekly revenue growth</Text>
            </View>
            <Text className="text-2xl font-black text-primary">+$4,280</Text>
          </View>

          {/* Mini Chart */}
          <View className="mb-4 h-24 flex-row items-end justify-between gap-2">
            {[0.4, 0.6, 0.45, 0.8, 0.7, 1, 0.55].map((height, idx) => (
              <View
                key={idx}
                className={`flex-1 rounded-t-lg ${
                  idx >= 3
                    ? 'bg-primary'
                    : idx === 2
                      ? 'bg-primary/40'
                      : idx === 1
                        ? 'bg-primary/20'
                        : 'bg-muted'
                }`}
                style={{ height: `${height * 100}%` }}
              />
            ))}
          </View>

          {/* Chart Labels */}
          <View className="flex-row justify-between px-1">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day, idx) => (
              <Text key={idx} className="text-[10px] font-bold uppercase text-muted-foreground">
                {day}
              </Text>
            ))}
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mx-4 mb-8 gap-3">
          <Pressable className="flex-row items-center justify-center rounded-2xl bg-primary px-6 py-4 shadow-lg">
            <Boxes size={20} color="#fff" />
            <Text className="ml-2 text-lg font-bold text-white">Manage Inventory</Text>
          </Pressable>

          <Pressable className="flex-row items-center justify-center rounded-2xl border-2 border-primary bg-transparent px-6 py-4">
            <Eye size={20} color="#ec5b13" />
            <Text className="ml-2 text-lg font-bold text-primary">View Public Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}
