import { Menu } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex h-20 w-full items-center px-4 sm:px-6 lg:px-8">
        
        {/* Logo + Navigation */}
        <div className="flex items-center">
          
          {/* Logo */}
          <a className="block shrink-0 text-teal-600" href="#">
            <img src="/image.png" alt=""
                className="w-15 h-15" />
          </a>

          {/* Navigation desktop */}
          <nav
            aria-label="Global"
            className="ml-10 hidden md:block"
          >
            <ul className="flex items-center gap-10 text-xl">
              <li>
                <a
                  className="text-gray-500 transition hover:text-blue-500/75"
                  href="#"
                >
                  Wallet
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-blue-500/75"
                  href="#"
                >
                  Payment
                </a>
              </li>

              <li>
                <a
                  className="text-gray-500 transition hover:text-blue-500/75"
                  href="#"
                >
                  Settings
                </a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Right side */}
        <div className="ml-auto flex items-center gap-4">

          {/* Account + User Name */}
          <div className="hidden items-center gap-4 sm:flex">
            <a
              className="block rounded-md bg-teal-600 px-5 py-2.5 text-xl font-medium text-white transition hover:bg-teal-700"
              href="#"
            >
              Account
            </a>

            <span className="px-2 py-2.5 text-xl font-medium text-teal-600">
              User Name
            </span>
          </div>

          {/* Mobile menu */}
          <Sheet>
            <SheetTrigger asChild>
              <button
                className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-100 text-gray-600 transition hover:bg-gray-200 md:hidden"
                aria-label="Ouvrir le menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-full bg-white sm:max-w-sm"
            >
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>

              <nav className="ml-4 mt-8 flex flex-col gap-6 text-lg">
                <a href="/">Accueil</a>
                <a href="/services">Services</a>
                <a href="/tarifs">Tarifs</a>
                <a href="/contact">Contact</a>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
