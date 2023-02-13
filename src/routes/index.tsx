import { For } from "solid-js"
import { A } from "solid-start"
import { createServerData$ } from "solid-start/server"
import prisma from "~/lib/prisma"

export default function Home() {
  const users = createServerData$(async () => {
    return await prisma.user.findMany()
  })

  return (
    <main>
      <h1 class="text-3xl font-bold">Users</h1>
      <ul class="my-8 text-gray-700">
        <For each={users()}>
          {(user) => (
            <li>
              <A
                href={`user/${user.id}`}
                class="block rounded-md bg-gray-50 p-4 transition-colors hover:bg-gray-100"
              >
                <p class="font-semibold">{user.name}</p>
                <p class="text-gray-500">{user.email}</p>
              </A>
            </li>
          )}
        </For>
      </ul>
    </main>
  )
}
