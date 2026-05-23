import CinematicScene from "@/components/scene/CinematicScene";
import AxisOverview from "@/components/overview/AxisOverview";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="axis-main">
      <Navbar />
      <CinematicScene />
      <div className="axis-content">
        <AxisOverview />
        <Footer />
      </div>
    </main>
  );
}
