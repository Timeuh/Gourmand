declare module "#auth-utils" {
  interface User {
    id: number;
    email: string;
    theme_id: number;
    name: string;
    picture: string;
    month_objective: number;
    deletion_requested_at: Date | null;
    deletion_scheduled_at: Date | null;
  }
}

export {};
