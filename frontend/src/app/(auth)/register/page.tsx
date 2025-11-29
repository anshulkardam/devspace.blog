import type { Metadata } from "next"
import { RegisterForm } from "@/components/auth/register-form"

export const metadata: Metadata = {
  title: "Create account — Brew",
  description: "Create your Brew account and start writing",
}

export default function RegisterPage() {
  return <RegisterForm />
}
