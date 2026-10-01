import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Product } from '../services/productApi';
import { PRICE_MULTIPLIER } from '../constants/student';
import { COLORS } from '../constants/theme';

interface ProductCardProps {
    product: Product;
    onPress: () => void;
    onAddToCart: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    onPress,
    onAddToCart,
}) => {
    const [imageError, setImageError] = useState(false);

    const formattedPrice = (
        Math.round(product.price * PRICE_MULTIPLIER)
    ).toLocaleString('vi-VN') + ' đ';

    const imageUrl = product.image && product.image.startsWith('http')
        ? product.image
        : `https://picsum.photos/seed/${product.id}/300/200`;

    return (
        <TouchableOpacity
            style={styles.card}
            activeOpacity={0.85}
            onPress={onPress}
        >
            {imageUrl && !imageError ? (
                <Image
                    source={{ uri: imageUrl }}
                    style={styles.image}
                    resizeMode="cover"
                    onError={() => setImageError(true)}
                />
            ) : (
                <View style={styles.imagePlaceholder}>
                    <Text style={styles.placeholderEmoji}>🍲</Text>
                </View>
            )}
            <View style={styles.content}>
                <Text style={styles.title} numberOfLines={1}>
                    {product.name}
                </Text>
                <Text style={styles.price}>{formattedPrice}</Text>
                <TouchableOpacity
                    style={styles.addButton}
                    onPress={onAddToCart}
                    activeOpacity={0.7}
                >
                    <Text style={styles.addButtonText}>+</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flex: 1,
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 10,
        margin: 6,
        borderWidth: 1,
        borderColor: COLORS.border,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    image: {
        width: '100%',
        height: 100,
        borderRadius: 12,
        marginBottom: 8,
    },
    imagePlaceholder: {
        width: '100%',
        height: 100,
        backgroundColor: '#F3F4F6',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 8,
    },
    placeholderEmoji: {
        fontSize: 32,
    },
    content: {
        position: 'relative',
    },
    title: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },
    price: {
        fontSize: 13,
        fontWeight: '600',
        color: COLORS.primary,
        marginBottom: 4,
    },
    addButton: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: COLORS.primary,
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#FFFFFF',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: -2,
    },
});
