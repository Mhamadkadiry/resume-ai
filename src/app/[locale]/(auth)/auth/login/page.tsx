import { LoginForm } from "@/components/login-form";
import { Logo } from "@/components/Logo";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function LoginPage() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10 relative">
      <div className="absolute top-4 right-4 md:top-6 md:right-6">
        <LanguageSwitcher />
      </div>

      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <Logo size="md" />
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
