import { useState, useCallback } from "react";

export const useComponentSize = () => {
  const [size, setSize] = useState<{ width: number; height: number }>();

  const onLayout = useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return { size, onLayout };
};
