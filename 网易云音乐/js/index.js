
window.onunload = function(){
    scrollTo(0,0)
}

/* 换肤 */
var chColor = document.getElementById("change_color");
var colorLis = document.getElementById("color_list").getElementsByTagName("li");
var colorArr = ["#242424", "#06a6f0", "#ee7cd2"]

for(var i=0;i<colorLis.length;i++){
    colorLis[i].index = i;
    colorLis[i].onclick = function(){
        head.style.backgroundColor = colorArr[this.index];
    }
}

//----------------------------------------------------------------------------------

/* 轮播图 */
/* 获取可视窗口高度 */
var screenH = window.innerHeight;
var main = document.getElementById("main_bg");
var oBan = document.getElementById("banner");
var oBanList = document.getElementById("banner_list");
var oBanLis = oBanList.getElementsByTagName("li");
var oBtnList = document.getElementById("btn_list");
var oBtnLis = oBtnList.getElementsByTagName("li");
var LeftBtn = document.getElementById("Lbtn");
var RightBtn = document.getElementById("Rbtn");
var bannerTimer = null;
var index = 0;

main.style.marginTop = screenH + 'px';

/* 动态生成小圆点 */
for(var i=0;i<oBanLis.length-1;i++){
    var newLi = document.createElement("li");
    oBtnList.appendChild(newLi);
}

/* 3s轮播一次 */
/* 第一个参数为"函数名+()", 可以先执行, 若传入的是"函数名", 则第一次执行函数会延迟 */
bannerTimer = setInterval(changeImg(), 3000);

/* 底部按钮点击事件 */
function btnClick(){
    for(let i=0;i<oBtnLis.length;i++){
        oBtnLis[i].onclick = function(){
            clearInterval(bannerTimer);
            index = i;
            bannerTimer = setInterval(changeImg(), 3000)
        }
    }
}

/* 图片轮播 */
function changeImg(){
    for(var i=0;i<oBanLis.length;i++){
        oBanLis[i].className = "";
        oBtnLis[i].className = "";
    }
    /* 换背景 */
    oBan.style.background = "url(./img/banner" + (index + 1) + "-bg.jpg) no-repeat"
    oBan.style.backgroundSize = "cover"
    oBanLis[index].className = "active";
    oBtnLis[index].className = "active";
    index = (++index < oBanLis.length) ? index : 0;
    /* 底部按钮点击事件 */
    btnClick();
    /* 将函数名返回, 作为setInterval真正的第一个参数 */
    return changeImg;
}
/* 左按钮 */
LeftBtn.onclick = function(){
    clearInterval(bannerTimer);
    index = (--index <= 0) ? oBanLis.length-1 : index;
    --index;
    bannerTimer = setInterval(changeImg(), 3000);
}
/* 右按钮 */
RightBtn.onclick = function(){
    clearInterval(bannerTimer);
    bannerTimer = setInterval(changeImg(), 3000);
}

// --------------------------------------------------------------------------------------------

/* 滑动一定时的操作 */
var toTop = document.getElementById("toTop");
var head = document.getElementById("head");

document.onscroll = function(){
    /* 获取滚动的距离 */
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollTop > 0){
        toTop.style.display = "block";
        head.style.transform = "translateY(0)"
    }else{
        toTop.style.display = "none";
        head.style.transform = "translateY(-112px)"
    }
}

//------------------------------------------------------------------------------------------
//推荐歌手
var singersList = document.getElementById("singersList");
var SingersList = document.getElementById("singers_list")
var singerLis = singersList.getElementsByTagName("li");
var singersImg = SingersList.getElementsByClassName("img");
var singerName = SingersList.getElementsByTagName("p");

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
            singersImg[i].style.backgroundSize = '100px 100px'
        },
        error: function(msg){
            console.log(JSON.parse(msg));
        }
    })
}

//-------------------------------------------------------------------------------------------

/* 登录界面 */
var headLoginBtn = document.getElementsByClassName("login")[0];
var logBtn = document.getElementById("login_btn");
var logBox = document.getElementById("login_box")
var logClose = document.getElementById("close");
var login = document.getElementById("log_div");
var Pw = document.getElementsByClassName("password");
var icon = document.getElementsByClassName("paswicon");
var check = login.getElementsByClassName("check")[0];
var sub = document.getElementById("sub");
var numBox = document.getElementById("num_box");
var numTip = document.getElementById("num_tip");

var reg = document.getElementById("beNew");
var regBox = document.getElementById("register");
var backLog = document.getElementById("backlog");
var regBtn = document.getElementById("reg_btn");

/* 密码是否可见 */
var visible = [false,false,false];
/* 打开登录界面 */
logBtn.onclick = function(){
    logBox.style.display = "block";
}
headLoginBtn.onclick = function(){
    logBox.style.display = "block";
}

/* 关闭登录界面 */
logClose.onclick = function(){
    logBox.style.display = "none";
    regBox.style.display = "none"
}
/* 打开注册页面 */
reg.onclick = function(){
    regBox.style.display = "block"
}
/* 返回登录 */
backLog.onclick = function(){
    regBox.style.display = "none"
}

/* 给密码的按钮添加点击事件 */
for(let i=0;i<icon.length;i++){
    /* 密码是否可见 */
    icon[i].onclick = function(){
        if(!visible[i]){
            Pw[i].type = "text";
            visible[i] = true;
        }else{
            Pw[i].type = "password";
            visible[i] = false;
        }
    }
}

/* 验证账号是否是以1开头的11位数字 */
var box = /^1\d{10}/;
numBox.onblur = function(){
    if(!box.test(numBox.value) && numBox.value){
        numTip.style.display = "block"
    }else{
        numTip.style.display = "none"
    }
}

/* 验证是否同意协议 */
sub.onclick = checkAgree;
regBtn.onclick = checkAgree;
function checkAgree(ev){
    if(!check.checked){
        var e = ev || window.event;
        e.preventDefault();
        alert("请同意");
    }else{
        /* 登录 */
        loginRequest();
    }
}

var logSuc = document.getElementsByClassName("after_login")[0];
var userImg = document.getElementsByClassName("userImg")[0];
var userName = document.getElementById("userName");
var app = document.getElementsByClassName("app")[0];
var infoList = document.getElementsByClassName("info_list")[0];
var infos = infoList.getElementsByTagName("span");
var headLogImg = document.getElementsByClassName("headLogImg")[0];

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
                /* 
                    如何去处理数据的操作不确定
                    回调函数，将一段代码作为参数传入函数，在合适的地方调用
                */
                //判断success函数是否存在
                if(success){
                    success(xhr.responseText);
                }
            }else{
                if(error){
                    error("Error:" + xhr.responseText)
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

/* 登录 */
function loginRequest(){
    $ajax({
        url: 'http://musicapi.leanapp.cn/login/cellphone',
        data: {
            phone: numBox.value,
            password: Pw[0].value
        },
        success: function(result){
            /* 登录成功，显示信息 */
            logSuc.style.display = "block"
            headLogImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')'
            headLogImg.style.display = "block"
            headLogImg.style.backgroundSize = '50px 50px'
            userImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')'
            userImg.style.backgroundSize = '86px 86px'
            userName.innerHTML = JSON.parse(result).profile.nickname;
            logBox.style.display = "none"
            infos[0].innerHTML = JSON.parse(result).profile.authority;
            infos[1].innerHTML = JSON.parse(result).profile.follows;
            infos[2].innerHTML = JSON.parse(result).profile.followeds;
            /* 下载板块下移 */
            app.style.marginTop = 80 + 'px'
            /* 记住登录状态 */
            sessionStorage.setItem("telNum",numBox.value);
            sessionStorage.setItem("password",Pw[0].value);
            sessionStorage.setItem("istrue",'yes');
        }
    })
}


/* 登录 */
// function loginRequest(){
//     let http = new XMLHttpRequest()
//     // http.withCredentials = true 部分请求或许需要该配置，具体请先查看文档
//     http.open("GET",'http://musicapi.leanapp.cn/login/cellphone?phone='+numBox.value+'&password='+Pw[0].value,true);
//     http.send();
//     http.onreadystatechange=function(){
//         if (http.readyState===4 && http.status===200) {
//             logSuc.style.display = "block"
//             headLogImg.style.background = 'url('+JSON.parse(http.responseText).profile.avatarUrl+')'
//             headLogImg.style.display = "block"
//             headLogImg.style.backgroundSize = '50px 50px'
//             userImg.style.background = 'url('+JSON.parse(http.responseText).profile.avatarUrl+')'
//             userImg.style.backgroundSize = '86px 86px'
//             userName.innerHTML = JSON.parse(http.responseText).profile.nickname;
//             app.style.marginTop = 80 + 'px'
//             logBox.style.display = "none"
//             infos[0].innerHTML = JSON.parse(http.responseText).profile.authority;
//             infos[1].innerHTML = JSON.parse(http.responseText).profile.follows;
//             infos[2].innerHTML = JSON.parse(http.responseText).profile.followeds;

//             /* 记住登录状态 */
//             sessionStorage.setItem("telNum",numBox.value);
//             sessionStorage.setItem("password",Pw[0].value);
//             sessionStorage.setItem("istrue",'yes');
//         }
//     }
// }

/* 刷新重登录 */
if(sessionStorage.getItem("istrue") == 'yes'){
    numBox.value = sessionStorage.getItem("telNum");
    Pw[0].value = sessionStorage.getItem("password");
    loginRequest();
}

//退出登录
var logout = document.getElementsByClassName("logout")[0];

logout.onclick = function(){
    let xhr = new XMLHttpRequest();

    xhr.open("GET", "http://musicapi.leanapp.cn/user/detail", true);

    xhr.send();

    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            console.log(JSON.parse(xhr.responseText));
        }
    }
}

// logout.onclick = function(){
//     $ajax({
//         url: 'http://musicapi.leanapp.cn/logout',
//         data: {
//             phone: numBox.value,
//             password: Pw[0].value
//         },
//         success: function(result){
//             sessionStorage.setItem("istrue",'no');
//             alert(result);
//         },
//         error: function(msg){
//             alert(msg);
//         }
//     })
//     $ajax({
//         url: 'http://musicapi.leanapp.cn/login/status',
//         data: null,
//         success: function(result){
//             alert(result);
//         },
//         error: function(msg){
//             alert(msg)
//         }
//     })
// }

/* 注册界面 */
var register = document.getElementById("register");
var telReg = document.getElementById("tel_reg");
var telTip = document.getElementById("tel_tip");
var regPasw = register.getElementsByClassName("password");
var pasSureTip = document.getElementById("pw_sure_tip");

/* 判断手机号码格式 */
telReg.onblur = function(){
    if(!box.test(telReg.value) && telReg.value){
        telTip.style.display = "block"
    }else{
        telTip.style.display = "none"
    }
}

/* 判断两次输入得密码是否一致 */
regPasw[0].onblur = checkPasw;
regPasw[1].onblur = checkPasw;
function checkPasw(){
    if(regPasw[0].value != regPasw[1].value && regPasw[0].value && regPasw[1].value){
        pasSureTip.style.display = "block"
    }else{
        pasSureTip.style.display = "none"
    }
}

//-----------------------------------------------------------------------------------------------------
//播放歌曲
var hotList = document.getElementsByClassName("hot_list")[0];
var play = hotList.getElementsByClassName("play");
var proPoint = document.getElementsByClassName("proPoint")[0];
var pause = document.getElementById("pause");
var inPro = document.getElementsByClassName("inPro")[0];
var inbox = document.getElementsByClassName("inbox")[0];
var outPro = document.getElementsByClassName("outPro")[0];
var totalTimeMin = document.getElementsByClassName("fullTime_min")[0];
var totalTimeSec = document.getElementsByClassName("fullTime_sec")[0];
var curTimeMin = document.getElementsByClassName("curTime_min")[0];
var curTimeSec = document.getElementsByClassName("curTime_sec")[0];
var SongImg = document.getElementById("songImg");
var closeMusicBox = document.getElementById("closeMusicBox");
var musicBox = document.getElementById("music_box")
var isClose = true;

/* 推荐里的歌曲id */
var Ids = ['1323911406','64293','1374329431','1333150792','523251137','188489','32701152','27733390']

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


var MyAudio = document.getElementById("MyAudio");
function playSong(ids){
    if(nowPlaying){
        nowPlaying.currentTime = 0;
        nowPlaying.pause();
    }
    MyAudio.src = 'https://music.163.com/song/media/outer/url?id=' + ids + '.mp3';
    nowPlaying = MyAudio;
    nowPlayingId = ids;
    /* 获取总长度 */
    nowPlaying.oncanplay = function(){
        totalTime = nowPlaying.duration;
    }
    
    /* 播放 */
    nowPlaying.play();

    /* 显示歌曲时间 */
    tim = setInterval(dispTime(),1000);
    /* 暂停按钮背景 */
    pause.className = "begin";
    isPlaying = true;
    /* 进度条 */
    timer = setInterval(progress(),1000);
}

// function playSong(ids){
//     $ajax({
//         url: 'https://music.163.com/song/url',
//         data: {
//             id: ids
//         },
//         success: function(result){
//             if(nowPlaying){
//                 nowPlaying.currentTime = 0;
//                 nowPlaying.pause();
//             }
//             MaAudio.src = 'https://music.163.com/song/media/outer/url?id=' + ids + '.mp3';
//             nowPlaying = MaAudio;
//             /* 获取总长度 */
//             totalTime = nowPlaying.duration;
//             /* 播放 */
//             nowPlaying.play();
//             /* 显示歌曲信息 */
//             showSongInfo()
//             /* 显示歌曲时间 */
//             tim = setInterval(dispTime(),1000);
//             /* 暂停按钮背景 */
//             pause.className = "begin";
//             nowPlaying = myAudio[i];
//             isPlaying = true;
//             /* 进度条 */
//             timer = setInterval(progress(),1000);
//         },
//         error: function(msg){
//             console.log(msg);
//         }
//     })
// }

/* 点击播放 */
for(let i=0;i<play.length;i++){
    play[i].onclick = function(){
        playSong(Ids[i]);
        showSongInfo();
    }
    
    // play[i].onclick = function(){
    //     /* 判断是否在放歌，有的话暂停当前的歌 */
    //     if(nowPlaying){
    //         nowPlaying.currentTime = 0;
    //         nowPlaying.pause();
    //     }
    //     /* 记住当前正在播放的歌和id（推荐的歌曲的id） */
    //     nowPlayingId = Ids[i];
    //     nowPlaying = myAudio[i];
    //     /* 获取总长度 */
    //     totalTime = nowPlaying.duration;
    //     /* 播放 */
    //     nowPlaying.play();
    //     /* 显示歌曲信息 */
    //     showSongInfo()
    //     /* 显示歌曲时间 */
    //     tim = setInterval(dispTime(),1000);
    //     /* 暂停按钮背景 */
    //     pause.className = "begin";
    //     nowPlaying = myAudio[i];
    //     isPlaying = true;
    //     /* 进度条 */
    //     timer = setInterval(progress(),1000);
    // }
}

/* 播放的时候有白色阴影 */
setInterval(function(){
    if(isPlaying){
        SongImg.style.boxShadow = '0 0 20px white';
    }else{
        SongImg.style.boxShadow = 'none'
    }
})

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
            SongImg.style.backgroundSize = '70px 70px'
            AddAudioHtmlinfo(result);
            /* 写入歌名 */
            songName1.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
            songName2.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
            /* 开始另一首歌时，歌名回到原点 */
            songName1.style.left = 0;
            songName2.style.left = -songNameBox.offsetWidth + 'px';
        },
        error: function(msg){
            console.log(msg)
        }
    })
}

/* 添加大播放器的图片和歌名 */
function AddAudioHtmlinfo(result){
    AudioHtmlImg.style.background = 'url(' + JSON.parse(result).songs[0].al.picUrl + ')';
    AudioHtmlImg.style.backgroundSize = "330px 330px"
    AduioHtmlSongName.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
}

//歌词
// function Addlyric(){
//     $ajax({
//         url: 'http://music.163.com/api/song/media',
//         data: {
//             id: 64293
//         },
//         success: function(result){
//             console.log(result)
//         },
//         error: function(msg){
//             console.log(msg);
//         }
//     })
// }
// Addlyric();


/* 歌曲名字循环移动 */
setInterval(function(){
    var a = songName1.offsetLeft;
    var b = songName2.offsetLeft;
    a += 5;
    b += 5;
    /* 判断歌名位置 */
    if(a >= songNameBox.offsetWidth){
        a = -songNameBox.offsetWidth
    }
    if(b >= songNameBox.offsetWidth){
        b = -songNameBox.offsetWidth
    }
    songName1.style.left = a + 'px'
    songName2.style.left = b + 'px'
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
        nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
    }
    /* 抬起鼠标按键之后，赋空 */
    document.onmouseup = function(){
        this.onmousedown = null;
        this.onmousemove = null;
    }
}

/* 显示歌曲时间 */
function dispTime(){
    var fullMin = parseInt(totalTime / 60);
    var fullSec = parseInt(totalTime % 60);
    var curMin = parseInt(nowPlaying.currentTime / 60)
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
        dispTime()
    }
    return progress;
}

/* 点击进度条 */
inbox.onclick = function(ev){
    var e = ev || window.event;
    var toLeft = e.clientX - outPro.offsetLeft;
    proPoint.style.left = toLeft - 6 + 'px';
    inPro.style.width = toLeft + 'px';
    nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
}

var hotLis = hotList.getElementsByClassName("box_img");

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
                hotLis[i].style.backgroundSize = "138px 138px"
            },
            error: function(msg){
                alert(msg);
            }
        })
    }
}
addImg();

/* 调节音量 */
var volume = document.getElementById("volume");

MyAudio.volume = volume.value / 100;
setInterval(function(){
    MyAudio.volume = volume.value / 100;
},10)

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
$ajax({
    url: 'http://musicapi.leanapp.cn/top/list',
    data: {
        idx: 0
    },
    success: function(result){
        topName[0].innerHTML = JSON.parse(result).playlist.name;
        topImg[0].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
        topImg[0].style.backgroundSize = '80px 80px'
        for(let i=0;i<topSongName1.length;i++){
            /* 写入歌名 */
            topSongName1[i].innerHTML = JSON.parse(result).playlist.tracks[i].name;
            /* 点击播放 */
            topSongPlay1[i].onclick = function(){
                topPlaySong(i, result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

$ajax({
    url: 'http://musicapi.leanapp.cn/top/list',
    data: {
        idx: 1
    },
    success: function(result){
        topName[1].innerHTML = JSON.parse(result).playlist.name;
        topImg[1].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
        topImg[1].style.backgroundSize = '80px 80px'
        for(let i=0;i<topSongName2.length;i++){
            topSongName2[i].innerHTML = JSON.parse(result).playlist.tracks[i].name;
            topSongPlay2[i].onclick = function(){
                topPlaySong(i, result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

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
                topPlaySong(i, result);
            }
        }
    },
    error: function(msg){
        console.log(msg);
    }
})

/* 播放排行榜的歌曲 */
function topPlaySong(i,result){
    playSong(JSON.parse(result).playlist.tracks[i].id);
    
    /* 获取图片 */
    SongImg.style.background = 'url(' + JSON.parse(result).playlist.tracks[i].al.picUrl + ')';
    SongImg.style.backgroundSize = '70px 70px'
    /* 填充歌曲信息 */
    songName1.innerHTML = JSON.parse(result).playlist.tracks[i].name + " - " + JSON.parse(result).playlist.tracks[i].ar[0].name;
    songName2.innerHTML = JSON.parse(result).playlist.tracks[i].name + " - " + JSON.parse(result).playlist.tracks[i].ar[0].name;
    
    /* 开始另一首歌时，歌名回到原点 */
    songName1.style.left = 0;
    songName2.style.left = -songNameBox.offsetWidth + 'px'
}


// var MvList = document.getElementsByClassName("Mv_list")[0];
// var MvLis = MvList.getElementsByTagName("li");

// $ajax({
//     url: 'http://musicapi.leanapp.cn/personalized/mv',
//     success: function(result){
//         console.log(JSON.parse(result));
//         Mv(result)
//     },
//     error: function(msg){
//         console.log(msg);
//     }
// })


// function Mv(result){
//     $ajax({
//         url: 'http://musicapi.leanapp.cn/mv/url',
//         data: {
//             id: JSON.parse(result).result[0].id
//         },
//         success: function(res){
//             console.log(JSON.parse(res));
//         },
//         error: function(msg){
//             console.log(msg)
//         }
//     })
// }

/* 搜索 */
var search = document.getElementById("search");
var searchList = document.getElementsByClassName("search_list");
var searchSinger = searchList[0].getElementsByTagName("dd");
var searchSong = searchList[1].getElementsByTagName("dd");
var searchMv = searchList[2].getElementsByTagName("dd");

search.onkeyup = function(){
    $ajax({
        url: 'http://musicapi.leanapp.cn/search/multimatch',
        data: {
            keywords: search.value,
            type: 1
        },
        success: function(result){
            // for(var i=0;i<3;i++){
            //     searchSinger[i].innerHTML = JSON.parse(result).result.artists[i].name;
            // }
            // for(var i=0;i<2;i++){
            //     searchSong[i].innerHTML = JSON.parse(result).result.albums[i].name;
            //     searchSinger[i].innerHTML = JSON.parse(result).result.mvs[i].name;
            // }
            console.log(JSON.parse(result))
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

var AudioHtmlBg = document.getElementsByClassName("bfq")[0];
var AudioHtml = document.getElementById("AudioHtml");
var AudioClose = document.getElementsByClassName('AudioClose')[0];
var AudioHtmlImg = document.getElementsByClassName('AudioHtmlImg')[0];
var AduioHtmlSongName = document.getElementsByClassName('AduioHtmlSongName')[0];
var lrc = document.getElementsByClassName('lrc')[0];

SongImg.ondblclick = function(){
    AudioHtmlBg.style.display = 'block'
    AudioHtml.style.display = 'flex'
    musicBox.style.display = 'flex'
    musicBox.style.background = 'black'
    musicBox.style.height = 72 + 'px'
    SongImg.style.display = 'none'
    inbox.style.background = 'white'
    document.body.style.overflow = 'hidden'
}

AudioClose.onclick = function(){
    AudioHtmlBg.style.display = 'none'
    AudioHtml.style.display = 'none'
    SongImg.style.display = 'block'
    musicBox.style.height = 50 + 'px'
    musicBox.style.background = 'rgba(0, 0, 0, .5)'
    inbox.style.background = 'black'
    document.body.style.overflow = 'visible'
}


