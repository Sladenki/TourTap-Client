import type { Metadata } from "next";
import { AuthShell } from "../auth-shell";
import { LoginForm } from "../login-form";

export const metadata: Metadata = {
  title: "Вход — TourTap",
  description: "Войдите в профиль TourTap.",
};

export default function LoginPage() {
  return (
    <AuthShell>
      <LoginForm />
    </AuthShell>
  );
}
