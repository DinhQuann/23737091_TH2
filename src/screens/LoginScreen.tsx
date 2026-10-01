import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../stores/authStore';
import { STUDENT, VARIANT, examStamp } from '../constants/student';
import { COLORS } from '../constants/theme';
import { Watermark } from '../components/Watermark';

export const LoginScreen: React.FC = () => {
    const [inputValue, setInputValue] = useState('');
    const login = useAuthStore((state) => state.login);

    const handleLogin = () => {
        const token = `ktxgo-${STUDENT.mssv}-${examStamp()}`;
        login(token);
    };

    const isPhone = VARIANT.authField === 'phone';
    const placeholderText = isPhone
        ? `Phone — ${STUDENT.mssv}`
        : `Email — ${STUDENT.mssv}@iuh.edu.vn`;

    return (
        <SafeAreaView style={styles.safeArea}>
            {VARIANT.watermarkAtTop && <Watermark />}

            <View style={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>KTXGO</Text>
                    <Text style={styles.subtitle}>Giao đồ tận phòng ký túc xá</Text>

                    <TextInput
                        style={styles.input}
                        placeholder={placeholderText}
                        placeholderTextColor={COLORS.textLight}
                        value={inputValue}
                        onChangeText={setInputValue}
                        keyboardType={isPhone ? 'phone-pad' : 'email-address'}
                        autoCapitalize="none"
                    />

                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleLogin}
                        activeOpacity={0.8}
                    >
                        <Text style={styles.buttonText}>Vào cửa hàng</Text>
                    </TouchableOpacity>

                    <Text style={styles.footerNote}>Auth Stack · chưa có token</Text>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    card: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: COLORS.surface,
        borderRadius: 20,
        padding: 24,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
        elevation: 4,
    },
    title: {
        fontSize: 32,
        fontWeight: '900',
        color: COLORS.primary,
        letterSpacing: 1,
        marginBottom: 4,
    },
    subtitle: {
        fontSize: 14,
        color: COLORS.textLight,
        marginBottom: 24,
    },
    input: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.background,
        borderWidth: 1,
        borderColor: COLORS.border,
        borderRadius: 12,
        paddingHorizontal: 16,
        fontSize: 15,
        color: COLORS.text,
        marginBottom: 16,
    },
    button: {
        width: '100%',
        height: 50,
        backgroundColor: COLORS.primary,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '700',
    },
    footerNote: {
        fontSize: 12,
        color: COLORS.textLight,
        marginTop: 4,
    },
});
