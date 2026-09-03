import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"

import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
  FieldLegend,
  FieldTitle,
} from "../components/ui/field"

import { Input } from "../components/ui/input"

type AuthResponse = {
  id: string
  mail: string
  name: string
}

function isValidSiren(value: string): boolean {
  const digits = value.replace(/\D/g, "")
  if (digits.length !== 9) return false

  // Validation Luhn (norme SIREN)
  let sum = 0
  for (let i = 0; i < 9; i++) {
    let n = Number(digits[i])
    if (i % 2 === 1) {
      n *= 2
      if (n > 9) n -= 9
    }
    sum += n
  }
  return sum % 10 === 0
}


export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const navigate = useNavigate()
  const [role, setRole] = useState<"Manant" | "Partner">("Manant")
  const [name, setName] = useState("")
  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [siren, setSiren] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const sirenInvalid = siren.length === 9 && !isValidSiren(siren)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.")
      return
    }

    if (role === "Partner" && !isValidSiren(siren)) {
      setError("Le SIREN saisi n'est pas valide.")
      return
    }

    setLoading(true)

    try {
      await api<AuthResponse>("/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mail,
          name,
          password,
          role,
        }),
      })

      navigate("/login")
    } catch {
      setError("Impossible de créer le compte. Vérifiez vos informations.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">Vous êtes</FieldLegend>
              <div className="grid grid-cols-2 gap-3">
                <FieldLabel
                  htmlFor="role-Manant"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-Manant"
                      type="radio"
                      name="role"
                      value="Manant"
                      defaultChecked
                      checked={role === "Manant"}
                      onChange={() => setRole("Manant")}
                      required
                      className="size-4 accent-primary"
                    />
                    <FieldContent>
                      <FieldTitle>Employé</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel
                  htmlFor="role-Partner"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-Partner"
                      type="radio"
                      name="role"
                      value="Partner"
                      checked={role === "Partner"}
                      onChange={() => setRole("Partner")}
                      required
                      className="size-4 accent-primary"
                    />
                    <FieldContent>
                      <FieldTitle>Partenaire</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </div>
            </FieldSet>
            {role === "Partner" && (
              <Field>
                <FieldLabel htmlFor="siren">SIREN</FieldLabel>
                <Input
                  id="siren"
                  type="text"
                  inputMode="numeric"
                  autoComplete="off"
                  placeholder="123456789"
                  maxLength={9}
                  value={siren}
                  onChange={(e) =>
                    setSiren(e.target.value.replace(/\D/g, "").slice(0, 9))
                  }
                  aria-invalid={sirenInvalid}
                  required
                />
                {sirenInvalid ? (
                  <FieldError>Le SIREN saisi n&apos;est pas valide.</FieldError>
                ) : (
                  <FieldDescription>
                    Numéro SIREN à 9 chiffres de votre entreprise.
                  </FieldDescription>
                )}
              </Field>
            )}
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input
                id="name"
                type="text"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={mail}
                onChange={(e) => setMail(e.target.value)}
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            {error && <FieldError>{error}</FieldError>}
            <FieldGroup>
              <Field>
                <Button type="submit" disabled={loading}>
                  {loading ? "Création…" : "Create Account"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link to="/login" className="underline font-medium text-primary">
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
