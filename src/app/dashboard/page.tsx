import { Button } from "@/components/ui/button";

import AppLayout from "../_components/layouts/app-layout";

export default function Page() {
  return (
    <AppLayout>
      <div className="flex items-center">
        <h1 className="text-lg font-semibold md:text-2xl">Můj dashboard</h1>
      </div>
      <div
        className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
        x-chunk="dashboard-02-chunk-1"
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h3 className="text-2xl font-bold tracking-tight">
            Nastavte si Váš dashboard
          </h3>
          <p className="text-sm text-muted-foreground">
            Tuto sekci vyvíjíme, brzy bude dostupná.
          </p>
          <Button disabled className="mt-4">
            Nastavit
          </Button>
        </div>
      </div>
    </AppLayout>
  );
}
