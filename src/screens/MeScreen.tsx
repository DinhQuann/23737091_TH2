import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useCampusLocation } from '../hooks/useCampusLocation';
import { useAuthStore } from '../stores/authStore';
import { Watermark } from '../components/Watermark';
import { STUDENT, examStamp, VARIANT } from '../constants/student';
import { COLORS } from '../constants/theme';

export const MeScreen: React.FC = () => {
    const logout = useAuthStore((state) => state.logout);
    const { status, distanceKm, shipFee, requestLocation } = useCampusLocation();

    const formattedShipFee = shipFee !== null
        ? shipFee.toLocaleString('vi-VN') + ' đ'
        : '---';

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.container}>
                <Text style={styles.headerTitle}>TÔI · LOCATION</Text>

                {/* Profile Card */}
                <View style={styles.profileCard}>
                    <Text style={styles.studentName}>{STUDENT.hoTen}</Text>
                    <Text style={styles.studentDetails}>
                        {STUDENT.mssv} · #{examStamp()}
                    </Text>
                </View>

                {/* Location Section */}
                <View style={styles.locationCard}>
                    {status === 'granted' ? (
                        <View style={styles.grantedContent}>
                            <Text style={styles.grantedText}>Quyền: granted</Text>
                            <Text style={styles.distanceText}>
                                ≈ {distanceKm ? distanceKm.toFixed(1) : '1.2'} km tới cổng KTX
                            </Text>
                            <Text style={styles.shipFeeLabel}>Phí ship ước tính</Text>
                            <Text style={styles.shipFeeValue}>{formattedShipFee}</Text>
                        </View>
                    ) : (
                        <View style={styles.actionSection}>
                            {status === 'blocked' || status === 'denied' ? (
                                <TouchableOpacity
                                    style={styles.settingsButton}
                                    onPress={() => Linking.openSettings()}
                                >
                                    <Text style={styles.settingsButtonText}>
                                        Mở Cài đặt (blocked)
                                    </Text>
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity
                                    style={styles.locationButton}
                                    onPress={requestLocation}
                                >
                                    <Text style={styles.locationButtonText}>
                                        Lấy vị trí ước tính phí ship
                                    </Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )}
                </View>

                {/* Logout Button */}
                <TouchableOpacity
                    style={styles.logoutButton}
                    onPress={() => logout()}
                    activeOpacity={0.8}
                >
                    <Text style={styles.logoutButtonText}>Đăng xuất</Text>
                </TouchableOpacity>
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
        paddingHorizontal: 20,
        paddingTop: 12,
    },
    headerTitle: {
        fontSize: 20,
        fontWeight: '900',
        color: COLORS.primary,
        textAlign: 'center',
        marginBottom: 20,
    },
    profileCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: COLORS.border,
    },
    studentName: {
        fontSize: 18,
        fontWeight: '800',
        color: COLORS.text,
        marginBottom: 4,
    },
    studentDetails: {
        fontSize: 14,
        color: COLORS.textLight,
        fontWeight: '600',
    },
    locationCard: {
        backgroundColor: COLORS.surface,
        borderRadius: 16,
        padding: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: COLORS.border,
        alignItems: 'center',
    },
    grantedContent: {
        alignItems: 'center',
        width: '100%',
    },
    grantedText: {
        fontSize: 14,
        fontWeight: '700',
        color: COLORS.success,
        marginBottom: 8,
    },
    distanceText: {
        fontSize: 14,
        color: COLORS.text,
        marginBottom: 12,
    },
    shipFeeLabel: {
        fontSize: 13,
        color: COLORS.textLight,
        marginBottom: 4,
    },
    shipFeeValue: {
        fontSize: 22,
        fontWeight: '900',
        color: COLORS.primary,
    },
    actionSection: {
        width: '100%',
    },
    locationButton: {
        backgroundColor: COLORS.primary,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    locationButtonText: {
        color: '#FFFFFF',
        fontSize: 15,
        fontWeight: '700',
    },
    settingsButton: {
        backgroundColor: COLORS.surface,
        borderWidth: 1.5,
        borderColor: COLORS.primary,
        height: 48,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    settingsButtonText: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: '700',
    },
    logoutButton: {
        backgroundColor: COLORS.error,
        height: 50,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto',
        marginBottom: 20,
    },
    logoutButtonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
});
