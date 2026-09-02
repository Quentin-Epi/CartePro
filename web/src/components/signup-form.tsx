import { Link } from "react-router-dom"
import { Button } from "../components/ui/button"
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
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "../components/ui/field"
import { Input } from "../components/ui/input"

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Create an account</CardTitle>
        <CardDescription>
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <FieldSet>
              <FieldLegend variant="label">Vous êtes</FieldLegend>
              <div className="grid grid-cols-2 gap-3">
                <FieldLabel
                  htmlFor="role-employee"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-employee"
                      type="radio"
                      name="role"
                      value="employee"
                      defaultChecked
                      required
                      className="size-4 accent-primary"
                    />
                    <FieldContent>
                      <FieldTitle>Employé</FieldTitle>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel
                  htmlFor="role-partner"
                  className="has-[:checked]:border-primary/40 has-[:checked]:bg-primary/5"
                >
                  <Field orientation="horizontal">
                    <input
                      id="role-partner"
                      type="radio"
                      name="role"
                      value="partner"
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
            <Field>
              <FieldLabel htmlFor="name">Full Name</FieldLabel>
              <Input id="name" type="text" placeholder="John Doe" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="m..example.com"
                required
              />
              <FieldDescription>
                We&apos;ll use this to contact you. We will not share your email
                with anyone else.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Must be at least 8 characters long.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Confirm Password
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>Please confirm your password.</FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Create Account</Button>
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
