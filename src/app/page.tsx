import { CalculatorIcon, BookAIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/components/ui/card";

import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { AuthButtons } from "./_components/auth/auth-buttons";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  console.log("🚀 ~ Home ~ hello:", hello);
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center  ">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Chytrá <span className="text-primary">HR</span>
        </h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle>Mzdové kalkulačky</CardTitle>
                <CardDescription>
                  Výpočty výše mezd, pohyblivých složek mzdy a odvodů.
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                <Link href={"/calculator"}>
                  <Button variant="secondary" className="px-3 shadow-none">
                    <CalculatorIcon className="mr-2 h-4 w-4" />
                    Zdarma
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
              <div className="space-y-1">
                <CardTitle>Zákoník práce</CardTitle>
                <CardDescription>
                  AI asistent pro vyhledávání v zákoníku práce.
                </CardDescription>
              </div>
              <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                <Link href={"/laws"}>
                  <Button variant="secondary" className="px-3 shadow-none">
                    <BookAIcon className="mr-2 h-4 w-4" />
                    Zdarma
                  </Button>
                </Link>
              </div>
            </CardHeader>
          </Card>
        </div>

        {!!session && (
          <Link href={"/dashboard"}>
            <Button>Přejít do aplikace jako {session.user?.name}</Button>
          </Link>
        )}

        {!session && <AuthButtons />}

        {/* <div className="flex flex-col items-center gap-2">
          <p className="text-2xl ">
            {hello ? hello.greeting : "Loading tRPC query..."}
          </p>

          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-center text-2xl ">
              {session && <span>Logged in as {session.user?.name}</span>}
            </p>
            <Link
              href={session ? "/api/auth/signout" : "/api/auth/signin"}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              {session ? "Sign out" : "Sign in"}
            </Link>
          </div>
        </div> */}
      </div>
    </main>
  );
}
