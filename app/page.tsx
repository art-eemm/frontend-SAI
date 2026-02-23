import Header from "@/components/layout/Header";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroCarousel />
    </div>
  );
}
