import { useState, useEffect } from "react";
import type { User } from "@/types/domain/user.types";

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: "1", name: "Alice", email: "alice@example.com", role: "student" },
        { id: "2", name: "Bob", email: "bob@example.com", role: "teaching" },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { users, isLoading };
}
