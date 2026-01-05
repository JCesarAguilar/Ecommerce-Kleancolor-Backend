export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone?: number;
  country?: string;
  address?: string;
  city?: string;
}
