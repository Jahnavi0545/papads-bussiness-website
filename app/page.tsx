import Hero from "@/components/hero"
import About from "@/components/about"
import Products from "@/components/products"
import Features from "@/components/features"
import RecipeSection from "@/components/recipe-section"
import ServicesSection from "@/components/services-section"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="products">
        <Products />
      </section>

      <Features />

      <section id="recipe">
        <RecipeSection />
      </section>

      <section id="services">
        <ServicesSection />
      </section>

      <section id="contact">
        <Contact />
      </section>

      <Footer />
    </main>
  )
}
