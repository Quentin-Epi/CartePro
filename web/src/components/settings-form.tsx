import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../components/ui/button";
import { Field, FieldLabel } from "../components/ui/field";
import { Input } from "../components/ui/input";
import { Toaster } from "../components/ui/sonner";
import { Trash2 } from "lucide-react";
import { type AuthUser, getToken } from "../auth";
import { api } from "../api"
import { hashPassword } from "../lib/hash";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import "../assets/css/global.css";

// const DELETE_CONFIRM = "Supprimer mon compte";

async function updatePassword(newPassword: string) {
  // hashed password
  try {
    const hashedPassword = await hashPassword(newPassword);
    await api<AuthUser>("/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": String(getToken()) },
      body: JSON.stringify({ password: hashedPassword }),
    });
  } catch (error) {
    console.error("Error while updating password:", error);
  }
}

async function updateProfile(username: string, email: string) {
  try {
    await api<AuthUser>("/user", {
      method: "PATCH",
      headers: { "Content-Type": "application/json", "Authorization": String(getToken()) },
      body: JSON.stringify({ name: username, mail: email }),
    });
  } catch (error) {
    throw new Error(`Error while updating profile: ${error}`);
  }
}

// async function deleteProfile() {
//   try {
//     await api<AuthUser>("/user", {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json", "Authorization": String(getToken()) },
//     });
//   } catch (error) {
//     throw new Error(`Error while deleting profile: ${error}`);
//   }
// }

const SettingsForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const saveProfile = async () => {
    if (newPassword == confirmPassword) {
      try {
        await updateProfile(username, email);
        toast.success("Profil mise à jour");
      } catch (error) {
        console.error(error);
        toast.error("Impossible de mettre à jour le profil");
      }
    } else
      toast.error("Erreur confirmation du mot passe");
  };

  const savePassword = async () => {
    try {
      await updatePassword(newPassword);
      toast.success("Mot de passe mise à jour");
    } catch {
      toast.error("Impossible de mettre à jour le mot de passe");
    }
  };

  // const deleteAccount = async (deleteConfirm: string) => {
  //   if (deleteConfirm == DELETE_CONFIRM) {
  //     try {
  //       await deleteProfile();
  //       toast.success("Compte supprimé");
  //     } catch {
  //       toast.error("Impossible de supprimer le compte");
  //     }
  //   } else {
  //     toast.error("Vérification de suppression échouée")
  //   };
  // }

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
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
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
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
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
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full"
              />
            </Field>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end">
          <Button onClick={savePassword}>
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
