import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { useThemeStore } from '../../store/themeStore';

type ProductItem = {
  id: string;
  name: string;
  description: string;
  category?: string;
  price: number;
  stock: number;
  size?: string;
  shape?: string;
  colorTheme?: string;
  image: string;
  status?: 'ACTIVE' | 'SOLD OUT';
  visible: boolean;
};

type ProductForm = {
  name: string;
  category: string;
  price: string;
  quantity: string;
  size: string;
  shape: string;
  colorTheme: string;
  description: string;
  image: string;
};

const INITIAL_PRODUCTS: ProductItem[] = [
  {
    id: 'p1',
    name: 'Butter Croissant',
    description: 'Classic french pastry',
    category: 'Pastries',
    price: 45,
    stock: 24,
    size: 'Medium',
    shape: 'Classic',
    colorTheme: 'Golden',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwsp8C7bpAVUkZRdDJvwXwvTstLvfosJ_QI5rIs24y3wC9cyuti2NS1z0mXdfeqWLtqWfSBr1CDYFAvGpva2frSqwLYtMGUrt6XbUlyhKDEOwtDRf-FS_q4v3ZWj8x5FdYkEW6a9OO0bBclrYUar89uTEx2WUF_Y9K1CuT4pPt8Wr6avpur90_anQibSCSDf5ZNKL20mTsez_KoJdiD7JFrLP7GSShzjdiwa-gharnGf2FcPBg7SrDXpE6f3iMFdzWX6EZHAYQr6f',
    status: 'ACTIVE',
    visible: true,
  },
  {
    id: 'p2',
    name: 'Dark Forest Cake',
    description: 'Rich chocolate layers',
    category: 'Cakes',
    price: 600,
    stock: 5,
    size: 'Large',
    shape: 'Round',
    colorTheme: 'Dark Chocolate',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBJkn9Y6pSc8reYsaW-Y7JI9LEy-QV5apRW1HlMArCZIGgCDn8s4TTR2TtAqZyYUlTwNUhdGE6z1AqJ5p_p9Dr9MJNPE0sIl9qZddxCkaHw2R-FBeoIsB9jFjRbjt5wfPHGCws5EK1f9BQOxoSZDeb5kT0sy_0P1EY6_PlozeRkZA9-guwYgrpE3YxsmvkXH7EUSeYtdgIStBsNuIQmmgbZBVosZHOsqDrUllTBCXH6oZREgv9tE4GLPxZ7wNw36ERqrOltq3mU612G',
    visible: true,
  },
  {
    id: 'p3',
    name: 'Sourdough Loaf',
    description: 'Artisan baked daily',
    category: 'Breads',
    price: 120,
    stock: 12,
    size: 'Medium',
    shape: 'Oval',
    colorTheme: 'Rustic Brown',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCJFbDPPVHICyDmv853auPy8hKmrLjmz5sxHXZqK52Y6XJxzVNKrP4kGS-P1PcVNbgeKOBKf93_arNp2YL4FfqjLOAlsNokxZcPby14Xv6Y72A3jUBpmWZdnFkdC_fzDESrpreJ3Pe0Sealn5uJBwhKpgbcNdq0mwni8nwcZxET7w1QK3I7ILeIpoCpQuWRq5bgQwjXkJjf-HPRfNiEKaQZVgh89ilFbTb4uckfAGkDVkwwBjEZri9Q9zRWq7d53ScYD8Lan74UxwcB',
    visible: true,
  },
  {
    id: 'p4',
    name: 'Strawberry Tart',
    description: 'Fresh seasonal fruit',
    category: 'Pastries',
    price: 85,
    stock: 0,
    size: 'Small',
    shape: 'Round',
    colorTheme: 'Red & Cream',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB-_QKBZaX2K1vdC0TnrsGHOnz-N0U9kaw7SLiMOCKOCEhbNbqjbq59eo4StsjepMYXFItUh5xkcJBZfJ5iwnmSsDGa01vicLCeO7d-mbCwq-dJDg-xxe4MJmRAJUUgxZKvBbADo72Ux5dBJiQZZZ6e5dOV-iCm2LwN7LKXKvwFE6lM3QnM86M8LJ66hK6j-UoyX99Al9l6GkOpI50qFKh1GCNAhupYGNmtJ9o4EMc7eMqs8LnVJCi_MFMPTcH8Ls9tL22eulu94Q6t',
    status: 'SOLD OUT',
    visible: false,
  },
  {
    id: 'p5',
    name: 'Cinnamon Roll',
    description: 'Warm spices',
    category: 'Pastries',
    price: 55,
    stock: 30,
    size: 'Medium',
    shape: 'Spiral',
    colorTheme: 'Brown & Cream',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCQ7TaxrKKaeeHtTMP-avBRG-_bo3EJaQ6QwefhMxRd1gqDGwXuVyCQfvCxh9axlUGYa5p2g14otYdGN3ipYokxQ8CVWc1c4sTh_ImmH9bWAq9JLVhkeJeARKG2c3-If6C4AaoEBi4zug2SQk9CyXF6_uMrYKy72A7iy9tFpF6NBofv4ow1-RvjZS1kfxYzKj5WU90yYZBCrHsZ8x7E0m_5A-fHNpZGJ77fusMhaCWBzmOTqrh1ZkKsKfebJlexP-o0p_4OTtOjdJ_7',
    visible: true,
  },
  {
    id: 'p6',
    name: 'Baguette',
    description: 'Crispy crust',
    category: 'Breads',
    price: 35,
    stock: 15,
    size: 'Medium',
    shape: 'Long',
    colorTheme: 'Golden Brown',
    image:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCI-OrvjUZWOjFWNBhT6eLJuBPTUVCO-zLUIUixeeMCTF4eEL03eXvRX51To-xgnnFv-fbgSqAQew4e1N89vIycJdEh2z72vcVDljU3p2onY1dNlZhvDJDNnZniF2YLQLjBi3BLrWUhexx-KALqpD9UKVqZ3bCjlMZNsqP2rwbnEMBU7GX1m1azO9QQiOOHxRfCPDHKtYLhrVHEr-4Bqmzda7dKhRsDcrUuHHfomIwM1_wPcSAZ5OTR77YeiRUcjMZUiYoesBj0JwP7',
    visible: true,
  },
];

const EMPTY_FORM: ProductForm = {
  name: '',
  category: '',
  price: '',
  quantity: '',
  size: 'Medium',
  shape: 'Round',
  colorTheme: '#ecb613',
  description: '',
  image: '',
};

const CATEGORY_OPTIONS = ['Cakes', 'Pastries', 'Breads', 'Cookies', 'Custom Orders'];
const SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'Extra Large'];
const SHAPE_OPTIONS = ['Round', 'Square', 'Heart', 'Rectangular'];
const DEFAULT_IMAGE =
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAJwsp8C7bpAVUkZRdDJvwXwvTstLvfosJ_QI5rIs24y3wC9cyuti2NS1z0mXdfeqWLtqWfSBr1CDYFAvGpva2frSqwLYtMGUrt6XbUlyhKDEOwtDRf-FS_q4v3ZWj8x5FdYkEW6a9OO0bBclrYUar89uTEx2WUF_Y9K1CuT4pPt8Wr6avpur90_anQibSCSDf5ZNKL20mTsez_KoJdiD7JFrLP7GSShzjdiwa-gharnGf2FcPBg7SrDXpE6f3iMFdzWX6EZHAYQr6f';

export const ProductsScreen = () => {
  const { mode, toggle } = useThemeStore();
  const isDark = mode === 'dark';

  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<ProductItem[]>(INITIAL_PRODUCTS);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [form, setForm] = useState<ProductForm>(EMPTY_FORM);

  const filteredProducts = useMemo(() => {
    const normalized = search.trim().toLowerCase();
    return products.filter((product) => {
      if (!normalized) return true;
      return `${product.name} ${product.description}`.toLowerCase().includes(normalized);
    });
  }, [products, search]);

  const toggleVisibility = (id: string) => {
    setProducts((current) =>
      current.map((item) =>
        item.id === id ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const openAddModal = () => {
    setEditingProductId(null);
    setForm(EMPTY_FORM);
    setIsModalVisible(true);
  };

  const openEditModal = (item: ProductItem) => {
    setEditingProductId(item.id);
    setForm({
      name: item.name,
      category: item.category ?? '',
      price: String(item.price),
      quantity: String(item.stock),
      size: item.size ?? 'Medium',
      shape: item.shape ?? 'Round',
      colorTheme: item.colorTheme ?? '#ecb613',
      description: item.description,
      image: item.image,
    });
    setIsModalVisible(true);
  };

  const setFormValue = <K extends keyof ProductForm>(key: K, value: ProductForm[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const pickProductImage = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      Alert.alert('Permission required', 'Please allow photo library access to upload a product image.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled && result.assets.length > 0) {
      setFormValue('image', result.assets[0].uri);
    }
  };

  const saveProduct = () => {
    const name = form.name.trim();
    if (!name) return;

    const price = Number(form.price) || 0;
    const stock = Number(form.quantity) || 0;
    const payload: Omit<ProductItem, 'id' | 'visible'> = {
      name,
      description: form.description.trim() || 'No description',
      category: form.category || 'Custom Orders',
      price,
      stock,
      size: form.size,
      shape: form.shape,
      colorTheme: form.colorTheme,
      image: form.image.trim() || DEFAULT_IMAGE,
      status: stock > 0 ? 'ACTIVE' : 'SOLD OUT',
    };

    if (editingProductId) {
      setProducts((current) =>
        current.map((item) =>
          item.id === editingProductId
            ? {
                ...item,
                ...payload,
              }
            : item
        )
      );
    } else {
      setProducts((current) => [
        {
          id: `p-${Date.now()}`,
          ...payload,
          visible: true,
        },
        ...current,
      ]);
    }

    setIsModalVisible(false);
    setEditingProductId(null);
    setForm(EMPTY_FORM);
  };

  return (
    <SafeAreaView className="flex-1 bg-background-light dark:bg-background-dark" edges={['top', 'bottom']}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View className="flex-1">
          <View className="border-b border-gray-100 bg-background-light/90 px-5 pb-4 pt-3 dark:border-gray-800/50 dark:bg-background-dark/90">
            <View className="flex-row items-center justify-between">
              <View>
                <Text className="text-2xl font-bold tracking-tight text-text-main dark:text-white">My Products</Text>
                <Text className="text-sm font-medium text-text-muted dark:text-gray-400">Manage your bakery items</Text>
              </View>
              <Pressable
                onPress={toggle}
                className="h-10 w-10 items-center justify-center rounded-full border border-gray-100 bg-surface-light shadow-sm dark:border-gray-700 dark:bg-surface-dark"
              >
                <MaterialCommunityIcons
                  name={isDark ? 'white-balance-sunny' : 'weather-night'}
                  size={20}
                  color={isDark ? '#f3f0e7' : '#1b180d'}
                />
              </Pressable>
            </View>
          </View>

          <ScrollView
            className="flex-1 px-4 py-6"
            contentContainerStyle={{ paddingBottom: 170 }}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            <View className="mb-6 flex-row gap-3">
              <View className="relative flex-1">
                <View className="absolute inset-y-0 left-0 z-10 items-center justify-center pl-3">
                  <MaterialCommunityIcons name="magnify" size={20} color={isDark ? '#a8a29e' : '#9ca3af'} />
                </View>
                <TextInput
                  value={search}
                  onChangeText={setSearch}
                  placeholder="Search pastries..."
                  placeholderTextColor={isDark ? '#9ca3af' : '#6b7280'}
                  className="w-full rounded-xl bg-surface-light py-3 pl-10 pr-4 text-sm text-text-main ring-1 ring-gray-200 dark:bg-surface-dark dark:text-white dark:ring-gray-700"
                />
              </View>
              <Pressable className="h-11 w-11 items-center justify-center rounded-xl border border-gray-200 bg-surface-light shadow-sm dark:border-gray-700 dark:bg-surface-dark">
                <MaterialCommunityIcons
                  name="filter-variant"
                  size={20}
                  color={isDark ? '#f3f0e7' : '#1b180d'}
                />
              </Pressable>
            </View>

            <View className="flex-row flex-wrap justify-between gap-y-4">
              {filteredProducts.map((item) => {
                const statusText = item.status ?? (item.stock > 0 ? 'ACTIVE' : 'SOLD OUT');
                const soldOut = item.stock <= 0 || statusText === 'SOLD OUT';

                return (
                  <View
                    key={item.id}
                    className={`w-[48%] overflow-hidden rounded-xl border border-gray-100 bg-surface-light shadow-sm dark:border-gray-800 dark:bg-surface-dark ${item.visible ? '' : 'opacity-80'}`}
                  >
                    <View className="relative h-40 w-full overflow-hidden bg-gray-100 dark:bg-gray-800">
                      <Image source={{ uri: item.image }} className="h-full w-full" resizeMode="cover" />

                      <Pressable
                        onPress={() => openEditModal(item)}
                        className="absolute right-2 top-2 h-8 w-8 items-center justify-center rounded-full bg-white/90 dark:bg-black/60"
                      >
                        <MaterialCommunityIcons
                          name="pencil-outline"
                          size={18}
                          color={isDark ? '#ffffff' : '#1b180d'}
                        />
                      </Pressable>

                      {item.visible ? (
                        <View
                          className={`absolute bottom-2 left-2 rounded-md px-2 py-0.5 ${soldOut ? 'bg-red-500/90' : 'bg-green-500/90'}`}
                        >
                          <Text className="text-[10px] font-bold text-white">{statusText}</Text>
                        </View>
                      ) : (
                        <View className="absolute inset-0 items-center justify-center bg-black/40">
                          <Text className="text-[10px] font-bold uppercase tracking-wider text-white">Hidden</Text>
                        </View>
                      )}
                    </View>

                    <View className="p-3">
                      <Text className="text-sm font-bold text-text-main dark:text-white" numberOfLines={1}>
                        {item.name}
                      </Text>
                      <Text className="mt-1 text-xs text-text-muted dark:text-gray-400" numberOfLines={1}>
                        {item.description}
                      </Text>
                      <View className="mt-2 flex-row items-center justify-between">
                        <Text className="text-sm font-bold text-primary">{item.price} ETB</Text>
                        <Text className={`text-[10px] ${soldOut ? 'font-medium text-red-500' : 'text-gray-400'}`}>
                          Stock: {item.stock}
                        </Text>
                      </View>

                      <View className="mt-3 flex-row items-center justify-between border-t border-gray-100 pt-2 dark:border-gray-700">
                        <Text className="text-[10px] font-bold uppercase tracking-wider text-text-muted dark:text-gray-400">Visible</Text>
                        <Switch
                          value={Boolean(item.visible)}
                          onValueChange={() => toggleVisibility(item.id)}
                          trackColor={{ false: '#d6d2c9', true: '#f97316' }}
                          thumbColor="#ffffff"
                        />
                      </View>
                    </View>
                  </View>
                );
              })}
            </View>
          </ScrollView>

          <View className="absolute bottom-2 right-5 z-20">
            <Pressable
              onPress={openAddModal}
              className="h-14 w-14 items-center justify-center rounded-full bg-primary"
              style={{ elevation: 8 }}
            >
              <MaterialCommunityIcons name="plus" size={30} color="#ffffff" />
            </Pressable>
          </View>

          <Modal
            animationType="slide"
            transparent
            visible={isModalVisible}
            onRequestClose={() => setIsModalVisible(false)}
          >
            <View className="flex-1 bg-black/60">
              <Pressable className="flex-1" onPress={() => setIsModalVisible(false)} />
              <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <View className="h-[92%] rounded-t-3xl bg-background-light dark:bg-background-dark">
                  <View className="rounded-t-3xl bg-background-light/90 px-6 pb-2 pt-4 dark:bg-background-dark/90">
                    <View className="mb-4 items-center">
                      <View className="h-1.5 w-12 rounded-full bg-neutral-light dark:bg-neutral-dark" />
                    </View>
                    <View className="mb-2 flex-row items-center justify-between">
                      <Text className="text-2xl font-bold tracking-tight text-text-main dark:text-text-main-dark">
                        {editingProductId ? 'Edit Product' : 'Add New Product'}
                      </Text>
                      <View className="flex-row items-center gap-1">
                        <Pressable onPress={toggle} className="rounded-full p-2">
                          <MaterialCommunityIcons
                            name="theme-light-dark"
                            size={20}
                            color={isDark ? '#f3f0e7' : '#1b180d'}
                          />
                        </Pressable>
                        <Pressable onPress={() => setIsModalVisible(false)} className="rounded-full p-2">
                          <MaterialCommunityIcons
                            name="close"
                            size={22}
                            color={isDark ? '#f3f0e7' : '#1b180d'}
                          />
                        </Pressable>
                      </View>
                    </View>
                  </View>

                  <ScrollView
                    className="flex-1 px-6"
                    contentContainerStyle={{ paddingBottom: 140 }}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                  >
                    <View className="my-4">
                      <Pressable
                        onPress={pickProductImage}
                        className="h-44 items-center justify-center rounded-3xl border-2 border-dashed border-primary/40 bg-surface-light dark:bg-surface-dark"
                      >
                        {form.image ? (
                          <Image source={{ uri: form.image }} className="h-full w-full rounded-3xl" resizeMode="cover" />
                        ) : (
                          <View className="items-center">
                            <View className="mb-3 h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                              <MaterialCommunityIcons name="camera-plus-outline" size={24} color="#f97316" />
                            </View>
                            <Text className="text-sm font-semibold text-text-main dark:text-text-main-dark">Product Image</Text>
                            <Text className="text-xs text-text-muted dark:text-text-sub-dark">Tap to upload photo</Text>
                          </View>
                        )}
                      </Pressable>
                    </View>

                    <View className="gap-5">
                      <View>
                        <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Product Name</Text>
                        <TextInput
                          value={form.name}
                          onChangeText={(value) => setFormValue('name', value)}
                          placeholder="e.g., Luxury Wedding Cake"
                          placeholderTextColor={isDark ? '#d1c4a0' : '#9a864c'}
                          className="mt-1.5 h-12 rounded-xl border border-neutral-light bg-surface-light px-4 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-text-main-dark"
                        />
                      </View>

                      <Pressable
                        onPress={pickProductImage}
                        className="h-12 flex-row items-center justify-center gap-2 rounded-xl border border-neutral-light bg-surface-light dark:border-neutral-dark dark:bg-surface-dark"
                      >
                        <MaterialCommunityIcons name="image-plus" size={18} color={isDark ? '#f3f0e7' : '#1b180d'} />
                        <Text className="text-sm font-semibold text-text-main dark:text-text-main-dark">
                          {form.image ? 'Change Image' : 'Upload Image'}
                        </Text>
                      </Pressable>

                      <View className="flex-row gap-4">
                        <View className="flex-1">
                          <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Category</Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                            <View className="flex-row gap-2">
                              {CATEGORY_OPTIONS.map((option) => {
                                const active = form.category === option;
                                return (
                                  <Pressable
                                    key={option}
                                    onPress={() => setFormValue('category', option)}
                                    className={active ? 'rounded-full bg-primary px-3 py-2' : 'rounded-full border border-neutral-light bg-surface-light px-3 py-2 dark:border-neutral-dark dark:bg-surface-dark'}
                                  >
                                    <Text className={active ? 'text-xs font-semibold text-white' : 'text-xs font-medium text-text-main dark:text-text-main-dark'}>
                                      {option}
                                    </Text>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </ScrollView>
                        </View>
                      </View>

                      <View className="flex-row gap-4">
                        <View className="flex-1">
                          <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Price (ETB)</Text>
                          <TextInput
                            value={form.price}
                            onChangeText={(value) => setFormValue('price', value)}
                            placeholder="0.00"
                            keyboardType="numeric"
                            placeholderTextColor={isDark ? '#d1c4a0' : '#9a864c'}
                            className="mt-1.5 h-12 rounded-xl border border-neutral-light bg-surface-light px-4 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-text-main-dark"
                          />
                        </View>
                        <View className="flex-1">
                          <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Quantity</Text>
                          <TextInput
                            value={form.quantity}
                            onChangeText={(value) => setFormValue('quantity', value)}
                            placeholder="Available units"
                            keyboardType="numeric"
                            placeholderTextColor={isDark ? '#d1c4a0' : '#9a864c'}
                            className="mt-1.5 h-12 rounded-xl border border-neutral-light bg-surface-light px-4 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-text-main-dark"
                          />
                        </View>
                      </View>

                      <View className="flex-row gap-4">
                        <View className="flex-1">
                          <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Size</Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                            <View className="flex-row gap-2">
                              {SIZE_OPTIONS.map((option) => {
                                const active = form.size === option;
                                return (
                                  <Pressable
                                    key={option}
                                    onPress={() => setFormValue('size', option)}
                                    className={active ? 'rounded-full bg-primary px-3 py-2' : 'rounded-full border border-neutral-light bg-surface-light px-3 py-2 dark:border-neutral-dark dark:bg-surface-dark'}
                                  >
                                    <Text className={active ? 'text-xs font-semibold text-white' : 'text-xs font-medium text-text-main dark:text-text-main-dark'}>
                                      {option}
                                    </Text>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </ScrollView>
                        </View>
                      </View>

                      <View className="flex-row gap-4">
                        <View className="flex-1">
                          <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Shape</Text>
                          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="mt-2">
                            <View className="flex-row gap-2">
                              {SHAPE_OPTIONS.map((option) => {
                                const active = form.shape === option;
                                return (
                                  <Pressable
                                    key={option}
                                    onPress={() => setFormValue('shape', option)}
                                    className={active ? 'rounded-full bg-primary px-3 py-2' : 'rounded-full border border-neutral-light bg-surface-light px-3 py-2 dark:border-neutral-dark dark:bg-surface-dark'}
                                  >
                                    <Text className={active ? 'text-xs font-semibold text-white' : 'text-xs font-medium text-text-main dark:text-text-main-dark'}>
                                      {option}
                                    </Text>
                                  </Pressable>
                                );
                              })}
                            </View>
                          </ScrollView>
                        </View>
                      </View>

                      <View>
                        <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Color Theme</Text>
                        <TextInput
                          value={form.colorTheme}
                          onChangeText={(value) => setFormValue('colorTheme', value)}
                          placeholder="e.g., Gold & White"
                          placeholderTextColor={isDark ? '#d1c4a0' : '#9a864c'}
                          className="mt-1.5 h-12 rounded-xl border border-neutral-light bg-surface-light px-4 text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-text-main-dark"
                        />
                      </View>

                      <View>
                        <Text className="ml-1 text-xs font-bold uppercase tracking-wider text-text-sub dark:text-text-sub-dark">Description</Text>
                        <TextInput
                          value={form.description}
                          onChangeText={(value) => setFormValue('description', value)}
                          placeholder="Describe the flavors, ingredients, and allergen warnings..."
                          placeholderTextColor={isDark ? '#d1c4a0' : '#9a864c'}
                          multiline
                          textAlignVertical="top"
                          className="mt-1.5 h-32 rounded-xl border border-neutral-light bg-surface-light p-4 text-sm leading-relaxed text-text-main dark:border-neutral-dark dark:bg-surface-dark dark:text-text-main-dark"
                        />
                      </View>
                    </View>
                  </ScrollView>

                  <View className="border-t border-neutral-light bg-background-light/95 p-6 dark:border-neutral-dark dark:bg-background-dark/95">
                    <Pressable
                      onPress={saveProduct}
                      className="h-14 flex-row items-center justify-center gap-3 rounded-2xl bg-primary"
                    >
                      <MaterialCommunityIcons name="content-save-outline" size={22} color="#ffffff" />
                      <Text className="text-lg font-bold text-white">Save Product</Text>
                    </Pressable>
                  </View>
                </View>
              </KeyboardAvoidingView>
            </View>
          </Modal>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
