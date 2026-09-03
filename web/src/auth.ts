// Session utilisateur minimale : on stocke l'UID (+ infos publiques) renvoyé
// par /auth/login dans le localStorage et on s'en sert comme "token" pour
// rester connecté entre les visites.

export type AuthUser = {
  id: string
  mail: string
  name: string
  role?: string
}

const STORAGE_KEY = "cartepro.user"

export function getUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as AuthUser) : null
  } catch {
    return null
  }
}

export function setUser(user: AuthUser): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
  } catch {
  }
}

export function clearUser(): void {
  try {
    localStorage.removeItem(STORAGE_KEY)
  } catch {
  }
}

export function isLoggedIn(): boolean {
  return getUser() !== null
}
