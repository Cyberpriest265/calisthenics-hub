import { defineConfig } from "prisma/config";

// In production (Render/Railway), DATABASE_URL is injected as an env var.
// In local dev, it is loaded from .env by NestJS/dotenv.
export default defineConfig({
  schema: "prisma/schema.prisma",
  migrate: {
    async adapter(env: NodeJS.ProcessEnv) {
      // Dynamic import to avoid bundling issues
      const { Pool } = await import("pg");
      const { PrismaPg } = await import("@prisma/adapter-pg");
      const pool = new Pool({ connectionString: env["DATABASE_URL"] });
      return new PrismaPg(pool);
    },
  },
});
