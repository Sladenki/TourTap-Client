import type { Metadata } from "next";
import { AuthShell } from "./auth-shell";
import { RegisterForm } from "./register-form";

export const metadata: Metadata = {
  title: "Регистрация — TourTap",
  description: "Создайте профиль гида в TourTap.",
};

export default function RegisterPage() {
  return (
    <AuthShell>
      <RegisterForm />
    </AuthShell>
  );
}
