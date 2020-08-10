export class SlideNav {
  constructor(slide, wrapper) {
    this.slide = document.querySelector(slide);
    this.wrapper = document.querySelector(wrapper);
    this.dist = { finalPositon: 0, startX: 0, movement: 0 };
    this.activeClass = "active";
    this.eventChange = new Event("changeEvent");
  }

  transition(active) {
    this.slide.style.transition = active ? "transform 0.5s" : "";
  }

  // COMEÇO DE TUDO

  moveSlide(distX) {
    this.movePosition = distX;
    this.slide.style.transform = `translate3d(${distX}px, 0, 0)`;
  }

  slidePosition(clientX) {
    this.dist.movement = this.dist.startX - clientX;
    return this.dist.finalPositon - this.dist.movement;
  }

  onStart(event) {
    if (event.type === "mousedown") {
      event.preventDefault();
      this.dist.startX = event.clientX;
      this.wrapper.addEventListener("mousemove", this.onMove);
    } else {
      this.dist.startX = event.changedTouches[0].clientX;
      this.wrapper.addEventListener("touchmove", this.onMove);
    }
    this.transition(false);
  }

  onMove(event) {
    const moveType =
      event.type === "mousemove"
        ? event.clientX
        : event.changedTouches[0].clientX;
    const pointerPosition = this.slidePosition(moveType);
    this.moveSlide(pointerPosition);
  }

  onEnd(event) {
    const endEvent = event.type === "mouseup" ? "mousemove" : "touchmove";
    this.wrapper.removeEventListener(endEvent, this.onMove);
    const finalPositon = this.movePosition;
    this.dist.finalPositon = finalPositon;
    this.transition(true);
    this.activeSlideOnEnd();
  }

  activeSlideOnEnd() {
    if (this.dist.movement > 120 && this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    } else if (this.dist.movement < -120 && this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    } else {
      this.changeSlide(this.index.active);
    }
  }

  addEvents() {
    this.wrapper.addEventListener("mousedown", this.onStart);
    this.wrapper.addEventListener("touchstart", this.onStart);

    this.wrapper.addEventListener("mouseup", this.onEnd);
    this.wrapper.addEventListener("touchend", this.onEnd);
  }

  // SLIDE CONFIG

  centralizeSlide(slide) {
    const margin = (this.wrapper.offsetWidth - slide.offsetWidth) / 2;
    return -(slide.offsetLeft - margin);
  }

  slideConfig() {
    this.slideArray = [...this.slide.children].map((element) => {
      const position = this.centralizeSlide(element);
      return { position, element };
    });
  }

  slideIndexNav(index) {
    const total = this.slideArray.length - 1;
    this.index = {
      prev: index ? index - 1 : undefined,
      active: index,
      next: index === total ? undefined : index + 1,
    };
  }

  changeSlide(index) {
    const active = this.slideArray[index];
    this.moveSlide(active.position);
    this.slideIndexNav(index);
    this.dist.finalPositon = active.position;
    this.itemAtivo(index);
    this.wrapper.dispatchEvent(this.eventChange);
  }

  // ADICIONAR CLASSE ATIVO E RESIZE EVENT

  itemAtivo(index) {
    this.slideArray.forEach((item) => {
      item.element.classList.remove(this.activeClass);
    });
    this.slideArray[index].element.classList.add(this.activeClass);
  }

  onResize() {
    setTimeout(() => {
      this.slideConfig();
      this.changeSlide(this.index.active);
    }, 800);
  }

  addResizeEvent() {
    window.addEventListener("resize", this.onResize);
  }

  // PREV E NEXT

  activePrevSlide() {
    if (this.index.prev !== undefined) {
      this.changeSlide(this.index.prev);
    }
  }

  activeNextSlide() {
    if (this.index.next !== undefined) {
      this.changeSlide(this.index.next);
    }
  }

  bindEvents() {
    this.onStart = this.onStart.bind(this);
    this.onMove = this.onMove.bind(this);
    this.onEnd = this.onEnd.bind(this);
    this.onResize = this.onResize.bind(this);
  }

  init() {
    this.bindEvents();
    this.addEvents();
    this.slideConfig();
    this.changeSlide(0);
    this.addResizeEvent();
  }
}

// PARTE 2

export default class Slide extends SlideNav {
  constructor(slide, wrapper) {
    super(slide, wrapper);
    this.bindControlEvents();
  }
  createControl() {
    const control = document.createElement("ul");
    control.dataset.control = "slide";
    this.slideArray.forEach((item, index) => {
      control.innerHTML += `<li><a href="#slide${index}">${index}</a></li>`;
    });
    this.wrapper.insertBefore(control, this.slide);
    return control;
  }

  eventControl(item, index) {
    item.addEventListener("click", (event) => {
      event.preventDefault();
      this.changeSlide(index);
    });
    this.wrapper.addEventListener("changeEvent", this.activeControlItem);
  }

  activeControlItem() {
    this.controlArray.forEach((item) => {
      item.classList.remove(this.activeClass);
    });
    this.controlArray[this.index.active].classList.add(this.activeClass);
  }

  addControl() {
    this.control = this.createControl();
    this.controlArray = [...this.control.children];
    this.controlArray.forEach((item, index) => this.eventControl(item, index));
    this.activeControlItem();
  }

  bindControlEvents() {
    this.activeControlItem = this.activeControlItem.bind(this);
  }
}
