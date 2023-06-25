/// <reference lib="deno.unstable" />

import { Handlers } from "$fresh/server.ts";
import { kv } from "lib/kv.ts";

export const handler: Handlers = {
  async POST(req) {
    // Get the text from the request
    const text = await req.text();

    // Generate random string using crypto api
    const id = crypto.getRandomValues(new Uint8Array(16)).join("");

    // Store the note in KV
    await kv.set(["notes", id], text);

    return new Response(id);
  },
};
