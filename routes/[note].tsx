import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CSS, render } from "gfm";

import { kv } from "lib/kv.ts";

export const handler: Handlers<string> = {
  async GET(req, ctx) {
    // If the request is coming from a bot, render a 404 (and prevent the note from being deleted)
    if (req.headers.get("user-agent")?.toLowerCase().includes("bot")) {
      return ctx.renderNotFound();
    }

    // Get the note from KV
    const text = await kv.get<string>(["notes", ctx.params.note]);

    // If the note doesn't exist, render a 404
    if (!text.value) {
      return ctx.renderNotFound();
    }

    // Delete the note
    await kv.delete(["notes", ctx.params.note]);

    // Render the note
    return ctx.render(text.value);
  },
};

export default function Page({ data }: PageProps<string>) {
  return (
    <>
      <Head>
        <title>Invisible</title>
        <style dangerouslySetInnerHTML={{ __html: CSS }} />
      </Head>
      <div
        class="p-4 rounded border border-2 my-4 mx-auto max-w-screen-md markdown-body"
        dangerouslySetInnerHTML={{ __html: render(data) }}
      />
    </>
  );
}
