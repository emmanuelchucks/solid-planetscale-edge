import { Kysely } from "kysely"
import type { DB } from "kysely-codegen"
import { PlanetScaleDialect } from "kysely-planetscale"

export default function db(env: Env) {
  if (import.meta.env.DEV) {
    return new Kysely<DB>({
      dialect: new PlanetScaleDialect({
        host: process.env.DATABASE_HOST,
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
      }),
    })
  }

  return new Kysely<DB>({
    dialect: new PlanetScaleDialect({
      host: env.DATABASE_HOST,
      username: env.DATABASE_USERNAME,
      password: env.DATABASE_PASSWORD,
      useSharedConnection: true,
    }),
  })
}
