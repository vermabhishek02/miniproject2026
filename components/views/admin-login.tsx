"use client"

import { useState } from "react"
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowLeft, LogOut, Sprout, Truck, ShoppingBasket, Store } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import type { View } from "@/components/app-root"
import { StatCard } from "@/components/views/stat-card"

const DEMO_EMAIL = "admin@khetimandi.in"
const DEMO_PASSWORD = "admin123"

export function AdminLogin({ navigate }: { navigate: (v: View) => void }) {
  const { t } = useI18n()
  const [authed, setAuthed] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPw, setShowPw] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (email.trim().toLowerCase() === DEMO_EMAIL && password === DEMO_PASSWORD) {
      setError(false)
      setAuthed(true)
    } else {
      setError(true)
    }
  }

  if (authed) {
    return <AdminDashboard onSignOut={() => setAuthed(false)} navigate={navigate} />
  }

  return (
    <div className="flex min-h-[calc(100dvh-4rem)] items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate("home")}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("admin_back")}
        </button>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <div className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <ShieldCheck className="size-7" />
            </div>
            <h1 className="mt-4 text-2xl font-bold text-foreground">{t("admin_portal")}</h1>
            <p className="mt-1 text-sm text-muted-foreground">{t("admin_sub")}</p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="admin-email" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("admin_email")}
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
                <Mail className="size-4 text-muted-foreground" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value)
                    setError(false)
                  }}
                  placeholder="admin@khetimandi.in"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="admin-password" className="mb-1.5 block text-sm font-medium text-foreground">
                {t("admin_password")}
              </label>
              <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
                <Lock className="size-4 text-muted-foreground" />
                <input
                  id="admin-password"
                  type={showPw ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(false)
                  }}
                  placeholder="••••••••"
                  className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  aria-label={showPw ? "Hide password" : "Show password"}
                  className="rounded p-1 text-muted-foreground transition-colors hover:text-foreground"
                >
                  {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {error && (
              <p role="alert" className="rounded-lg bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {t("admin_invalid")}
              </p>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex cursor-pointer items-center gap-2 text-muted-foreground">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="size-4 rounded border-border accent-primary"
                />
                {t("admin_remember")}
              </label>
              <button type="button" className="font-medium text-primary transition-colors hover:text-primary/80">
                {t("admin_forgot")}
              </button>
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("admin_signin")}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5" />
            {t("admin_secure")}
          </div>
          <p className="mt-2 text-center text-[11px] text-muted-foreground">{t("admin_demo_note")}</p>
        </div>
      </div>
    </div>
  )
}

function AdminDashboard({ onSignOut, navigate }: { onSignOut: () => void; navigate: (v: View) => void }) {
  const { t } = useI18n()

  const activity = [
    { icon: Sprout, text: "Ramesh Kumar registered 120 qtl wheat harvest", time: "2m ago" },
    { icon: Truck, text: "Transport #TR-4821 marked delivered (Nashik → Pune)", time: "18m ago" },
    { icon: ShoppingBasket, text: "New bid ₹2,450/qtl placed on onion listing", time: "42m ago" },
    { icon: Store, text: "Azadpur Mandi price feed synced", time: "1h ago" },
  ]

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <ShieldCheck className="size-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground sm:text-2xl">{t("admin_welcome")}</h1>
            <p className="text-sm text-muted-foreground">{DEMO_EMAIL}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("home")}
            className="rounded-lg border border-border px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-muted"
          >
            {t("admin_back")}
          </button>
          <button
            type="button"
            onClick={onSignOut}
            className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <LogOut className="size-4" />
            {t("admin_signout")}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Sprout} label={t("admin_stat_farmers")} value="12,480" />
        <StatCard icon={Truck} label={t("admin_stat_transporters")} value="1,326" />
        <StatCard icon={ShoppingBasket} label={t("admin_stat_listings")} value="864" />
        <StatCard icon={Store} label={t("admin_stat_mandis")} value="212" />
      </div>

      <div className="mt-6 rounded-2xl border border-border bg-card p-5">
        <h2 className="text-base font-semibold text-foreground">{t("admin_recent")}</h2>
        <ul className="mt-4 divide-y divide-border">
          {activity.map((a, i) => {
            const Icon = a.icon
            return (
              <li key={i} className="flex items-center gap-3 py-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  <Icon className="size-4.5" />
                </div>
                <p className="flex-1 text-sm text-foreground">{a.text}</p>
                <span className="shrink-0 text-xs text-muted-foreground">{a.time}</span>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}
