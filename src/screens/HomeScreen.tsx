import React, { useState, useMemo } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { useQuery } from '@tanstack/react-query';
import { triggerHaptic } from '../utils/haptics';
import { getProducts, Product } from '../services/productApi';
import { useDebouncedValue } from '../hooks/useDebouncedValue';
import { useCartStore } from '../stores/cartStore';
import { ProductCard } from '../components/ProductCard';
import { Watermark } from '../components/Watermark';
import {
    STUDENT,
    DEBOUNCE_MS,
    STALE_TIME_MS,
    ROOM_LABEL,
    PRICE_MULTIPLIER,
    VARIANT,
} from '../constants/student';
import { COLORS } from '../constants/theme';

export const HomeScreen = ({ navigation }: any) => {
    const [searchText, setSearchText] = useState('');
    const debouncedSearch = useDebouncedValue(searchText, DEBOUNCE_MS);
    const addItem = useCartStore((state) => state.addItem);

    const {
        data: products,
        isLoading,
        isError,
        error,
        refetch,
        isRefetching,
    } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: STALE_TIME_MS,
        retry: 1,
    });

    const hasError = isError || (!!error && !isRefetching);

    const filteredProducts = useMemo(() => {
        if (!products) return [];
        if (!debouncedSearch.trim()) return products;
        return products.filter((p) =>
            p.name.toLowerCase().includes(debouncedSearch.toLowerCase())
        );
    }, [products, debouncedSearch]);

    const handleAddToCart = (item: Product) => {
        const priceCalculated = Math.round(item.price * PRICE_MULTIPLIER);
        addItem({
            id: item.id,
            name: item.name,
            price: priceCalculated,
        });

        triggerHaptic();
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.container}>
                {/* Header */}
                <View style={styles.header}>
                    <Text style={styles.headerTitle}>KTXGO</Text>
                    <Text style={styles.headerSubtitle}>Giao tận {ROOM_LABEL}</Text>
                </View>

                {/* Search input */}
                <View style={styles.searchContainer}>
                    <TextInput
                        style={styles.searchInput}
                        placeholder={`Tìm món (debounce) — ${STUDENT.mssv}`}
                        placeholderTextColor={COLORS.textLight}
                        value={searchText}
                        onChangeText={setSearchText}
                        autoCapitalize="none"
                    />
                </View>

                {/* Main Content States */}
                {isLoading ? (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator size="large" color={COLORS.primary} />
                        <Text style={styles.loadingText}>Đang tải món...</Text>
                    </View>
                ) : hasError ? (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorMssv}>{STUDENT.mssv}</Text>
                        <Text style={styles.errorText}>Không tải được dữ liệu món.</Text>
                        <TouchableOpacity style={styles.retryButton} onPress={() => refetch()}>
                            <Text style={styles.retryButtonText}>Thử lại</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.listWrapper}>
                        <FlashList
                            data={filteredProducts}
                            numColumns={2}
                            {...({ estimatedItemSize: 220 } as any)}
                            keyExtractor={(item: Product) => `${STUDENT.mssv}-${item.id}`}
                            onRefresh={refetch}
                            refreshing={isRefetching}
                            contentContainerStyle={styles.listContent}
                            renderItem={({ item }: { item: Product }) => (
                                <ProductCard
                                    product={item}
                                    onPress={() => navigation.navigate('Detail', { id: item.id })}
                                    onAddToCart={() => handleAddToCart(item)}
                                />
                            )}
                        />
                    </View>
                )}
            </View>

            {!VARIANT.watermarkAtTop && <Watermark />}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingTop: 12,
        paddingBottom: 4,
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '900',
        color: COLORS.primary,
    },
    headerSubtitle: {
        fontSize: 13,
        color: COLORS.textLight,
        marginTop: 2,
    },
    searchContainer: {
        paddingHorizontal: 16,
        marginVertical: 10,
    },
    searchInput: {
        height: 44,
        backgroundColor: COLORS.surface,
        borderRadius: 22,
        paddingHorizontal: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
        fontSize: 14,
        color: COLORS.text,
    },
    listWrapper: {
        flex: 1,
        paddingHorizontal: 10,
    },
    listContent: {
        paddingBottom: 16,
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    loadingText: {
        marginTop: 12,
        fontSize: 14,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    errorMssv: {
        fontSize: 18,
        fontWeight: '700',
        color: COLORS.error,
        marginBottom: 6,
    },
    errorText: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 16,
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: COLORS.error,
        paddingHorizontal: 24,
        paddingVertical: 10,
        borderRadius: 20,
    },
    retryButtonText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '700',
    },
});
