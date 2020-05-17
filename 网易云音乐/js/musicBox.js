//播放器（小）
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
var songNameBox = document.getElementsByClassName("songNameBox")[0];
var songName1 = document.getElementById("songName1");
var songName2 = document.getElementById("songName2");
var musicList = [];
var playIndex = 0;
var isClose = true;
var songNameTimer = null;
var timer = null;

/* 调节音量 */
var volume = document.getElementById("volume");
var mute = document.getElementsByClassName('volume_pic')[0];
var isMute = false;
/* 静音 */
var curSound = volume.value;
/* 播放顺序 */
var playOrder = document.getElementById('playOrder');
var playOrderValue = 0;

/* 自定义播放器界面（大） */
var AudioHtmlBg = document.getElementsByClassName("bfq")[0];
var AudioHtml = document.getElementById("AudioHtml");
var AudioClose = document.getElementsByClassName('AudioClose')[0];
var AudioHtmlImg = document.getElementsByClassName('AudioHtmlImg')[0];
var AduioHtmlSongName = document.getElementsByClassName('AduioHtmlSongName')[0];
var lrc = document.getElementsByClassName('lrc')[0];
/* 苦瓜歌词（js的接口用不了，只做一首歌的歌词） */
var Songlyric = [{
    "songStatus": 3,
    "lyricVersion": 23,
    "lyric": "[00:02.529]作曲：章霈迎\n[00:03.529]作词：黄伟文\n[00:04.529]编曲：章霈迎\n[00:05.529]监制：舒文\n[00:20.529]共你干杯再举箸 突然间相看莞尔\n[00:27.519]盘中透着那味儿\n[00:30.748]大概今生有些事 是提早都不可以\n[00:37.898]明白其妙处\n[00:39.899]就像你当日痛心她回绝一番美意\n[00:44.928]怎发现你从情劫亦能学懂开解与宽恕\n[00:52.589]也像我很纠结的公事\n[00:55.828]此际回头看 原来并没有事\n[01:00.958]真想不到当初我们也讨厌吃苦瓜\n[01:06.189]今天竟吃得出那睿智愈来愈记挂\n[01:11.589]开始时捱一些苦 栽种绝处的花\n[01:16.429]幸得艰辛的引路甜蜜不致太寡\n[01:21.598]青春的快餐只要求快不理哪一家\n[01:26.980]哪有玩味的空档来欣赏细致淡雅\n[01:31.819]到大悟大彻将虎咽的升华 等消化学沏茶\n[01:38.478]至共你觉得苦也不太差\n[01:58.787]下半生竟再开学 入迷的终於醒觉\n[02:05.980]移走最後的死角\n[02:09.099]用痛苦烘托欢乐 让余甘彰显险恶\n[02:16.280]如艺坛杰作\n[02:18.129]就像我一直听香夭从未沾湿眼角\n[02:23.259]仔细地看神坛里木纹什麽精巧也不觉\n[02:30.899]却在某萧瑟晚秋深夜\n[02:34.239]忽尔明了了 而黄叶便碎落\n[02:39.239]真想不到当初我们也讨厌吃苦瓜\n[02:44.690]今天竟吃得出那睿智愈来愈记挂\n[02:49.699]开始时捱一些苦 栽种绝处的花\n[02:55.069]幸得艰辛的引路甜蜜不致太寡\n[03:00.290]青春的快餐只要求快不理哪一家\n[03:04.998]哪有玩味的空档来欣赏细致淡雅\n[03:10.149]到大悟大彻将虎咽的升华 等消化学沏茶\n[03:16.489]至共你觉得苦也不太差\n[03:26.299]做人没有苦涩可以吗\n[03:30.999]真想不到当初我们也讨厌吃苦瓜\n[03:36.199]当睇清世间所有定理又何用再怕\n[03:41.159]珍惜淡定的心境 苦过後更加清\n[03:46.489]万般过去亦无味但有领会留下\n[03:51.699]今天先记得听过人说这叫半生瓜\n[03:56.659]那意味着它的美年轻不会洞察吗\n[04:01.859]到大悟大彻将一切都升华 这一秒坐拥晚霞\n[04:08.490]我共你觉得苦也不太差",
    "code": 200
}]
/* 歌词 */
var lrcStr = ''
var lrcBox = document.getElementsByClassName('lrcBox')[0];
var lrcText = document.getElementsByClassName('lrcText')[0];
/* 歌词的序号 */
var lyricOrder = 0;
var lyricTime;
/* 当前的歌词 */
var curLyric;
/* 调节歌词对齐按钮 */
var lrcTimePre = document.getElementsByClassName('lrcTimePre')[0];
var lrcTimeAft = document.getElementsByClassName('lrcTimeAft')[0];
/* 快进/退 */
var curTimePre = document.getElementsByClassName('curTimePre')[0];
var curTimeAft = document.getElementsByClassName('curTimeAft')[0];
/* 歌词延迟时间 */
var setLrcTime = 500;
/* 当前歌词时间 */
var lrcIndex = 2;
/* 计算timeupdate触发4次 */
var TimeUpsDateTimes = 4;

var timeTip = document.getElementById('timeTip');
var timeTipMin = timeTip.getElementsByClassName('timeTipMin')[0];
var timeTipSec = timeTip.getElementsByClassName('timeTipSec')[0];

AudioHtml.style.height = screenH + 'px'

/* 显示播放器 */
SongImg.onclick = function(){
    if(isClose){
        musicBox.style.display = 'block';
        songName1.style.left = 0;
        songName2.style.left = -600 + 'px';
        songNameMove();
        isClose = false;
        clearInterval(timer);
        if(nowPlaying){
            timer = setInterval(progress(),1000);
        }
    }else{
        musicBox.style.display = 'none';
        isClose = true;
        clearInterval(songNameTimer)
    }
}

/* 歌曲名字循环移动 */
function songNameMove(){
    songNameTimer = setInterval(function(){
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
}

/* 按暂停键 */
pause.onclick = stop;

/* 进度条拖拽 */
proPoint.onmousedown = function(){
    var toLeft;
    /* 用document可以在进度条外拖拽 */
    document.onmousemove = function(ev){
        clearInterval(timer);
        var e = ev || window.event;
        toLeft = e.clientX - outPro.offsetLeft;
        /* 控制进度条范围 */
        if(toLeft <= 0){
            toLeft = 0;
        }else if(toLeft >= outPro.offsetWidth){
            toLeft = outPro.offsetWidth;
        }
        /* 使圆点中心对齐初始位置 */
        proPoint.style.left = toLeft - 6 + 'px';
        inPro.style.width = toLeft + 'px';
    }

    /* 抬起鼠标按键之后，赋空 */
    document.onmouseup = function(){
        document.onmousemove = null;    
        if(nowPlaying){
            nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
        }
        timer = setInterval(progress,1000);
        clearInterval(tim);
        tim = setInterval(dispTime(),1000);
        document.onmouseup = null;
        TimeUpsDateTimes = 0;
    }
}

/* 点击进度条 */
inbox.onclick = function(ev){
    var e = ev || window.event;
    /* 获取鼠标位置与进度条最左边的距离 */
    var toLeft = e.clientX - outPro.offsetLeft;
    proPoint.style.left = toLeft - 6 + 'px';
    inPro.style.width = toLeft + 'px';
    if(nowPlaying){
        nowPlaying.currentTime = toLeft / outPro.offsetWidth * totalTime;
    }
    clearInterval(tim);
    tim = setInterval(dispTime(),1000);
    TimeUpsDateTimes = 0;
}

inbox.onmousemove = function(ev){
    if(nowPlaying){
        var e = ev || window.event;
        var toLeft = e.clientX - outPro.offsetLeft;
        var hereTime = parseInt(toLeft / outPro.offsetWidth * nowPlaying.duration);
        var Min = parseInt(hereTime / 60);
        var Sec = parseInt(hereTime % 60);
        checkTime(timeTipMin,Min);
        checkTime(timeTipSec,Sec);
        timeTip.style.display = 'inline'
        timeTip.style.left = toLeft - 12 + 'px'
    }
}

inbox.onmouseleave = function(){
    timeTip.style.display = 'none'
}

/* 调节音量 */
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

/* 播放顺序 */
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
        lyricTime = rmMinSec[0]*60 + parseInt(rmMinSec[1]);

        if(lyric){
            /* 用时间给每一句歌词加上id，用于变色 */
            lrcStr += '<p id="'+ lyricTime +'s" class="' + lyricOrder++ + '">' + lyric + '</p>';
        }
        lrcText.innerHTML = lrcStr;
    })
}

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
    if(MyAudio.currentTime <= 1){
        MyAudio.currentTime = 0;
    }else{
        MyAudio.currentTime -= 1;
    }
}

/* 快进 */
curTimeAft.onmousedown = function(){
    if(MyAudio.currentTime <= MyAudio.duration - 1){
        MyAudio.currentTime += 1;
    }
}

/* 监听歌词的时间更新 */
MyAudio.addEventListener('timeupdate',function(){
    var cur = parseInt(this.currentTime);
    if(lrcStr && document.getElementById(cur + 's')){
        /* 歌词提前了1s */
        setTimeout(function(){
            document.getElementById(lrcIndex + 's').style.color = 'white';
            document.getElementById(lrcIndex + 's').style.fontSize = '14px';
            document.getElementById(lrcIndex + 's').style.background = '';
            lrcIndex = cur;
            curLyric = document.getElementById(lrcIndex + 's');
            curLyric.style.color = 'lightblue';
            curLyric.style.background = 'rgba(0,0,0,.2)';
            curLyric.style.transition = '.5s'
            curLyric.style.fontSize = '20px';
            if(TimeUpsDateTimes == 0){
                // lrcBox.scrollTop = parseInt(curLyric.className)*28;
                lrcText.style.transition = '0.5s'
                lrcText.style.transform = 'translateY(' + -28*parseInt(curLyric.className) + 'px)';
                TimeUpsDateTimes = 4;
            }
            TimeUpsDateTimes--;
        },setLrcTime)
    }
}, false)

/* 添加大播放器的图片和歌名 */
function AddAudioHtmlinfo(result){
    AudioHtmlImg.style.background = 'url(' + JSON.parse(result).songs[0].al.picUrl + ')';
    AudioHtmlImg.style.backgroundSize = "330px 330px";
    AduioHtmlSongName.innerHTML = JSON.parse(result).songs[0].name + " - " + JSON.parse(result).songs[0].ar[0].name;
}

/* 按暂停键 */
function stop(){
    if(isPlaying){
        clearInterval(timer);
        nowPlaying.pause();
        pause.className = "pause";
        isPlaying = false;
        SongImg.style.boxShadow = 'none';
        AudioHtmlImg.style.boxShadow = 'none';
        proPoint.style.boxShadow = 'none';
    }else{
        /* 判断当前是否在播放，是则暂停，否则无效 */
        if(nowPlaying){
            timer = setInterval(progress,1000);
            nowPlaying.play();
            pause.className = "begin";
            isPlaying = true;
            proPoint.style.boxShadow = '0 0 10px white';
            SongImg.style.boxShadow = '0 0 20px white';
            AudioHtmlImg.style.boxShadow = '0 0 20px white';
        }
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

/* 更换静音背景 */
function changeMuteBg(){
    if(MyAudio.volume == 0){
        mute.style.backgroundPosition = '-104px -69px';
    }else{
        mute.style.backgroundPosition = '-2px -248px';
    }
}

//顺序播放上一首
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

// function updatelrc(){
//     var a = parseInt(nowPlaying.currentTime)
//     while(1){
//         if(lrcIndex == a){
//             break;
//         }
//         a--;
//     }
//     console.log(a);
//     indexLrc = a;
// }