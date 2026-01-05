export class UserResponseDto {
  id: string;
  name: string;
  email: string;
  phone?: number | null;
  address?: string | null;
  country?: string | null;
  city?: string | null;
  orders?: { id: string; date: Date }[];
}
