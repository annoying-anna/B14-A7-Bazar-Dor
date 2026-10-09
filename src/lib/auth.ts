import { betterAuth } from "better-auth";

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "demo_google_id",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "demo_google_secret",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "demo_github_id",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "demo_github_secret",
    },
  },
});
