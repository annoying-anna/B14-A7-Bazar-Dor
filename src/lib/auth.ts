import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { Pool } from "pg";

/**
 * Better Auth server instance.
 *
 * Database strategy
 * -----------------
 * 1. If `DATABASE_URL` (or `POSTGRES_URL`) is present, users, sessions and
 *    accounts are persisted in PostgreSQL through the Kysely adapter. This is
 *    what runs on Vercel when a Neon / Vercel Postgres / Supabase database is
 *    connected to the project.
 * 2. When no database is configured, Better Auth automatically uses its
 *    built-in in-memory store so the application still boots and works out of
 *    the box for local development and demos.
 *
 * `BETTER_AUTH_SECRET` must be a stable value in production, otherwise every
 * serverless instance would sign sessions with a different key.
 */
const databaseUrl = process.env.DATABASE_URL ?? process.env.POSTGRES_URL;

function createDatabase() {
  if (!databaseUrl) return undefined;

  const isLocal = databaseUrl.includes("localhost") || databaseUrl.includes("127.0.0.1");

  return new Pool({
    connectionString: databaseUrl,
    ssl: isLocal ? undefined : { rejectUnauthorized: false },
    max: 5,
  });
}

/**
 * Social providers are only registered when their credentials exist. This keeps
 * the app from redirecting users to a broken OAuth screen while still letting
 * the UI show the buttons (see `getSocialProviders`).
 */
function createSocialProviders() {
  const providers: Record<string, { clientId: string; clientSecret: string }> = {};

  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    providers.google = {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    };
  }

  if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
    providers.github = {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    };
  }

  return providers;
}

export const auth = betterAuth({
  appName: "বাজার দর",
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET ?? "bazardor-development-secret-change-me",
  database: createDatabase(),
  emailAndPassword: {
    enabled: true,
    // Requirement: after a successful sign up the user is sent to the sign in page.
    autoSignIn: false,
    minPasswordLength: 8,
  },
  socialProviders: createSocialProviders(),
  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    // The cookie cache is disabled so a name change (C3) and sign out are
    // reflected immediately instead of after the cached session expires.
    cookieCache: {
      enabled: false,
    },
  },
  // Required so Better Auth can set cookies from Server Actions / Route Handlers.
  plugins: [nextCookies()],
});
