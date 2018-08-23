/**
 * 对于ES6中Symbol的极简兼容
 * 方便模拟私有变量
 */
var frame = 0;

let Symbol = window.Symbol
let idCounter = 0

if (!Symbol) {
  Symbol = function Symbol(key) {
    return `__${key}_${Math.floor(Math.random() * 1e9)}_${++idCounter}__`
  }

  Symbol.iterator = Symbol('Symbol.iterator')
}

//取随机数
function random(x, y) {
  var random = Math.random() * (y - x) + x;
  return random
}

//取整随机数整数
function rndfloor(n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}

//取0-3随机两个整数
function rndTwoFloor() {
  let res = [];
  let numberStroe = [
    0, 1, 2, 3
  ]
  for (var i = 0; i < 2; i++) {
    var num = Math.floor(Math.random() * numberStroe.length); //生成随机数num
    res.push(numberStroe[num]); //获取arr[num]并放入 res
    numberStroe.splice(num, 1);
  }
  return res;
}

window.Symbol = Symbol;
window.random = random;
window.rndfloor = rndfloor;
window.rndTwoFloor = rndTwoFloor;

window.frame = frame;