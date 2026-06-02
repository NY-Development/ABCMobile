import React, { useState } from 'react';
import { View, ScrollView, Pressable, Modal, Image, ActivityIndicator, Linking } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useOwner } from '@/src/features/admin/hooks';
import * as adminService from '@/src/services/admin';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  X,
  Eye,
  Building2,
  MapPin,
  CreditCard,
  FileText,
  CheckCircle,
} from 'lucide-react-native';

export default function OwnerDetailsScreen() {
  const router = useRouter();
  const { ownerId } = useLocalSearchParams<{ ownerId: string }>();
  const ownerIdStr = Array.isArray(ownerId) ? ownerId[0] : ownerId;

  const [showModal, setShowModal] = useState(true);
  const queryClient = useQueryClient();

  const { data: owner, isLoading, error } = useOwner(ownerIdStr);

  const verifyMutation = useMutation({
    mutationFn: () => adminService.verifyCompany(ownerIdStr),
  });

  const isVerified = Boolean(owner?.companyVerified);

  const handleClose = () => {
    setShowModal(false);
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-foreground/10">
      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={handleClose}
      >
        <View className="flex-1 justify-end bg-foreground/40">
          <View className="max-h-[90%] rounded-t-3xl bg-card">
            {/* Handle */}
            <View className="items-center py-3">
              <View className="h-1 w-12 rounded-full bg-muted-foreground/30" />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Header */}
              <View className="border-b border-border px-4 py-4">
                <View className="flex-row items-center justify-between">
                  <Text className="text-xl font-bold text-foreground">Owner Details</Text>
                  <Pressable onPress={handleClose} className="h-10 w-10 items-center justify-center">
                    <Icon as={X} size={20} className="text-muted-foreground" />
                  </Pressable>
                </View>
              </View>

              {isLoading && (
                <View className="flex-1 items-center justify-center py-8">
                  <ActivityIndicator size="large" color="#f97015" />
                </View>
              )}

              {!isLoading && error && (
                <View className="mx-4 my-6 rounded-lg border border-destructive/20 bg-destructive/10 p-4">
                  <Text className="text-sm font-bold text-destructive">Error loading owner</Text>
                  <Text className="mt-1 text-xs text-muted-foreground">Please try again later</Text>
                </View>
              )}

              {!isLoading && owner && (
                <>
                  {/* Company Image */}
                  <View className="mx-4 my-4 overflow-hidden rounded-xl bg-secondary">
                    <View className="h-48 items-center justify-center bg-primary/5">
                      {owner.companyImage ? (
                        <Image
                          source={{ uri: owner.companyImage }}
                          className="h-48 w-full"
                          resizeMode="cover"
                        />
                      ) : (
                        <Icon as={Building2} size={56} className="text-muted-foreground" />
                      )}
                    </View>
                    <View className="absolute bottom-0 left-0 right-0 bg-foreground/30 p-4">
                      <Text className="text-sm font-medium text-primary-foreground">
                        {isVerified ? 'Verified Company' : 'Pending Verification'}
                      </Text>
                    </View>
                  </View>

                  {/* Business Details Section */}
                  <View className="px-4 pt-4">
                    <Text className="text-lg font-bold text-foreground">Business Information</Text>
                  </View>

                  <View className="mx-4 my-2">
                    <View className="flex-row items-center justify-between border-b border-border py-3">
                      <Text className="text-sm text-muted-foreground">Company Name</Text>
                      <Text className="text-sm font-semibold text-foreground">
                        {owner.companyName || 'N/A'}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between border-b border-border py-3">
                      <Text className="text-sm text-muted-foreground">Active Branches</Text>
                      <Text className="text-sm font-semibold text-foreground">
                        {owner.branches ?? 0}
                      </Text>
                    </View>

                    <View className="flex-row items-center justify-between border-b border-border py-3">
                      <View className="flex-1">
                        <Text className="text-sm text-muted-foreground">Registered Location</Text>
                        <Text className="text-sm font-semibold text-foreground" numberOfLines={1}>
                          {owner.location || 'N/A'}
                        </Text>
                      </View>

                      <Pressable
                        onPress={() => {
                          if (owner.mapLocation) Linking.openURL(owner.mapLocation);
                        }}
                        className="flex-row items-center gap-1 px-3 py-2"
                      >
                        <Icon as={MapPin} size={16} className="text-primary" />
                        <Text className="text-sm font-semibold text-primary">View Maps</Text>
                      </Pressable>
                    </View>
                  </View>

                  {/* Financials Section */}
                  <View className="mx-4 my-4">
                    <Text className="mb-3 text-lg font-bold text-foreground">Financials</Text>
                    <View className="flex-row items-center justify-between rounded-lg border border-border bg-background p-4">
                      <View className="flex-row items-center gap-3">
                        <View className="rounded-lg bg-primary/10 p-2">
                          <Icon as={CreditCard} size={20} className="text-primary" />
                        </View>
                        <View>
                          <Text className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                            Account Number
                          </Text>
                          <Text className="font-medium text-foreground">
                            {owner.accountNumber || 'N/A'}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Verification Documents */}
                  <View className="mx-4 my-4">
                    <Text className="mb-3 text-lg font-bold text-foreground">
                      Verification Documents
                    </Text>

                    <Pressable
                      onPress={() => {
                        if (owner.tradingLicense) Linking.openURL(owner.tradingLicense);
                      }}
                      className="flex-row items-center gap-4 rounded-lg border border-border bg-card p-3"
                    >
                      <View className="h-16 w-16 items-center justify-center rounded-lg bg-primary/10">
                        <Icon as={FileText} size={26} className="text-primary" />
                      </View>
                      <View className="flex-1">
                        <Text className="text-sm font-semibold text-foreground">
                          Trading License
                        </Text>
                        <Text className="text-xs text-muted-foreground">
                          {owner.companyVerified ? 'Verified' : 'Pending Review'}
                        </Text>
                      </View>
                      <Icon as={Eye} size={20} className="text-primary" />
                    </Pressable>
                  </View>

                  {/* Action Buttons */}
                  <View className="border-t border-border p-4">
                    <Button
                      variant="default"
                      disabled={verifyMutation.isPending || isVerified}
                      onPress={async () => {
                        try {
                          await verifyMutation.mutateAsync();
                          await queryClient.invalidateQueries({
                            queryKey: ['admin', 'owner', ownerIdStr],
                          });
                        } catch (error) {
                          console.error('Verification failed:', error);
                        }
                      }}
                      className="mb-2 rounded-xl"
                    >
                      <Icon as={CheckCircle} size={18} className="text-primary-foreground" />
                      <Text className="text-sm font-bold">
                        {isVerified ? 'Already Verified' : 'Verify This Owner'}
                      </Text>
                    </Button>

                    <Button variant="secondary" disabled className="rounded-xl">
                      <Icon as={Eye} size={18} className="text-secondary-foreground" />
                      <Text className="text-sm font-semibold">Request More Info</Text>
                    </Button>
                  </View>
                </>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
