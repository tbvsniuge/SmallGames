const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

const buttonPosition = [{
    //左
    title: 'leftButton',
    x: winWidth * 0.2,
    y: winHeight * 0.7,
    width: window.innerWidth * 0.2,
    height: window.innerHeight * 0.15
  },
  {
    //右
    title: 'rightButton',
    x: winWidth * 0.8,
    y: winHeight * 0.7,
    width: window.innerWidth * 0.2,
    height: window.innerHeight * 0.15
  },
  {
    //上
    title: 'upButton',
    x: winWidth * 0.5,
    y: winHeight * 0.6,
    width: window.innerWidth * 0.35,
    height: window.innerHeight * 0.11
  },
  {
    //下
    title: 'downButton',
    x: winWidth * 0.5,
    y: winHeight * 0.8,
    width: window.innerWidth * 0.35,
    height: window.innerHeight * 0.11
  }
]

const upImg = 'images/UpAndDown.png';
const downImg = 'images/UpAndDown.png';
const leftImg = 'images/LeftAndRight.png';
const rightImg = 'images/LeftAndRight.png';

export default class Buttons {
  constructor() {
    //哪个被按下去了，就置为true，根据此处的true来判定
    this.leftButton = false;
    this.rightButton = false;
    this.upButton = false;
    this.downButton = false;
  }

  update() {

  }

  //哪个按钮被点了，就true
  clickEvent(event) {
    for (var i = 0; i < buttonPosition.length; i++) {
      let button = buttonPosition[i];
      if (event.clientX > button.x - button.width / 2 &&
        event.clientX < button.x + button.width / 2 &&
        event.clientY > button.y - button.height / 2 &&
        event.clientY < button.y + button.height / 2
      ) {
        this[buttonPosition[i].title] = true;
      }
    }
  }

  resetButton() {
    this.leftButton = false;
    this.rightButton = false;
    this.upButton = false;
    this.downButton = false;
  }

  render(ctx) {
    let leftItem = buttonPosition[0];
    let rightItem = buttonPosition[1];
    let upItem = buttonPosition[2];
    let downItem = buttonPosition[3];

    this.renderItem(ctx, leftItem, leftImg);
    this.renderItem(ctx, rightItem, rightImg);
    this.renderItem(ctx, upItem, upImg);
    this.renderItem(ctx, downItem, downImg);
  }

  renderItem(ctx, option, imgPath) {
    let img = new Image();
    img.src = imgPath;
    ctx.drawImage(
      img,
      option.x - option.width / 2,
      option.y - option.height / 2,
      option.width,
      option.height
    )
  }
}