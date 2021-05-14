class Game {
  game: HTMLElement | null;

  constructor(id: string) {
    this.game = document.getElementById(id);
  }

  listenMouse(cb: Function) {
    if (!this.game) return;
    this.game.addEventListener("mousemove", cb);
  }
}

class Box {
  defaultOptions = {
    gameId: "game",
    pivotX: 0.5,
    pivotY: 0.5,
    x: 0,
    y: 0,
    width: 40,
    height: 40,
  };

  game: HTMLElement
  id: string
  box: HTMLElement
  options: Object
  constructor(
    id: string,
    options = {
      gameId: "game",
      pivotX: 0.5,
      pivotY: 0.5,
      x: 0,
      y: 0,
      width: 40,
      height: 40,
    },
    game: HTMLElement
  ) {
    this.id = id;
    this.game = game;
    this.box = <HTMLElement>document.getElementById(id);
    this.options = Object.assign(this.defaultOptions, options);
    this.init(this.options);
  }

  initStyle() {
    this.style = getComputedStyle(this.box);
  }

  init({ pivotX, pivotY, x, y, width, height }) {
    if (!this.box) {
      this.box = document.createElement("div");
      this.initStyle();
      this.box.id = this.id;
      this.game.appendChild(this.box);
      this.width = width;
      this.height = height;
      this.pivotX = pivotX;
      this.pivotY = pivotY;
      this.x = x;
      this.y = y;
      this.box.style.border = "1px solid";
      this.box.style.position = "absolute";
    } else {
      this.initStyle();
      this.pivotX = pivotX;
      this.pivotY = pivotY;
      this.x = this.style.left;
      this.y = this.style.top;
      this.width = this.style.width.replace("px", "");
      this.height = this.style.height.replace("px", "");
    }
  }

  get pivotXLeft() {
    return this.pivotX * this.width;
  }

  get pivotXRight() {
    return this.width - this.pivotXLeft;
  }

  get pivotYTop() {
    return this.height * this.pivotY;
  }

  get pivotYBottom() {
    return this.height - this.pivotYTop;
  }

  get x() {
    return this.box.style.left.replace("px", "") + this.pivotXLeft;
  }

  get y() {
    return this.box.style.top.replace("px", "") + this.pivotYTop;
  }

  set x(x) {
    this.box.style.left = x - this.pivotXLeft + "px";
  }

  set y(y) {
    this.box.style.top = y - this.pivotYTop + "px";
  }

  get width() {
    return this.style.width.replace("px", "");
  }
  set width(width) {
    this.box.style.width = width + "px";
  }

  get height() {
    return this.style.height.replace("px", "");
  }
  set height(height) {
    this.box.style.height = height + "px";
  }

  move({ x, y }) {
    this.x = x;
    this.y = y;
  }
}

class MagnetBox extends Box {
  constructor() {
    super(...arguments);
  }

  checkMagnet(box) {
    const distX = Math.abs(this.x - box.x);
    const distY = Math.abs(this.y - box.y);
    if (distX < this.width) {
      this.compose(box);
    }
  }

  compose(box) {
    box.x = -box.width;
    this.box.appendChild(box.box);
    box.x = -this.box.width - 2;
    box.y = -1;
  }
}
