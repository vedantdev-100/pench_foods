import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { GenerateSessionPayload } from "../types";
import { useToast } from "@/hooks/useToast";
import { queryKeys } from "@/config/queryKeys";
import type { Session } from "@/types/domain/session.types";

// Mock API for now
const mockGenerateSession = async (payload: GenerateSessionPayload): Promise<{ data: { data: Session } }> => {
  return new Promise((resolve) => setTimeout(() => {
    resolve({
      data: {
        data: {
          id: `session_${Date.now()}`,
          code: Math.random().toString(36).substring(2, 8).toUpperCase(),
          subjectId: payload.subjectId,
          subjectName: "Computer Science 101",
          teacherId: "teacher_1",
          startTime: new Date().toISOString(),
          isActive: true,
          expiresAt: new Date(Date.now() + payload.durationMinutes * 60000).toISOString(),
        }
      }
    });
  }, 1000));
};

export function useGenerateCode() {
  const { show } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: mockGenerateSession,
    onSuccess: (res) => {
      show({ message: "Session code generated successfully!", type: "success" });
      queryClient.invalidateQueries({ queryKey: queryKeys.session.all });
    },
    onError: () => {
      show({ message: "Failed to generate session code.", type: "error" });
    },
  });
}
