import React, { useState, useCallback } from 'react';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  Card,
  Button,
  Switch,
  Separator,
  AlertDialog,
  Avatar,
} from 'tamagui';
import {
  Moon,
  Sun,
  MapPin,
  Bell,
  Camera,
  Trash2,
  Shield,
  ChevronRight,
  Settings,
} from '@tamagui/lucide-icons';

import type {
  SettingsScreenProps,
  AppSettings,
  PermissionStatus,
} from '../types';

// ────────────────────────────────────────────
// Dữ liệu mẫu (Mock Data)
// ────────────────────────────────────────────

const initialSettings: AppSettings = {
  isDarkMode: false,
  permissions: [
    { id: 'location', name: 'Vị trí (Location)', icon: 'map-pin', granted: true },
    { id: 'notifications', name: 'Thông báo (Notifications)', icon: 'bell', granted: true },
    { id: 'camera', name: 'Máy ảnh (Camera)', icon: 'camera', granted: false },
  ],
};

// ────────────────────────────────────────────
// Helper: Map icon name → Lucide component
// ────────────────────────────────────────────
const PermissionIcon: React.FC<{ iconName: PermissionStatus['icon']; color: string }> = ({
  iconName,
  color,
}) => {
  const size = 20;
  switch (iconName) {
    case 'map-pin':
      return <MapPin size={size} color={color} />;
    case 'bell':
      return <Bell size={size} color={color} />;
    case 'camera':
      return <Camera size={size} color={color} />;
    default:
      return <Shield size={size} color={color} />;
  }
};

// ────────────────────────────────────────────
// Component: Section Header
// ────────────────────────────────────────────
const SectionHeader: React.FC<{ title: string }> = ({ title }) => (
  <Text
    fontSize="$2"
    fontWeight="700"
    color="$color10"
    textTransform="uppercase"
    letterSpacing={1}
    paddingHorizontal="$4"
    marginBottom="$2"
  >
    {title}
  </Text>
);

// ────────────────────────────────────────────
// Component: Theme Toggle Card
// ────────────────────────────────────────────
interface ThemeToggleProps {
  isDarkMode: boolean;
  onToggle: (value: boolean) => void;
}

const ThemeToggleCard: React.FC<ThemeToggleProps> = ({ isDarkMode, onToggle }) => (
  <Card
    marginHorizontal="$4"
    padding="$4"
    borderRadius="$6"
    backgroundColor="$background"
    borderWidth={1}
    borderColor="$borderColor"
    elevate
    elevation={2}
  >
    <XStack justifyContent="space-between" alignItems="center">
      <XStack alignItems="center" gap="$3">
        <YStack
          width={40}
          height={40}
          borderRadius={12}
          backgroundColor={isDarkMode ? '$purple4' : '$yellow4'}
          alignItems="center"
          justifyContent="center"
        >
          {isDarkMode ? (
            <Moon size={20} color="$purple10" />
          ) : (
            <Sun size={20} color="$yellow10" />
          )}
        </YStack>
        <YStack>
          <Text fontSize="$4" fontWeight="700" color="$color12">
            Giao diện
          </Text>
          <Text fontSize="$2" color="$color10">
            {isDarkMode ? 'Đang dùng chế độ Tối' : 'Đang dùng chế độ Sáng'}
          </Text>
        </YStack>
      </XStack>

      <Switch
        size="$4"
        checked={isDarkMode}
        onCheckedChange={onToggle}
        backgroundColor={isDarkMode ? '$purple9' : '$gray5'}
      >
        <Switch.Thumb
          animation="bouncy"
          backgroundColor="white"
        />
      </Switch>
    </XStack>
  </Card>
);

// ────────────────────────────────────────────
// Component: Permission List Card
// ────────────────────────────────────────────
interface PermissionListProps {
  permissions: PermissionStatus[];
  onToggle: (id: string, value: boolean) => void;
}

const PermissionListCard: React.FC<PermissionListProps> = ({ permissions, onToggle }) => (
  <Card
    marginHorizontal="$4"
    padding="$4"
    borderRadius="$6"
    backgroundColor="$background"
    borderWidth={1}
    borderColor="$borderColor"
    elevate
    elevation={2}
  >
    <YStack gap="$3">
      {permissions.map((perm, index) => (
        <React.Fragment key={perm.id}>
          <XStack justifyContent="space-between" alignItems="center">
            <XStack alignItems="center" gap="$3">
              <YStack
                width={40}
                height={40}
                borderRadius={12}
                backgroundColor={perm.granted ? '$green4' : '$red4'}
                alignItems="center"
                justifyContent="center"
              >
                <PermissionIcon
                  iconName={perm.icon}
                  color={perm.granted ? '$green10' : '$red10'}
                />
              </YStack>
              <YStack>
                <Text fontSize="$3" fontWeight="600" color="$color12">
                  {perm.name}
                </Text>
                <Text fontSize="$1" color={perm.granted ? '$green10' : '$red10'} fontWeight="500">
                  {perm.granted ? '✓ Đã cấp quyền' : '✗ Chưa cấp quyền'}
                </Text>
              </YStack>
            </XStack>

            <Switch
              size="$3"
              checked={perm.granted}
              onCheckedChange={(val: boolean) => onToggle(perm.id, val)}
              backgroundColor={perm.granted ? '$green9' : '$gray5'}
            >
              <Switch.Thumb animation="bouncy" backgroundColor="white" />
            </Switch>
          </XStack>

          {index < permissions.length - 1 && <Separator />}
        </React.Fragment>
      ))}
    </YStack>
  </Card>
);

// ────────────────────────────────────────────
// Component: Delete Data Section
// ────────────────────────────────────────────
interface DeleteDataSectionProps {
  onConfirmDelete: () => void;
}

const DeleteDataSection: React.FC<DeleteDataSectionProps> = ({ onConfirmDelete }) => (
  <AlertDialog>
    <AlertDialog.Trigger asChild>
      <Card
        marginHorizontal="$4"
        padding="$4"
        borderRadius="$6"
        backgroundColor="$background"
        borderWidth={1}
        borderColor="$red6"
        pressTheme
        animation="bouncy"
        hoverStyle={{ scale: 1.01 }}
        pressStyle={{ scale: 0.98, opacity: 0.9 }}
      >
        <XStack justifyContent="space-between" alignItems="center">
          <XStack alignItems="center" gap="$3">
            <YStack
              width={40}
              height={40}
              borderRadius={12}
              backgroundColor="$red4"
              alignItems="center"
              justifyContent="center"
            >
              <Trash2 size={20} color="$red10" />
            </YStack>
            <YStack>
              <Text fontSize="$4" fontWeight="700" color="$red10">
                Xóa dữ liệu
              </Text>
              <Text fontSize="$2" color="$color10">
                Xóa toàn bộ lịch sử luyện tập
              </Text>
            </YStack>
          </XStack>
          <ChevronRight size={20} color="$red10" />
        </XStack>
      </Card>
    </AlertDialog.Trigger>

    <AlertDialog.Portal>
      <AlertDialog.Overlay
        key="overlay"
        animation="quick"
        opacity={0.5}
        enterStyle={{ opacity: 0 }}
        exitStyle={{ opacity: 0 }}
      />
      <AlertDialog.Content
        key="content"
        bordered
        elevate
        animation={[
          'quick',
          {
            opacity: {
              overshootClamping: true,
            },
          },
        ]}
        enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
        exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
        x={0}
        scale={1}
        opacity={1}
        y={0}
        borderRadius="$6"
        padding="$5"
      >
        <YStack gap="$3">
          <YStack
            alignSelf="center"
            width={56}
            height={56}
            borderRadius={28}
            backgroundColor="$red4"
            alignItems="center"
            justifyContent="center"
            marginBottom="$2"
          >
            <Trash2 size={28} color="$red10" />
          </YStack>

          <AlertDialog.Title textAlign="center">
            Xác nhận xóa dữ liệu
          </AlertDialog.Title>

          <AlertDialog.Description textAlign="center" color="$color10">
            Bạn có chắc chắn muốn xóa toàn bộ dữ liệu lịch sử luyện tập không?
            Hành động này không thể hoàn tác.
          </AlertDialog.Description>

          <XStack gap="$3" justifyContent="center" marginTop="$2">
            <AlertDialog.Cancel asChild>
              <Button
                flex={1}
                borderRadius="$4"
                backgroundColor="$gray5"
                color="$color12"
                fontWeight="600"
              >
                Hủy bỏ
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action asChild>
              <Button
                flex={1}
                borderRadius="$4"
                backgroundColor="$red9"
                color="white"
                fontWeight="600"
                onPress={onConfirmDelete}
              >
                Xóa tất cả
              </Button>
            </AlertDialog.Action>
          </XStack>
        </YStack>
      </AlertDialog.Content>
    </AlertDialog.Portal>
  </AlertDialog>
);

// ════════════════════════════════════════════
// MAIN: SettingsScreen
// ════════════════════════════════════════════

const SettingsScreen: React.FC<SettingsScreenProps> = ({ navigation }) => {
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  // ── Toggle Dark Mode ──
  const handleToggleTheme = useCallback((isDark: boolean) => {
    setSettings((prev) => ({ ...prev, isDarkMode: isDark }));
    // Trong thực tế: dispatch action thay đổi theme toàn cục
    // Ví dụ: setTheme(isDark ? 'dark' : 'light')
  }, []);

  // ── Toggle Permission ──
  const handleTogglePermission = useCallback((permId: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      permissions: prev.permissions.map((p) =>
        p.id === permId ? { ...p, granted: value } : p
      ),
    }));
    // Trong thực tế: gọi API request permission từ OS
  }, []);

  // ── Xóa toàn bộ dữ liệu ──
  const handleDeleteAllData = useCallback(() => {
    // Trong thực tế:
    // 1. Xóa dữ liệu từ AsyncStorage / SQLite / API
    // 2. Reset state management
    // 3. Hiển thị toast thông báo thành công
    console.log('🗑️ Đã xóa toàn bộ dữ liệu lịch sử.');
  }, []);

  return (
    <YStack flex={1} backgroundColor="$background">
      {/* ── Header ── */}
      <XStack
        alignItems="center"
        gap="$3"
        paddingHorizontal="$4"
        paddingTop="$6"
        paddingBottom="$4"
      >
        <YStack
          width={44}
          height={44}
          borderRadius={14}
          backgroundColor="$blue4"
          alignItems="center"
          justifyContent="center"
        >
          <Settings size={22} color="$blue10" />
        </YStack>
        <YStack>
          <H2 fontWeight="700" color="$color12">
            Cài đặt
          </H2>
          <Text fontSize="$2" color="$color10">
            Tùy chỉnh ứng dụng của bạn
          </Text>
        </YStack>
      </XStack>

      {/* ── Giao diện (Theme) ── */}
      <YStack gap="$2" marginBottom="$4">
        <SectionHeader title="Giao diện" />
        <ThemeToggleCard
          isDarkMode={settings.isDarkMode}
          onToggle={handleToggleTheme}
        />
      </YStack>

      {/* ── Quyền thiết bị ── */}
      <YStack gap="$2" marginBottom="$4">
        <SectionHeader title="Quyền thiết bị" />
        <PermissionListCard
          permissions={settings.permissions}
          onToggle={handleTogglePermission}
        />
      </YStack>

      {/* ── Quản lý dữ liệu ── */}
      <YStack gap="$2">
        <SectionHeader title="Quản lý dữ liệu" />
        <DeleteDataSection onConfirmDelete={handleDeleteAllData} />
      </YStack>

      {/* ── App Version ── */}
      <YStack flex={1} justifyContent="flex-end" paddingBottom="$6" alignItems="center">
        <Text fontSize="$1" color="$color8">
          Nhật ký luyện tập v1.0.0
        </Text>
      </YStack>
    </YStack>
  );
};

export default SettingsScreen;
