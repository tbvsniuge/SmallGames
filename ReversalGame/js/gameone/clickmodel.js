import TipsC from './component/tips.js'
import Buttons from './component/buttons.js'

const winWidth = window.innerWidth;
const winHeight = window.innerHeight;

export default class ClickModel {
  constructor() {
    this.randomNums = [];
    this.randomButtons = [];

    this.ready = true;
    this.buttons = new Buttons();
    this.tipsC = new TipsC();

    this.init();
  }

  init() {
    this.clickEvent = this.touchClickEvent.bind(this);
    canvas.addEventListener('touchstart', this.clickEvent);
  }

  //游戏逻辑
  update() {
    //生成随机提示
    if (this.ready) {
      this.randomNums = window.rndTwoFloor();
      this.getReversalValue();
      this.generateTips();
      this.ready = false;
    }
  }

  render(ctx) {
    //显示提示框
    this.tipsC.render(ctx);
    this.buttons.render(ctx);
  }

  touchClickEvent(events) {
    events.preventDefault();
    //无论点哪个按钮，按钮变红 TODO
    if (events.touches.length == 2) {
      for (var i = 0; i < events.length; i++) {
        this.buttons.clickEvent(events[i]);
      }
      if (this.buttons[this.randomButtons[0]] && this.buttons[this.randomButtons[1]]) {
        //加分，重置
        this.ready = true;
      }
    }
  }

  generateTips() {
    this.randomButtons = [];
    for (var i = 0; i < 2; i++) {
      switch (this.randomNums[i]) {
        case 0:
          this.tipsC.tips += '上';
          this.randomButtons.push('upButton');
          break;
        case 1:
          this.tipsC.tips += '下';
          this.randomButtons.push('downButton');
          break;
        case 2:
          this.tipsC.tips += '左';
          this.randomButtons.push('leftButton');
          break;
        case 3:
          this.tipsC.tips += '右';
          this.randomButtons.push('rightButton');
          break;
      }
    }
  }

  getReversalValue() {
    if (Math.random() > 0.5) {
      this.tipsC.tipStyle = 'red';
    } else {
      this.tipsC.tipStyle = 'green';
    }
  }
}