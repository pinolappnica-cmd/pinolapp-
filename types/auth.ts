export interface AuthPayload {
  email: string;
  password: string;
  name?: string;
}

export interface AuthResponse {
  token: string;
  customerId: number;
}
