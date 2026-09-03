import { Link } from "react-router-dom"
import { buttonVariants } from "../components/ui/button"

export default function HomePage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 bg-muted p-6 text-center">
      <div className="flex flex-col gap-3">
        <h1 className="text-4xl font-bold tracking-tight">CartePro</h1>
        <p className="max-w-md text-muted-foreground">
          Votre carte de titres-restaurant dématérialisée. Consultez votre solde,
          payez chez nos partenaires et suivez vos transactions.
        </p>
      </div>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Link to="/login" className={buttonVariants()}>
          Se connecter
        </Link>
        <Link to="/signup" className={buttonVariants({ variant: "outline" })}>
          Créer un compte
        </Link>
      </div>
    </div>
  )
}
