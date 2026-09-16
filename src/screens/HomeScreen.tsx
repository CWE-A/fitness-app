import React from 'react';
import { ScrollView, ActivityIndicator, RefreshControl } from 'react-native';
import {
  YStack,
  XStack,
  Text,
  H2,
  H4,
  Card,
  Progress,
  Avatar,
  Paragraph,
  Separator,
  Button,
} from 'tamagui';
import { Flame, Clock, TrendingUp, ChevronRight, RefreshCw, AlertCircle, MapPin } from '@tamagui/lucide-icons';

import type { HomeScreenProps, UserProfile, ProgressStats, ApiWorkout } from '../types';
import { useWorkouts } from '../hooks/useWorkouts';

// ────────────────────────────────────────────
// Thông tin người dùng cố định (sẽ bổ sung API sau)
// ────────────────────────────────────────────

const mockUser: UserProfile = {
  id: '1',
  name: 'Huy Nguyễn',
  avatarUrl: 'https://i.pravatar.cc/150?img=12',
};

// ────────────────────────────────────────────
// Helper
// ────────────────────────────────────────────

const formatDate = (isoString: string): string => {
  try {
    return new Date(isoString).toLocaleDateString('vi-VN', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return isoString;
  }
};

// ────────────────────────────────────────────
// Component: Greeting Header
// ────────────────────────────────────────────
const GreetingHeader: React.FC<{ user: UserProfile; totalWorkouts: number }> = ({ user, totalWorkouts }) => {
  const hour = new Date().getHours();
  let greeting = 'Chào buổi sáng';
  if (hour >= 12 && hour < 18) greeting = 'Chào buổi chiều';
  else if (hour >= 18) greeting = 'Chào buổi tối';

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      paddingHorizontal="$4"
      paddingTop="$6"
      paddingBottom="$3"
    >
      <YStack gap="$1" flex={1}>
        <Text fontSize="$3" color="$color10" fontWeight="500">
          {greeting} 👋
        </Text>
        <H2 fontWeight="700" color="$color12">
          {user.name}
        </H2>
        <Text fontSize="$2" color="$blue10" fontWeight="600">
          {totalWorkouts} buổi tập trong danh sách
        </Text>
      </YStack>

      <Avatar circular size="$6" borderWidth={2} borderColor="$blue8">
        <Avatar.Image src={user.avatarUrl} />
        <Avatar.Fallback backgroundColor="$blue5">
          <Text fontSize="$5" color="$color1">
            {user.name.charAt(0)}
          </Text>
        </Avatar.Fallback>
      </Avatar>
    </XStack>
  );
};

// ────────────────────────────────────────────
// Component: Mini Stat Card
// ────────────────────────────────────────────
interface MiniStatProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  bgColor: string;
}

const MiniStat: React.FC<MiniStatProps> = ({ icon, label, value, bgColor }) => (
  <Card
    flex={1}
    padding="$3"
    borderRadius="$5"
    backgroundColor={bgColor}
    elevate
    elevation={1}
  >
    <YStack gap="$2" alignItems="center">
      {icon}
      <Text fontSize="$7" fontWeight="800" color="$color12">
        {value}
      </Text>
      <Text fontSize="$1" color="$color10" textAlign="center" fontWeight="500">
        {label}
      </Text>
    </YStack>
  </Card>
);

// ────────────────────────────────────────────
// Component: Weekly Progress
// ────────────────────────────────────────────
const WeeklyProgress: React.FC<{ total: number }> = ({ total }) => {
  const weeklyGoal = 6;
  const weeklyCompleted = Math.min(total % 7, weeklyGoal);
  const percent = Math.round((weeklyCompleted / weeklyGoal) * 100);

  return (
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
      <XStack justifyContent="space-between" alignItems="center" marginBottom="$3">
        <YStack gap="$1">
          <H4 fontWeight="700" color="$color12">
            Tiến độ tuần này
          </H4>
          <Text fontSize="$2" color="$color10">
            {weeklyCompleted} / {weeklyGoal} ngày hoàn thành
          </Text>
        </YStack>
        <Text fontSize="$8" fontWeight="800" color="$blue10">
          {percent}%
        </Text>
      </XStack>

      <Progress value={percent} backgroundColor="$gray5" height={10} borderRadius="$10">
        <Progress.Indicator
          backgroundColor="$blue9"
          animation="bouncy"
          borderRadius="$10"
        />
      </Progress>

      <XStack justifyContent="space-between" marginTop="$3" paddingHorizontal="$1">
        {['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'].map((day, idx) => {
          const isCompleted = idx < weeklyCompleted;
          return (
            <YStack key={day} alignItems="center" gap="$1">
              <YStack
                width={28}
                height={28}
                borderRadius={14}
                backgroundColor={isCompleted ? '$blue9' : '$gray5'}
                alignItems="center"
                justifyContent="center"
              >
                <Text
                  fontSize="$1"
                  fontWeight="700"
                  color={isCompleted ? 'white' : '$color10'}
                >
                  {isCompleted ? '✓' : ''}
                </Text>
              </YStack>
              <Text fontSize={10} color="$color10" fontWeight="500">
                {day}
              </Text>
            </YStack>
          );
        })}
      </XStack>
    </Card>
  );
};

// ────────────────────────────────────────────
// Component: Workout Card từ API
// ────────────────────────────────────────────
const WorkoutCard: React.FC<{ workout: ApiWorkout; index: number }> = ({ workout, index }) => {
  const colors = ['$blue3', '$purple3', '$green3', '$orange3', '$pink3'];
  const bgColor = colors[index % colors.length];

  return (
    <Card
      marginHorizontal="$4"
      marginBottom="$3"
      padding="$4"
      borderRadius="$6"
      backgroundColor="$background"
      borderWidth={1}
      borderColor="$borderColor"
      elevate
      elevation={2}
      pressTheme
      animation="bouncy"
      hoverStyle={{ scale: 1.01 }}
      pressStyle={{ scale: 0.98, opacity: 0.9 }}
    >
      <XStack gap="$3" alignItems="center">
        {/* Avatar bài tập */}
        <Avatar
          circular
          size="$5"
          borderWidth={2}
          borderColor={bgColor}
        >
          <Avatar.Image src={workout.image} />
          <Avatar.Fallback backgroundColor={bgColor}>
            <Text fontSize="$4" color="$color12" fontWeight="700">
              {workout.title.charAt(0)}
            </Text>
          </Avatar.Fallback>
        </Avatar>

        {/* Thông tin */}
        <YStack flex={1} gap="$1">
          <Text fontSize="$4" fontWeight="700" color="$color12" numberOfLines={1}>
            {workout.title}
          </Text>
          <XStack alignItems="center" gap="$2">
            <Clock size={13} color="$blue10" />
            <Text fontSize="$2" color="$color10">
              {formatDate(workout.createdAt)}
            </Text>
          </XStack>
        </YStack>

        {/* Badge số thứ tự */}
        <YStack
          backgroundColor="$blue3"
          borderRadius="$3"
          paddingHorizontal="$2"
          paddingVertical="$1"
          alignItems="center"
        >
          <Text fontSize="$1" fontWeight="800" color="$blue10">
            #{workout.id}
          </Text>
        </YStack>
      </XStack>
    </Card>
  );
};

// ────────────────────────────────────────────
// Component: Error State
// ────────────────────────────────────────────
const ErrorState: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => (
  <YStack flex={1} alignItems="center" justifyContent="center" padding="$6" gap="$4">
    <AlertCircle size={48} color="$red10" />
    <YStack alignItems="center" gap="$2">
      <H4 fontWeight="700" color="$color12" textAlign="center">
        Không thể tải dữ liệu
      </H4>
      <Paragraph fontSize="$3" color="$color10" textAlign="center">
        {message}
      </Paragraph>
    </YStack>
    <Button
      onPress={onRetry}
      backgroundColor="$blue9"
      color="white"
      borderRadius="$4"
      fontWeight="600"
      icon={<RefreshCw size={16} color="white" />}
    >
      Thử lại
    </Button>
  </YStack>
);

// ════════════════════════════════════════════
// MAIN: HomeScreen
// ════════════════════════════════════════════

const HomeScreen: React.FC<HomeScreenProps> = () => {
  const { workouts, loading, error, refetch, totalCount } = useWorkouts();

  // Skeleton loading
  if (loading && workouts.length === 0) {
    return (
      <YStack flex={1} backgroundColor="$background" alignItems="center" justifyContent="center" gap="$4">
        <ActivityIndicator size="large" color="#3B82F6" />
        <Text fontSize="$3" color="$color10" fontWeight="500">
          Đang tải dữ liệu từ API...
        </Text>
      </YStack>
    );
  }

  // Error state
  if (error && workouts.length === 0) {
    return (
      <YStack flex={1} backgroundColor="$background">
        <ErrorState message={error} onRetry={refetch} />
      </YStack>
    );
  }

  return (
    <YStack flex={1} backgroundColor="$background">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={refetch}
            tintColor="#3B82F6"
          />
        }
      >
        {/* ── Header ── */}
        <GreetingHeader user={mockUser} totalWorkouts={totalCount} />

        {/* ── Stats nhanh ── */}
        <XStack gap="$3" paddingHorizontal="$4" marginTop="$3" marginBottom="$4">
          <MiniStat
            icon={<Flame size={24} color="$orange10" />}
            label="Tổng buổi tập"
            value={`${totalCount} 🔥`}
            bgColor="$orange3"
          />
          <MiniStat
            icon={<TrendingUp size={24} color="$green10" />}
            label="Tuần này"
            value={`${Math.min(totalCount % 7, 6)}/6`}
            bgColor="$green3"
          />
          <MiniStat
            icon={<Clock size={24} color="$blue10" />}
            label="Streak"
            value="5 🔥"
            bgColor="$blue3"
          />
        </XStack>

        {/* ── Tiến độ tuần ── */}
        <WeeklyProgress total={totalCount} />

        {/* ── Danh sách Workout từ API ── */}
        <YStack marginTop="$4" marginBottom="$2">
          <XStack paddingHorizontal="$4" marginBottom="$3" alignItems="center" justifyContent="space-between">
            <H4 fontWeight="700" color="$color12">
              📋 Danh sách bài tập
            </H4>
            <Text fontSize="$2" color="$color10">
              {totalCount} bài
            </Text>
          </XStack>

          {workouts.map((workout, index) => (
            <WorkoutCard key={workout.id} workout={workout} index={index} />
          ))}
        </YStack>

        <YStack height={20} />
      </ScrollView>
    </YStack>
  );
};

export default HomeScreen;
