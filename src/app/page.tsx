import Link from "next/link";
import PrimaryButton from "@/components/ui/primaryButton";
import PollCard from "@/components/homepage/poll-card";
import { ArrowRight, BarChart2, Users, MessageSquare, ChevronDown } from "lucide-react";
import { PollVisualization } from "@/components/homepage/poll-visual";

export default function Home() {
  const categories = [
    { name: "Politics", icon: "🏛️", description: "Weigh in on current political issues" },
    { name: "Gaming", icon: "🎮", description: "Vote on your favorite games and gaming topics" },
    { name: "Movies", icon: "🎬", description: "Rate films and share your opinions" },
    { name: "Technology", icon: "💻", description: "Discuss the latest tech trends" },
    { name: "Sports", icon: "⚽", description: "Vote on sports-related topics" },
    { name: "Music", icon: "🎵", description: "Share your music preferences" },
  ];

  const features = [
    {
      title: "Real-time Results",
      description: "See poll results update in real-time as the community votes",
      icon: <BarChart2 className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Community Insights",
      description: "Discover what others think about topics that matter to you",
      icon: <Users className="h-12 w-12 text-purple-600" />,
    },
    {
      title: "Discussion Threads",
      description: "Engage in meaningful conversations about each poll",
      icon: <MessageSquare className="h-12 w-12 text-purple-600" />,
    },
  ];

  const testimonials = [
    {
      quote: "GhostVox helped me understand different perspectives on issues I care about.",
      author: "Alex M.",
      role: "Community Member",
    },
    {
      quote: "I love seeing how my opinions compare with the broader community.",
      author: "Jordan T.",
      role: "Regular Voter",
    },
    {
      quote: "The visualizations make complex polling data easy to understand.",
      author: "Sam K.",
      role: "Data Enthusiast",
    },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-6 overflow-hidden bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
                The Voice of the{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Community
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-200">
                Join thousands of users voting on the hottest topics across politics, entertainment,
                technology, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/sign-up">
                  <PrimaryButton text="Join Now" />
                </Link>
                <Link
                  href="/dashboard"

                >
                </Link>
              </div>
            </div>
            <div className="relative hidden md:block">
              <PollVisualization />
            </div>
          </div>
        </div>
        <div className="absolute bottom-4 left-0 right-0 flex justify-center">
          <button className="text-white animate-bounce">
            <ChevronDown className="h-8 w-8" />
          </button>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How GhostVox Works</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              A simple process to make your voice heard in the community
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line (only visible on md screens and up) */}
            <div className="absolute top-1/4 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-blue-500 hidden md:block"></div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800 relative z-10">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-full mb-4 text-white w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Create an Account</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Sign up for free in seconds and join our community of voters. No credit card
                required.
              </p>
              <div className="mt-4 text-purple-600 dark:text-purple-400">
                <Link href="/sign-up" className="font-medium hover:underline">
                  Sign up now →
                </Link>
              </div>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800 relative z-10">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-full mb-4 text-white w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Browse Categories</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Explore polls across various categories that interest you, from gaming to politics.
              </p>
              <ul className="mt-4 flex flex-wrap justify-center gap-2">
                {["Politics", "Gaming", "Movies", "Tech"].map((cat) => (
                  <li key={cat} className="text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                    {cat}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg shadow-lg bg-gray-50 dark:bg-gray-800 relative z-10">
              <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-4 rounded-full mb-4 text-white w-16 h-16 flex items-center justify-center">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Vote & Discuss</h3>
              <p className="text-gray-600 dark:text-gray-300">
                Cast your vote and join the conversation about topics that matter.
              </p>
              <div className="mt-4 text-purple-600 dark:text-purple-400">
                <Link href="/trending" className="font-medium hover:underline">
                  See trending polls →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Explore Categories</h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            Discover polls across a wide range of topics
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-6 rounded-lg shadow-md bg-white dark:bg-gray-700 transition-all hover:transform hover:scale-105"
              >
                <div className="text-4xl mb-4">{category.icon}</div>
                <h3 className="text-xl font-bold mb-2">{category.name}</h3>
                <p className="text-gray-600 dark:text-gray-300">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-lg bg-gray-50 dark:bg-gray-800 shadow-lg">
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 px-6 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="p-6 rounded-lg bg-white/10 backdrop-blur-sm">
                <p className="text-lg italic mb-4">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-purple-300 text-purple-800 flex items-center justify-center font-bold">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Polls */}
      <section className="py-16 px-6 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Trending Polls</h2>
          <p className="text-xl text-center text-gray-600 dark:text-gray-300 mb-12">
            See what the community is voting on right now
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                id: "poll-1",
                question: "Which upcoming game are you most excited about?",
                category: "Gaming",
                votes: 1872,
                comments: 143,
                daysLeft: 3,
              },
              {
                id: "poll-2",
                question: "Should AI development be more strictly regulated?",
                category: "Technology",
                votes: 3241,
                comments: 492,
                daysLeft: 5,
              },
              {
                id: "poll-3",
                question: "What's the best streaming service in 2025?",
                category: "Entertainment",
                votes: 2156,
                comments: 217,
                daysLeft: 2,
              },
            ].map((poll) => (
              <PollCard key={poll.id} poll={poll} />
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/polls"
              className="text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 font-medium inline-flex items-center"
            >
              See all polls <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-6 bg-gray-100 dark:bg-gray-800">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Voice Heard?</h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Join GhostVox today and become part of a growing community shaping opinions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/sign-up">
              <PrimaryButton text="Sign Up Free" />
            </Link>
            <Link
              href="/dashboard"
              className="inline-flex items-center bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg px-5 py-2.5 transition-all"
            >
              Explore Polls <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
