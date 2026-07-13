import  CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import bcrypt from "bcrypt";
import {env} from "@/lib/env"
import prisma from "@/lib/prisma"
import { NextAuthOptions } from "next-auth";
console.log("google",env.GOOGLE_CLIENT_ID)
export const Next_Auth:NextAuthOptions={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"NAME",type:"text",placeholder:'Name'},
                email:{label:"EMAIL",type:"text",placeholder:'Email'},
                password:{label:"PASSWORD",type:"password",placeholder:'Password'}
            },
         async authorize(credentials:any) {
    const user = await prisma.user.findUnique(credentials.email);

    if (!user) {
        throw new Error("User not found");
    }

    const isValid = await bcrypt.compare(
        credentials.password,
        user.password
    );

    if (!isValid) {
        throw new Error("Invalid credentials");
    }

    return {
        id: user.id,
        name: user.name,
        email: user.email,
    };
}
            
        }),
        
        GoogleProvider({
            clientId: env.GOOGLE_CLIENT_ID || " ",
            clientSecret: env.GOOGLE_CLIENT_SECRET || " "
        }),
        GithubProvider({
            clientId: env.GITHUB_CLIENT_ID || "",
            clientSecret: env.GITHUB_CLIENT_SECRET || ""
        })
    ],
    secret: env.NEXTAUTH_SECRET,
    callbacks:{
        jwt({token ,user}:any){
            if(user){
                token.id=user.id,
                token.name=user.name
            }
            return token;
        },
        session:({session , token, user}:any)=>{
            if(session && session.user){
                session.user.id=token.id
                session.user.name=token.name
            }
            return session;
        }

    }
}