import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    StyleSheet,
    Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCartStore, CartItem } from '../stores/cartStore';
import { useCampusLocation } from '../hooks/useCampusLocation';
import { triggerHaptic } from '../utils/haptics';
import { Watermark } from '../components/Watermark';
import { STUDENT, ROOM_LABEL, VARIANT } from '../constants/student';
import { COLORS } from '../constants/theme';

export const CartScreen: React.FC = () => {
    const items = useCartStore((state) => state.items);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const removeItem = useCartStore((state) => state.removeItem);
    const getTotalAmount = useCartStore((state) => state.getTotalAmount);
    const clearCart = useCartStore((state) => state.clearCart);

    const { shipFee } = useCampusLocation();

    const itemsTotal = getTotalAmount();
    const currentShipFee = shipFee ?? 0;
    const finalTotal = itemsTotal + currentShipFee;

    const formattedItemsTotal = itemsTotal.toLocaleString('vi-VN') + ' đ';
    const formattedShipFee = currentShipFee.toLocaleString('vi-VN') + ' đ';
    const formattedFinalTotal = finalTotal.toLocaleString('vi-VN') + ' đ';

    const handleCheckout = () => {
        if (items.length === 0) {
            Alert.alert('Giỏ hàng trống', 'Vui lòng chọn món trước khi đặt hàng.');
            return;
        }

        triggerHaptic();

        Alert.alert(
            'Đặt hàng thành công! 🎉',
            `Đơn hàng đang được chuẩn bị và giao đến ${ROOM_LABEL}.\n\nTổng thanh toán: ${formattedFinalTotal}\n[MSSV: ${STUDENT.mssv}]`,
            [
                {
                    text: 'Xác nhận',
                    onPress: () => clearCart(),
                },
            ]
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.container}>
                <Text style={styles.headerTitle}>GIỎ HÀNG</Text>

                {items.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>Giỏ hàng đang trống</Text>
                        <Text style={styles.emptySubText}>Hãy chọn vài món ngon nhé!</Text>
                    </View>
                ) : (
                    <FlatList
                        data={items}
                        keyExtractor={(item) => `${STUDENT.mssv}-cart-${item.id}`}
                        contentContainerStyle={styles.listContent}
                        renderItem={({ item }: { item: CartItem }) => (
                            <View style={styles.cartItem}>
                                <View style={styles.itemInfo}>
                                    <Text style={styles.itemName}>{item.name}</Text>
                                    <Text style={styles.itemQtyPrice}>
                                        x{item.quantity}  {(item.price * item.quantity).toLocaleString('vi-VN')} đ
                                    </Text>
                                </View>
                                <View style={styles.actionButtons}>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => updateQuantity(item.id, -1)}
                                    >
                                        <Text style={styles.qtyBtnText}>-</Text>
                                    </TouchableOpacity>
                                    <Text style={styles.qtyText}>{item.quantity}</Text>
                                    <TouchableOpacity
                                        style={styles.qtyBtn}
                                        onPress={() => updateQuantity(item.id, 1)}
                                    >
                                        <Text style={styles.qtyBtnText}>+</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.removeBtn}
                                        onPress={() => removeItem(item.id)}
                                    >
                                        <Text style={styles.removeBtnText}>✕</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        )}
                    />
                )}

                {/* Shipping & Total Footer Box */}
                {items.length > 0 && (
                    <View style={styles.footerContainer}>
                        <View style={styles.shipCard}>
                            <Text style={styles.shipTitle}>Giao đến {ROOM_LABEL}</Text>
                            <Text style={styles.shipFeeText}>
                                Phí ship: {shipFee !== null ? `${formattedShipFee} (công thức ${VARIANT.shipFormula})` : 'Chưa lấy vị trí (tab Tôi)'}
                            </Text>
                        </View>

                        <View style={styles.totalRow}>
                            <Text style={styles.totalLabel}>Tổng thanh toán:</Text>
                            <Text style={styles.totalValue}>{formattedFinalTotal}</Text>
                        </View>

                        <TouchableOpacity
                            style={styles.checkoutButton}
                            onPress={handleCheckout}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.checkoutButtonText}>ĐẶT HÀNG TẬN PHÒNG</Text>
                        </TouchableOpacity>
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
        paddingHorizontal: 16,
        paddingTop: 12,
    },
    headerTitle: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 16,
    },
    listContent: {
        paddingBottom: 16,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },
    emptySubText: {
        fontSize: 13,
        color: COLORS.textLight,
    },
    cartItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: COLORS.surface,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    itemInfo: {
        flex: 1,
    },
    itemName: {
        fontSize: 15,
        fontWeight: '700',
        color: COLORS.text,
        marginBottom: 4,
    },
    itemQtyPrice: {
        fontSize: 13,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    actionButtons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    qtyBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: COLORS.background,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    qtyBtnText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.primary,
    },
    qtyText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.text,
        marginHorizontal: 8,
    },
    removeBtn: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#FEE2E2',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 8,
    },
    removeBtnText: {
        fontSize: 12,
        fontWeight: '700',
        color: COLORS.error,
    },
    footerContainer: {
        paddingVertical: 12,
    },
    shipCard: {
        backgroundColor: '#FFF7ED',
        borderWidth: 1.5,
        borderColor: COLORS.secondary,
        borderRadius: 16,
        padding: 14,
        marginBottom: 12,
    },
    shipTitle: {
        fontSize: 15,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    shipFeeText: {
        fontSize: 13,
        fontWeight: '700',
        color: COLORS.secondary,
    },
    totalRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingBottom: 8,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.primary,
    },
    totalValue: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.primary,
    },
    checkoutButton: {
        backgroundColor: COLORS.primary,
        borderRadius: 14,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        elevation: 3,
        shadowColor: COLORS.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    checkoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '800',
        letterSpacing: 0.5,
    },
});
