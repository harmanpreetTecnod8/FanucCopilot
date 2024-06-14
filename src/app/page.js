import Link from "next/link";

export default function Home() {
  return (
    <main className="w-screen h-screen flex justify-center items-center flex-col ">
      <h1>ARSR Copilot Landing page</h1>
      <div className="underline text-blue-600">

      <Link href={`/profile`}>Goto Copilot</Link>
      </div>
    </main>
  );
}
