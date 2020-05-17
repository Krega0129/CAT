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
var searchIds = [];

searchResultBox.style.height = screenH + 'px';

/* 当搜索框失去焦点 */
search.onblur = function(){
    document.onclick = function(){
        searchBox.style.display = 'none';
        search.value = '';
    }
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
        searchIds=[];
        var newUl = document.createDocumentFragment('ul');
        for(let i=0;i<JSON.parse(result).result.songs.length;i++){
            if(i>0 && searchResultLis.length < JSON.parse(result).result.songs.length){
                for(let j=0;j<JSON.parse(result).result.songs.length-1;j++){
                    let newNode = searchResultLis[0].cloneNode(true);
                    newUl.appendChild(newNode);
                }
                searchResultList.appendChild(newUl);
            }
            /* 单数行变色 */
            if(i % 2 == 1){
                searchResultLis[i].style.background = 'lightcyan'
            }
            searchResultsongOrder[i].innerHTML = i+1;
            searchResultSongName[i].innerText = JSON.parse(result).result.songs[i].name;
            searchIds[i] = JSON.parse(result).result.songs[i].id;
            searchResultAudio[i].src = 'https://music.163.com/song/media/outer/url?id=' + searchIds[i] + '.mp3';
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
        }

        /* 点击播放搜索到的歌曲 */
        searchResultList.onclick = function(ev){
            var e = ev || window.event;
            var target = e.target || window.event.srcElement;
            for(let i=0;i<searchResultLis.length;i++){
                if(target == searchResultPlay[i]){
                    musicList = searchIds;
                    playSong(searchIds[i]);
                }
            }
        }
    }
}

/* 关闭搜索结果页面 */
closesearchResultBox.onclick = function(){
    page1.style.display = 'block';
    searchResultBox.style.display = 'none';
}