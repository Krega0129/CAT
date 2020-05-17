/* 热门推荐 */
var hotHeadList = document.getElementsByClassName('hot_head_list')[0];
var hotHeadLis = hotHeadList.getElementsByTagName('li');
var hotListBox = document.getElementsByClassName('hotListBox')[0];
var hotList = document.getElementsByClassName("hot_list");
var hotLis = hotListBox.getElementsByClassName("box_img");
var play = hotListBox.getElementsByClassName("play");
var hotListP = hotListBox.getElementsByTagName('p');
/* 推荐里的歌曲id */
var Ids = ['64293','1334647784','569213220','308299','25718007','1293886117','316654','186436','1323911406','516765349','1374329431','461347998','523251137','17753288','1518938','27733390','308299','28457932','108390','189285','316486','346082','188384','25707139','436514312','29750099','1346104327','1336856777','31445772','29567189','27808295','1334295185','467952048','29004400','96100','346083','386175','346576','347597','347114'];

/* 添加热门推荐的背景图 */
addImg();
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

/* 点击热门推荐的类型 */
hotHeadList.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(var i=0;i<hotHeadLis.length;i++){
        if(target == hotHeadLis[i]){
            hotListBox.style.transition = '1s'
            hotListBox.style.left = -728*i + 'px';
        }
    }
}

//点击热门推荐播放歌曲
hotListBox.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(let i=0;i<play.length;i++){
        if(target == play[i]){
            playIndex = i;
            musicList = Ids;
            playSong(Ids[i]);
        }
    }
}
