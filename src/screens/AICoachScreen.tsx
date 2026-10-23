import React, { useState } from "react";
import { ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import {
  YStack,
  XStack,
  Text,
  Input,
  Button,
  Card,
  Spinner,
  Separator,
} from "tamagui";
import { ArrowLeft, Bot, Sparkles, AlertCircle } from "@tamagui/lucide-icons";
import { useNavigation } from "@react-navigation/native";
import { generateAIFitnessPlan } from "../services/api";

export default function AICoachScreen() {
  const navigation = useNavigation();

  const [goal, setGoal] = useState("");
  const [availableDays, setAvailableDays] = useState("3");
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleConsultAI = async () => {
    if (!goal.trim()) {
      setErrorMessage("Vui lòng nhập mục tiêu luyện tập của bạn.");
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);
    setRecommendation(null);

    try {
      const sanitizedGoal = goal.replace(/[<>{}]/g, "").slice(0, 200);
      const days = parseInt(availableDays, 10) || 3;

      const result = await generateAIFitnessPlan(sanitizedGoal, days);
      setRecommendation(result);
    } catch (error) {
      setErrorMessage(
        "Không thể kết nối với Trợ lý AI. Vui lòng kiểm tra lại kết nối mạng.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <YStack
          flex={1}
          backgroundColor="$background"
          padding="$4"
          space="$4"
          paddingTop="$8"
        >
          {/* Header */}
          <XStack alignItems="center" space="$3">
            <Button
              circular
              size="$3"
              chromeless
              icon={<ArrowLeft size={24} />}
              onPress={() => navigation.goBack()}
            />
            <XStack alignItems="center" space="$2">
              <Bot size={28} color="#3B82F6" />
              <Text fontSize="$6" fontWeight="bold">
                AI Lên Lịch Tập
              </Text>
            </XStack>
          </XStack>

          <Separator />

          {/* Form Nhập liệu */}
          <Card elevate size="$4" bordered padding="$4" space="$3">
            <YStack space="$2">
              <Text fontSize="$3" fontWeight="bold" color="$gray11">
                Mục tiêu của bạn là gì?
              </Text>
              <Input
                placeholder="Vd: Giảm mỡ bụng trong 1 tháng"
                value={goal}
                onChangeText={(text) => {
                  setGoal(text);
                  if (errorMessage) setErrorMessage(null);
                }}
                size="$4"
              />
            </YStack>

            <YStack space="$2">
              <Text fontSize="$3" fontWeight="bold" color="$gray11">
                Số ngày rảnh trong tuần:
              </Text>
              <Input
                placeholder="3"
                keyboardType="numeric"
                value={availableDays}
                onChangeText={setAvailableDays}
                size="$4"
                maxLength={1}
              />
            </YStack>

            {errorMessage && (
              <XStack alignItems="center" space="$2" marginTop="$1">
                <AlertCircle size={16} color="#EF4444" />
                <Text color="#EF4444" fontSize="$2" flex={1}>
                  {errorMessage}
                </Text>
              </XStack>
            )}

            <Button
              backgroundColor="#3B82F6"
              color="white"
              icon={
                isLoading ? <Spinner color="white" /> : <Sparkles size={20} />
              }
              onPress={handleConsultAI}
              disabled={isLoading}
              marginTop="$2"
            >
              {isLoading ? "Đang phân tích..." : "NHỜ AI TƯ VẤN"}
            </Button>
          </Card>

          {/* Kết quả AI */}
          {recommendation && (
            <Card
              elevate
              size="$4"
              bordered
              padding="$4"
              space="$3"
              backgroundColor="$blue2"
            >
              <XStack alignItems="center" space="$2">
                <Sparkles size={20} color="#3B82F6" />
                <Text fontSize="$4" fontWeight="bold" color="#3B82F6">
                  Kết quả từ AI:
                </Text>
              </XStack>

              <Separator />

              <Text fontSize="$3" lineHeight={22} color="$color">
                {recommendation}
              </Text>

              <Text
                fontSize="$1"
                color="$gray10"
                fontStyle="italic"
                marginTop="$2"
              >
                * Lưu ý: Đây chỉ là gợi ý tham khảo dựa trên thuật toán AI. Hãy
                tham khảo ý kiến bác sĩ hoặc HLV chuyên nghiệp nếu bạn có tình
                trạng sức khỏe đặc biệt.
              </Text>
            </Card>
          )}
        </YStack>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
