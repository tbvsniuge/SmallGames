const winWidth = window.innerWidth;
const winHeight = window.innerHeight;


export default class BackGround {
  constructor() {
    this.x = winWidth / 2;
    this.y = winHeight / 2;

    this.width = winWidth;
    this.height = winHeight;
  }

  update() {

  }

  render(ctx) {
    ctx.fillStyle = 'white';
    ctx.fillRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    )
  }
}