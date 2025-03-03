export interface User {
  id?: number;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  role?: string;
  profile_image?: string;
  password?: string;
  confirmPassword?: string;
  profileImageFile?: File;
  [key: string]: any; // Pour permettre l'accès dynamique aux propriétés
}