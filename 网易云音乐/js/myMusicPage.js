//我的音乐界面
var page2 = document.getElementsByClassName('page2')[0];
// 我的音乐未登录界面
var notLogin = page2.getElementsByClassName('notLogin')[0];
var pleaseLoginBtn = document.getElementsByClassName('pleaseLoginBtn')[0];
notLogin.style.height = screenH + 'px';

// 我的音乐已登录界面
var afterLogin = document.getElementsByClassName('after_login')[0];
var MyMusicLeft = document.getElementsByClassName('MyMusicLeft')[0];
var hasLogin = document.getElementsByClassName('hasLogin')[0];
var page2UserImg = page2.getElementsByClassName('MyMusicUserImg')[0];
var page2UserName = page2.getElementsByClassName('MyMusicUserName')[0];
var page2ComImg = document.getElementById('MyCommentImg');

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
var MyMusicUserName = document.getElementsByClassName('MyMusicUserName')[0];
var MyMusicUserImg = document.getElementsByClassName('MyMusicUserImg')[0];
var levelNum = document.getElementsByClassName('levelNum')[0];
var newCommentNum = document.getElementsByClassName('newCommentNum')[0];
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

/* 我的音乐页面未登录时的登录按钮 */
pleaseLoginBtn.onclick = function(){
    login.style.display = 'block'
    logBox.style.display = "block";
}

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
            //显示歌单的信息
            page2PlayListPic.style.background = 'url(' + JSON.parse(result).playlist.coverImgUrl + ')';
            page2PlayListPic.style.backgroundSize = '160px 160px';
            
            MyMusicUserImg.style.background = 'url('+ JSON.parse(result).playlist.creator.avatarUrl + ')'
            MyMusicUserImg.style.backgroundSize = '30px 30px'
            MyMusicUserName.innerText = JSON.parse(result).playlist.creator.nickname;
            createTime.innerHTML = timestampToDate(JSON.parse(result).playlist.createTime) + '创建';
            /* 歌单数量和听歌时间 */
            songNum.innerText = palyListSongNum.innerText + "首歌";
            playTime.innerText = JSON.parse(result).playlist.totalDuration + '分钟';
            playSongsList.innerHTML = playSongsLis[0].outerHTML;
            var newUl = document.createDocumentFragment('ul');
            for(let i=0;i<JSON.parse(result).playlist.trackCount;i++){
                /* 动态克隆节点 */
                if(i>0 && playSongsLis.length < JSON.parse(result).playlist.trackCount){
                    for(let j=0;j<JSON.parse(result).playlist.trackCount-1;j++){
                        let newNode = playSongsLis[0].cloneNode(true);
                        newUl.appendChild(newNode);
                    }
                    playSongsList.appendChild(newUl);
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
            }
            
            /* 播放歌单里的歌曲 */
            playSongsList.onclick = function(ev){
                var e = ev || window.event;
                var target = e.target || window.event.srcElement;
                for(let i=0;i<playSongsLis.length;i++){
                    if(target == palyIcon[i]){
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
            }
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
            newCommentNum.innerText = JSON.parse(result).comments.length;
            var newNodeList = document.createElement('ul');
            for(let i=0; i<JSON.parse(result).comments.length; i++){
                if(i > 0 && newCommentLis.length < JSON.parse(result).comments.length){
                    for(var j=0;j<JSON.parse(result).comments.length-1;j++){
                        var newNode = newCommentLis[0].cloneNode(true);
                        newNodeList.appendChild(newNode);
                    }
                    newCommentList.appendChild(newNodeList);
                }
                CommentImg[i].style.background = 'url(' + JSON.parse(result).comments[i].user.avatarUrl; + ')';
                CommentImg[i].style.backgroundSize = '50px 50px';
                newCommentUserName[i].innerText = JSON.parse(result).comments[i].user.nickname;
                newCommentText[i].innerText = JSON.parse(result).comments[i].content;
                commentSentTime[i].innerText = timestampToDate(JSON.parse(result).comments[i].time);
                likeNum[i].innerText = JSON.parse(result).comments[i].likedCount;
            }
        },
        error: function(msg){
            console.log(msg);
        }
    })
}