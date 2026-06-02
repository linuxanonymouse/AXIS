import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export default function NotFound() {
  return (
    <main className="axis-page">
      <Navbar />

      <div className="axis-page__content" style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
        <section className="axis-hero">
          <p className="axis-hero__eyebrow">System</p>
          <h1 className="axis-hero__title">This path does not exist.</h1>
          <p className="axis-hero__body">
            Return to the Axis system.
          </p>
          <div className="axis-hero__ctas">
            <Link href="/" className="axis-btn axis-btn--primary">
              Return Home
            </Link>
            <Link href="/overview" className="axis-btn axis-btn--ghost">
              Explore Axis
            </Link>
          </div>
        </section>

        <Footer />
      </div>
    </main>
  );
}
