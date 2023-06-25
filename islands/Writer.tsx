import { useState } from "preact/hooks";

export default function Writer() {
  const [copied, setCopied] = useState(false);

  return (
    <div class="flex flex-col gap-2 flex-grow">
      <button
        onClick={() => {
          const textArea = document.getElementById(
            "text",
          )! as HTMLTextAreaElement;

          // Call the /api/publish endpoint
          fetch("/api/publish", {
            method: "POST",
            body: textArea.value,
          }).then((res) => res.text())
            .then((res) => {
              navigator.clipboard.writeText(window.location.origin + "/" + res);
              setCopied(true);
            });
        }}
        class="bg-blue-200 hover:bg-blue-300 text-blue-800 rounded py-2 px-4"
      >
        {copied ? "Copied!" : "Copy Link"}
      </button>
      <textarea
        id="text"
        placeholder={"Your message here (we support full GFM markdown)\n\n# Example title\n\nLet me tell you a story. When I was a young child, I..."}
        class="w-full border border-2 p-2 rounded flex-grow"
      >
      </textarea>
    </div>
  );
}
