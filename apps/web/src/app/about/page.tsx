import Link from "next/link"
import { ArrowLeft, ChefHat } from "lucide-react"

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="bg-white/80 backdrop-blur-md border-b border-border sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Recipes</span>
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 bg-linear-to-br from-primary to-accent rounded-lg flex items-center justify-center">
            <ChefHat className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground">About Recipia</h1>
        </div>

        <div className="prose prose-invert max-w-none">
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Our Mission</h2>
              <p className="text-foreground leading-relaxed">
                Recipia is dedicated to bringing culinary inspiration to your kitchen. We curate recipes from around
                the world, making it easy to discover new dishes and expand your cooking repertoire.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Why Choose Us?</h2>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Carefully curated recipes from professional chefs</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Detailed instructions and ingredient lists</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Filter by cuisine, meal type, and difficulty level</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">✓</span>
                  <span>Save your favorite recipes for quick access</span>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-3">Get Started</h2>
              <p className="text-foreground leading-relaxed">
                Browse our collection of recipes, filter by your preferences, and start cooking today. Happy cooking!
              </p>
            </section>
          </div>
        </div>
      </div>
    </main>
  )
}
