import { TAvatars } from "@/types/avatars";
import { TransactionTypeIds } from "../../db/seeders/transaction-types";
import type { TTestimonials } from "@/types/testiomonials";
import { TPricingPlans } from "@/types/pricing";
import { FeaturesOn } from "@/types/featured-on";
import { ProductHuntIcon } from "@/components/ui/icons/ProductHuntIcon";
import { HackerNewsIcon } from "@/components/ui/icons/HackerNewsIcon";
import { XIcon } from "@/components/ui/icons/XIcon";
import { RedditIcon } from "@/components/ui/icons/RedditIcon";
import { FeaturesApp } from "@/types/features-app";
import {
  BookIcon,
  BoxIcon,
  MailIcon,
  PhoneCallIcon,
  UserIcon,
} from "lucide-react";

export const trendEmojis = {
  up: "↗️",
  down: "↙️",
};

export const transactionTypeEmojis = {
  [TransactionTypeIds.Income]: "↗️",
  [TransactionTypeIds.Expense]: "↙️",
};

export const DEFAULT_LIMIT = 4;

export const INTIAL_STEP = 0;
export const MAX_AUTH_FORM_STEP = 1;

export const PASSWORD_VALIDATOR_SETTINGS = {
  min: 8,
};

export const AUTH_HEADER = "x-user-id";
export const I_DONT_HAVE_MONEY = 0;

export const operationsForTransactionTypes = {
  [TransactionTypeIds.Income]: (money: number, transaction: number) =>
    money + transaction,
  [TransactionTypeIds.Expense]: (money: number, transaction: number) =>
    money - transaction,
};

export const WatcherToggleSettings = {
  Active: "You have actived it! 😉",
  Inactive: "You dont active it yet 😔",
};

export const COOKIES = {
  NextAuthSession: "next-auth.session-token",
};

export const SettingsOptionsKeys = {
  IncomeGoal: "IncomeGoal",
  ExpenseLimit: "ExpenseLimit",
  ExpenseWatch: "ExpenseWatch",
};

export const Breakpoints = {
  phone: 768,
  tablet: 1024,
};

export const TestimonialsMocked: TTestimonials = [
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
    fullName: "John Smith",
    testimonial:
      "This money tracker app has completely transformed the way I manage my finances. The intuitive interface and powerful features make it incredibly easy to track my spending. I've been able to save more each month thanks to the insights it provides. Highly recommend!",
    rating: 4,
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
    fullName: "Emily Rosen",
    testimonial:
      "I've tried several budgeting apps, but this one stands out for its simplicity and effectiveness. It's helped me stay on top of my expenses without feeling overwhelmed. The notifications and reminders are a lifesaver. A must-have for anyone looking to get their finances in order!",
    rating: 5,
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
    fullName: "Michael Scott",
    testimonial:
      "This app is a game-changer! I love how it syncs across all my devices, and the detailed reports help me see exactly where my money is going. The app is user-friendly, and the customer support is fantastic. It's definitely worth every penny!",
    rating: 5,
  },
];

export const Avatars: TAvatars = [
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
  },
  {
    avatar: "/assets/avatar-sample.jpeg",
    fallbackName: "CN",
  },
];

export const PlansMocked: TPricingPlans = [
  {
    theme: "light",
    image: "/assets/free-plan.png",
    type: "Personal",
    price: "Free",
    description: "For people who are trying to use it as a hobby",
    callToActionText: "Get Started for Free",
    benefits: [
      "Up to 10 participants in an event at once",
      "Unlimited events",
      "Unlimited organizers",
      "Standard and advanced mathcing",
    ],
  },
  {
    theme: "dark",
    image: "/assets/premium-plan.png",
    type: "Premium",
    price: 5,
    description: "For people who are trying to use advanced features",
    callToActionText: "Get Started with Premium",
    benefits: [
      "Up to 10 participants in an event at once",
      "Unlimited events",
      "Unlimited organizers",
      "Standard and advanced mathcing",
    ],
  },
  {
    theme: "light",
    image: "/assets/company-plan.png",
    type: "Enterprise",
    price: "Coming Soon",
    description: "For companies that required something advanced",
    callToActionText: "Coming Soon",
    benefits: [
      "Up to 10 participants in an event at once",
      "Unlimited events",
      "Unlimited organizers",
      "Standard and advanced mathcing",
    ],
  },
];

export const FeaturedOnPlatforms: FeaturesOn = [
  {
    Icon: ProductHuntIcon,
    link: "https://www.producthunt.com/products/trigger-dev",
  },
  {
    Icon: HackerNewsIcon,
    link: "https://news.ycombinator.com/show",
  },
  {
    Icon: XIcon,
    link: "https://x.com/triggerdotdev",
  },
  {
    Icon: RedditIcon,
    link: "https://www.reddit.com/r/CFB/comments/1f7pthn/postgame_thread_boston_college_defeats_florida",
  },
];

export const FeaturesInTheApp: FeaturesApp = [
  {
    Icon: MailIcon,
    title: "Email Notifications",
    description:
      "Get alerted about upcoming bills, budget thresholds, and financial milestones, ensuring you're always in control.",
  },
  {
    Icon: BookIcon,
    title: "Goals and Expense Limits",
    description:
      "Lets you define goals and set expense limits, helping you stay focused and disciplined.",
  },
  {
    Icon: UserIcon,
    title: "Nice Experience",
    description:
      "Enjoy a visually appealing and user-friendly interface that makes tracking your finances a breeze",
  },
];
