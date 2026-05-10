import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

type AppStateHandler = (status: AppStateStatus) => void;

export function useAppState(onChange: AppStateHandler) {
  const handlerRef = useRef(onChange);
  handlerRef.current = onChange;

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextState) => {
      handlerRef.current(nextState);
    });
    return () => subscription.remove();
  }, []);
}
