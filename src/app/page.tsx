import Content from "@/components/Content";

export default function Home() {
  return (
    <main className="min-h-screen bg-neutral-900">
      <div className="p-10">
        <div>
          <h1 className="text-3xl md:text-4xl font-semibold text-white">Gitmate</h1>
          <p className="text-md md:text-lg text-neutral-300 mt-5">Type your Github username and spot those who are not following you back.</p>
        </div>

        <div className="mt-10">
          <Content />
        </div>
      </div>
    </main>
  )
}
