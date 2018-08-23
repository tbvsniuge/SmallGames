const winWidth = window.innerWidth;
const winHeight = window.innerHeight;



export default class Tips {
  constructor() {
    this.x = winWidth * 0.5;
    this.y = winHeight * 0.3;

    this.width = winWidth * 0.2;
    this.height = winHeight * 0.06;

    this.tips = '';
    this.tipStyle = '';
  }

  update() {

  }

  render(ctx) {
    this.renderBG(ctx);
    this.renderWords(ctx);
  }

  renderWords(ctx) {
    ctx.font = "bold 28px Arial";
    ctx.fillStyle = this.tipStyle;
    ctx.fillText(
      this.tips,
      this.x - this.width * 0.45,
      this.y + this.height * 0.35,
    );
  }

  renderBG(ctx) {
    ctx.strokeRect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    )
  }
}