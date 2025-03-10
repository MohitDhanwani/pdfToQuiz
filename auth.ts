import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import db from "@/app/db"
 
export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],

  callbacks: {
    async signIn({user, account, email, profile, credentials}) {

      if(account?.provider === 'google'){
        const email = user.email;

        if(!email) {
          return false;
        }

        const userDb = await db.user.findFirst({
          where:{
            userEmail: email
          }
        })

        if(userDb) {
          return true;
        }

        await db.user.create({
          data:{
            userEmail: email,
            userName: user.name ?? "",

          }
        });

        return true;
      }
      else{
          return false;
      }
    }
  }
})