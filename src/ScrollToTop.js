import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll window to top
    window.scrollTo({
      top: 0,
      behavior: "smooth" // optional smooth scroll
    });

    // Optional: scroll a specific div if needed
    const scrollContainer = document.getElementById("root"); 
    if (scrollContainer) {
      scrollContainer.scrollTop = 0;
    }
  }, [pathname]);

  return null;
}

export default ScrollToTop;
