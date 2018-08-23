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
      //this.getReversalValue();
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
    if (events.touches.length == 1) {
      for (var i = 0; i < events.touches.length; i++) {
        this.buttons.clickEvent(events.touches[i]);
      }
      if (this.buttons[this.randomButtons[0]]) {
        //加分，重置
        this.ready = true;
      }
    }
  }

  generateTips() {
    this.randomButtons = [];
    this.tipsC.tips = '';
    let reversal = false;
    for (var i = 0; i < 1; i++) {
      switch (this.randomNums[i]) {
        case 0:
          this.tipsC.tips += '上';
          reversal = this.getReversalValue();
          if (reversal) {
            this.randomButtons.push('upButton');
          } else {
            this.randomButtons.push('downButton');
          }
          break;
        case 1:
          this.tipsC.tips += '下';
          reversal = this.getReversalValue();
          if (reversal) {
            this.randomButtons.push('downButton');
          } else {
            this.randomButtons.push('upButton');
          }
          break;
        case 2:
          this.tipsC.tips += '左';
          reversal = this.getReversalValue();
          if (reversal) {
            this.randomButtons.push('leftButton');
          } else {
            this.randomButtons.push('rightButton');
          }
          break;
        case 3:
          this.tipsC.tips += '右';
          reversal = this.getReversalValue();
          if (reversal) {
            this.randomButtons.push('rightButton');
          } else {
            this.randomButtons.push('leftButton');
          }
          break;
      }
    }
  }

  getReversalValue() {
    if (Math.random() > 0.5) {
      this.tipsC.tipStyle = 'red';
      return false;
    } else {
      this.tipsC.tipStyle = 'green';
      return true;
    }
  }
}