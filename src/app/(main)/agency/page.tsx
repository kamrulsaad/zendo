import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const authUser = await currentUser();
  if (!authUser) {
    return redirect("/sign-in");
  }

  // get the user's details
  return <div>Agency Dashboard</div>;
};

export default Page;
