import { ID } from "./common.type";

export default interface User {
  id: ID;
  username: string;
  fullname: string;
  email: string;
  password: string;
  photo_profile?: string | null;
  bio?: string | null;
}

// REQUEST TYPES

// Data Transfer Object (DTO)
// DTO adalah objek yang membawa data antar proses (misalnya dari database ke API) untuk mengurangi jumlah pemanggilan metode. DTO hanya berisi data (field/properti) dan tidak mengandung logika bisnis.
export type CreateUserDTO = Pick<
  User,
  "username" | "fullname" | "email" | "password"
>;
// Pick memungkinkan membuat tipe data baru dengan memilih beberapa properti spesifik dari tipe data yang sudah ada.

export type UpdateUserDTO = Partial<
  Pick<User, "fullname" | "photo_profile" | "bio">
>;
// Partial mengubah semua properti dalam suatu tipe data menjadi opsional
