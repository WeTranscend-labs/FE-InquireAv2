import { HeroSection } from '@/components/home/HeroSection'
import { StatsSection } from '@/components/home/StatsSection'
import { FeaturedQuestions } from '@/components/home/FeaturedQuestions'
import { TopContributors } from '@/components/home/TopContributors'
import { TrendingTags } from '@/components/home/TrendingTags'
import { WelcomeBanner } from '@/components/home/WelcomeBanner'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ParallaxFeatures } from '@/components/home/ParallaxFeatures'
import { CommunityHighlights } from '@/components/home/CommunityHighlights'
import { FeaturedProjects } from '@/components/home/FeaturedProjects'
import { NewsletterSection } from '@/components/home/NewsletterSection'
import { ScrollReveal } from '@/components/animation/ScrollReveal'

export default function Home() {
  return (
    <div className="space-y-24 pb-24">
      <WelcomeBanner />
      
      <ScrollReveal>
        <HeroSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <ParallaxFeatures />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <HowItWorks />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <StatsSection />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <CommunityHighlights />
      </ScrollReveal>

      <ScrollReveal delay={0.1}>
        <FeaturedProjects />
      </ScrollReveal>
      
      <div className="grid lg:grid-cols-[1fr,300px] gap-8">
        <ScrollReveal delay={0.1}>
          <FeaturedQuestions />
        </ScrollReveal>
        
        <div className="space-y-8">
          <TopContributors />
          <TrendingTags />
        </div>
      </div>

      <ScrollReveal delay={0.1}>
        <NewsletterSection />
      </ScrollReveal>
    </div>
  )
}