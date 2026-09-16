import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { TamaguiProvider, Theme, PortalProvider } from 'tamagui';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Home, Settings as SettingsIcon } from '@tamagui/lucide-icons';

import config from './tamagui.config';
import HomeScreen from './src/screens/HomeScreen';
import SettingsScreen from './src/screens/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [isDark] = useState(false);

  if (!loaded) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <TamaguiProvider config={config} defaultTheme={isDark ? 'dark' : 'light'}>
        <PortalProvider shouldAddRootHost>
          <Theme name={isDark ? 'dark' : 'light'}>
            <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
            <StatusBar style={isDark ? 'light' : 'dark'} />
            <Tab.Navigator
              screenOptions={{
                headerShown: false,
                tabBarStyle: {
                  backgroundColor: isDark ? '#1E293B' : '#FFFFFF',
                  borderTopColor: isDark ? '#334155' : '#E2E8F0',
                  height: 64,
                  paddingBottom: 10,
                  paddingTop: 8,
                },
                tabBarActiveTintColor: '#3B82F6',
                tabBarInactiveTintColor: isDark ? '#94A3B8' : '#64748B',
                tabBarLabelStyle: {
                  fontSize: 12,
                  fontWeight: '600',
                },
              }}
            >
              <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                  tabBarLabel: 'Trang chủ',
                  tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                }}
              />
              <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                  tabBarLabel: 'Cài đặt',
                  tabBarIcon: ({ color, size }) => <SettingsIcon size={size} color={color} />,
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </Theme>
      </PortalProvider>
    </TamaguiProvider>
  </SafeAreaProvider>
  );
}
