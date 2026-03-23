import React, { useEffect, useMemo, useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Camera, ChevronDown, Save } from 'lucide-react-native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { vendorAPI } from '@/src/services/vendor';
import { useAuthStore } from '@/src/features/auth';
import { InAppAlert } from '@/src/components/InAppAlert';
import { Icon } from '@/components/ui/icon';
import * as ImagePicker from 'expo-image-picker';

export default function ManageProductScreen() {
  const router = useRouter();
  const params = useLocalSearchParams<{ menuId?: string }>();
  const queryClient = useQueryClient();
  const { user } = useAuthStore();
  const ownerId = (user as any)?.ownerInfo?._id ?? (user as any)?._id ?? (user as any)?.id;
  const menuId = params.menuId ? String(params.menuId) : null;
  const isEditing = Boolean(menuId);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Cake');
  const [price, setPrice] = useState('');
  const [availableQuantity, setAvailableQuantity] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [shape, setShape] = useState('');
  const [pickedImage, setPickedImage] = useState<{ uri: string; name: string; type: string } | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const [banner, setBanner] = useState<{
    visible: boolean;
    type: 'success' | 'error' | 'warning';
    title: string;
    message: string;
  }>({ visible: false, type: 'warning', title: '', message: '' });

  const categories = ['Cookies', 'Cake', 'Waffles', 'Macarons', 'Snacks', 'Beverages'];

  const { data: productsData } = useQuery({
    queryKey: ['vendor', 'products', 'my'],
    enabled: !!ownerId,
    queryFn: () => vendorAPI.getMyProducts(ownerId),
    staleTime: 1000 * 60,
  });

  const product = useMemo(() => {
    if (!menuId) return null;
    const products = productsData ?? [];
    return products.find((p: any) => String(p?._id) === menuId) ?? null;
  }, [menuId, productsData]);

  useEffect(() => {
    if (!product) return;
    setName(product.name || '');
    setDescription(product.description || '');
    setCategory(product.category || 'Cake');
    setPrice(product.price != null ? String(product.price) : '');
    setAvailableQuantity(product.availableQuantity != null ? String(product.availableQuantity) : '');
    setSize(product.size || '');
    setColor(product.color || '');
    setShape(product.shape || '');
    setPreviewImage(product.image || null);
  }, [product]);

  const addMutation = useMutation({
    mutationFn: (payload: any) => vendorAPI.addProduct(payload),
  });

  const updateMutation = useMutation({
    mutationFn: (payload: any) => vendorAPI.updateProduct(menuId!, payload),
  });

  const pickImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      setBanner({
        visible: true,
        type: 'warning',
        title: 'Permission required',
        message: 'Please allow photo library access to upload product images.',
      });
      return;
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ['images'] as ImagePicker.MediaType[],
        allowsEditing: true,
        quality: 0.85,
      });
      const asset = !result.canceled ? result.assets?.[0] : undefined;
      if (!asset?.uri) return;
      const name = asset.fileName || `product-${Date.now()}.jpg`;
      const file = { uri: asset.uri, name, type: asset.mimeType || 'image/jpeg' };
      setPickedImage(file);
      setPreviewImage(asset.uri);
    } catch {
      setBanner({
        visible: true,
        type: 'error',
        title: 'Image error',
        message: 'Failed to pick image. Please try again.',
      });
    }
  };

  const handleSubmit = async () => {
    if (!name.trim() || !category || !price || !availableQuantity) {
      setBanner({
        visible: true,
        type: 'warning',
        title: 'Missing fields',
        message: 'Name, category, price and stock are required.',
      });
      return;
    }
    if (!isEditing && !pickedImage) {
      setBanner({
        visible: true,
        type: 'warning',
        title: 'Image required',
        message: 'Please upload a product image.',
      });
      return;
    }

    const payload = {
      name: name.trim(),
      description: description.trim(),
      category,
      price: Number(price),
      availableQuantity: Number(availableQuantity),
      size: size.trim(),
      color: color.trim(),
      shape: shape.trim(),
      image: pickedImage ?? undefined,
    };

    try {
      if (isEditing) {
        await updateMutation.mutateAsync(payload);
      } else {
        await addMutation.mutateAsync(payload);
      }
      await queryClient.invalidateQueries({ queryKey: ['vendor', 'products', 'my'] });
      setBanner({
        visible: true,
        type: 'success',
        title: isEditing ? 'Updated' : 'Created',
        message: isEditing ? 'Product updated successfully.' : 'Product added successfully.',
      });
      router.replace('/(vendor)/menu/inventory');
    } catch (error: any) {
      setBanner({
        visible: true,
        type: 'error',
        title: 'Save failed',
        message: error?.response?.data?.message || 'Failed to save product.',
      });
    }
  };

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1">
        <View className="flex-row items-center border-b border-border px-4 py-3">
          <Pressable onPress={() => router.back()} className="h-10 w-10 items-center justify-center rounded-full">
            <Icon as={ArrowLeft} size={20} className="text-primary" />
          </Pressable>
          <Text className="ml-1 text-xl font-bold text-foreground">
            {isEditing ? 'Edit Product' : 'Add Product'}
          </Text>
        </View>

        <ScrollView className="flex-1 px-4 py-4" showsVerticalScrollIndicator={false}>
          <InAppAlert
            visible={banner.visible}
            type={banner.type}
            title={banner.title}
            message={banner.message}
            onClose={() => setBanner((s) => ({ ...s, visible: false }))}
          />

          <Text className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Product Image
          </Text>
          <Pressable
            onPress={pickImage}
            className="relative mb-6 h-72 items-center justify-center rounded-xl border-2 border-dashed border-border bg-muted">
            {previewImage ? (
              <Image source={{ uri: previewImage }} className="h-full w-full rounded-xl" />
            ) : (
              <>
                <Icon as={Camera} size={30} className="text-primary" />
                <Text className="mt-2 text-sm font-semibold text-muted-foreground">
                  Tap to upload product photo
                </Text>
              </>
            )}
          </Pressable>

          <Text className="mb-3 text-lg font-bold text-foreground">Product Details</Text>

          <Text className="mb-1 text-sm font-semibold text-foreground">Product Name</Text>
          <TextInput
            value={name}
            onChangeText={setName}
            className="mb-4 h-12 rounded-xl border border-border bg-card px-4 text-foreground"
            placeholder="e.g. Adama Signature Croissant"
            placeholderTextColor="#9ca3af"
          />

          <Text className="mb-1 text-sm font-semibold text-foreground">Category</Text>
          <Pressable
            onPress={() => setShowCategories((v) => !v)}
            className="mb-2 h-12 flex-row items-center justify-between rounded-xl border border-border bg-card px-4">
            <Text className="text-foreground">{category}</Text>
            <Icon as={ChevronDown} size={18} className="text-muted-foreground" />
          </Pressable>
          {showCategories ? (
            <View className="mb-4 flex-row flex-wrap gap-2 rounded-xl border border-border bg-card p-3">
              {categories.map((cat) => (
                <Pressable
                  key={cat}
                  onPress={() => {
                    setCategory(cat);
                    setShowCategories(false);
                  }}
                  className={`rounded-full px-3 py-1.5 ${category === cat ? 'bg-primary' : 'bg-muted'}`}>
                  <Text className={`text-xs font-semibold ${category === cat ? 'text-primary-foreground' : 'text-foreground'}`}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          ) : null}

          <Text className="mb-1 text-sm font-semibold text-foreground">Description</Text>
          <TextInput
            value={description}
            onChangeText={setDescription}
            className="mb-4 rounded-xl border border-border bg-card px-4 py-3 text-foreground"
            placeholder="Describe flavors, ingredients, and allergens..."
            placeholderTextColor="#9ca3af"
            multiline
            numberOfLines={4}
          />

          <View className="mb-5 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Price ($)</Text>
              <TextInput
                value={price}
                onChangeText={setPrice}
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="0.00"
                placeholderTextColor="#9ca3af"
                keyboardType="decimal-pad"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Initial Stock</Text>
              <TextInput
                value={availableQuantity}
                onChangeText={setAvailableQuantity}
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="0"
                placeholderTextColor="#9ca3af"
                keyboardType="number-pad"
              />
            </View>
          </View>

          <View className="mb-3 flex-row gap-3">
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Size</Text>
              <TextInput
                value={size}
                onChangeText={setSize}
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="e.g. Medium"
                placeholderTextColor="#9ca3af"
              />
            </View>
            <View className="flex-1">
              <Text className="mb-1 text-sm font-semibold text-foreground">Color</Text>
              <TextInput
                value={color}
                onChangeText={setColor}
                className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
                placeholder="e.g. Brown"
                placeholderTextColor="#9ca3af"
              />
            </View>
          </View>

          <View className="mb-24">
            <Text className="mb-1 text-sm font-semibold text-foreground">Shape</Text>
            <TextInput
              value={shape}
              onChangeText={setShape}
              className="h-12 rounded-xl border border-border bg-card px-4 text-foreground"
              placeholder="e.g. Round"
              placeholderTextColor="#9ca3af"
            />
          </View>

          <View className="mb-24 flex-row items-center justify-between rounded-xl border border-primary/20 bg-primary/10 p-4 hidden">
            <View>
              <Text className="font-bold text-foreground">Make Featured</Text>
              <Text className="text-xs text-muted-foreground">Show on homepage banner</Text>
            </View>
          </View>
        </ScrollView>

        <View className="border-t border-border bg-card p-4">
          <Pressable
            onPress={handleSubmit}
            disabled={addMutation.isPending || updateMutation.isPending}
            className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4">
            <Icon as={Save} size={16} className="text-primary-foreground" />
            <Text className="font-bold text-primary-foreground">
              {addMutation.isPending || updateMutation.isPending ? 'Saving...' : 'Save Product'}
            </Text>
          </Pressable>
          <Pressable className="mt-2 py-2" onPress={() => router.back()}>
            <Text className="text-center text-sm font-semibold text-muted-foreground">Cancel</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
