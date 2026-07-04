import { randomUUID } from "crypto";
import { NextRequest } from "next/server";
import Stripe from "stripe";

export const CREDIT_PACKS = {
  starter: { id: "starter", name: "Starter Pack", credits: 5, unitAmount: 500 },
  popular: { id: "popular", name: "Family Pack", credits: 12, unitAmount: 1000 },
  classroom: { id: "classroom", name: "Classroom Pack", credits: 30, unitAmount: 2000 },
} as const;

export type CreditPackId = keyof typeof CREDIT_PACKS;

export function getStripeClient() {
  const secretKey = process.env.STRIPE_SECRET_KEY;

  if (!secretKey) {
    throw new Error("Missing STRIPE_SECRET_KEY");
  }

  return new Stripe(secretKey);
}

export function isLocalUrl(url: string) {
  return /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/i.test(url);
}

export function getBaseUrl(req: NextRequest) {
  const requestOrigin = req.nextUrl.origin.replace(/\/$/, "");
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");

  if (!configuredUrl) {
    return requestOrigin;
  }

  if (isLocalUrl(configuredUrl) && !isLocalUrl(requestOrigin)) {
    return requestOrigin;
  }

  return configuredUrl;
}

export function createAccessToken() {
  return randomUUID().replace(/-/g, "");
}
