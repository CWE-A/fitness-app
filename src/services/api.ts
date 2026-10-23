// ============================================================
// API Service – Giao tiếp với MockAPI Workouts
// ============================================================

const BASE_URL = "https://6aaa5ac3ff4dd5698b4e6dd8.mockapi.io";

export const WorkoutsAPI = {
  /** Lấy toàn bộ danh sách workouts */
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/workouts`);
    if (!response.ok) {
      throw new Error(
        `Lỗi kết nối API: ${response.status} ${response.statusText}`,
      );
    }
    return response.json();
  },

  /** Lấy một workout theo ID */
  getById: async (id: string) => {
    const response = await fetch(`${BASE_URL}/workouts/${id}`);
    if (!response.ok) {
      throw new Error(`Không tìm thấy workout #${id}`);
    }
    return response.json();
  },

  /** Tạo workout mới */
  create: async (
    data: Partial<{
      title: string;
      image: string;
      duration: string;
      date: string;
      location: string;
    }>,
  ) => {
    const response = await fetch(`${BASE_URL}/workouts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error("Không thể tạo workout mới");
    }
    return response.json();
  },

  /** Xóa workout theo ID */
  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Không thể xóa workout #${id}`);
    }
    return response.json();
  },
};

export async function generateAIFitnessPlan(
  goal: string,
  days: number,
): Promise<string> {
  // Giả lập trễ mạng (Network latency)
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // Trả về dữ liệu gợi ý giả lập dựa trên tham số đầu vào
  return (
    `Dựa trên mục tiêu "${goal}" với tần suất ${days} buổi/tuần, đây là lộ trình gợi ý cho bạn:\n\n` +
    `• Thứ 2: Tập Cardio nhẹ nhàng (20 phút) + Khởi động cơ bản\n` +
    `• Thứ 4: Tập HIIT toàn thân (15 phút) hỗ trợ đốt mỡ\n` +
    `• Thứ 6: Chạy bộ ngoài trời hoặc trên máy (30 phút)\n\n` +
    `💡 Khuyên dùng: Duy trì chế độ ăn giàu protein và uống đủ 2 lit nước mỗi ngày!`
  );
}
