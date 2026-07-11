import { signOut } from "next-auth/react";

await signOut({
  callbackUrl: "/login",
});