import React from "react";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getAuthUser } from "@/queries/auth";
import { getAgencyDetails } from "@/queries/agency";

import AgencyDetails from "@/components/forms/AgencyDetails";
import UserDetailsForm from "@/components/forms/UserDetails";
import { constructMetadata } from "@/lib/utils";

interface AgencySettingsPageProps {
  params: {
    agencyId: string | undefined;
  };
}

const AgencySettingsPage: React.FC<AgencySettingsPageProps> = async ({
  params,
}) => {
  const { agencyId } = params;
  const authUser = await currentUser();

  if (!authUser) redirect("/agency/sign-in");
  if (!agencyId) redirect("/agency/unauthorized");

  const userDetails = await getAuthUser(
    authUser.emailAddresses[0].emailAddress
  );

  if (!userDetails) redirect("/agency/sign-in");

  const agencyDetails = await getAgencyDetails(agencyId);

  if (!agencyDetails) redirect("/agency/unauthorized");

  const subAccounts = agencyDetails.subAccounts;

  return (
    <div className="flex flex-col gap-4 max-w-4xl w-full mx-auto">
      <AgencyDetails data={agencyDetails} />
      <UserDetailsForm
        type="agency"
        id={agencyId}
        subAccounts={subAccounts}
        userData={userDetails}
      />
    </div>
  );
};

export default AgencySettingsPage;

export const metadata = constructMetadata({
  title: "Settings - Zendo",
});
