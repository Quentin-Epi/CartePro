import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Toaster } from "../components/ui/sonner";
import { Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import "../assets/css/global.css";

const SettingsForm = () => {
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const saveProfile = () => {
    toast.success("Profile updated successfully");
  };

  const updatePassword = () => {
    toast.success("Password updated successfully");
  };

  return (
    <div className="flex w-full max-w-3xl flex-col items-center justify-center gap-6">
        <h1 className="text-5xl">Paramètres</h1>
      <Toaster position="top-right" />

      {/* ---------------- Profile ---------------- */}
      <Card className="w-full gap-0 animate-card-in">
        <CardHeader className="gap-1 border-b border-border">
          <CardTitle className="text-base font-medium">
            Profil
          </CardTitle>

          <CardDescription>
            Mettre à jour les données personnelles de compte.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex w-full flex-col gap-6 py-6">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="w-full gap-1.5">
              <FieldLabel
                htmlFor="username"
                className="text-sm font-normal text-muted-foreground"
              >
                Nom d'utilisateur
              </FieldLabel>

              <Input
                id="username"
                placeholder="Username"
                className="w-full"
              />
            </Field>

            <Field className="w-full gap-1.5">
              <FieldLabel
                htmlFor="email"
                className="text-sm font-normal text-muted-foreground"
              >
                Email
              </FieldLabel>

              <Input
                id="email"
                type="email"
                placeholder="exemple@gmail.com"
                className="w-full"
              />
            </Field>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm">
            Crée le: JJ MM, AAAA
          </p>

          <div className="flex items-center gap-3">
            <Button variant="destructive">
              Annuler
            </Button>

            <Button onClick={saveProfile}>
              Sauvegarder
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* ---------------- Password & Security ---------------- */}
      <Card className="w-full gap-0 animate-card-in" >
        <CardHeader className="gap-1 border-b border-border">
          <CardTitle className="text-base font-medium">
            Mot de passe
          </CardTitle>

          <CardDescription>
            Changer votre mot de passe.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex w-full flex-col gap-6 py-6">
          <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="w-full gap-1.5">
              <FieldLabel
                htmlFor="current-password"
                className="text-sm font-normal text-muted-foreground"
              >
                Mot de passe actuel
              </FieldLabel>

              <Input
                id="current-password"
                type="password"
                placeholder="••••••••"
                className="w-full"
              />
            </Field>

            <div className="hidden sm:block" />

            <Field className="w-full gap-1.5">
              <FieldLabel
                htmlFor="new-password"
                className="text-sm font-normal text-muted-foreground"
              >
                Nouveau mot de passe
              </FieldLabel>

              <Input
                id="new-password"
                type="password"
                placeholder="••••••••"
                className="w-full"
              />
            </Field>

            <Field className="w-full gap-1.5">
              <FieldLabel
                htmlFor="confirm-password"
                className="text-sm font-normal text-muted-foreground"
              >
                Confirmer le nouveau mot de passe
              </FieldLabel>

              <Input
                id="confirm-password"
                type="password"
                placeholder="••••••••"
                className="w-full"
              />
            </Field>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={updatePassword}>
            Mettre à jour
          </Button>
        </CardFooter>
      </Card>

      {/* ---------------- Danger Zone ---------------- */}
      <Card className="w-full gap-0 border border-red-500 animate-card-in">
        <CardHeader className="gap-1 border-b border-red-600">
          <CardTitle className="text-base font-medium text-destructive">
            Zone Danger
          </CardTitle>

          <CardDescription>
            Supprimer votre compte, supprimera toutes vos données.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex w-full flex-col gap-3 py-6">
          <Field className="w-full gap-2">
            <FieldLabel htmlFor="delete-confirm" className="text-sm font-normal text-muted-foreground">
              Écrivez{" "}
              <span className="font-medium text-foreground">
                Supprimer mon compte
              </span>{" "}
              pour confirmer
            </FieldLabel>

            <Input
              id="delete-confirm"
              value={deleteConfirm}
              onChange={(e) => setDeleteConfirm(e.target.value)}
              placeholder="delete my account"
              className="w-full"
            />
          </Field>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button
            variant="destructive"
            disabled={deleteConfirm !== "delete my account"}
            className="gap-1.5"
            onClick={() =>
              toast.success("Account deletion scheduled")
            }
          >
            <Trash2 className="size-3.5" />
            Delete account
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SettingsForm;
