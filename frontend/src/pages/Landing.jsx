import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../components/landing/Hero";
import Features from "../components/landing/Features";
import HowItWorks from "../components/landing/HowItWorks";
import Contact from "../components/landing/Contact";

function Landing() {
    return (
        <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-white">

            <Navbar />

            <main>
                <Hero />
                <Features />
                <HowItWorks />
                <Contact />
            </main>

            <Footer />

        </div>
    );
}

export default Landing;