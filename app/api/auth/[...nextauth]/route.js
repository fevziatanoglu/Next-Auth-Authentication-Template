import { connectMongoDB } from "@/lib/connectMongodb.js";
// import User from "@/models/user";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/user";

export const authOptions = {
    providers: [
        // provider 1 credentials
        CredentialsProvider({
            name: "credentials",
            credentials: {
                email: {
                    label: "email",
                    type: "text"
                },
                password: {
                    label: "Password",
                    type: "password"
                }
            },
            // provider's auth function 
            async authorize(credentials) {
                try {
                    await connectMongoDB();
                    const { email, password } = credentials;

                    const user = await User.findOne({ email });

                    if (!user) {
                        throw new Error("Wrong Password or email");
                        return null;
                    }
                    const passwordsMatch = await bcrypt.compare(password, user.password);
                    if (!passwordsMatch) {
                        throw new Error("Wrong Password or email");
                    }
                    return user;


                } catch (e) {
                    throw new Error(e.message || e);
                }
            },

        }),
        // you can add credentials 2 here (google,github etc)
    ],
    callbacks: {
		async jwt({ token, user }) {
			user && (token.user = user);
			return token;
		},
		async session({ session, token }) {
			// Send properties to the client, like an access_token and user id from a provider.
			session.user = token.user;
			return session;
		},
        authorized({ req , token }) {
            if(token) return true // If there is a token, the user is authenticated
          }
	},  
    // options
    session: {
        strategy: "jwt",
        // Seconds - How long until an idle session expires and is no longer valid.
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours
      
    },
    secret: process.env.NEXTAUTH_SECRET,
    page: { signIn: "/" }
}


// export handler
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST }