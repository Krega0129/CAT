/* 刷新回到页面顶部 */
window.onunload = function(){
    scrollTo(0,0);
}

/* 换肤 */
var main = document.getElementById("main_bg");
var foot = document.getElementById('foot');
var chColor = document.getElementById("change_color");
var colorLis = document.getElementById("color_list").getElementsByTagName("li");
var headColorArr = ["linear-gradient(to right, #141e30, #243b55)", "#1f1c2c", "linear-gradient(to right, #0f2027, #203a43, #2c5364)"];
var mainColorarr = ['linear-gradient(to right, #141e30, #243b55)','#1f1c2c','linear-gradient(to right, #0f2027, #203a43, #2c5364)']
var afterLogin = document.getElementsByClassName('after_login')[0]
for(let i=0;i<colorLis.length;i++){
    colorLis[i].onclick = function(){
        head.style.background = headColorArr[i];
        main.style.background = mainColorarr[i];
        foot.style.background = mainColorarr[i];
        afterLogin.style.background = mainColorarr[i];
        page2.style.background = mainColorarr[i];
        userHome.style.background = mainColorarr[i];
        document.body.style.background = mainColorarr[i];
    }
}

//----------------------------------------------------------------------------------

/* 轮播图 */
/* 获取可视窗口高度 */
var screenH = window.innerHeight;
var oBan = document.getElementById("banner");
var oBanList = document.getElementById("banner_list");
var oBanLis = oBanList.getElementsByTagName("li");
var oBtnList = document.getElementById("btn_list");
var oBtnLis = oBtnList.getElementsByTagName("li");
var LeftBtn = document.getElementById("Lbtn");
var RightBtn = document.getElementById("Rbtn");
var bannerTimer = null;
var bannerIndex = 0;

main.style.marginTop = screenH + 'px';

/* 动态生成小圆点 */
for(var i=0;i<oBanLis.length-1;i++){
    var newLi = document.createElement("li");
    oBtnList.appendChild(newLi);
}

/* 3s轮播一次 */
/* 第一个参数为"函数名+()", 可以先执行, 若传入的是"函数名", 则第一次执行函数会延迟 */
bannerTimer = setInterval(run, 3000);

/* 底部按钮点击事件 */
for(let i=0;i<oBtnLis.length;i++){
    oBtnLis[i].onclick = function(){
        clearInterval(bannerTimer);
        bannerIndex = i;
        changeImg()
        bannerTimer = setInterval(run, 3000);
    }
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
    oBan.style.backgroundSize = "cover";
    oBanLis[bannerIndex].className = "active";
    oBtnLis[bannerIndex].className = "active";
}
/* 左按钮 */
LeftBtn.onclick = function(){
    clearInterval(bannerTimer);
    console.log(bannerIndex)
    bannerIndex = (--bannerIndex < 0) ? oBtnLis.length-1 : bannerIndex;
    // --bannerIndex;
    console.log(bannerIndex)
    changeImg();
    bannerTimer = setInterval(run, 3000);
}
/* 右按钮 */
RightBtn.onclick = function(){
    clearInterval(bannerTimer);
    run()
    bannerTimer = setInterval(run, 3000);
}

// --------------------------------------------------------------------------------------------

/* 滑动一定时的操作 */
var toTop = document.getElementById("toTop");
var head = document.getElementById("head");

/* 显示回顶部按钮和导航栏 */
document.onscroll = function(){
    /* 获取滚动的距离 */
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 0){
        toTop.style.display = "block";
        head.style.transform = "translateY(0)";
    }else{
        toTop.style.display = "none";
        head.style.transform = "translateY(-112px)";
    }
}

//-------------------------------------------------------------
/* 热门推荐 */
var hotList = document.getElementsByClassName("hot_list")[0];
var hotLis = hotList.getElementsByClassName("box_img");
var hotListP = hotList.getElementsByTagName('p');
/* 推荐里的歌曲id */
var Ids = ['1323911406','64293','1374329431','1333150792','523251137','188489','32701152','27733390'];

/* 添加热门推荐的背景图 */
function addImg(){
    for(let i=0;i<hotLis.length;i++){
        $ajax({
            url: 'http://musicapi.leanapp.cn/song/detail',
            data: {
                ids: Ids[i]
            },
            success: function(result){
                hotLis[i].style.background = 'url(' + JSON.parse(result).songs[0].al.picUrl + ')';
                hotLis[i].style.backgroundSize = "138px 138px";
                hotListP[i].innerHTML ='<a href="#">' + JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name + '</a>';
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
}
addImg();

//------------------------------------------------------------------------------------------
//推荐歌手
var singersList = document.getElementById("singersList");
var SingersList = document.getElementById("singers_list");
var singerLis = singersList.getElementsByTagName("li");
var singersImg = SingersList.getElementsByClassName("img");
var singerName = SingersList.getElementsByTagName("p");
var singersA = SingersList.getElementsByTagName('a');

/* 点击按钮切换类型 */
for(let i=0;i<singerLis.length;i++){
    singerLis[i].onclick = function(){
        SingersList.style.left = -662.5 * i + 'px';
    }
}

/* 添加图片 */
for(let i=0;i<singersImg.length;i++){
    $ajax({
        url: 'http://musicapi.leanapp.cn/search/suggest',
        data: {
            keywords: singerName[i].innerText,
            type: 100
        },
        success: function(result){
            singersImg[i].style.background = 'url(' + JSON.parse(result).result.artists[0].picUrl + ')';
            singersImg[i].style.backgroundSize = '100px 100px';
            /* 用id获取，跳转网易云 */
            singersA[i].href = 'https://music.163.com/artist?id=' + JSON.parse(result).result.artists[0].id;
        },
        error: function(msg){
            console.log(JSON.parse(msg));
        }
    })
}

//-------------------------------------------------------------------------------------------

/* 封装Ajax函数 */
function $ajax({method = "get", url, data, success, error}){
    /* 新建对象 */
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    /* 判断data数据存在，则将对象转为字符串 */
    if(data){
        data = queryString(data);
    }

    /* 判断方法是否是GET，且有无数据请求 */
    if(method == "get" && data){
        url += "?" + data;
    }

    xhr.open(method, url, true);

    /* 判断是否为get请求 */
    if(method == "get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    /* 等待数据响应 */
    xhr.onreadystatechange = function(){
        /* 判断是否解析完成 */
        if(xhr.readyState == 4){
            /* 判断本次下载的状态码是多少 */
            if(xhr.status == 200){
                //判断success函数是否存在
                if(success){
                    success(xhr.responseText);
                }
            }else{
                if(error){
                    error("Error:" + xhr.responseText);
                }
            }
        }
    }
}

/* 将对象转成字符串 */
function queryString(obj){
    var str = "";
    for(var attr in obj){
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length-1);
}

//-------------------------------------------------------------------------------

/* 登录界面 */
var headLoginBtn = document.getElementsByClassName("login")[0];
var logBtn = document.getElementById("login_btn");
var logBox = document.getElementById("login_box")
var logBoxHead = document.getElementById('box_head');
var logClose = document.getElementById("close");
var login = document.getElementById("log_div");
var Pw = document.getElementsByClassName("password");
var icon = document.getElementsByClassName("paswicon");
var check = login.getElementsByClassName("check")[0];
var sub = document.getElementById("sub");
var numBox = document.getElementById("num_box");
var numTip = document.getElementById("num_tip");
/* 注册 */
var reg = document.getElementById("beNew");
var regBox = document.getElementById("register");
var backLog = document.getElementById("backlog");
var regBtn = document.getElementById("reg_btn");

/* 移动登录框 */
logBoxHead.onmousedown = function(ev){
    var e = ev || window.event;
    var LeftDiffer = e.clientX - logBox.offsetLeft;
    var TopDiffer = e.clientY - logBox.offsetTop;
    document.onmousemove = function(e){
        logBox.style.left = e.clientX - LeftDiffer + 'px';
        logBox.style.top = e.clientY - TopDiffer + 'px';
    }
    logBoxHead.onmouseup = function(){
        document.onmousemove = null;
    }
}

/* 密码是否可见 */
var visible = [false,false,false];
/* 打开登录界面 */
logBtn.onclick = function(){
    login.style.display = 'block'
    logBox.style.display = "block";
}
headLoginBtn.onclick = function(){
    login.style.display = 'block'
    logBox.style.display = "block";
}

/* 关闭登录界面 */
logClose.onclick = function(){
    logBox.style.display = "none";
    regBox.style.display = "none";
}
/* 打开注册页面 */
reg.onclick = function(){
    login.style.display = 'none'
    regBox.style.display = "block";
}
/* 返回登录 */
backLog.onclick = function(){
    login.style.display = 'block'
    regBox.style.display = "none";
}

/* 给密码的按钮添加点击事件 */
for(let i=0;i<icon.length;i++){
    /* 密码是否可见 */
    icon[i].onclick = function(){
        if(!visible[i]){
            icon[i].style.background = 'url("img/visible.jpg")'
            icon[i].style.backgroundSize = '15px 10px'
            Pw[i].type = "text";
            visible[i] = true;
        }else{
            icon[i].style.background = 'url("img/unvisible.jpg")'
            icon[i].style.backgroundSize = '15px 10px'
            Pw[i].type = "password";
            visible[i] = false;
        }
    }
}

/* 验证账号是否是以1开头的11位数字 */
var box = /^1\d{10}/;
numBox.onblur = function(){
    if(!box.test(numBox.value) && numBox.value){
        numTip.style.display = "block";
    }else{
        numTip.style.display = "none";
    }
}

/* 验证是否同意协议 */
sub.onclick = checkAgree;
regBtn.onclick = checkAgree;
function checkAgree(ev){
    if(!check.checked){
        /* 阻止a跳转 */
        var e = ev || window.event;
        e.preventDefault();
        alert("请同意");
    }else{
        /* 登录 */
        loginRequest();
    }
}

/* 登录 */
var logSuc = document.getElementsByClassName("after_login")[0];
var userImg = document.getElementsByClassName("userImg")[0];
var userName = document.getElementById("userName");
var userId = null;
var app = document.getElementsByClassName("app")[0];
var infoList = document.getElementsByClassName("info_list")[0];
var infoList1 = document.getElementsByClassName("info_list")[1];
var infos = infoList.getElementsByTagName("span");
var infos1 = infoList1.getElementsByTagName("span");
var headLogImg = document.getElementsByClassName("headLogImg")[0];

/* 登录判断/请求 */
function loginRequest(){
    $ajax({
        url: 'http://musicapi.leanapp.cn/login/cellphone',
        data: {
            phone: numBox.value,
            password: Pw[0].value
        },
        success: function(result){
            /* 登录成功，显示信息 */
            userId = JSON.parse(result).account.id;
            getUserInfo(userId);

            logSuc.style.display = "block";
            headLogImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            headLogImg.style.display = "block";
            headLogImg.style.backgroundSize = '50px 50px';
            userImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            userImg.style.backgroundSize = '86px 86px';
            userName.innerHTML = JSON.parse(result).profile.nickname;
            logBox.style.display = "none";
            infos[0].innerHTML = JSON.parse(result).profile.authority;
            infos[1].innerHTML = JSON.parse(result).profile.follows;
            infos[2].innerHTML = JSON.parse(result).profile.followeds;
            /* 下载板块下移 */
            app.style.marginTop = 80 + 'px';
            /* 记住登录状态 */
            sessionStorage.setItem("telNum",numBox.value);
            sessionStorage.setItem("password",Pw[0].value);
            sessionStorage.setItem("istrue",'yes');

            /* 判断是否是在我的音乐界面登录 */
            if(page2.style.display == 'block'){
                notLogin.style.display = 'none';
                hasLogin.style.display = 'flex';
            }

            /* 加载我的音乐页面的信息 */
            page2UserImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            page2UserImg.style.backgroundSize = "30px 30px";
            page2UserName.innerHTML = JSON.parse(result).profile.nickname;
            for(var i=0;i<page2ComImg.length;i++){
                page2ComImg[i].style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
                page2ComImg[i].style.backgroundSize = "50px 50px";
            }
            /* 加载个人中心的信息 */
            userHomeImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            userHomeImg.style.backgroundSize = "180px 180px";
            infos1[0].innerHTML = JSON.parse(result).profile.authority;
            infos1[1].innerHTML = JSON.parse(result).profile.follows;
            infos1[2].innerHTML = JSON.parse(result).profile.followeds;
        }
    })
}

/* 刷新重新请求登录 */
if(sessionStorage.getItem("istrue") == 'yes'){
    numBox.value = sessionStorage.getItem("telNum");
    Pw[0].value = sessionStorage.getItem("password");
    loginRequest();
}

//-----------------------------------------------------------------

/* 注册界面 */
var register = document.getElementById("register");
var telReg = document.getElementById("tel_reg");
var telTip = document.getElementById("tel_tip");
var regPasw = register.getElementsByClassName("password");
var pasSureTip = document.getElementById("pw_sure_tip");

/* 判断手机号码格式 */
telReg.onblur = function(){
    if(!box.test(telReg.value) && telReg.value){
        telTip.style.display = "block";
    }else{
        telTip.style.display = "none";
    }
}

/* 判断两次输入得密码是否一致 */
regPasw[0].onblur = checkPasw;
regPasw[1].onblur = checkPasw;
function checkPasw(){
    if(regPasw[0].value != regPasw[1].value && regPasw[0].value && regPasw[1].value){
        pasSureTip.style.display = "block";
    }else{
        pasSureTip.style.display = "none";
    }
}

//-----------------------------------------------------------------------------------------------------
//播放歌曲

var play = hotList.getElementsByClassName("play");
var proPoint = document.getElementsByClassName("proPoint")[0];
var preSong = document.getElementsByClassName('preSong')[0];
var pause = document.getElementById("pause");
var nextSong = document.getElementsByClassName('nextSong')[0];
var inPro = document.getElementsByClassName("inPro")[0];
var inbox = document.getElementsByClassName("inbox")[0];
var outPro = document.getElementsByClassName("outPro")[0];
var totalTimeMin = document.getElementsByClassName("fullTime_min")[0];
var totalTimeSec = document.getElementsByClassName("fullTime_sec")[0];
var curTimeMin = document.getElementsByClassName("curTime_min")[0];
var curTimeSec = document.getElementsByClassName("curTime_sec")[0];
var SongImg = document.getElementById("songImg");
var closeMusicBox = document.getElementById("closeMusicBox");
var musicBox = document.getElementById("music_box");
var musicList = [];
var playIndex = 0;
var isClose = true;

var nowPlayingId = null;
var nowPlaying = null;
var isPlaying = false;
var totalTime = null;
var tim = null;
var timer = null;

/* 显示播放器 */
SongImg.onclick = function(){
    if(isClose){
        musicBox.style.display = 'block';
        isClose = false;
    }else{
        musicBox.style.display = 'none';
        isClose = true;
    }
}

/* 定义一个Audio节点来播放音乐 */
var MyAudio = document.getElementById("MyAudio");

/* 根据歌曲id播放音乐 */
function playSong(ids){
    if(nowPlaying){
        nowPlaying.currentTime = 0;
        nowPlaying.pause();
    }
    MyAudio.src = 'https://music.163.com/song/media/outer/url?id=' + ids + '.mp3';
    /* 记住正在播放的歌曲信息 */
    nowPlaying = MyAudio;
    nowPlayingId = ids;
    /* 获取歌曲总长度 */
    nowPlaying.oncanplay = function(){
        totalTime = nowPlaying.duration;
    }

    if(checkMusic(ids)){
        alert("播放失败");
    }else{
        /* 播放 */
        nowPlaying.play();
    }

    /* 显示苦瓜的歌词 */
    if(nowPlayingId == '64293'){
        initLyric();
    }else{
        lrcText.innerHTML = '';
    }

    /* 显示歌曲信息 */
    showSongInfo();

    /* 显示歌曲时间 */
    tim = setInterval(dispTime(),1000);
    /* 暂停按钮背景 */
    pause.className = "begin";
    isPlaying = true;
    /* 进度条 */
    timer = setInterval(progress(),1000);
}

/* 点击播放 */
for(let i=0;i<play.length;i++){
    play[i].onclick = function(){
        musicList[i] = Ids;
        musicList = Ids;
        playIndex = i;
        playSong(Ids[i]);
    }
}

/* 播放的时候有白色阴影 */
setInterval(function(){
    if(isPlaying){
        SongImg.style.boxShadow = '0 0 20px white';
        AudioHtmlImg.style.boxShadow = '0 0 20px white';
    }else{
        SongImg.style.boxShadow = 'none';
        AudioHtmlImg.style.boxShadow = 'none';
    }
},100);

//显示歌曲信息
function showSongInfo(){
    $ajax({
        url: 'http://musicapi.leanapp.cn/song/detail',
        data: {
            ids: nowPlayingId
        },
        success: function(result){
            /* 引入图片 */
            SongImg.style.background = 'url(' + JSON.parse(result).songs[0].al.picUrl + ')';
            SongImg.style.backgroundSize = '70px 70px';
            AddAudioHtmlinfo(result);
            /* 写入歌名 */
            songName1.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
            songName2.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
            /* 开始另一首歌时，歌名回到原点 */
            songName1.style.left = 0;
            songName2.style.left = -songNameBox.offsetWidth + 'px';
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

/* 添加大播放器的图片和歌名 */
function AddAudioHtmlinfo(result){
    AudioHtmlImg.style.background = 'url(' + JSON.parse(result).songs[0].al.picUrl + ')';
    AudioHtmlImg.style.backgroundSize = "330px 330px";
    AduioHtmlSongName.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
}

/* 歌曲名字循环移动 */
setInterval(function(){
    var a = songName1.offsetLeft;
    var b = songName2.offsetLeft;
    a += 5;
    b += 5;
    /* 判断歌名位置 */
    if(a >= songNameBox.offsetWidth){
        a = -songNameBox.offsetWidth;
    }
    if(b >= songNameBox.offsetWidth){
        b = -songNameBox.offsetWidth;
    }
    songName1.style.left = a + 'px';
    songName2.style.left = b + 'px';
}, 100)

/* 按暂停键 */
pause.onclick = stop;
function stop(){
    if(isPlaying){
        clearInterval(timer);
        nowPlaying.pause();
        pause.className = "pause";
        isPlaying = false;
    }else{
        /* 判断当前是否在播放，是则暂停，否则无效 */
        if(nowPlaying){
            timer = setInterval(progress,1000);
            nowPlaying.play();
            pause.className = "begin";
            isPlaying = true;
        }
    }
}

/* 进度条拖拽 */
proPoint.onmousedown = function(){
    /* 用document可以在进度条外拖拽 */
    document.onmousemove = function(ev){
        var e = ev || window.event;
        var toLeft = e.clientX - outPro.offsetLeft;
        /* 控制进度条范围 */
        if(toLeft <= 0){
            toLeft = 0;
        }else if(toLeft >= outPro.offsetWidth){
            toLeft = outPro.offsetWidth;
        }
        /* 使圆点中心对齐初始位置 */
        proPoint.style.left = toLeft - 6 + 'px';
        inPro.style.width = toLeft + 'px';
        if(nowPlaying){
            nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
        }
    }
    /* 抬起鼠标按键之后，赋空 */
    document.onmouseup = function(){
        document.onmousemove = null;
    }
}

/* 显示歌曲时间 */
function dispTime(){
    var fullMin = parseInt(totalTime / 60);
    var fullSec = parseInt(totalTime % 60);
    var curMin = parseInt(nowPlaying.currentTime / 60);
    var curSec = parseInt(nowPlaying.currentTime % 60);
    checkTime(totalTimeMin, fullMin);
    checkTime(totalTimeSec, fullSec);
    checkTime(curTimeMin, curMin);
    checkTime(curTimeSec, curSec);
    return dispTime;
}

/* 检查时间是否为两位数，只有一位则在前面加个0 */
function checkTime(a,b){
    if(b < 10){
        a.innerHTML = '0' + b;
    }else{
        a.innerHTML = b;
    }
}

//进度条
function progress(){
    /* 当前时间与总时间的比例 */
    var n = nowPlaying.currentTime / totalTime;
    var Length = n * outPro.offsetWidth;
    proPoint.style.left = Length - 6 + 'px';
    inPro.style.width = Length + 'px';
    /* 判断是否结束 */
    if(MyAudio.ended){
        inPro.style.width = 0;
        proPoint.style.left = 0;
        stop();
        nowPlaying.currentTime = 0;
        dispTime();
    }
    return progress;
}

/* 点击进度条 */
inbox.onclick = function(ev){
    var e = ev || window.event;
    /* 获取鼠标位置与进度条最左边的距离 */
    var toLeft = e.clientX - outPro.offsetLeft;
    proPoint.style.left = toLeft - 6 + 'px';
    inPro.style.width = toLeft + 'px';
    nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
}

/* 调节音量 */
var volume = document.getElementById("volume");
var mute = document.getElementsByClassName('volume_pic')[0];
var isMute = false;

MyAudio.volume = volume.value / 100;
/* 当按下音量 */
volume.onmousedown = function(){
    volume.onmousemove = function(){
        MyAudio.volume = volume.value / 100;
        changeMuteBg();
    }
    MyAudio.volume = volume.value / 100;
    changeMuteBg();
}

/* 静音 */
var curSound = volume.value;
mute.onclick = function(){
    if(!isMute){
        curSound = volume.value;
        volume.value = 0;
        MyAudio.volume = 0;
        isMute = true;
        changeMuteBg();
    }else{
        volume.value = curSound;
        MyAudio.volume = curSound / 100;
        isMute = false;
        changeMuteBg();
    }
}

/* 更换静音背景 */
function changeMuteBg(){
    if(MyAudio.volume == 0){
        mute.style.backgroundPosition = '-104px -69px';
    }else{
        mute.style.backgroundPosition = '-2px -248px';
    }
}

/* 播放顺序 */
var playOrder = document.getElementById('playOrder');
var playOrderValue = 0;
/* 默认顺序播放 */
MyAudio.addEventListener('ended', playNext, false);
playOrder.className = 'order';

/* 播放顺序 */
playOrder.onclick = function(){
    playOrderValue = ++playOrderValue % 3;
    if(playOrderValue == 0){
        /* 顺序播放 */
        MyAudio.loop = '';
        /* 清除随机播放的事件监听 */
        MyAudio.removeEventListener('ended', playRandom, false);
        MyAudio.addEventListener('ended', playNext, false);
        playOrder.className = 'order';
    }else if(playOrderValue == 1){
        //单曲循环
        MyAudio.loop = 'loop';
        playOrder.className = 'singleCycle';
    }else{
        //随机播放
        MyAudio.loop = ''
        /* 清除顺序播放的事件监听 */
        MyAudio.removeEventListener('ended', playNext, false);
        MyAudio.addEventListener('ended', playRandom, false);
        playOrder.className = 'random';
    }
}

/* 上一首 */
preSong.onclick = function(){
    if(playOrderValue == 0 || playOrderValue == 1){
        playPreSong();
    }else{
        playRandom();
    }
}

/* 下一首 */
nextSong.onclick = function(){
    if(playOrderValue == 0 || playOrderValue == 1){
        playNext();
    }else{
        playRandom();
    }
}

function playPreSong(){
    do{
        playIndex = (--playIndex < 0) ? musicList.length - 1 : playIndex;
    }while(checkMusic(musicList[playIndex]))
    playSong(musicList[playIndex]);
}

/* 顺序播放播放下一首 */
function playNext(){
    do{
        playIndex = (++playIndex > musicList.length - 1) ? 0 : playIndex;
    }while(checkMusic(musicList[playIndex]))
    playSong(musicList[playIndex]);
}

/* 随机播放下一首 */
function playRandom(){
    do{
        playIndex = parseInt(Math.random()*musicList.length);
    }while(checkMusic(musicList[playIndex]))
    playSong(musicList[playIndex]);
}

/* 检查id是否可用 */
function checkMusic(Id){
    $ajax({
        url: 'http://musicapi.leanapp.cn/check/music',
        data: {
            id: Id
        },
        success: function(result){
            if(JSON.parse(result).success){
                return false;
            }
            return true;
        },
        error: function(msg){
            console.log(msg);
        }
    })
}


/* 收藏歌曲 */
// var searchLike = searchResultList.getElementsByClassName('likeThisMusic');
// var topList1Like = topList1.getElementsByClassName('likeThisMusic');
// var topList2Like = topList2.getElementsByClassName('likeThisMusic');
// var topList3Like = topList3.getElementsByClassName('likeThisMusic');
// var playSongsListLike = playSongsList.getElementsByClassName('likeThisMusic');

function likeMusic(Id, bool){
    $ajax({
        url: 'http://musicapi.leanapp.cn/like',
        data: {
            id: Id,
            like: bool
        },
        success: function(result){
            console.log(JSON.parse(result));
        },
        error: function(msg){
            console.log(msg);
        }
    })
}


//----------------------------------------------------------------------------

//排行榜
var topName = document.getElementsByClassName("topName");
var topImg = document.getElementsByClassName("topImg");
var topList1 = document.getElementsByClassName("top_list1")[0];
var topList2 = document.getElementsByClassName("top_list2")[0];
var topList3 = document.getElementsByClassName("top_list3")[0];
var topName1 = topList1.getElementsByTagName("b");
var topName2 = topList2.getElementsByTagName("b");
var topName3 = topList3.getElementsByTagName("b");
var topSongName1 = topList1.getElementsByClassName("name");
var topSongName2 = topList2.getElementsByClassName("name");
var topSongName3 = topList3.getElementsByClassName("name");
var topSongPlay1 = topList1.getElementsByClassName("play");
var topSongPlay2 = topList2.getElementsByClassName("play");
var topSongPlay3 = topList3.getElementsByClassName("play");
var songNameBox = document.getElementsByClassName("songNameBox")[0];
var songName1 = document.getElementById("songName1");
var songName2 = document.getElementById("songName2");

/* 添加排行榜里的信息，播放排行榜的歌曲 */
//第一个排行榜
$ajax({
    url: 'http://musicapi.leanapp.cn/top/list',
    data: {
        idx: 0
    },
    success: function(result){
        topName[0].innerHTML = JSON.parse(result).playlist.name;
        topImg[0].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
        topImg[0].style.backgroundSize = '80px 80px';
        for(let i=0;i<topSongName1.length;i++){
            /* 写入歌名 */
            topSongName1[i].innerHTML = JSON.parse(result).playlist.tracks[i].name;
            /* 点击播放 */
            topSongPlay1[i].onclick = function(){
                playTop(i,result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

//第二个排行榜
$ajax({
    url: 'http://musicapi.leanapp.cn/top/list',
    data: {
        idx: 1
    },
    success: function(result){
        topName[1].innerHTML = JSON.parse(result).playlist.name;
        topImg[1].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
        topImg[1].style.backgroundSize = '80px 80px';
        for(let i=0;i<topSongName2.length;i++){
            topSongName2[i].innerHTML = JSON.parse(result).playlist.tracks[i].name;
            topSongPlay2[i].onclick = function(){
                playTop(i,result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

//第三个排行榜
$ajax({
    url: 'http://musicapi.leanapp.cn/top/list',
    data: {
        idx: 3
    },
    success: function(result){
        topName[2].innerHTML = JSON.parse(result).playlist.name;
        topImg[2].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
        topImg[2].style.backgroundSize = '80px 80px';
        for(let i=0;i<topSongName3.length;i++){
            topSongName3[i].innerHTML = JSON.parse(result).playlist.tracks[i].name;
            topSongPlay3[i].onclick = function(){
                playTop(i,result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

/* 点击排行榜形成播放列表并播放 */
function playTop(i,result){
    /* 赋空播放列表 */
    musicList = [];
    /* 形成新的播放列表 */
    for(var j=0;j<JSON.parse(result).playlist.trackIds.length;j++){
        musicList[j] = JSON.parse(result).playlist.trackIds[j].id;
    }
    /* 当前歌曲在播放列表的序号 */
    playIndex = i;
    topPlaySong(i, result);
    showSongInfo();
}

/* 播放排行榜的歌曲 */
function topPlaySong(i,result){
    playSong(JSON.parse(result).playlist.tracks[i].id);
    
    /* 获取图片 */
    SongImg.style.background = 'url(' + JSON.parse(result).playlist.tracks[i].al.picUrl + ')';
    SongImg.style.backgroundSize = '70px 70px';
    /* 填充歌曲信息 */
    songName1.innerHTML = JSON.parse(result).playlist.tracks[i].name + " - " + JSON.parse(result).playlist.tracks[i].ar[0].name;
    songName2.innerHTML = JSON.parse(result).playlist.tracks[i].name + " - " + JSON.parse(result).playlist.tracks[i].ar[0].name;
    
    /* 开始另一首歌时，歌名回到原点 */
    songName1.style.left = 0;
    songName2.style.left = -songNameBox.offsetWidth + 'px';
}

//---------------------------------------------------------------------------

/* Mv */
var MvList = document.getElementsByClassName("Mv_list")[0];
var MvLis = MvList.getElementsByTagName("li");
var MvLisDetails = MvList.getElementsByClassName("details");
var MvPlay = MvList.getElementsByClassName('MvPlay');
var MvLink = MvList.getElementsByTagName('a');
/* 获取推荐Mv */
$ajax({
    url: 'http://musicapi.leanapp.cn/personalized/mv',
    success: function(result){
        for(let i=0;i<MvLis.length;i++){
            MvLis[i].style.background = 'url(' + JSON.parse(result).result[i].picUrl + ')';
            MvLis[i].style.backgroundSize = "180px 100px";
            MvLisDetails[i].innerHTML = JSON.parse(result).result[i].name;
            MvId = JSON.parse(result).result[i].id;
            /* 获取Mv链接，播放Mv */
            Mv(i,MvId);
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

/* 获取Mv链接，播放Mv */
function Mv(i, MvId){
    $ajax({
        url: 'http://musicapi.leanapp.cn/mv/detail',
        data: {
            mvid: MvId
        },
        success: function(result){
            MvLink[i].href = JSON.parse(result).data.brs[720];
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

//-------------------------------------------------------------------------------

//热门电台
var anchor = document.getElementsByClassName('anchor')[0];
var anchorList = anchor.getElementsByClassName('anchor_list')[0];
var anchorLis = anchorList.getElementsByTagName('li');
var anchorPic = anchorList.getElementsByClassName('pic');
var anchorName = anchorList.getElementsByClassName('name');
var anchorIntro = anchorList.getElementsByClassName('intro');

/* 获取热门电台 */
$ajax({
    url:'http://musicapi.leanapp.cn/dj/hot',
    success: function(result){
        for(var i=0;i<anchorLis.length;i++){
            anchorPic[i].style.background = 'url(' + JSON.parse(result).djRadios[i].picUrl + ')';
            anchorPic[i].style.backgroundSize = '40px 40px';
            anchorName[i].innerHTML = JSON.parse(result).djRadios[i].name;
            anchorIntro[i].innerHTML = JSON.parse(result).djRadios[i].rcmdtext;
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

//-------------------------------------------------------------------------------------------

/* 搜索 */
var search = document.getElementById("search");
var searchList = document.getElementsByClassName("search_list");
var searchSinger = searchList[0].getElementsByTagName("dd");
var searchSong = searchList[1].getElementsByTagName("dd");
var searchMv = searchList[2].getElementsByTagName("dd");
var searchBox = document.getElementsByClassName("search_box")[0];
var searchLink = searchBox.getElementsByTagName("a");
/* 搜索结果界面 */
var searchResultBox = document.getElementsByClassName('searchResultBox')[0];
var searchSongName = searchResultBox.getElementsByClassName('searchSongName')[0];
var searchResultNum = searchResultBox.getElementsByClassName('searchResultNum')[0];
var searchResultList = document.getElementById('searchResultList');
var searchResultLis = searchResultList.getElementsByClassName('searchResultLis');
var searchResultsongOrder = searchResultList.getElementsByClassName('songOrder');
var searchResultSongName = searchResultList.getElementsByClassName('songName');
var searchResultSongLength = searchResultList.getElementsByClassName('songLength');
var searchResultSinger = searchResultList.getElementsByClassName('Singer');
var searchResultAlbum = searchResultList.getElementsByClassName('Album');
var searchResultAudio = searchResultList.getElementsByClassName('searchAudio');
var searchResultPlay = searchResultList.getElementsByClassName('palyIcon');
/* 搜索按钮 */
var searchSongBtn = document.getElementById('searchSong');
var closesearchResultBox = document.getElementById('closesearchResultBox');

/* 关闭搜索结果页面 */
closesearchResultBox.onclick = function(){
    page1.style.display = 'block';
    searchResultBox.style.display = 'none';
}

/* 搜索 */
search.onkeyup = function(){
    if(search.value){
        searchBox.style.display = 'block';
    }
    if(search.value){
        $ajax({
            url: 'http://musicapi.leanapp.cn/search/suggest',
            data: {
                keywords: search.value,
                type: 1
            },
            success: function(result){
                /* 歌手 */
                for(var i=0;i<3;i++){
                    if(JSON.parse(result).result.artists && JSON.parse(result).result.artists[i] && JSON.parse(result).result.artists[i].name){
                        searchSinger[i].innerHTML = JSON.parse(result).result.artists[i].name;
                        searchLink[i].href = 'https://music.163.com/artist?id=' + JSON.parse(result).result.artists[i].id;
                    }
                }
                
                for(var i=0;i<2;i++){
                    /* 专辑 */
                    if(JSON.parse(result).result.albums && JSON.parse(result).result.albums[i].name && JSON.parse(result).result.albums[i].artist.name){
                        searchSong[i].innerHTML = JSON.parse(result).result.albums[i].name + '-' + JSON.parse(result).result.albums[i].artist.name;
                        searchLink[i+3].href = 'https://music.163.com/album?id=' + JSON.parse(result).result.albums[i].id;
                    }
                    /* mv */
                    if(JSON.parse(result).result.mvs && JSON.parse(result).result.mvs[i] && JSON.parse(result).result.mvs[i].name){
                        searchMv[i].innerHTML = JSON.parse(result).result.mvs[i].name + '-' + JSON.parse(result).result.mvs[i].artistName;
                        searchLink[i+5].href = 'https://music.163.com/mv?id=' + JSON.parse(result).result.mvs[i].id;
                    }
                }
                /* 点击搜索歌曲 */
                searchSongBtn.onclick = function(){
                    page1.style.display = 'none';
                    page2.style.display = 'none';
                    userHome.style.display = 'none';
                    searchResultBox.style.display = 'block';
                    SearchSongs(result);
                }
            },
            error: function(msg){
                console.log(msg);
            }
        })
    }
}

/* 搜索歌曲 */
function SearchSongs(result){
    searchSongName.innerText = search.value;
    searchResultNum.innerText = 0;
    if(!JSON.parse(result).result.songs[0].name){
        playSongsListBox.innerText = '搜索不到';
        searchResultNum.innerText = 0;
    }else{
        searchResultNum.innerText = JSON.parse(result).result.songs.length;
        searchResultList.innerHTML = searchResultLis[0].outerHTML;
        songIds=[];
        for(let i=0;i<JSON.parse(result).result.songs.length;i++){
            if(i>0){
                let newNode = searchResultLis[0].cloneNode(true);
                searchResultList.appendChild(newNode);
            }
            /* 单数行变色 */
            if(i % 2 == 1){
                searchResultLis[i].style.background = 'lightcyan'
            }
            searchResultsongOrder[i].innerHTML = i+1;
            searchResultSongName[i].innerText = JSON.parse(result).result.songs[i].name;
            songIds[i] = JSON.parse(result).result.songs[i].id;
            searchResultAudio[i].src = 'https://music.163.com/song/media/outer/url?id=' + songIds[i] + '.mp3';
            /* 歌曲时间 */
            searchResultAudio[i].oncanplay = function(){
                if(parseInt(searchResultAudio[i].duration % 60) < 10){
                    var sec = '0' + parseInt(searchResultAudio[i].duration % 60);
                }else{
                    sec = parseInt(searchResultAudio[i].duration % 60);
                }
                searchResultSongLength[i].innerText = parseInt(searchResultAudio[i].duration / 60) + ':' + sec;
            }
            searchResultSinger[i].innerText = JSON.parse(result).result.songs[i].artists[0].name;
            searchResultAlbum[i].innerText = JSON.parse(result).result.songs[i].album.name;
            
            searchResultPlay[i].onclick = function(){
                playSong(songIds[i]);
            }
        }
    }
}

/* 当搜索框失去焦点 */
search.onblur = function(){
    document.onclick = function(){
        searchBox.style.display = 'none';
        search.value = '';
    }
}

//-----------------------------------------------------------------------------------

/* 自定义播放器界面 */
var AudioHtmlBg = document.getElementsByClassName("bfq")[0];
var AudioHtml = document.getElementById("AudioHtml");
var AudioClose = document.getElementsByClassName('AudioClose')[0];
var AudioHtmlImg = document.getElementsByClassName('AudioHtmlImg')[0];
var AduioHtmlSongName = document.getElementsByClassName('AduioHtmlSongName')[0];
var lrc = document.getElementsByClassName('lrc')[0];

/* 双击底部播放图片打开 */
SongImg.ondblclick = function(){
    AudioHtmlBg.style.display = 'block';
    AudioHtml.style.display = 'flex';
    musicBox.style.display = 'flex';
    musicBox.style.background = 'black';
    musicBox.style.height = 72 + 'px';
    SongImg.style.display = 'none';
    inbox.style.background = 'white';
    document.body.style.overflow = 'hidden';
}

/* 关闭自定义播放器页面 */
AudioClose.onclick = function(){
    AudioHtmlBg.style.display = 'none';
    AudioHtml.style.display = 'none';
    SongImg.style.display = 'block';
    musicBox.style.height = 50 + 'px';
    musicBox.style.background = 'rgba(0, 0, 0, .5)';
    inbox.style.background = 'black';
    document.body.style.overflow = 'visible';
}

/* 发现音乐按钮 */
var firstPage = document.getElementById('firstPage');
/* 发现音乐页面 */
var page1 = document.getElementsByClassName('page1')[0];
/* 我的音乐页面 */
var page2 = document.getElementsByClassName('page2')[0];
/* 我的音乐按钮 */
var MyMusic = document.getElementById('MyMusic');
var pleaseLoginBtn = document.getElementsByClassName('pleaseLoginBtn')[0];
var MyMusicLeft = document.getElementsByClassName('MyMusicLeft')[0];
/* 我的音乐未登录界面 */
var notLogin = page2.getElementsByClassName('notLogin')[0];
/* 我的音乐已登录页面 */
var hasLogin = document.getElementsByClassName('hasLogin')[0];
var page2UserImg = page2.getElementsByClassName('MyMusicUserImg')[0];
var page2UserName = page2.getElementsByClassName('MyMusicUserName')[0];
var page2ComImg = page2.getElementsByClassName('MyCommentImg');
var secNav = document.getElementsByClassName('sec_nav')[0];
var headMenu = document.getElementsByClassName('head_menu')[0];
var headMenuLis = headMenu.getElementsByTagName('li');

/* 点击我的音乐 */
MyMusic.onclick = function(){
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

/* 我的音乐页面未登录时的登录按钮 */
pleaseLoginBtn.onclick = function(){
    login.style.display = 'block'
    logBox.style.display = "block";
}

/* 清除active */
function clearHeadMenuLisActive(){
    for(var i=0;i<headMenuLis.length;i++){
        headMenuLis[i].className = '';
    }
}

/* 我的音乐界面 */
var allPlayList = document.getElementsByClassName('MyMusicLeft')[0].getElementsByTagName('li');
var myPlayList = document.getElementById('myPlayList');
var myPlayLis = myPlayList.getElementsByTagName('li');
var collectPlayList = document.getElementById('collectPlayList');
var collectPlayLis = collectPlayList.getElementsByTagName('li');

var PlayListPic = document.getElementsByClassName('myPlayListPic');
var page2PlayListPic = document.getElementsByClassName('page2PlayListPic')[0];
var playListName = document.getElementsByClassName('playListName');
var myPlayListName = document.getElementsByClassName('myPlayListName')[0];
var createTime = document.getElementsByClassName('createTime')[0];
var palyListSongNum = document.getElementsByClassName('palyListSongNum');
var songNum = document.getElementsByClassName('songNum')[0];
var playTime = document.getElementsByClassName('playTime')[0];
var playListId = [];
var playSongsList = document.getElementsByClassName('playSongsList')[0];
var playSongsLis = playSongsList.getElementsByClassName('playSongsLis');
var songOrder = playSongsList.getElementsByClassName('songOrder');
var palyIcon = playSongsList.getElementsByClassName('palyIcon');
var playListAudio = playSongsList.getElementsByClassName('playListAudio');
var myMusicFuncPlay = document.getElementsByClassName('MyMusicFuncList')[0].getElementsByTagName('li')[0];

var levelNum = document.getElementsByClassName('levelNum')[0];

/* 个人中心 */
var userHome = document.getElementsByClassName('userHome')[0];
var userHomeImg = document.getElementsByClassName('userHomeImg')[0];

/* 点击导航栏右边的用户头像*/
headLogImg.onclick = function(){
    userHome.style.display = 'flex';
    page1.style.display = 'none';
    page2.style.display = 'none';
    clearHeadMenuLisActive();
    secNav.style.display = 'none';
    head.style.borderBottom = '2px solid rgb(105, 156, 173)';
}

/* 获取用户信息 */
function getUserInfo(userId){
    $ajax({
        url: 'http://musicapi.leanapp.cn/user/detail',
        data: {
            uid: userId
        },
        success: function(result){
            levelNum.innerText = JSON.parse(result).level;
        },
        error: function(msg){
            console.log(msg);
        }
    })

    /* 获取歌单信息 */
    $ajax({
        url: 'http://musicapi.leanapp.cn/user/playlist',
        data: {
            uid: userId
        },
        success: function(result){
            createTime.innerHTML = timestampToDate(JSON.parse(result).playlist[0].createTime) + '创建';
            myPlayListName.innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
            for(let i=0;i<JSON.parse(result).playlist.length;i++){
                /* 判断歌单是否是自己创建的 */
                if(JSON.parse(result).playlist[i].userId == userId && i>0 && (mySongSheetLis.length+collectSongSheetLis.length) < JSON.parse(result).playlist.length){
                    let newNode = mySongSheetLis[0].cloneNode(true);
                    mySongSheetList.appendChild(newNode);
                    let NewNode = myPlayLis[0].cloneNode(true);
                    myPlayList.appendChild(NewNode);
                }else if(JSON.parse(result).playlist[i].userId != userId && i>0 && (mySongSheetLis.length+collectSongSheetLis.length) < JSON.parse(result).playlist.length){
                    let newNode = collectSongSheetLis[0].cloneNode(true);
                    collectSongSheetList.appendChild(newNode);
                    let NewNode = collectPlayLis[0].cloneNode(true);
                    collectPlayList.appendChild(NewNode);
                }
                mySongSheetNum.innerText = mySongSheetLis.length;
                collectSongSheetNum.innerText = collectSongSheetLis.length;
                allSongSheetPic[i].style.background = 'url(' + JSON.parse(result).playlist[i].coverImgUrl + ')';
                allSongSheetPic[i].style.backgroundSize = '120px 120px';
                allSongSheetInfo[i].innerText = JSON.parse(result).playlist[i].name;

                /* 歌单照片 */
                PlayListPic[i].style.background = 'url(' + JSON.parse(result).playlist[i].coverImgUrl + ')';
                PlayListPic[i].style.backgroundSize = '50px 50px';
                page2PlayListPic.style.background = 'url(' + JSON.parse(result).playlist[0].coverImgUrl + ')';
                page2PlayListPic.style.backgroundSize = '160px 160px';

                /* 歌单名字 */
                playListName[0].innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
                playListName[i].innerText = JSON.parse(result).playlist[i].name;
                palyListSongNum[i].innerText = JSON.parse(result).playlist[i].trackCount;
                songNum.innerText = palyListSongNum[0].innerText + "首歌";
                playTime.innerText = JSON.parse(result).playlist[0].totalDuration + '分钟';
                playListId[i] = JSON.parse(result).playlist[i].id;

                /* 点击我的音乐里的歌单 */
                allPlayList[i].onclick = function(){
                    /* 先删除节点 */
                    playSongsList.innerHTML = playSongsLis[0].outerHTML;
                    playListDetail(playListId[i]);
                    page2PlayListPic.style.background = 'url(' + JSON.parse(result).playlist[i].coverImgUrl + ')';
                    page2PlayListPic.style.backgroundSize = '160px 160px';
                    createTime.innerHTML = timestampToDate(JSON.parse(result).playlist[i].createTime) + '创建';
                    playTime.innerText = JSON.parse(result).playlist[i].totalDuration + '分钟';
                    if(i == 0){
                        getPlayListComment(playListId[0]);
                        myPlayListName.innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
                        playListName[0].innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
                    }else{
                        getPlayListComment(playListId[i]);
                        myPlayListName.innerText = JSON.parse(result).playlist[i].name;
                    }
                    /* 歌单数量和听歌时间 */
                    songNum.innerText = palyListSongNum[i].innerText + "首歌";
                    playTime.innerText = JSON.parse(result).playlist[i].totalDuration + '分钟';
                    playListId[i] = JSON.parse(result).playlist[i].id;
                }
            }
            playListDetail(playListId[0]);
            /* 一开始获取我喜欢的音乐的评论 */
            getPlayListComment(playListId[0]);
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

/* 按播放在第一首歌开始播放 */
myMusicFuncPlay.onclick = function(){
    playSong(songIds[0]);
}

/* 将时间截化为时间 */
function timestampToDate(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var H = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    var Now = new Date();
    if((Y == Now.getFullYear())){
        /* 今天内 */
        if((M == Now.getMonth()+1) && D == Now.getDate()){
            return '今天 ' + H + ':' + m;
        }else{
            return M + '-' + D;
        }
    }
    return Y + '-' + M + '-' + D;
}

/* 歌单中歌曲的id */
var songIds = [];
/* 创建的歌单 */
var mySongSheetBox = document.getElementById('mySongSheetBox');
var mySongSheetList = document.getElementById('mySongSheetList');
var mySongSheetLis = mySongSheetList.getElementsByTagName('li');
var mySongSheetInfo = mySongSheetList.getElementsByClassName('songSheetInfo');
var mySongSheetNum = mySongSheetBox.getElementsByClassName('songSheetNum')[0];
/* 收藏的歌单 */
var myCollectSongSheetBox = document.getElementById('myCollectSongSheetBox');
var collectSongSheetList = document.getElementById('collectSongSheetList');
var collectSongSheetLis = collectSongSheetList.getElementsByTagName('li');
var collectSongSheetInfo = collectSongSheetList.getElementsByClassName('songSheetInfo');
var collectSongSheetNum = myCollectSongSheetBox.getElementsByClassName('songSheetNum')[0];
/* 所有歌单 */
var allSongSheetPic = userHome.getElementsByClassName('songSheetPic');
var allSongSheetInfo = userHome.getElementsByClassName('songSheetInfo');

/* 歌单信息 */
function playListDetail(playListId){
    $ajax({
        url: 'http://musicapi.leanapp.cn/playlist/detail',
        data: {
            id: playListId
        },
        success: function(result){
            /* 赋空歌单里歌曲的id */
            
            songIds = [];
            for(let i=0;i<JSON.parse(result).playlist.trackCount;i++){
                /* 动态克隆节点 */
                if(i>0 && playSongsLis.length < JSON.parse(result).playlist.trackCount){
                    let newNode = playSongsLis[0].cloneNode(true);
                    playSongsList.appendChild(newNode);
                }
                /* 单数行变色 */
                if(i % 2 == 1){
                    playSongsLis[i].style.background = 'lightcyan';
                }

                /* 添加歌单上歌曲信息 */
                songIds[i] = JSON.parse(result).playlist.tracks[i].id;
                playSongsLis[i].getElementsByClassName('songName')[0].innerText = JSON.parse(result).playlist.tracks[i].name;
                playListAudio[i].src = 'https://music.163.com/song/media/outer/url?id=' + songIds[i] + '.mp3';
                playListAudio[i].oncanplay = function(){
                    if(parseInt(playListAudio[i].duration % 60) < 10){
                        var sec = '0' + parseInt(playListAudio[i].duration % 60);
                    }else{
                        sec = parseInt(playListAudio[i].duration % 60);
                    }
                    playSongsLis[i].getElementsByClassName('songLength')[0].innerText = parseInt(playListAudio[i].duration / 60) + ':' + sec;
                }
                playSongsLis[i].getElementsByClassName('Singer')[0].innerText = JSON.parse(result).playlist.tracks[i].ar[0].name;
                playSongsLis[i].getElementsByClassName('Album')[0].innerText = JSON.parse(result).playlist.tracks[i].al.name;
                songOrder[i].innerText = i+1;
                palyIcon[i].onclick = function(){
                    /* 赋空播放列表 */
                    musicList = [];
                    /* 形成新的播放列表 */
                    for(var j=0;j<JSON.parse(result).playlist.trackIds.length;j++){
                        musicList[j] = JSON.parse(result).playlist.trackIds[j].id;
                    }
                    playIndex = i;
                    playSong(songIds[i]);
                }
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

/* 评论 */
var newCommentList = document.getElementsByClassName('newCommentList')[0];
var newCommentLis = newCommentList.getElementsByTagName('li');
var CommentImg = newCommentList.getElementsByClassName('MyCommentImg');
var newCommentUserName = newCommentList.getElementsByClassName('newCommentUserName');
var newCommentText = newCommentList.getElementsByClassName('newCommentText');
var commentSentTime = newCommentList.getElementsByClassName('commentSentTime');
var likeNum = newCommentList.getElementsByClassName('likeNum');
var reply = newCommentList.getElementsByClassName('reply');

var MyCommentText = document.getElementsByClassName('MyCommentText')[0];
var sentComment = document.getElementsByClassName('sentComment')[0];

/* 获取评论 */
function getPlayListComment(playListId){
    $ajax({
        url: 'http://musicapi.leanapp.cn/comment/playlist',
        data: {
            id: playListId,
        },
        success: function(result){
            /* 没有评论 */
            if(JSON.parse(result).comments.length == 0){
                newCommentList.style.display = 'none';
            }
            newCommentList.innerHTML = newCommentLis[0].outerHTML;
            for(let i=0; i<JSON.parse(result).comments.length; i++){
                if(i > 0 && newCommentLis.length < JSON.parse(result).comments.length){
                    var newNodeList = document.createElement('ul');
                    var newNode = newCommentLis[0].cloneNode(true);
                    newNodeList.appendChild(newNode);
                    newCommentList.appendChild(newNodeList);
                }
                CommentImg[i].style.background = 'url(' + JSON.parse(result).comments[i].user.avatarUrl; + ')';
                CommentImg[i].style.backgroundSize = '50px 50px';
                newCommentUserName[i].innerText = JSON.parse(result).comments[i].user.nickname;
                newCommentText[i].innerText = JSON.parse(result).comments[i].content;
                commentSentTime[i].innerText = timestampToDate(JSON.parse(result).comments[i].time);
                // console.log(commentSentTime)
                likeNum[i].innerText = JSON.parse(result).comments[i].likedCount;
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

/* 获取听歌记录 */
function getUserRecord(userId, Type){
    $ajax({
        url: 'http://musicapi.leanapp.cn/user/record',
        data: {
            uid: userId,
            type: Type
        },
        success: function(result){
            console.log(userId);
            console.log(JSON.parse(result));
        },
        error: function(msg){
            console.log(msg);
        }
    })
}


// var like = document.getElementsByClassName('like')
// var isLike = false;

// function likesth(Id, T, Type){
//     $ajax({
//         url: 'http://musicapi.leanapp.cn/comment/like',
//         data: {
//             cid: Id,
//             t: T,
//             type: Type
//         },
//         success: function(result){
//             console.log(JSON.parse(result));
//         },
//         error: function(msg){
//             console.log(msg);
//         }
//     })
// }


// /* 发送评论 */
// function comment(T,Type,Ids, Content){
//     $ajax({
//         url: 'http://musicapi.leanapp.cn/comment',
//         data: {
//             t: T,
//             type: Type,
//             id: Ids,
//             content: Content,
//         },
//         success: function(result){
//             console.log(JSON.parse(result));
//         },
//         error: function(msg){
//             console.log(msg);
//         }
//     })
// }


/* 苦瓜歌词（js的接口用不了，只做一首歌的歌词） */
var Songlyric = [{
    "songStatus": 3,
    "lyricVersion": 23,
    "lyric": "[00:02.529]作曲：章霈迎\n[00:03.529]作词：黄伟文\n[00:04.529]编曲：章霈迎\n[00:05.529]监制：舒文\n[00:20.529]共你干杯再举箸 突然间相看莞尔\n[00:27.519]盘中透着那味儿\n[00:30.748]大概今生有些事 是提早都不可以\n[00:37.898]明白其妙处\n[00:39.899]就像你当日痛心她回绝一番美意\n[00:44.928]怎发现你从情劫亦能学懂开解与宽恕\n[00:52.589]也像我很纠结的公事\n[00:55.828]此际回头看 原来并没有事\n[01:00.958]真想不到当初我们也讨厌吃苦瓜\n[01:06.189]今天竟吃得出那睿智愈来愈记挂\n[01:11.589]开始时捱一些苦 栽种绝处的花\n[01:16.429]幸得艰辛的引路甜蜜不致太寡\n[01:21.598]青春的快餐只要求快不理哪一家\n[01:26.980]哪有玩味的空档来欣赏细致淡雅\n[01:31.819]到大悟大彻将虎咽的升华 等消化学沏茶\n[01:38.478]至共你觉得苦也不太差\n[01:46.589]\n[01:58.787]下半生竟再开学 入迷的终於醒觉\n[02:05.980]移走最後的死角\n[02:09.099]用痛苦烘托欢乐 让余甘彰显险恶\n[02:16.280]如艺坛杰作\n[02:18.129]就像我一直听香夭从未沾湿眼角\n[02:23.259]仔细地看神坛里木纹什麽精巧也不觉\n[02:30.899]却在某萧瑟晚秋深夜\n[02:34.239]忽尔明了了 而黄叶便碎落\n[02:39.239]真想不到当初我们也讨厌吃苦瓜\n[02:44.690]今天竟吃得出那睿智愈来愈记挂\n[02:49.699]开始时捱一些苦 栽种绝处的花\n[02:55.069]幸得艰辛的引路甜蜜不致太寡\n[03:00.290]青春的快餐只要求快不理哪一家\n[03:04.998]哪有玩味的空档来欣赏细致淡雅\n[03:10.149]到大悟大彻将虎咽的升华 等消化学沏茶\n[03:16.489]至共你觉得苦也不太差\n[03:26.299]做人没有苦涩可以吗\n[03:30.999]真想不到当初我们也讨厌吃苦瓜\n[03:36.199]当睇清世间所有定理又何用再怕\n[03:41.159]珍惜淡定的心境 苦过後更加清\n[03:46.489]万般过去亦无味但有领会留下\n[03:51.699]今天先记得听过人说这叫半生瓜\n[03:56.659]那意味着它的美年轻不会洞察吗\n[04:01.859]到大悟大彻将一切都升华 这一秒坐拥晚霞\n[04:08.490]我共你觉得苦也不太差",
    "code": 200
}]
/* 歌词 */
var lrcStr = ''
var lrcBox = document.getElementsByClassName('lrcBox')[0];
var lrcText = document.getElementsByClassName('lrcText')[0];
/* 歌词的序号 */
var lyricOrder = 0;
/* 当前的歌词 */
var curLyric;
/* 调节歌词对齐按钮 */
var lrcTimePre = document.getElementsByClassName('lrcTimePre')[0];
var lrcTimeAft = document.getElementsByClassName('lrcTimeAft')[0];
/* 快进/退 */
var curTimePre = document.getElementsByClassName('curTimePre')[0];
var curTimeAft = document.getElementsByClassName('curTimeAft')[0];

/* 初始化歌词 */
function initLyric(){
    /* 去除歌词时间的'['，返回一个数组 */
    var rmLeft = Songlyric[0].lyric.split('[');
    /* 遍历数组 */
    rmLeft.forEach(function(current){
        /* 去除歌词时间的']'，并取得歌词 */
        var rmRight = current.split(']');
        var lyric = rmRight[1];

        //由于audio的时间是以秒计算的，因此需要把歌词时间转化为秒
        /* 去除秒和毫秒之间的'.' */
        var rmSecMs = rmRight[0].split('.');
        /* 去除分钟和秒之间的':' */
        var rmMinSec = rmSecMs[0].split(':');
        /* 获得以秒为单位的时间 */
        var lyricTime = rmMinSec[0]*60 + parseInt(rmMinSec[1]);

        if(lyric){
            /* 用时间给每一句歌词加上id，用于变色 */
            lrcStr += '<p id="'+ lyricTime +'s" class="' + lyricOrder++ + '">' + lyric + '</p>';
        }
        lrcText.innerHTML = lrcStr;
    })

}

/* 歌词延迟时间 */
var setLrcTime = 1000;
/* 当前歌词时间 */
var lrcIndex = 2;
/* 计算timeupdate触发4次 */
var TimeUpsDateTimes = 4;

/* 歌词向前调节0.1秒 */
lrcTimePre.onclick = function(){
    if(setLrcTime>=2000){
        alert('已调节至最前！');
    }else{
        setLrcTime += 100;
    }
}

/* 歌词向后调节0.1秒 */
lrcTimeAft.onclick = function(){
    if(setLrcTime<=0){
        alert('已调节至最后！');
    }else{
        setLrcTime -= 100;
    }
}

/* 快退 */
curTimePre.onmousedown = function(){
    console.log("快退");
    if(MyAudio.currentTime <= 0.5){
        MyAudio.currentTime = 0;
    }else{
        console.log("快退");
        MyAudio.currentTime -= 0.5;
    }
}

/* 快进 */
curTimeAft.onmousedown = function(){
    if(MyAudio.currentTime <= MyAudio.duration - 0.5){
        MyAudio.currentTime += 0.5;
    }
}

/* 监听歌词的时间更新 */
MyAudio.addEventListener('timeupdate',function(){
    var cur = parseInt(this.currentTime);
    if(document.getElementById(cur + 's')){
        /* 歌词提前了1s */
        setTimeout(function(){
            document.getElementById(lrcIndex + 's').style.color = 'white';
            lrcIndex = cur;
            curLyric = document.getElementById(cur + 's');
            curLyric.style.color = 'lightblue';
            if(TimeUpsDateTimes == 0){
                lrcBox.scrollTop = parseInt(curLyric.className)*28;
                TimeUpsDateTimes = 4;
            }
            TimeUpsDateTimes--;
        },setLrcTime)
    }
}, false)
