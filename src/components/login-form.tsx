"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { signIn } from "next-auth/react";
import { useState } from "react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const t = useTranslations("auth");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      // Sign in existing user
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError("Invalid email or password");
      } else {
        window.location.href = "/en";
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">{t("welcomeBack")}</CardTitle>
          <CardDescription>{t("loginWithAccount")}</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              {error && (
                <div className="text-sm text-red-600 bg-red-50 p-3 rounded-md">
                  {error}
                </div>
              )}
              <div className="grid gap-6">
                <div className="grid gap-3">
                  <Label htmlFor="email">{t("email")}</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-3">
                  <div className="flex items-center">
                    <Label htmlFor="password">{t("password")}</Label>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      {t("forgotPassword")}
                    </a>
                  </div>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={6}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "..." : t("login")}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground text-center text-xs text-balance">
        {t("byContinuing")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {t("termsOfService")}
        </a>{" "}
        {t("and")}{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          {t("privacyPolicy")}
        </a>
        .
      </div>
    </div>
  );
}
