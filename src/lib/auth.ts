import  CredentialsProvider  from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"
import GithubProvider from "next-auth/providers/github"
import bcrypt from "bcrypt";
import prisma from "./prisma"
export const Next_Auth={
    providers:[
        CredentialsProvider({
            name:"Credentials",
            credentials:{
                username:{label:"NAME",type:"text",placeholder:'Name'},
                email:{label:"EMAIL",type:"text",placeholder:'Email'},
                password:{label:"PASSWORD",type:"password",placeholder:'Password'}
            },
         async authorize(credentials:any) {
    const user = await prisma.user.findFirst(credentials.email);

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
            clientId: process.env.GOOGLE_CLIENT_ID || " ",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || " "
        }),
        GithubProvider({
            clientId: process.env.GITHUB_ID || "",
            clientSecret: process.env.GITHUB_SECRET || ""
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
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
                session.user.id=token.sub
                session.user.name=token.name
            }
            return session;
        }

    }
}