/* 刷新回到页面顶部 */
window.onunload = function(){
    scrollTo(0,0);
}

var logoBox = document.getElementsByClassName('logo_box')[0]
var mainBG = document.getElementById("main_bg");
var main = document.getElementById('main');
var mainL = main.getElementsByClassName('l_main')[0];
var mainRHead = document.getElementsByClassName('r_main_head');
var ComHead = document.getElementsByClassName('common_head');
var foot = document.getElementById('foot');
var secNav = document.getElementsByClassName('sec_nav')[0];
var headMenu = document.getElementsByClassName('head_menu')[0];
var headMenuLis = headMenu.getElementsByTagName('li');
var headLogImg = document.getElementsByClassName("headLogImg")[0];
var logout = document.getElementsByClassName('logout')[0];
var topList = document.getElementsByClassName('top_list');
var myMusicRight = document.getElementsByClassName('MyMusicRight')[0];
var myMusicRTitle = document.getElementsByClassName('MyMusicRightTitle');
var newCommentTitle = myMusicRight.getElementsByClassName('newCommentTitle')[0];

//当前播放音乐信息
var nowPlayingId = null;
var nowPlaying = null;
var isPlaying = false;
var totalTime = null;
var tim = null;
/* 定义一个Audio节点来播放音乐 */
var MyAudio = document.getElementById("MyAudio");

/* 登录界面 */
var headLoginBtn = document.getElementsByClassName("login")[0];
var logBtn = document.getElementById("login_btn");

/* 获取可视窗口高度 */
var screenH = window.innerHeight;
mainBG.style.marginTop = screenH + 'px';

/* 换肤 */
var chColor = document.getElementById("change_color");
var colorList = document.getElementById("color_list");
var colorLis = colorList.getElementsByTagName("li");
var LogoBoxColorArr = ['#3a6186','rgb(102, 97, 126)','rgb(85, 117, 128)'];
var topColorArr = ['rgb(62, 86, 109)','rgb(88, 86, 99)','rgb(78, 104, 113)']
var secNavColorArr = ['rgb(105, 156, 173)','rgb(134, 127, 165)','rgb(138, 167, 177)'];
var borderColorArr = ['lightblue','rgb(164, 158, 171)','rgb(175, 202, 192)']
var mainColorarr = ['linear-gradient(to right, #141e30, #243b55)','#1f1c2c','linear-gradient(to right, #0f2027, #203a43, #2c5364)']
var singersBox = document.getElementsByClassName('singers_box')[0];

//换肤
colorList.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(let i=0;i<colorLis.length;i++){
        if(target == colorLis[i]){
            head.style.background = mainColorarr[i];
            secNav.style.background = secNavColorArr[i];
            logoBox.style.background = LogoBoxColorArr[i];
            singersBox.style.background = topColorArr[i];
            for(var j=0;j<topList.length;j++){
                topList[j].style.background = topColorArr[i];
            }
            mainBG.style.background = mainColorarr[i];
            main.style.borderLeft = '2px solid ' + borderColorArr[i];
            main.style.borderRight = '2px solid '  + borderColorArr[i];
            mainL.style.borderRight = '2px solid '  + borderColorArr[i];
            for(var j=0;j<ComHead.length;j++){
                ComHead[j].style.borderBottom =  '3px solid '  + borderColorArr[i];
            }
            for(var j=0;j<mainRHead.length;j++){
                mainRHead[j].style.borderBottom =  '1px solid '  + borderColorArr[i];
            }
            foot.style.background = mainColorarr[i];
            foot.style.borderTop = '2px solid '  + borderColorArr[i];
            for(var j=0;j<headMenuLis.length;j++){
                headMenuLis[j].getElementsByClassName("tri")[0].style.color = secNavColorArr[i];
            }
            afterLogin.style.background = mainColorarr[i];
            page2.style.background = mainColorarr[i];
            userHome.style.background = mainColorarr[i];
            document.body.style.background = mainColorarr[i];
            myMusicRight.style.borderLeft = '2px solid '  + borderColorArr[i];
            for(var j=0;j<myMusicRTitle.length;j++){
                myMusicRTitle[j].style.borderBottom = '2px solid '  + borderColorArr[i];
            }
            newCommentTitle.style.borderBottom = '2px solid '  + borderColorArr[i];
            if(head.style.borderBottom){
                head.style.borderBottom = '2px solid '  + secNavColorArr[i];
            }
        }
    }
}

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

//函数
/* 清除导航栏active */
function clearHeadMenuLisActive(){
    for(var i=0;i<headMenuLis.length;i++){
        headMenuLis[i].className = '';
    }
}

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

    proPoint.style.boxShadow = '0 0 10px white';
    SongImg.style.boxShadow = '0 0 20px white';
    AudioHtmlImg.style.boxShadow = '0 0 20px white';

    /* 显示歌曲时间 */
    tim = setInterval(dispTime(),1000);
    /* 暂停按钮背景 */
    pause.className = "begin";
    isPlaying = true;
    /* 进度条 */
    timer = setInterval(progress(),1000);
}

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