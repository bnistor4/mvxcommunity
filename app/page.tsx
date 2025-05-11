import HomeClient from "@/src/components/home/HomeClient"

export async function generateStaticParams() {
  return []
}

export default function Home() {
  return <HomeClient />
}
