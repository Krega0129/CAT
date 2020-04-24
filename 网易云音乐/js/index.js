
var chColor = document.getElementById("change_color");
var colorLis = document.getElementById("color_list").getElementsByTagName("li");

/* 换肤 */
var colorArr = ["#242424", "#06a6f0", "#ee7cd2"]
for(var i=0;i<colorLis.length;i++){
    colorLis[i].index = i;
    colorLis[i].onclick = function(){
        head.style.backgroundColor = colorArr[this.index];
    }
}

var oBan = document.getElementById("banner");
var oBanList = document.getElementById("banner_list");
var oBanLis = oBanList.getElementsByTagName("li");
var oBtnList = document.getElementById("btn_list");
var oBtnLis = oBtnList.getElementsByTagName("li");
var LeftBtn = document.getElementById("Lbtn");
var RightBtn = document.getElementById("Rbtn");
var timer = null;
var index = 0;

/* 动态生成小圆点 */
for(var i=0;i<oBanLis.length-1;i++){
    var newLi = document.createElement("li");
    oBtnList.appendChild(newLi);
}

/* 3s轮播一次 */
/* 第一个参数为"函数名+()", 可以先执行, 若传入的是"函数名", 则第一次执行函数会延迟 */
timer = setInterval(changeImg(), 3000);

/* 底部按钮点击事件 */
function btnClick(){
    for(var i=0;i<oBtnLis.length;i++){
        oBtnLis[i].ind = i;
        oBtnLis[i].onclick = function(){
            clearInterval(timer);
            index = this.ind;
            timer = setInterval(changeImg(), 3000)
        }
    }
}

/* 图片轮播 */
function changeImg(){
    for(var i=0;i<oBanLis.length;i++){
        oBanLis[i].className = "";
        oBtnLis[i].className = "";
    }
    oBan.style.background = "url(./img/banner" + (index + 1) + "-bg.jpg) no-repeat"
    oBan.style.backgroundSize = "100%"
    oBanLis[index].className = "active";
    oBtnLis[index].className = "active";
    index = (++index < oBanLis.length) ? index : 0;
    /* 底部按钮点击事件 */
    btnClick();
    /* 将函数名返回, 作为setInterval真正的第一个参数 */
    return changeImg;
}

LeftBtn.onclick = function(){
    clearInterval(timer);
    index = (--index <= 0) ? oBanLis.length-1 : index;
    --index;
    timer = setInterval(changeImg(), 3000);
}

RightBtn.onclick = function(){
    clearInterval(timer);
    timer = setInterval(changeImg(), 3000);
}


var newL = document.getElementById("new_Lbtn");
var newR = document.getElementById("new_Rbtn");
var newList = document.getElementById("new_list");




