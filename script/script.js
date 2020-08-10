import ScrollToSection from "./modules/ScrollToSection.js";
import AnimaScroll from "./modules/AnimaScroll.js";
import Slide from "./modules/Slide.js";

const scrollToSection = new ScrollToSection(".linkInterno");
scrollToSection.init();

const animaScroll = new AnimaScroll("[data-anima]");
animaScroll.animaScroll();
animaScroll.init();

const slide = new Slide(".slide", ".slide-wrapper");
slide.init();
slide.addControl();

const header = document.querySelector(".header");

setTimeout(() => {
  header.classList.add("active");
}, 200);
