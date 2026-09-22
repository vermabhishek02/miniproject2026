"use client"

import { useEffect, useState } from "react"
import { X, Phone, Sprout, ShoppingBasket, Truck } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

type Role = "farmer" | "buyer" | "transporter"

export function LoginModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n()
  const [role, setRole] = useState<Role>("farmer")
  const [phone, setPhone] = useState("")
  const [sent, setSent] = useState(false)

  useEffect(() => {
    if (open) {
      setSent(false)
      setPhone("")
    }
  }, [open])

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose()
    }
    if (open) document.addEventListener("keydown", onKey)
    return () => document.removeEventListener("keydown", onKey)
  }, [open, onClose])

  if (!open) return null

  const roles: { id: Role; icon: typeof Sprout; labelKey: "role_farmer" | "role_buyer" | "role_transporter" }[] = [
    { id: "farmer", icon: Sprout, labelKey: "role_farmer" },
    { id: "buyer", icon: ShoppingBasket, labelKey: "role_buyer" },
    { id: "transporter", icon: Truck, labelKey: "role_transporter" },
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4">
      <div className="absolute inset-0 bg-foreground/40 backdrop-blur-sm" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={t("cta_login")}
        className="relative w-full max-w-md rounded-t-2xl border border-border bg-card p-6 shadow-xl sm:rounded-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 rounded-md p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        <h2 className="text-xl font-bold text-foreground">{t("login_welcome")}</h2>
        <p className="mt-1 text-sm text-muted-foreground">{t("login_sub")}</p>

        <p className="mt-5 mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          {t("login_choose_role")}
        </p>
        <div className="grid grid-cols-3 gap-2">
          {roles.map((r) => {
            const Icon = r.icon
            const active = role === r.id
            return (
              <button
                key={r.id}
                type="button"
                onClick={() => setRole(r.id)}
                aria-pressed={active}
                className={cn(
                  "flex flex-col items-center gap-1.5 rounded-xl border p-3 text-xs font-medium transition-colors",
                  active
                    ? "border-primary bg-primary/10 text-primary"
                    : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                )}
              >
                <Icon className="size-5" />
                {t(r.labelKey)}
              </button>
            )
          })}
        </div>

        {!sent ? (
          <form
            className="mt-5 space-y-3"
            onSubmit={(e) => {
              e.preventDefault()
              if (phone.trim().length >= 10) setSent(true)
            }}
          >
            <label className="block text-sm font-medium text-foreground" htmlFor="phone">
              {t("login_phone")}
            </label>
            <div className="flex items-center gap-2 rounded-lg border border-border bg-background px-3 focus-within:border-primary focus-within:ring-3 focus-within:ring-primary/20">
              <Phone className="size-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">+91</span>
              <input
                id="phone"
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                placeholder="98765 43210"
                className="w-full bg-transparent py-2.5 text-sm outline-none placeholder:text-muted-foreground"
              />
            </div>
            <button
              type="submit"
              disabled={phone.trim().length < 10}
              className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {t("login_send_otp")}
            </button>
          </form>
        ) : (
          <div className="mt-5 rounded-lg border border-primary/30 bg-primary/5 p-4 text-center">
            <p className="text-sm font-medium text-foreground">{t("login_otp_sent")}</p>
            <p className="mt-1 text-xs text-muted-foreground">+91 {phone}</p>
            <div className="mt-3 flex justify-center gap-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="flex size-10 items-center justify-center rounded-lg border border-border bg-background text-lg font-bold text-foreground"
                >
                  {i < 4 ? "•" : ""}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-4 w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("login_verify")}
            </button>
            <p className="mt-2 text-[11px] text-muted-foreground">{t("login_demo_note")}</p>
          </div>
        )}
      </div>
    </div>
  )
}
