/* 轮播图 */
var banner = document.getElementById('banner');
var oBan = document.getElementById("banner");
var oBanList = document.getElementById("banner_list");
var oBanLis = oBanList.getElementsByTagName("li");
var oBtnList = document.getElementById("btn_list");
var oBtnLis = oBtnList.getElementsByTagName("li");
var LeftBtn = document.getElementById("Lbtn");
var RightBtn = document.getElementById("Rbtn");
var bannerTimer = null;
var bannerIndex = 0;

/* 初始大小 */
banner.style.height = screenH + 'px';

/* 监听窗口大小改变改变大小 */
window.onresize = function(){
    screenH = window.innerHeight;
    banner.style.height = screenH + 'px';
    mainBG.style.marginTop = screenH + 'px';
    notLogin.style.height = screenH + 'px';
    hasLogin.style.minHeight = screenH + 'px';
    searchResultBox.style.height = screenH + 'px';
    AudioHtml.style.height = screenH + 'px'
}

/* 动态生成小圆点 */
for(var i=0;i<oBanLis.length-1;i++){
    var newLi = document.createElement("li");
    oBtnList.appendChild(newLi);
}

/* 3s轮播一次 */
/* 第一个参数为"函数名+()", 可以先执行, 若传入的是"函数名", 则第一次执行函数会延迟 */
bannerTimer = setInterval(run, 3000);

/* 底部按钮点击事件 */
oBtnList.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(let i=0;i<oBtnLis.length;i++){
        if(target == oBtnLis[i]){
            clearInterval(bannerTimer);
            bannerIndex = i;
            changeImg()
            bannerTimer = setInterval(run, 3000);
        }
    }
}

/* 左按钮 */
LeftBtn.onclick = function(){
    clearInterval(bannerTimer);
    bannerIndex = (--bannerIndex < 0) ? oBtnLis.length-1 : bannerIndex;
    changeImg();
    bannerTimer = setInterval(run, 3000);
}
/* 右按钮 */
RightBtn.onclick = function(){
    clearInterval(bannerTimer);
    run()
    bannerTimer = setInterval(run, 3000);
}

/* 轮播 */
function run(){
    bannerIndex = (++bannerIndex < oBanLis.length) ? bannerIndex : 0;
    changeImg();
}

/* 图片轮播 */
function changeImg(){
    for(var i=0;i<oBanLis.length;i++){
        oBanLis[i].className = "";
        oBtnLis[i].className = "";
    }
    /* 换背景 */
    oBan.style.background = "url(./img/banner" + (bannerIndex + 1) + "-bg.jpg) no-repeat";
    oBan.style.backgroundSize = "100% 100%";
    oBanLis[bannerIndex].className = "active";
    oBtnLis[bannerIndex].className = "active";
}