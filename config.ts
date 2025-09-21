/** @format */

import themes from "daisyui/src/theming/themes";
import { ConfigProps } from "./types/config";

const config = {
  // REQUIRED
  appName: "AIPM - AI Scrum Master",
  // REQUIRED: a short description of your app for SEO tags (can be overwritten)
  appDescription: "AI Scrum Master | AI Project Manager ",
  // REQUIRED (no https://, not trialing slash at the end, just the naked domain)
  domainName: "getaipm.com",
  crisp: {
    // Crisp website ID. IF YOU DON'T USE CRISP: just remove this => Then add a support email in this config file (mailgun.supportEmail) otherwise customer support won't work.
    id: "",
    // Hide Crisp by default, except on route "/". Crisp is toggled with <ButtonSupport/>. If you want to show Crisp on every routes, just remove this below
    onlyShowOnRoutes: ["/"],
  },
  ScrumMasterProvider: {
    // Switch between "elevenlabs" and "vapi" to change the AI provider
    // This setting is used for:
    // 1. Direct access to /scrum page
    // 2. Recall AI bot creation (automatically adds ?provider=xxx to webpage URL)
    provider: "vapi"
  },
  stripe: {
    // Create multiple plans in your Stripe dashboard, then add them here. You can add as many plans as you want, just make sure to add the priceId
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1Niyy5AxyNprDp7iZIqEyD2h"
            : "price_456",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "HOBBY",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others
        description: "Perfect to stat with basic features",
        // The price you want to display, the one user will be charged on Stripe.
        price: 19,
        // If you have an anchor price (i.e. $29) that you want to display crossed out, put it here. Otherwise, leave it empty
        priceAnchor: 29,

        features: [
          {
            name: "5 goals",
          },
          { name: "160 AI calls per month" },
          { name: "1 Phone number" },
          { name: "Basic reminder" },
          { name: "AI Follow-Up" },
          { name: "Auto-repeat (daily/weekly/monthly)" },
          { name: "Limited email support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "MASTER",
        description:
          "Serious about your life goals and want to build good habits",
        price: 49,
        priceAnchor: 69,
        features: [
          { name: "30 Goals" },
          { name: "800 AI Calls per Month" },
          // { name: 'Up to 3 Numbers (10 Goals Each)' },
          { name: "1 Phone number" },
          { name: "AI Follow-Up" },
          { name: "Premium Human-Like Voice" },
          { name: "Special Days Reminders (e.g., Birthday, Mother’s Day)" },
          { name: "Auto-Repeat (Daily/Weekly/Monthly/Yearly)" },
          // { name: 'Call-by-Call Summary' },
          { name: "Track Your Progress" },
          { name: "Priority Chat + Email Support" },
        ],
      },
      {
        priceId:
          process.env.NODE_ENV === "development"
            ? "price_1O5KtcAxyNprDp7iftKnrrpw"
            : "price_456",
        // This plan will look different on the pricing page, it will be highlighted. You can only have one plan with isFeatured: true
        isFeatured: true,
        name: "GOD",
        description: "Pay for 1 Year Plan and Get Lifetime Access",
        price: 199,
        priceAnchor: 829,
        features: [
          { name: "Unlimited Goals" },
          { name: "Unlimited calls per Month" },
          { name: "2 Phone number" },
          { name: "AI Follow-Up" },
          { name: "Ultra Realistic Human-Like Voice" },
          { name: "Special Days Reminders (e.g., Birthday, Mother’s Day)" },
          { name: "Auto-Repeat (Daily/Weekly/Monthly/Yearly)" },
          // { name: 'Call-by-Call Summary' },
          { name: "Track Your Progress" },
          { name: "Early Access to Upcoming Features" },
          { name: "Priority Call + Chat + Email Support" },
        ],
      },
    ],
  },

  lemonsqueezy: {
    // Create a product and add multiple variants via your Lemon Squeezy dashboard, then add them here. You can add as many plans as you want, just make sure to add the variantId.
    plans: [
      {
        // REQUIRED — we use this to find the plan in the webhook (for instance if you want to update the user's credits based on the plan)
        variantId: "562905",
        //  REQUIRED - Name of the plan, displayed on the pricing page
        name: "Success Plan",
        // A friendly description of the plan, displayed on the pricing page. Tip: explain why this plan and not others.
        description: "Perfect for small projects",
        // The price you want to display, the one user will be charged on Lemon Squeezy
        price: 39.99,
        // If you have an anchor price (i.e. $149) that you want to display crossed out, put it here. Otherwise, leave it empty.
        priceAnchor: 69.99,
        features: [
          { name: "NextJS boilerplate" },
          { name: "User oauth" },
          { name: "Database" },
          { name: "Emails" },
        ],
      },
    ],
  },
  aws: {
    // If you use AWS S3/Cloudfront, put values in here
    bucket: "bucket-name",
    bucketUrl: `https://bucket-name.s3.amazonaws.com/`,
    cdn: "https://cdn-id.cloudfront.net/",
  },
  mailgun: {
    // subdomain to use when sending emails, if you don't have a subdomain, just remove it. Highly recommended to have one (i.e. mg.yourdomain.com or mail.yourdomain.com)
    subdomain: "mg",
    // REQUIRED — Email 'From' field to be used when sending magic login links
    fromNoReply: `Sagar Jaid <sagar@getaipm.com>`,
    // REQUIRED — Email 'From' field to be used when sending other emails, like abandoned carts, updates etc..
    fromAdmin: `Sagar Jaid at VisaInterviewAI <sagar@getaipm.com>`,
    // Email shown to customer if need support. Leave empty if not needed => if empty, set up Crisp above, otherwise you won't be able to offer customer support."
    supportEmail: "sagar@getaipm.com",
    // When someone replies to supportEmail sent by the app, forward it to the email below (otherwise it's lost). If you set supportEmail to empty, this will be ignored.
    forwardRepliesTo: "sagar@getaipm.com",
  },
  colors: {
    // REQUIRED — The DaisyUI theme to use (added to the main layout.js). Leave blank for default (light & dark mode). If you any other theme than light/dark, you need to add it in config.tailwind.js in daisyui.themes.
    theme: "lofi",
    // REQUIRED — This color will be reflected on the whole app outside of the document (loading bar, Chrome tabs, etc..). By default it takes the primary color from your DaisyUI theme (make sure to update your the theme name after "data-theme=")
    // OR you can just do this to use a custom color: main: "#f37055". HEX only.
    main: "#000000",
  },
  auth: {
    // REQUIRED — the path to log in users. It's use to protect private routes (like /dashboard). It's used in apiClient (/libs/api.js) upon 401 errors from our API
    loginUrl: "/signin",
    // REQUIRED — the path you want to redirect users after successfull login (i.e. /dashboard, /private). This is normally a private page for users to manage their accounts. It's used in apiClient (/libs/api.js) upon 401 errors from our API & in ButtonSignin.js
    callbackUrl: "/pricing",
  },
} as ConfigProps;

export default config;
