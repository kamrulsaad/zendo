"use server";

import Stripe from "stripe";
import { db } from "../db";
import { stripe } from ".";

export const subscriptionCreated = async (
  subscription: Stripe.Subscription,
  customerId: string
) => {
  try {
    const agency = await db.agency.findFirst({
      where: {
        customerId,
      },
      include: {
        SubAccount: true,
      },
    });
    if (!agency) {
      throw new Error("Could not find and agency to Update the subscription");
    }

    const data = {
      active: subscription.status === "active",
      agencyId: agency.id,
      customerId,
      currentPeriodEndDate: new Date(subscription.current_period_end * 1000),
      //@ts-ignore
      priceId: subscription.plan.id,
      subscritiptionId: subscription.id,
      //@ts-ignore
      plan: subscription.plan.id,
    };

    const res = await db.subscription.upsert({
      where: {
        agencyId: agency.id,
      },
      create: data,
      update: data,
    });
    console.log(`🟢 Created Subscription for ${subscription.id}`);
  } catch (error) {
    console.log("🔴 Error from Create action", error);
  }
};

export const getConnectAccountProducts = async (stripeAccount: string) => {
  const products = await stripe.products.list(
    {
      limit: 50,
      active: false,
      expand: ["data.default_price"],
    },
    {
      stripeAccount,
    }
  );

  // const account = await stripe.accounts.retrieve(stripeAccount);
  // console.log(account); // Should be "standard", "express", or "custom"

  return products.data;
};
