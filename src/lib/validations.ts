import { z } from "zod";

// Auth validations
export const signUpSchema = z.object({
  email: z
    .string()
    .min(1, "Email é obrigatório")
    .email("Email inválido")
    .max(255, "Email deve ter no máximo 255 caracteres"),
  password: z
    .string()
    .min(6, "Password deve ter no mínimo 6 caracteres")
    .max(72, "Password deve ter no máximo 72 caracteres"),
  firstName: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "Nome deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Nome contém caracteres inválidos"),
  lastName: z
    .string()
    .min(1, "Apelido é obrigatório")
    .max(50, "Apelido deve ter no máximo 50 caracteres")
    .regex(/^[a-zA-ZÀ-ÿ\s'-]+$/, "Apelido contém caracteres inválidos"),
  phone: z
    .string()
    .min(1, "Telemóvel é obrigatório")
    .regex(/^\+?[0-9\s]{9,20}$/, "Formato de telemóvel inválido"),
});

export const signInSchema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(1, "Password é obrigatória"),
});

// Car validations
export const carSchema = z.object({
  marca: z
    .string()
    .min(1, "Marca é obrigatória")
    .max(50, "Marca deve ter no máximo 50 caracteres"),
  modelo: z
    .string()
    .min(1, "Modelo é obrigatório")
    .max(50, "Modelo deve ter no máximo 50 caracteres"),
  matricula: z
    .string()
    .min(1, "Matrícula é obrigatória")
    .max(20, "Matrícula deve ter no máximo 20 caracteres")
    .regex(/^[A-Z0-9-]+$/i, "Matrícula contém caracteres inválidos"),
  ano: z
    .number()
    .min(1900, "Ano deve ser maior que 1900")
    .max(new Date().getFullYear() + 1, "Ano inválido"),
  cor: z
    .string()
    .min(1, "Cor é obrigatória")
    .max(30, "Cor deve ter no máximo 30 caracteres"),
  quilometragem: z
    .number()
    .min(0, "Quilometragem não pode ser negativa")
    .max(9999999, "Quilometragem inválida"),
});

// Quote request validations
export const quoteRequestSchema = z.object({
  message: z
    .string()
    .min(10, "Mensagem deve ter no mínimo 10 caracteres")
    .max(1000, "Mensagem deve ter no máximo 1000 caracteres"),
  phone: z
    .string()
    .min(1, "Telemóvel é obrigatório")
    .regex(/^\+?[0-9\s]{9,20}$/, "Formato de telemóvel inválido"),
});

// Profile validations
export const profileSchema = z.object({
  firstName: z
    .string()
    .min(1, "Nome é obrigatório")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  lastName: z
    .string()
    .min(1, "Apelido é obrigatório")
    .max(50, "Apelido deve ter no máximo 50 caracteres"),
  email: z.string().email("Email inválido"),
  phone: z
    .string()
    .regex(/^\+?[0-9\s]{9,20}$/, "Formato de telemóvel inválido")
    .optional()
    .or(z.literal("")),
});

// Service validations
export const serviceSchema = z.object({
  service_name: z
    .string()
    .min(1, "Nome do serviço é obrigatório")
    .max(100, "Nome deve ter no máximo 100 caracteres"),
  description: z
    .string()
    .max(500, "Descrição deve ter no máximo 500 caracteres")
    .optional(),
  parts_cost: z.number().min(0, "Custo das peças não pode ser negativo"),
  work_hours: z.number().min(0, "Horas de trabalho não pode ser negativo"),
  cost_per_hour: z.number().min(0, "Custo por hora não pode ser negativo"),
});

export type SignUpInput = z.infer<typeof signUpSchema>;
export type SignInInput = z.infer<typeof signInSchema>;
export type CarInput = z.infer<typeof carSchema>;
export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
export type ProfileInput = z.infer<typeof profileSchema>;
export type ServiceInput = z.infer<typeof serviceSchema>;
