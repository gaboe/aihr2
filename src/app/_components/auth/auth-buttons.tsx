"use client";

import { signIn } from "next-auth/react";
import { Button } from "~/components/ui/button";

export function AuthButtons() {
  return (
    <Button
      onClick={() =>
        signIn("google", {
          callbackUrl: "/dashboard",
        })
      }
    >
      Vstoupit do aplikace
    </Button>
  );
}
