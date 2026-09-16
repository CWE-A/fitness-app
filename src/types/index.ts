// ============================================================
// Types & Interfaces cho ứng dụng "Nhật ký luyện tập cá nhân"
// ============================================================

/** Thông tin hồ sơ người dùng */
export interface UserProfile {
  id: string;
  name: string;
  avatarUrl: string;
}

/** Thông tin một bài tập */
export interface WorkoutSession {
  id: string;
  name: string;
  /** Thời gian tập (đơn vị: phút) */
  durationMinutes: number;
  /** Lượng calories đã đốt */
  caloriesBurned: number;
  /** Ngày tập (ISO string) */
  date: string;
  /** Loại bài tập */
  category: WorkoutCategory;
}

/** Phân loại bài tập */
export type WorkoutCategory =
  | 'strength'
  | 'cardio'
  | 'yoga'
  | 'hiit'
  | 'stretching'
  | 'other';

/** Thống kê tiến độ */
export interface ProgressStats {
  /** Số ngày tập liên tiếp */
  currentStreak: number;
  /** Số ngày mục tiêu trong tuần */
  weeklyGoal: number;
  /** Số ngày đã hoàn thành trong tuần */
  weeklyCompleted: number;
  /** Tổng số buổi tập */
  totalWorkouts: number;
}

/** Trạng thái cấp quyền trên thiết bị */
export interface PermissionStatus {
  id: string;
  name: string;
  /** Icon name (Lucide icon) */
  icon: 'map-pin' | 'bell' | 'camera';
  granted: boolean;
}

/** Cấu hình cài đặt ứng dụng */
export interface AppSettings {
  /** Giao diện sáng/tối */
  isDarkMode: boolean;
  /** Danh sách trạng thái quyền */
  permissions: PermissionStatus[];
}

/** Props cho HomeScreen – dễ dàng tích hợp với React Navigation */
export interface HomeScreenProps {
  navigation?: any;
}

/** Props cho SettingsScreen */
export interface SettingsScreenProps {
  navigation?: any;
}

// ============================================================
// API Types – dữ liệu từ MockAPI
// ============================================================

/** Dữ liệu trả về từ API: https://6aaa5ac3ff4dd5698b4e6dd8.mockapi.io/workouts */
export interface ApiWorkout {
  id: string;
  title: string;
  image: string;
  duration: string;
  date: string;
  location: string;
  createdAt: string;
}

/** Trạng thái fetch API */
export interface UseWorkoutsResult {
  workouts: ApiWorkout[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
  totalCount: number;
}
