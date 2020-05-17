//排行榜
var topName = document.getElementsByClassName("topName");
var topImg = document.getElementsByClassName("topImg");

/* 添加排行榜里的信息，播放排行榜的歌曲 */
for(let i=0;i<topList.length;i++){
    $ajax({
            url: 'http://musicapi.leanapp.cn/top/list',
        data: {
            idx: i
        },
        success: function(result){
            topList[i].getElementsByClassName('topName')[0].innerHTML = JSON.parse(result).playlist.name;
            topList[i].getElementsByClassName('topName')[0].href = 'https://music.163.com/discover/toplist?id=' + JSON.parse(result).playlist.id;
            topList[i].getElementsByClassName('all')[0].href = 'https://music.163.com/discover/toplist?id=' + JSON.parse(result).playlist.id;
            topImg[i].style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
            topImg[i].style.backgroundSize = '80px 80px';
            for(let j=0;j<topList[i].getElementsByClassName("name").length;j++){
                /* 写入歌名 */
                topList[i].getElementsByClassName("name")[j].innerHTML = JSON.parse(result).playlist.tracks[j].name;
            }

            /* 点击播放 */
            topList[i].onclick = function(ev){
                var e = ev || window.event;
                var target = e.target || window.event.srcElement;
                for(let k=0;k<topList[i].getElementsByClassName("name").length;k++){
                    if(target == topList[i].getElementsByClassName('play')[k]){
                        playTop(k,result);
                    }
                }
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}

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

