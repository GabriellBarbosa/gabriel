export default class {
  constructor(linksInternos) {
    this.linksInternos = document.querySelectorAll(linksInternos);
  }

  bindEvents() {
    this.handleClick = this.handleClick.bind(this);
  }

  scrollEvent(element) {
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  handleClick(event) {
    event.preventDefault();
    const linkSelecionado = event.currentTarget;
    const href = linkSelecionado.getAttribute("href");
    const element = document.querySelector(href);
    this.scrollEvent(element);
  }

  events() {
    this.linksInternos.forEach((link) => {
      link.addEventListener("click", this.handleClick);
    });
  }

  init() {
    this.bindEvents();
    this.events();
  }
}
