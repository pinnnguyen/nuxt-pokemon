import CredentialsProvider from 'next-auth/providers/credentials'
import { NuxtAuthHandler } from '#auth'
import { UserSchema } from '~/server/schema'

export default NuxtAuthHandler({
  // secret needed to run nuxt-auth in production mode (used to encrypt data)
  secret: process.env.NUXT_SECRET,
  callbacks: {
    session: async ({ session }) => {
      const u = await UserSchema.findOne({
        email: session?.user?.email,
      })

      if (u)
        (session as any).sid = u.sid

      return Promise.resolve(session)
    },
  },
  providers: [
    //    GithubProvider.default({
    //      clientId: process.env.GITHUB_CLIENT_ID,
    //      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    //    }),
    // FacebookProvider.de
    // @ts-expect-error Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    CredentialsProvider.default({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: any) {
        const u = await UserSchema.findOne({
          email: credentials?.username,
          password: credentials?.password,
        })

        if (u) {
          return {
            email: u.email,
            sid: u.sid,
          }
        }

        else { return null }
      },
    }),
  ],
})
