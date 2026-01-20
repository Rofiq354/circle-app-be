import Joi from "joi";

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(20).required().messages({
    "string.min": "Username minimal 3 karakter",
    "string.max": "Username maksimal 20 karakter",
    "any.required": "Username wajib diisi",
    "string.empty": "Username tidak boleh kosong",
  }),

  fullname: Joi.string().min(3).max(50).required().messages({
    "string.min": "Nama lengkap minimal 3 karakter",
    "string.max": "Nama lengkap maksimal 50 karakter",
    "any.required": "Nama lengkap wajib diisi",
    "string.empty": "Nama lengkap tidak boleh kosong",
  }),

  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email wajib diisi",
    "string.empty": "Email tidak boleh kosong",
  }),

  password: Joi.string()
    .min(8)
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .required()
    .messages({
      "string.min": "Password minimal 8 karakter",
      "string.pattern.base":
        "Password harus mengandung huruf besar, huruf kecil, angka, dan simbol",
      "any.required": "Password wajib diisi",
      "string.empty": "Password tidak boleh kosong",
    }),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Email tidak valid",
    "any.required": "Email wajib diisi",
    "string.empty": "Email tidak boleh kosong",
  }),

  password: Joi.string().required().messages({
    "any.required": "Password wajib diisi",
    "string.empty": "Password tidak boleh kosong",
  }),
});
