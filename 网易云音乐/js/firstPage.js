//首页
/* 发现音乐按钮 */
var firstPage = document.getElementById('firstPage');
/* 发现音乐页面 */
var page1 = document.getElementsByClassName('page1')[0];
/* 我的音乐按钮 */
var MyMusic = document.getElementById('MyMusic');

/* 点击我的音乐 */
MyMusic.onclick = function(){
    scrollTo(0,0);
    userHome.style.display = 'none';
    page1.style.display = 'none';
    userHome.style.display = 'none';
    page2.style.display = 'block';
    firstPage.style.background = 'none';
    MyMusic.style.background = 'black';
    secNav.style.display = 'none';
    head.style.borderBottom = '2px solid rgb(105, 156, 173)';
    //清除导航列表所有li的active属性，（小三角形）
    clearHeadMenuLisActive();
    MyMusic.className = 'active';
    //判断登录状态
    if(sessionStorage.getItem("istrue") == 'yes'){
        hasLogin.style.display = 'flex';
        notLogin.style.display = 'none';
    }else{
        hasLogin.style.display = 'none';
        notLogin.style.display = 'block';
    }
}

/* 点击发现音乐 */
firstPage.onclick = function(){
    userHome.style.display = 'none';
    page1.style.display = 'block';
    page2.style.display = 'none';
    userHome.style.display = 'none';
    MyMusic.style.background = 'none';
    firstPage.style.background = 'black';
    secNav.style.display = 'block';
    head.style.borderBottom = 'none';
    clearHeadMenuLisActive();
    firstPage.className = 'active';
}

/* 点击导航栏右边的用户头像*/
headLogImg.onclick = function(){
    scrollTo(0,0);
    userHome.style.display = 'flex';
    page1.style.display = 'none';
    page2.style.display = 'none';
    clearHeadMenuLisActive();
    secNav.style.display = 'none';
    head.style.borderBottom = '2px solid rgb(105, 156, 173)';
}
