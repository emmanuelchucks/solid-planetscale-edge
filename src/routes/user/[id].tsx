import { For } from "solid-js"
import { A, useParams } from "solid-start"
import { createServerData$ } from "solid-start/server"
import db from "~/lib/db"

export default function User() {
  const params = useParams<{ id: string }>()
  const posts = createServerData$(
    async ([, id], { env }) =>
      await db(env)
        .selectFrom("Post")
        .innerJoin("User", "User.id", "authorId")
        .select(["title", "content", "User.name as authorName"])
        .where("authorId", "=", Number(id))
        .execute(),
    {
      key: () => ["user", params.id],
    }
  )

  return (
    <main>
      <div class="flex items-baseline justify-between">
        <h1 class="text-3xl font-bold">{posts()?.[0].authorName}</h1>
        <A
          href="/post/add"
          class="rounded-md bg-gray-200 px-4 transition-colors hover:bg-gray-300"
        >
          Add
        </A>
      </div>
      <ul class="my-8 space-y-4 text-gray-700">
        <For each={posts()}>
          {(post) => (
            <li>
              <p class="font-semibold">{post.title}</p>
              <p class="text-gray-500">{post.content}</p>
            </li>
          )}
        </For>
      </ul>
    </main>
  )
}
