import { Kysely } from "kysely"
import type { DB } from "kysely-codegen"
import { PlanetScaleDialect } from "kysely-planetscale"

export default function db(env: Env) {
  return new Kysely<DB>({
    dialect: new PlanetScaleDialect({
      url: env.DATABASE_URL,
      useSharedConnection: true,
    }),
  })
}
