// ============================================================
// API Service – Giao tiếp với MockAPI Workouts
// ============================================================

const BASE_URL = 'https://6aaa5ac3ff4dd5698b4e6dd8.mockapi.io';

export const WorkoutsAPI = {
  /** Lấy toàn bộ danh sách workouts */
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/workouts`);
    if (!response.ok) {
      throw new Error(`Lỗi kết nối API: ${response.status} ${response.statusText}`);
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
  create: async (data: Partial<{ title: string; image: string; duration: string; date: string; location: string }>) => {
    const response = await fetch(`${BASE_URL}/workouts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error('Không thể tạo workout mới');
    }
    return response.json();
  },

  /** Xóa workout theo ID */
  delete: async (id: string) => {
    const response = await fetch(`${BASE_URL}/workouts/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Không thể xóa workout #${id}`);
    }
    return response.json();
  },
};
