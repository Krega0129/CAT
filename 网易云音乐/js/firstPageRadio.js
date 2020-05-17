//热门电台
var anchor = document.getElementsByClassName('anchor')[0];
var anchorList = anchor.getElementsByClassName('anchor_list')[0];
var anchorLis = anchorList.getElementsByTagName('li');
var anchorPic = anchorList.getElementsByClassName('pic');
var anchorName = anchorList.getElementsByClassName('name');
var anchorIntro = anchorList.getElementsByClassName('intro');

/* 获取热门电台 */
$ajax({
    url:'http://musicapi.leanapp.cn/dj/hot',
    success: function(result){
        for(var i=0;i<anchorLis.length;i++){
            anchorPic[i].style.background = 'url(' + JSON.parse(result).djRadios[i].picUrl + ')';
            anchorPic[i].style.backgroundSize = '40px 40px';
            anchorName[i].innerHTML = JSON.parse(result).djRadios[i].name;
            anchorIntro[i].innerHTML = JSON.parse(result).djRadios[i].rcmdtext;
        }
    },
    error: function(msg){
        console.log(msg);
    }
})