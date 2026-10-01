import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ShopStack } from './ShopStack';
import { CartScreen } from '../screens/CartScreen';
import { MeScreen } from '../screens/MeScreen';
import { useCartStore } from '../stores/cartStore';
import { VARIANT } from '../constants/student';
import { COLORS } from '../constants/theme';

const Tab = createBottomTabNavigator();

export const MainTabs: React.FC = () => {
    const totalQuantity = useCartStore((state) => state.getTotalQuantity());
    const badgeValue = totalQuantity > 0 ? totalQuantity : undefined;

    const isCartFirst = VARIANT.tabOrder === 'cartFirst';

    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.textLight,
                tabBarStyle: {
                    borderTopColor: COLORS.border,
                    backgroundColor: COLORS.surface,
                    height: 60,
                    paddingBottom: 8,
                    paddingTop: 6,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                },
                tabBarBadgeStyle: {
                    backgroundColor: COLORS.secondary,
                    color: '#FFFFFF',
                    fontSize: 11,
                    fontWeight: 'bold',
                },
            }}
        >
            {isCartFirst ? (
                <>
                    <Tab.Screen
                        name="Cart"
                        component={CartScreen}
                        options={{
                            title: 'Giỏ',
                            tabBarBadge: badgeValue,
                        }}
                    />
                    <Tab.Screen
                        name="Shop"
                        component={ShopStack}
                        options={{
                            title: 'Cửa hàng',
                        }}
                    />
                </>
            ) : (
                <>
                    <Tab.Screen
                        name="Shop"
                        component={ShopStack}
                        options={{
                            title: 'Cửa hàng',
                        }}
                    />
                    <Tab.Screen
                        name="Cart"
                        component={CartScreen}
                        options={{
                            title: 'Giỏ',
                            tabBarBadge: badgeValue,
                        }}
                    />
                </>
            )}
            <Tab.Screen
                name="Me"
                component={MeScreen}
                options={{
                    title: 'Tôi',
                }}
            />
        </Tab.Navigator>
    );
};
