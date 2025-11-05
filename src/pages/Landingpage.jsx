import { useEffect } from "react"
import { useLocation } from "react-router-dom"
import Benefits from "../components/Benefits"
import Collaboration from "../components/Collaboration"
import Services from "../components/Services"
import Pricing from "../components/Pricing"
import Roadmap from "../components/Roadmap"
import Hero from "../components/Hero"

const Landingpage = () => {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation - scroll to section when hash is present
    if (location.hash) {
      // Delay to ensure DOM is fully rendered
      const timer = setTimeout(() => {
        const element = document.querySelector(location.hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }, 300);
      
      return () => clearTimeout(timer);
    }
  }, [location.hash]);

  return (
    <>
    <Hero/>
        <Benefits/>
        <Collaboration />
        <Services />
        <Pricing />
        <Roadmap />
    </>
  )
}

export default Landingpage