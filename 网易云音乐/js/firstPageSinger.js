//推荐歌手
var singersList = document.getElementById("singersList");
var SingersList = document.getElementById("singers_list");
var singerLis = singersList.getElementsByTagName("li");
var singersImg = SingersList.getElementsByClassName("img");
var singerName = SingersList.getElementsByTagName("p");
var singersA = SingersList.getElementsByTagName('a');

/* 添加歌手图片 */
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

/* 点击按钮切换类型 */
singersList.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(let i=0;i<singerLis.length;i++){
        if(target == singerLis[i]){
            SingersList.style.transition = '1s'
            SingersList.style.left = -662.5 * i + 'px';
        }
    }
}