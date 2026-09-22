"use client"

import { LogIn } from "lucide-react"
import type { View } from "@/components/app-root"
import { Brand } from "@/components/shell/brand"
import { LanguageToggle } from "@/components/shell/language-toggle"
import { useI18n } from "@/lib/i18n"

const titleKey: Record<View, "nav_home" | "farmer_dashboard" | "transporter_dashboard" | "analytics_title" | "storage_title"> = {
  home: "nav_home",
  farmer: "farmer_dashboard",
  transport: "transporter_dashboard",
  analytics: "analytics_title",
  storage: "storage_title",
}

export function TopHeader({
  view,
  onLogin,
}: {
  view: View
  onLogin: () => void
  navigate: (v: View) => void
}) {
  const { t } = useI18n()
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/90 px-4 backdrop-blur lg:px-6">
      <div className="lg:hidden">
        <Brand />
      </div>
      <h1 className="hidden text-lg font-bold text-foreground lg:block">
        {view === "home" ? t("appName") : t(titleKey[view])}
      </h1>
      <div className="flex items-center gap-2">
        <LanguageToggle />
        <button
          type="button"
          onClick={onLogin}
          className="hidden items-center gap-2 rounded-lg bg-primary px-3.5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:flex"
        >
          <LogIn className="size-4" />
          {t("cta_login")}
        </button>
      </div>
    </header>
  )
}
