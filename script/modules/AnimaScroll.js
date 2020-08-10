export default class {
  constructor(sections) {
    this.sections = document.querySelectorAll(sections);
  }

  bindEvents() {
    this.animaScroll = this.animaScroll.bind(this);
  }

  animaScroll() {
    this.sections.forEach((section) => {
      const top = section.getBoundingClientRect().top;
      const windowMetade = window.innerHeight * 0.7;
      const distance = top - windowMetade;
      if (distance < 0) {
        section.classList.add("ativo");
      } else {
        section.classList.remove("ativo");
      }
    });
  }

  events() {
    window.addEventListener("scroll", this.animaScroll);
  }

  init() {
    this.bindEvents();
    this.events();
  }
}
