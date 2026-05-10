import type { Session } from "@/types/domain/session.types";

export interface SessionState {
  activeSession: Session | null;
}

export const sessionSlice = (set: (fn: (s: SessionState) => void) => void) => ({
  activeSession: null as Session | null,
});
