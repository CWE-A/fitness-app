import React, { createContext, useContext, useState, useCallback } from 'react';

// ============================================================
// ThemeContext – Chia sẻ trạng thái Dark Mode toàn ứng dụng
// ============================================================

interface ThemeContextValue {
  isDark: boolean;
  toggleTheme: (value: boolean) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  isDark: false,
  toggleTheme: () => {},
});

/** Hook tiện ích để dùng ThemeContext trong bất kỳ component nào */
export function useTheme(): ThemeContextValue {
  return useContext(ThemeContext);
}

/** Provider bọc toàn bộ app, cung cấp isDark và toggleTheme */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = useCallback((value: boolean) => {
    setIsDark(value);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
