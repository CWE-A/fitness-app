import React from "react";
import { ScrollView } from "react-native";
import { YStack, XStack, Text, Card, Avatar, Progress } from "tamagui";
import {
  Flame,
  TrendingUp,
  Clock,
  Bot,
  Sparkles,
  ChevronRight,
} from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
  const navigation = useNavigation<any>();

  return (
    <ScrollView style={{ flex: 1 }}>
      <YStack
        flex={1}
        backgroundColor="$background"
        padding="$4"
        space="$4"
        paddingTop="$8"
      >
        {/* Header / User Info */}
        <XStack justifyContent="space-between" alignItems="center">
          <YStack>
            <Text fontSize="$2" color="$gray10">
              Chào buổi tối ✍️
            </Text>
            <Text fontSize="$7" fontWeight="bold">
              Huy Nguyễn
            </Text>
            <Text fontSize="$2" color="#3B82F6" fontWeight="bold">
              50 buổi tập trong danh sách
            </Text>
          </YStack>
          <Avatar circular size="$5">
            <Avatar.Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" />
            <Avatar.Fallback backgroundColor="$gray5" />
          </Avatar>
        </XStack>

        {/* Thống kê nhanh */}
        <XStack space="$2" justifyContent="space-between">
          <Card
            flex={1}
            padding="$3"
            backgroundColor="#FFF7ED"
            borderColor="#FFEDD5"
            bordered
          >
            <YStack alignItems="center" space="$1">
              <Flame size={20} color="#EA580C" />
              <Text fontSize="$6" fontWeight="bold" color="#C2410C">
                50 🔥
              </Text>
              <Text fontSize="$1" color="#9A3412">
                Tổng buổi tập
              </Text>
            </YStack>
          </Card>

          <Card
            flex={1}
            padding="$3"
            backgroundColor="#F0FDF4"
            borderColor="#DCFCE7"
            bordered
          >
            <YStack alignItems="center" space="$1">
              <TrendingUp size={20} color="#16A34A" />
              <Text fontSize="$6" fontWeight="bold" color="#15803D">
                1/6
              </Text>
              <Text fontSize="$1" color="#166534">
                Tuần này
              </Text>
            </YStack>
          </Card>

          <Card
            flex={1}
            padding="$3"
            backgroundColor="#EFF6FF"
            borderColor="#DBEAFE"
            bordered
          >
            <YStack alignItems="center" space="$1">
              <Clock size={20} color="#2563EB" />
              <Text fontSize="$6" fontWeight="bold" color="#1D4ED8">
                5 🔥
              </Text>
              <Text fontSize="$1" color="#1E40AF">
                Streak
              </Text>
            </YStack>
          </Card>
        </XStack>

        {/* BANNER TRỢ LÝ AI (Nút mở Màn hình 5) */}
        <Card
          elevate
          size="$4"
          bordered
          padding="$4"
          backgroundColor="#EFF6FF"
          borderColor="#BFDBFE"
          onPress={() => navigation.navigate("AICoach")}
          pressStyle={{ scale: 0.98 }}
          cursor="pointer"
        >
          <XStack alignItems="center" justifyContent="space-between">
            <XStack alignItems="center" space="$3">
              <YStack backgroundColor="#3B82F6" padding="$2" borderRadius="$3">
                <Bot size={24} color="white" />
              </YStack>
              <YStack space="$1">
                <XStack alignItems="center" space="$1">
                  <Text fontSize="$4" fontWeight="bold" color="#1E3A8A">
                    Trợ lý AI Lên Lịch Tập
                  </Text>
                  <Sparkles size={16} color="#3B82F6" />
                </XStack>
                <Text fontSize="$2" color="#1E40AF">
                  Tư vấn lộ trình cá nhân hóa theo mục tiêu
                </Text>
              </YStack>
            </XStack>
            <ChevronRight size={20} color="#3B82F6" />
          </XStack>
        </Card>

        {/* Tiến độ tuần */}
        <YStack space="$2">
          <XStack justifyContent="space-between" alignItems="center">
            <Text fontSize="$4" fontWeight="bold">
              Tiến độ tuần này
            </Text>
            <Text fontSize="$3" fontWeight="bold" color="#3B82F6">
              17%
            </Text>
          </XStack>
          <Progress value={17} size="$2" backgroundColor="$gray4">
            <Progress.Indicator animation="bouncy" backgroundColor="#3B82F6" />
          </Progress>
        </YStack>
      </YStack>
    </ScrollView>
  );
}
