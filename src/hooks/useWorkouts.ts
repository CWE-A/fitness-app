import { useState, useEffect, useCallback } from 'react';
import type { ApiWorkout, UseWorkoutsResult } from '../types';
import { WorkoutsAPI } from '../services/api';

// ============================================================
// Hook: useWorkouts – Fetch danh sách workout từ API
// ============================================================

export function useWorkouts(): UseWorkoutsResult {
  const [workouts, setWorkouts] = useState<ApiWorkout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchWorkouts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data: ApiWorkout[] = await WorkoutsAPI.getAll();
      setWorkouts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã có lỗi xảy ra khi tải dữ liệu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWorkouts();
  }, [fetchWorkouts]);

  return {
    workouts,
    loading,
    error,
    refetch: fetchWorkouts,
    totalCount: workouts.length,
  };
}
