import { Kysely } from "kysely"
import { PlanetScaleDialect } from "kysely-planetscale"
import { Database } from "~/types/db"

export default function db(env: Env) {
  if (import.meta.env.DEV) {
    return new Kysely<Database>({
      dialect: new PlanetScaleDialect({
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      }),
    })
  }

  return new Kysely<Database>({
    dialect: new PlanetScaleDialect({
      host: env.DATABASE_HOST,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
    }),
  })
}
