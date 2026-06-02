import AxisOverview from "@/components/overview/AxisOverview";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function OverviewPage() {
  return (
    <main className="axis-main overview-page">
      <Navbar />
      <div className="axis-content">
        <AxisOverview />
        <Footer />
      </div>
    </main>
  );
}
