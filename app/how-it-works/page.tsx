export const metadata = {
  title: "How It Works | PaziPagesAI",
  description:
    "Learn how PaziPagesAI turns your ideas into clean, kid-friendly, printable coloring pages using safe AI technology.",
};

export default function HowItWorksPage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-6">How It Works</h1>

      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI makes it easy to turn your ideas into fun, printable
        coloring pages. Whether you're a parent, teacher, therapist, or young
        artist, our platform provides safe, clean, kid-friendly illustrations
        created on demand. This page explains exactly how the process works,
        how to get the best results, and what you can expect when using the
        generator or browsing the gallery.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        1. Enter Your Idea as a Prompt
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        In the "Generate" section, you simply type what you want to see.
        Prompts can be simple or detailed, depending on your creativity.
        Examples include:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>"A happy dinosaur riding a scooter"</li>
        <li>"A cat baking cupcakes in a kitchen"</li>
        <li>"A robot watering flowers in a garden"</li>
        <li>"Two kids exploring outer space"</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        The more clear and specific your prompt, the easier it is for the system
        to generate a clean, print-ready coloring page.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        2. AI Generates the Coloring Page
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Once you submit your prompt, our AI model creates a black-and-white
        line-art illustration sized for standard 8.5×11” printing. Every image
        is processed within safe-content guidelines to stay appropriate for
        kids, classrooms, and families.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        3. Image Is Saved to the Gallery
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Each generated page is automatically added to the public gallery (unless
        filtered out for quality or safety). This allows other families and
        educators to enjoy the same creations and quickly find themed pages
        without needing to generate their own.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        4. Download or Print Instantly
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Once the illustration is generated, you can:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Download it as a PNG</li>
        <li>Print directly with our one-page optimized layout</li>
        <li>Save it to a device to use later</li>
        <li>Use it in classrooms, activities, or personal projects</li>
      </ul>

      <p className="text-gray-700 leading-relaxed mb-6">
        Images print without borders, headers, or unwanted margins, ensuring a
        smooth coloring experience.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        Tips for Better Results
      </h2>
      <p className="text-gray-700 leading-relaxed mb-4">
        Here are a few tips for making the most of the generator:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Use descriptive words like “cute,” “simple,” “friendly,” or “happy.”</li>
        <li>Add an action: “riding,” “playing,” “building,” “exploring.”</li>
        <li>Specify details like animals, themes, holidays, or settings.</li>
        <li>Keep prompts age-appropriate for the best kid-safe output.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">
        How We Keep It Safe
      </h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        PaziPagesAI uses filtering and review guidelines to avoid harmful,
        adult, violent, copyrighted, or inappropriate content. While no AI
        system is perfect, we actively improve our prompts and checks to keep
        the experience family-friendly and educational.
      </p>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Who Uses PaziPagesAI?</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        Our platform is used by:
      </p>

      <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-8">
        <li>Parents and families</li>
        <li>Teachers and homeschoolers</li>
        <li>Therapists and counselors</li>
        <li>After-school programs</li>
        <li>Children learning creativity and storytelling</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-10 mb-4">Questions?</h2>
      <p className="text-gray-700 leading-relaxed mb-6">
        If you ever have questions about how PaziPagesAI works, want help with a
        prompt, or need support, feel free to reach out anytime:
      </p>

      <p className="text-blue-600 font-medium text-lg break-all">
        support@pazipagesai.com
      </p>

      <p className="text-gray-500 text-sm mt-12">
        Last Updated: {new Date().getFullYear()}
      </p>
    </main>
  );
}
