import { type Config } from "drizzle-kit";

import { env } from "~/env";
console.log("🚀 ~ env:", env);
const url = env.DATABASE_URL;
console.log("🚀 ~ url:", url);

export default {
  schema: "./src/server/db/schema.ts",
  driver: "pg",
  dbCredentials: {
    connectionString: env.DATABASE_URL,
  },
  tablesFilter: ["aihr2_*"],
} satisfies Config;
