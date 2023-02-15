import { Kysely } from "kysely"
import type { DB } from "kysely-codegen"
import { PlanetScaleDialect } from "kysely-planetscale"

export default function db(env: Env) {
  if (import.meta.env.DEV) {
    return new Kysely<DB>({
      dialect: new PlanetScaleDialect({
        url: process.env.DATABASE_URL,
      }),
    })
  }

  return new Kysely<DB>({
    dialect: new PlanetScaleDialect({
      url: env.DATABASE_URL,
      useSharedConnection: true,
    }),
  })
}
