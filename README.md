# Heirarch Square

<i>
Heirarch Square is an e-commerce site built with Next.js and PostgreSQL
</i>
<br/><br/>

Deployed URL: [heirarch-square.vercel.app](https://heirarch-square.vercel.app)

![homepage](public/homepage-screenshot.png)

## Getting Started


First, create a `.env` file in the root directory of the project and set the following environment variables.

```shell
# a secret for NextAuth, can be generated using https://generate-secret.vercel.app/32

AUTH_SECRET=
AUTH_TRUST_HOST=true
NEXTAUTH_URL=http://localhost:3000

# postgres database connection string

DATABASE_URL=
```

Then, run the development server:

```bash
pnpm install
pnpm prisma migrate deploy
pnpm prisma generate
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

Visit [http://localhost:3000/seed](http://localhost:3000/seed) to seed the database.

