import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert,
    ScrollView,
    Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { triggerHaptic } from '../utils/haptics';
import { getProducts, Product } from '../services/productApi';
import { useCartStore } from '../stores/cartStore';
import { Watermark } from '../components/Watermark';
import {
    STUDENT,
    PRICE_MULTIPLIER,
    STALE_TIME_MS,
    VARIANT,
} from '../constants/student';
import { COLORS } from '../constants/theme';

export const DetailScreen = ({ route, navigation }: any) => {
    const id = route?.params?.id || '1';
    const addItem = useCartStore((state) => state.addItem);
    const [imageError, setImageError] = useState(false);

    const { data: products } = useQuery<Product[]>({
        queryKey: ['products'],
        queryFn: getProducts,
        staleTime: STALE_TIME_MS,
    });

    const product = products?.find((p) => p.id === id) || {
        id,
        name: 'Món ăn ký túc xá',
        price: 2,
        image: '',
        description: 'Mô tả ngắn từ API (tối đa 3 dòng). Giữ nguyên id từ route.params.',
    };

    const calculatedPrice = Math.round(product.price * PRICE_MULTIPLIER);
    const formattedPrice = calculatedPrice.toLocaleString('vi-VN') + ' đ';

    const imageUrl = product.image && product.image.startsWith('http')
        ? product.image
        : `https://picsum.photos/seed/${product.id}/500/300`;

    const handleAddToCart = () => {
        addItem({
            id: product.id,
            name: product.name,
            price: calculatedPrice,
        });

        triggerHaptic();

        Alert.alert('KTXGo', `Đã thêm vào giỏ! [MSSV: ${STUDENT.mssv}]`);
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <ScrollView contentContainerStyle={styles.container}>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.backButtonText}>← Chi tiết món</Text>
                </TouchableOpacity>

                {imageUrl && !imageError ? (
                    <Image
                        source={{ uri: imageUrl }}
                        style={styles.detailImage}
                        resizeMode="cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <View style={styles.imagePlaceholder}>
                        <Text style={styles.placeholderEmoji}>🍲</Text>
                    </View>
                )}

                <View style={styles.cardContent}>
                    <Text style={styles.title}>{product.name}</Text>
                    <Text style={styles.price}>{formattedPrice}</Text>
                    <Text style={styles.subText}>Giao nội khu · nhận tận phòng</Text>

                    <Text style={styles.description} numberOfLines={3}>
                        {product.description ||
                            'Mô tả ngắn từ API (tối đa 3 dòng). Giữ nguyên id từ route.params.'}
                    </Text>

                    <TouchableOpacity
                        style={styles.addButton}
                        onPress={handleAddToCart}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.addButtonText}>Thêm vào giỏ · Haptic</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

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
        padding: 16,
        alignItems: 'center',
    },
    backButton: {
        alignSelf: 'flex-start',
        marginBottom: 16,
        paddingVertical: 6,
        paddingHorizontal: 10,
    },
    backButtonText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
    },
    detailImage: {
        width: '100%',
        height: 200,
        borderRadius: 20,
        marginBottom: 20,
    },
    imagePlaceholder: {
        width: '100%',
        height: 200,
        backgroundColor: '#F3F4F6',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    placeholderEmoji: {
        fontSize: 48,
    },
    cardContent: {
        width: '100%',
        alignItems: 'center',
    },
    title: {
        fontSize: 22,
        fontWeight: '800',
        color: COLORS.text,
        textAlign: 'center',
        marginBottom: 8,
    },
    price: {
        fontSize: 20,
        fontWeight: '800',
        color: COLORS.primary,
        marginBottom: 6,
    },
    subText: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 16,
    },
    description: {
        fontSize: 14,
        color: COLORS.textLight,
        textAlign: 'center',
        lineHeight: 20,
        marginBottom: 24,
        paddingHorizontal: 12,
    },
    addButton: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
