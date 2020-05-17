/* 个人中心 */
var userHome = document.getElementsByClassName('userHome')[0];
var userHomeImg = document.getElementsByClassName('userHomeImg')[0];
var SongSheetLis = document.getElementsByClassName('songSheetPic');

userHome.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    console.log(target)
    for(let i=0;i<SongSheetLis.length;i++){
        if(target == SongSheetLis[i]){
            userHome.style.display = 'none';
            page2.style.display = 'block'
            notLogin.style.display = 'none'
            playListDetail(playListId[i])
            getPlayListComment(playListId[i])
            scrollTo(0,0);
        }
    }
}