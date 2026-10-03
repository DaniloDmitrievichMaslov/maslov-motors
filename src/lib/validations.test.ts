import { describe, it, expect } from "vitest";
import {
  signUpSchema,
  signInSchema,
  carSchema,
  quoteRequestSchema,
  profileSchema,
  serviceSchema,
} from "./validations";

describe("signUpSchema", () => {
  const validData = {
    email: "client@example.com",
    password: "secret123",
    firstName: "Danilo",
    lastName: "Maslov",
    phone: "+351 933 468 899",
  };

  it("accepts valid data", () => {
    expect(signUpSchema.safeParse(validData).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(signUpSchema.safeParse({ ...validData, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a password shorter than 6 characters", () => {
    expect(signUpSchema.safeParse({ ...validData, password: "12345" }).success).toBe(false);
  });

  it("rejects a missing phone number", () => {
    const { phone: _phone, ...withoutPhone } = validData;
    expect(signUpSchema.safeParse(withoutPhone).success).toBe(false);
  });

  it("rejects a phone with invalid characters", () => {
    expect(signUpSchema.safeParse({ ...validData, phone: "abc-123!" }).success).toBe(false);
  });

  it("rejects names with numbers", () => {
    expect(signUpSchema.safeParse({ ...validData, firstName: "Danilo123" }).success).toBe(false);
  });
});

describe("signInSchema", () => {
  it("accepts valid credentials", () => {
    expect(signInSchema.safeParse({ email: "a@b.com", password: "123456" }).success).toBe(true);
  });

  it("rejects an empty password", () => {
    expect(signInSchema.safeParse({ email: "a@b.com", password: "" }).success).toBe(false);
  });
});

describe("carSchema", () => {
  const validCar = {
    marca: "Toyota",
    modelo: "Corolla",
    matricula: "AA-12-BB",
    ano: 2020,
    cor: "Azul",
    quilometragem: 85000,
  };

  it("accepts a valid car", () => {
    expect(carSchema.safeParse(validCar).success).toBe(true);
  });

  it("rejects a year before 1900", () => {
    expect(carSchema.safeParse({ ...validCar, ano: 1899 }).success).toBe(false);
  });

  it("rejects a year in the future", () => {
    expect(carSchema.safeParse({ ...validCar, ano: new Date().getFullYear() + 5 }).success).toBe(false);
  });

  it("rejects negative mileage", () => {
    expect(carSchema.safeParse({ ...validCar, quilometragem: -1 }).success).toBe(false);
  });

  it("rejects invalid plate characters", () => {
    expect(carSchema.safeParse({ ...validCar, matricula: "AA 12 @@" }).success).toBe(false);
  });
});

describe("quoteRequestSchema", () => {
  const validQuote = { message: "Preciso de trocar os travoes do carro, obrigado.", phone: "933468899" };

  it("accepts a valid quote request", () => {
    expect(quoteRequestSchema.safeParse(validQuote).success).toBe(true);
  });

  it("rejects messages shorter than 10 characters", () => {
    expect(quoteRequestSchema.safeParse({ ...validQuote, message: "curto" }).success).toBe(false);
  });
});

describe("serviceSchema", () => {
  const validService = { service_name: "Troca de óleo", parts_cost: 35.5, work_hours: 1, cost_per_hour: 20 };

  it("accepts a valid service", () => {
    expect(serviceSchema.safeParse(validService).success).toBe(true);
  });

  it("rejects negative parts cost", () => {
    expect(serviceSchema.safeParse({ ...validService, parts_cost: -5 }).success).toBe(false);
  });

  it("rejects negative work hours", () => {
    expect(serviceSchema.safeParse({ ...validService, work_hours: -1 }).success).toBe(false);
  });
});

describe("profileSchema", () => {
  it("accepts a profile with an optional empty phone", () => {
    const result = profileSchema.safeParse({
      firstName: "Danilo",
      lastName: "Maslov",
      email: "danilo@example.com",
      phone: "",
    });
    expect(result.success).toBe(true);
  });

  it("rejects an invalid email", () => {
    const result = profileSchema.safeParse({
      firstName: "Danilo",
      lastName: "Maslov",
      email: "invalid",
      phone: "",
    });
    expect(result.success).toBe(false);
  });
});
