import Hero from "@/components/hero"
import About from "@/components/about"
import Products from "@/components/products"
import RecipeSection from "@/components/recipe-section"
import Features from "@/components/features"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Products />
      <RecipeSection />
      <Features />
      <Contact />
      <Footer />
    </main>
  )
}
