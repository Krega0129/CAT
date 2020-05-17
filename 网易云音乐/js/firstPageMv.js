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