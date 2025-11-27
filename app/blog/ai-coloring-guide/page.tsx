export const metadata = {
  title: "How to Write Great Prompts for AI Coloring Pages (Beginner Guide)",
  description:
    "Learn how to write clear, simple prompts that generate high-quality, kid-friendly printable coloring pages using AI.",
};

export default function AIPromptGuidePost() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">
        How to Write Great Prompts for AI Coloring Pages (Beginner Guide)
      </h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        Writing prompts for AI coloring pages is easier than you think — and the
        better your prompt, the better your artwork turns out. Whether you want
        super cute animals, magical fantasy scenes, or clean printable pages for
        classroom use, this beginner-friendly guide will help you create clear
        prompts that produce consistent results.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Why Prompt Quality Matters
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        AI images are generated based on the instructions you provide. A clear,
        descriptive prompt helps the system understand:
      </p>
      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Who or what the coloring page should feature</li>
        <li>The pose or action the character is doing</li>
        <li>Where the scene is taking place</li>
        <li>The mood or style you want</li>
        <li>Complexity (simple, detailed, cute, playful, etc.)</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        With a strong prompt, you’ll get clean line art with no cut-off edges,
        no borders, and clear printable quality — exactly what kids need for
        coloring.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        The Simple 4-Part Prompt Formula
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        A great coloring-page prompt includes:
      </p>

      <ol className="list-decimal pl-6 text-gray-700 space-y-3 mb-10">
        <li>
          <strong>Subject:</strong> Who/what is in the picture
        </li>
        <li>
          <strong>Action:</strong> What they are doing
        </li>
        <li>
          <strong>Setting:</strong> Where it takes place
        </li>
        <li>
          <strong>Style:</strong> Simple, cute, printable line-art, etc.
        </li>
      </ol>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Example Prompts Using the Formula
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Here are prompts that work especially well with PaziPagesAI:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>
          <strong>Animals:</strong> “A cute baby bunny holding a flower while
          sitting in a garden — simple black-and-white coloring page line art”
        </li>
        <li>
          <strong>Dinosaurs:</strong> “A friendly baby T-rex riding a scooter in
          a park — clean outline, kid-friendly printable page”
        </li>
        <li>
          <strong>Fantasy:</strong> “A small dragon blowing bubbles inside a
          castle — simple bold lines, no shading”
        </li>
        <li>
          <strong>Space:</strong> “A child astronaut waving from the moon with a
          smiling rocket nearby — uncluttered line-art for coloring”
        </li>
        <li>
          <strong>Food Characters:</strong> “A happy slice of pizza wearing
          sunglasses — cute simple coloring page style”
        </li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Tips for Creating Clean Coloring-Page Style
      </h2>

      <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-10">
        <li>Avoid shading, gradients, or complex lighting</li>
        <li>Use phrases like “line art,” “outline,” or “simple black and white”</li>
        <li>Keep the scene simple — kids need clear spaces to color</li>
        <li>Specify “no borders” or “no cutoff edges” if needed</li>
        <li>Add a mood: cute, playful, friendly, happy, etc.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Prompts to Avoid (Common Mistakes)
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Avoid prompts that may produce cluttered or busy scenes:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-10">
        <li>Too many characters in one image</li>
        <li>Highly detailed backgrounds</li>
        <li>Requests for realistic shading or textures</li>
        <li>Scenes with excessive motion or perspective</li>
        <li>Very long prompts with unrelated items</li>
      </ul>

      <h2 className="text-3xl font-bold mt-10 mb-4">
        Try Your Own Coloring Page Prompt
      </h2>

      <p className="text-gray-700 leading-relaxed mb-8">
        Once you understand the basic formula, you can create an unlimited number
        of fun and imaginative coloring pages. Kids can describe their own ideas,
        and PaziPagesAI will turn them into printable artwork within seconds.
      </p>

      <p className="text-gray-700 leading-relaxed mb-10">
        Ready to start generating your own pages? Visit the{" "}
        <a href="/generate" className="text-[#2563eb] underline">
          Generate Page
        </a>{" "}
        and try writing your first prompt!
      </p>

      <p className="text-gray-500 text-sm">
        Last Updated: {new Date().getFullYear()}
      </p>
    </main>
  );
}
