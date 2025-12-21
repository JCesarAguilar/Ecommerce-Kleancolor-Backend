export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  phone: string;
  address: string;
  country?: string;
  city?: string;
}
