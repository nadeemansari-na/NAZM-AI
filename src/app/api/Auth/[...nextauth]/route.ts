import { Next_Auth } from "@/lib/auth";
import NextAuth from "next-auth";

const handler = NextAuth(Next_Auth);

export { handler as GET, handler as POST };