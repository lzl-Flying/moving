var oButton = document.getElementsByTagName('button');
var oSnake = document.getElementsByClassName('snake');
var sSnake = document.getElementsByClassName('snake')[0];
var she = document.getElementsByClassName('she')[0];
var oShe = document.getElementsByClassName('she');
var sFood = document.getElementsByClassName('food')[0];
var oScore = document.getElementsByClassName('score')[0];
var oBox = document.getElementsByClassName('box')[0];
var oBtn = document.getElementsByTagName('button');

var oSheLeft = new Array();
var oSheTop = new Array();

// 获取dom位置
function position(dom, place) {
return parseInt(window.getComputedStyle(dom, false)[place]);
}

// 随机生成蛇的位置
// 向下兼容取整
function addSnake() {
var mapLeft = Math.floor(Math.random()*60)*10;
var mapTop = Math.floor(Math.random()*32)*10;
// for(var i = 0; i <  oSnake[i].length; i++){
// 	if(mapLeft == position(oSnake[i],'left') && mapTop == position(oSnake[i],'top')){
// 		addSnake();
// 		break;
// 	}
// }
sSnake.style.left = mapLeft + 'px';
sSnake.style.top = mapTop + 'px';
}
addSnake();

// 随机生成食物位置
function addFood() {
var mapLeft = Math.floor(Math.random()*60)*10;
var mapTop = Math.floor(Math.random()*32)*10;
for(var i = 0; i <  oSnake[i].length; i++){
    if(mapLeft == position(oSnake[i],'left') && mapTop == position(oSnake[i],'top')){
        addFood();
        break;
    }
}
sFood.style.left = mapLeft +'px';
sFood.style.top = mapTop +'px';
}
addFood();

// 蛇动起来
// 根据蛇上一次的运动方向，判断蛇运动方向，上一次运动方向向左就不能向右，向上不能向下
var direction = 0;
// 蛇的运动方向
var preDirection;
// 蛇的上一次的运动方向
document.onkeydown = function(e) {
var ee = e || window.event;
preDirection = direction;
direction = ee.keyCode;
    if(preDirection == 37 && direction == 39){
        direction = 37;
    }
    if(preDirection == 39 && direction == 37){
        direction = 39;
    }
    if(preDirection == 38 && direction == 40){
        direction = 38;
    }
    if(preDirection == 40 && direction == 38){
        direction = 40;
    }
}

// 设置定时器蛇开始运动
var timer = setInterval(function(){

// 获取蛇头的位置赋值给生成的第一个div
oSheLeft[1] = position(oSnake[0], 'left');
oSheTop[1] = position(oSnake[0],'top')

// 蛇开始运动
switch(direction){
    case 37:
        sSnake.style.left = position(sSnake,'left') - 10 + 'px';
        break;
    case 38:
        sSnake.style.top = position(sSnake,'top') - 10 + 'px';
        break;
    case 39:
        sSnake.style.left = position(sSnake,'left') + 10 + 'px';
        break;
    case 40:
        sSnake.style.top = position(sSnake,'top') + 10 + 'px';
        break;
}

// 蛇开始吃食物
// 判断蛇头的位置是否和食物位置一样
var score = 0;
if(position(sSnake,'left') == position(sFood,'left')) {
    if(position(sSnake,'top') == position(sFood,'top')) {
        // score += 1;;
        // oScore.innerHTML = score * 10;
        addFood();
    // 吃到食物增加一个div
        var addDiv = document.createElement('div');
        addDiv.className = 'snake';
        she.appendChild(addDiv);
    }
}


// 让蛇的身子跟着蛇头动
// 先把蛇头位置赋值给蛇身第一节，再把第一节赋值给第二节
function go() {
    for(var i = 1; i < oSnake.length; i++) {
    oSheLeft[i + 1] = position(oSnake[i], 'left');
    oSheTop[i + 1] = position(oSnake[i], 'top');
    oSnake[i].style.left = oSheLeft[i] + 'px';
    oSnake[i].style.top = oSheTop[i] + 'px';

    // 计算分数，吃一个食物十分
    score += 1;;
    oScore.innerHTML = score * 10;

    }
}
go();


// 蛇死的条件  撞到墙
if(position(sSnake,'left') < position(oBox,'left')  || position(sSnake,'right') < position(oBox,'right') || position(sSnake,'top') <   position(oBox,'top') || position(sSnake,'bottom') < position(oBox,'bottom')) {
    alert('Game over');
    clearInterval(timer);
    
}

},150)

