import { createServerAction$, redirect } from "solid-start/server"
import prisma from "~/lib/prisma"

const titleLength = 20
const contentLength = 180

export default function AddPost() {
  const [enrolling, { Form }] = createServerAction$(
    async (formData: FormData) => {
      const title = formData.get("title") as string
      const content = formData.get("content") as string
      if (!title) throw "Title is required"
      if (title.length > titleLength) throw "Title is too long"
      if (content.length > contentLength) throw "Content is too long"
      await prisma.post.create({
        data: {
          title,
          content,
          authorId: 1,
        },
      })
      return redirect("/user/1")
    }
  )

  return (
    <main>
      <div class="flex items-baseline justify-between">
        <h1 class="text-3xl font-bold">Add Post</h1>
        <p class="text-sm text-red-600">{enrolling.error}</p>
      </div>
      <Form class="my-8 grid gap-y-4 text-gray-700">
        <div class="grid gap-y-2">
          <label for="title" class="font-semibold">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            maxLength={titleLength}
            class="rounded-md bg-gray-50 px-4 py-2"
          />
        </div>
        <div class="grid gap-y-2">
          <label for="content" class="font-semibold">
            Content
          </label>
          <textarea
            id="content"
            name="content"
            maxLength={contentLength}
            class="rounded-md bg-gray-50 px-4 py-2"
          />
        </div>
        <button
          type="submit"
          disabled={enrolling.pending}
          class="mt-2 self-end rounded-md bg-gray-600 px-4 py-2 text-gray-50 transition-colors hover:bg-gray-500"
        >
          Submit
        </button>
      </Form>
    </main>
  )
}
