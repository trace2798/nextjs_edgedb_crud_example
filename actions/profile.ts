import e, { createClient } from "@/dbschema/edgeql-js";
import { currentUser } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const client = createClient();

export async function getProfile(userId: string) {
  try {
    const profile = await e
      .select(e.Profile, (profile) => ({
        id: true,
        filter_single: e.op(profile.userId, "=", e.str(userId)),
      }))
      .run(client);
    if (profile) {
      return profile;
    } else {
      const user = await currentUser();
      const newProfile = e.insert(e.Profile, {
        userId: user?.id as string,
        name: user?.fullName as string,
        email: user?.emailAddresses[0]?.emailAddress as string,
        imageUrl: user?.imageUrl as string,
      });
      const result = await newProfile.run(client);
      return "Profile Created";
    }
  } catch (error) {
    return "Profile Action Error";
  }
}
