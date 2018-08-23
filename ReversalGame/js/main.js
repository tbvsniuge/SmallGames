//本小游戏的功能宗旨：排行榜功能以及授权

import BackGround from './runtime/background.js'


import ClickModel from './gameone/clickmodel.js';


let ctx = canvas.getContext('2d');

export default class Main {
  constructor() {
    this.aniId = 0;

    this.clickModel = new ClickModel();

    this.init();
    this.restart();
  }


  init() {
    this.backGround = new BackGround();

  }

  restart() {
    this.bindLoop = this.loop.bind(this);
    window.cancelAnimationFrame(this.aniId);
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    );
  }

  render() {
    this.backGround.render(ctx);

    this.clickModel.render(ctx);
  }

  update() {
    this.clickModel.update();
  }

  loop() {
    window.frame++;
    this.render();
    this.update();
    this.aniId = window.requestAnimationFrame(
      this.bindLoop,
      canvas
    )
  }
}