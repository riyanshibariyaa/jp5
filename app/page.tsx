import Header from "@/components/layout/header"
import HeroSection from "@/components/home/hero-section"
import PopularCategories from "@/components/home/popular-categories"
import RecentJobs from "@/components/home/recent-jobs"
import StatsSection from "@/components/home/stats-section"
import TestimonialSection from "@/components/home/testimonial-section"
import Footer from "@/components/layout/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
        <HeroSection />
        <StatsSection />
        <PopularCategories />
        <RecentJobs />
        <TestimonialSection />
      </main>
      <Footer />
    </div>
  )
}
