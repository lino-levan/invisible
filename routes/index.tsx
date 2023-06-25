import { Head } from "$fresh/runtime.ts";
import Writer from "../islands/Writer.tsx";

export default function Home() {
  return (
    <>
      <Head>
        <title>Invisible</title>
      </Head>
      <div class="p-4 mx-auto max-w-screen-md min-h-screen flex flex-col gap-2">
        <h1 class="text-4xl font-bold">Invisible Ink</h1>
        <p>
          Need to send a one time message to someone? Boy have you found the
          right place. Write a message using the box below and copy the link.
          Once the link is opened, all data will be deleted and it will become
          inaccessible.
        </p>
        <Writer />
      </div>
    </>
  );
}
