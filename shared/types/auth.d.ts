declare module "#auth-utils" {
  interface User {
    id: number;
    email: string;
    theme_id: number;
    name: string;
    picture: string;
    month_objective: number;
  }
}

export {};
