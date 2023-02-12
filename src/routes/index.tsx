import { A } from "solid-start"

export default function Home() {
  return (
    <main class="mx-auto p-4 text-center text-gray-700">
      <A
        href="/dashboard"
        class="rounded-md bg-teal-600 px-4 py-2 font-medium text-white"
      >
        Go to dashboard
      </A>
    </main>
  )
}
