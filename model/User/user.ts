export interface User {
  id: string;
  name: string;
  image?: string;
}

export interface Session {
  id: string;
  user: User;
  from: Date;
  to?: Date;
}
