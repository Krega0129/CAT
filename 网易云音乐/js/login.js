//登录并获取信息
/* 登录界面 */
var logBox = document.getElementById("login_box")
var logBoxHead = document.getElementById('box_head');
var logClose = document.getElementById("close");
var login = document.getElementById("log_div");
var Pw = document.getElementsByClassName("password");
var icon = document.getElementsByClassName("paswicon");
var check = login.getElementsByClassName("check")[0];
var sub = document.getElementById("sub");
var numBox = document.getElementById("num_box");
var numTip = document.getElementById("num_tip");
var PwTypeErr = logBox.getElementsByClassName('pwTypeErr');
var pwNullTip = logBox.getElementsByClassName('pwNullTip')[0];
/* 登录后 */
var logSuc = document.getElementsByClassName("after_login")[0];
var userImg = document.getElementsByClassName("userImg")[0];
var userName = document.getElementById("userName");
var userId = null;
var app = document.getElementsByClassName("app")[0];
var infoList = document.getElementsByClassName("info_list")[0];
var infoList1 = document.getElementsByClassName("info_list")[1];
var infos = infoList.getElementsByTagName("span");
var infos1 = infoList1.getElementsByTagName("span");
/* 验证账号是否是以1开头的11位数字 */
var box = /^1\d{10}/;

/* 登录界面 */
/* 移动登录框 */
logBoxHead.onmousedown = function(ev){
    var e = ev || window.event;
    var LeftDiffer = e.clientX - logBox.offsetLeft;
    var TopDiffer = e.clientY - logBox.offsetTop;
    document.onmousemove = function(e){
        logBox.style.left = e.clientX - LeftDiffer + 200 + 'px';
        logBox.style.top = e.clientY - TopDiffer + 'px';
    }
    logBoxHead.onmouseup = function(){
        document.onmousemove = null;
    }
}

/* 打开登录界面 */
logBtn.onclick = function(){
    login.style.display = 'block';
    logBox.style.display = "block";
}
headLoginBtn.onclick = function(){
    login.style.display = 'block';
    logBox.style.display = "block";
}

/* 验证账号是否是以1开头的11位数字 */
numBox.onblur = function(){
    if(!box.test(numBox.value) && numBox.value){
        numTip.style.display = "block";
    }else{
        numTip.style.display = "none";
    }
}

/* 密码是否可见 */
logBox.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    for(let i=0;i<icon.length;i++){
        if(target == icon[i]){
            if(!visible[i]){
                icon[i].style.background = 'url("img/visible.jpg")'
                icon[i].style.backgroundSize = '15px 10px'
                Pw[i].type = "text";
                visible[i] = true;
            }else{
                icon[i].style.background = 'url("img/unvisible.jpg")'
                icon[i].style.backgroundSize = '15px 10px'
                Pw[i].type = "password";
                visible[i] = false;
            }
        }
    }
}

/* 验证密码格式 */
Pw[0].onblur = function(){
    if(!box1.test(Pw[0].value) && Pw[0].value){
        PwTypeErr[0].style.display = 'block';
    }else{
        PwTypeErr[0].style.display = 'none';
    }
}

//去除密码为空的警告
Pw[0].onkeydown = function(){
    pwNullTip.style.display = 'none'
}

/* 验证是否同意协议 */
sub.onclick = checkAgree;

/* 关闭登录界面 */
logClose.onclick = function(){
    logBox.style.display = "none";
    regBox.style.display = "none";
}

/* 注册 */
var reg = document.getElementById("beNew");
var regBox = document.getElementById("register");
var backLog = document.getElementById("backlog");
var regBtn = document.getElementById("reg_btn");
/* 注册界面 */
var register = document.getElementById("register");
var telReg = document.getElementById("tel_reg");
var telTip = document.getElementById("tel_tip");
var regPasw = register.getElementsByClassName("password");
var pasSureTip = document.getElementById("pw_sure_tip");
/* 密码是否可见 */
var visible = [false,false,false];
/* 验证密码 */
var box1 = /\w{6,16}/;

/* 注册界面 */
/* 打开注册页面 */
reg.onclick = function(){
    login.style.display = 'none'
    regBox.style.display = "block";
}

/* 判断手机号码格式 */
telReg.onblur = function(){
    if(!box.test(telReg.value) && telReg.value){
        telTip.style.display = "block";
    }else{
        telTip.style.display = "none";
    }
}

/* 判断两次输入得密码是否一致且格式是否正确 */
regPasw[0].onblur = checkPasw;
regPasw[1].onblur = checkPasw;

/* 验证是否同意协议 */
regBtn.onclick = checkAgree;

/* 返回登录 */
backLog.onclick = function(){
    login.style.display = 'block'
    regBox.style.display = "none";
}

/* 机器验证 */
var verification = document.getElementsByClassName('verification')[0];
var closeVer = document.getElementsByClassName('closeVer')[0];
var verGoal = document.getElementsByClassName('verGoal')[0];
var verMove = document.getElementsByClassName('verMove')[0];
var moveBar = document.getElementsByClassName('moveBar')[0];
var moveBtn = document.getElementsByClassName('moveBtn')[0];
var verSuc = document.getElementsByClassName('verSuc')[0];
var IsVerSuc = false;

/* 获得随机位置的验证图 */
function randVerGoal(){
    var goalL = parseInt(Math.random()*(moveBar.offsetWidth - 250) + 150 + moveBar.offsetLeft);
    var goalT = parseInt(Math.random()*(verification.offsetHeight - 100) + 10);
    verGoal.style.left = goalL + 'px';
    verGoal.style.top = goalT + 'px';
    verMove.style.top = goalT + 'px';
}

/* 关闭机器验证 */
closeVer.onclick = function(){
    verification.style.display = 'none';
}

/* 刷新重新请求登录 */
if(sessionStorage.getItem("istrue") == 'yes'){
    numBox.value = sessionStorage.getItem("telNum");
    Pw[0].value = sessionStorage.getItem("password");
    loginRequest();
}

/* 退出登录 */
/* 去除导航栏头像的右键菜单 */
headLogImg.oncontextmenu = function(ev){
    var e = ev || window.event;
    if(e.preventDefault){
        e.preventDefault();
    }else{
        window.event.returnValue = false;
    }
}

/* 点击右键弹出退出按钮 */
headLogImg.onmousedown = function(ev){
    var e = ev || window.event;
    if(e.button == 2){
        logout.style.display = "block";
    }else{
        logout.style.display = "none";
    }
}

/* 点击其他地方隐藏退出按钮 */
document.onclick = function(ev){
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    if(target != logout){
        logout.style.display = "none";
    }
}

/* 模拟退出登录 */
logout.onclick = function(){
    sessionStorage.setItem('istrue', 'false');
    history.go(0)
}

/* 验证是否同意协议 */
function checkAgree(ev){
    if(!check.checked && numBox.value){
        /* 阻止a跳转 */
        var e = ev || window.event;
        e.preventDefault();
        alert("请同意");
    }else if(numBox.value && !Pw[0].value){
        pwNullTip.style.display = 'block'
    }else if(!numBox.value){
        numTip.style.display = 'block'
    }else{
        /* 登录 */
        verification.style.display = 'block';
        randVerGoal();
        moveBtn.onmousedown = function(){
            var toLeft;
            /* 验证 */
            document.onmousemove = function(ev){
                var e = ev || window.event;
                toLeft = e.clientX - verification.offsetLeft - moveBar.offsetLeft - 25;
                if(toLeft <= 0){
                    toLeft = 0;
                }else if(toLeft >= moveBar.offsetWidth - 50){
                    toLeft = moveBar.offsetWidth - 50;
                }
                moveBtn.style.left = toLeft + 'px';
                verMove.style.left = toLeft + 20 + 'px';
            }
            document.onmouseup = function(){
                document.onmousemove = null;
                if(Math.abs(parseInt(verGoal.style.left) - parseInt(verMove.style.left)) <= 10){
                    verSuc.style.display = 'block'
                    verification.style.display = 'none'
                    verMove.style.left = 20 + 'px';
                    setTimeout(function(){
                        verSuc.style.display = 'none';
                    },1000)
                    loginRequest();
                }
            }
        }
    }
}

/* 登录判断/请求 */
function loginRequest(){
    $ajax({
        url: 'http://musicapi.leanapp.cn/login/cellphone',
        data: {
            phone: numBox.value,
            password: Pw[0].value
        },
        success: function(result){
            /* 登录成功，显示信息 */
            userId = JSON.parse(result).account.id;
            getUserInfo(userId);
            logSuc.style.display = "block";
            headLogImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            headLogImg.style.display = "block";
            headLogImg.style.backgroundSize = '50px 50px';
            userImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            userImg.style.backgroundSize = '86px 86px';
            userName.innerHTML = JSON.parse(result).profile.nickname;
            logBox.style.display = "none";
            infos[0].innerHTML = JSON.parse(result).profile.authority;
            infos[1].innerHTML = JSON.parse(result).profile.follows;
            infos[2].innerHTML = JSON.parse(result).profile.followeds;
            /* 下载板块下移 */
            app.style.marginTop = 80 + 'px';

            /* 记住登录状态 */
            sessionStorage.setItem("telNum",numBox.value);
            sessionStorage.setItem("password",Pw[0].value);
            sessionStorage.setItem("istrue",'yes');
            
            /* 判断是否是在我的音乐界面登录 */
            if(page2.style.display == 'block'){
                notLogin.style.display = 'none';
                hasLogin.style.display = 'flex';
            }

            /* 加载我的音乐页面的信息 */
            page2UserImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            page2UserImg.style.backgroundSize = "30px 30px";
            page2UserName.innerHTML = JSON.parse(result).profile.nickname;

            //用户发表评论框的头像
            page2ComImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            page2ComImg.style.backgroundSize = "50px 50px";

            /* 加载个人中心的信息 */
            userHomeImg.style.background = 'url('+JSON.parse(result).profile.avatarUrl+')';
            userHomeImg.style.backgroundSize = "180px 180px";
            infos1[0].innerHTML = JSON.parse(result).profile.authority;
            infos1[1].innerHTML = JSON.parse(result).profile.follows;
            infos1[2].innerHTML = JSON.parse(result).profile.followeds;
        }
    })
}

/* 判断两次输入得密码是否一致且格式是否正确 */
function checkPasw(){
    if(!box1.test(Pw[1].value) && Pw[1].value || !box1.test(Pw[2].value) && Pw[2].value){
        PwTypeErr[1].style.display = 'block'
    }else if(regPasw[0].value != regPasw[1].value && regPasw[0].value && regPasw[1].value){
        pasSureTip.style.display = "block";
    }else{
        pasSureTip.style.display = "none";
        PwTypeErr[1].style.display = 'none'
    }   
}

/* 获取用户信息 */
function getUserInfo(userId){
    $ajax({
        url: 'http://musicapi.leanapp.cn/user/detail',
        data: {
            uid: userId
        },
        success: function(result){
            levelNum.innerText = JSON.parse(result).level;
        },
        error: function(msg){
            console.log(msg);
        }
    })
    /* 获取歌单信息 */
    $ajax({
        url: 'http://musicapi.leanapp.cn/user/playlist',
        data: {
            uid: userId
        },
        success: function(result){
            createTime.innerHTML = timestampToDate(JSON.parse(result).playlist[0].createTime) + '创建';
            myPlayListName.innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
            for(let i=0;i<JSON.parse(result).playlist.length;i++){
                /* 判断歌单是否是自己创建的 */
                if(JSON.parse(result).playlist[i].userId == userId && i>0 && (mySongSheetLis.length+collectSongSheetLis.length) < JSON.parse(result).playlist.length){
                    let newNode = mySongSheetLis[0].cloneNode(true);
                    mySongSheetList.appendChild(newNode);
                    let NewNode = myPlayLis[0].cloneNode(true);
                    myPlayList.appendChild(NewNode);
                }else if(JSON.parse(result).playlist[i].userId != userId && i>0 && (mySongSheetLis.length+collectSongSheetLis.length) < JSON.parse(result).playlist.length){
                    let newNode = collectSongSheetLis[0].cloneNode(true);
                    collectSongSheetList.appendChild(newNode);
                    let NewNode = collectPlayLis[0].cloneNode(true);
                    collectPlayList.appendChild(NewNode);
                }
                mySongSheetNum.innerText = mySongSheetLis.length;
                collectSongSheetNum.innerText = collectSongSheetLis.length;
                allSongSheetPic[i].style.background = 'url(' + JSON.parse(result).playlist[i].coverImgUrl + ')';
                allSongSheetPic[i].style.backgroundSize = '120px 120px';
                allSongSheetInfo[i].innerText = JSON.parse(result).playlist[i].name;

                /* 歌单照片 */
                PlayListPic[i].style.background = 'url(' + JSON.parse(result).playlist[i].coverImgUrl + ')';
                PlayListPic[i].style.backgroundSize = '50px 50px';
                page2PlayListPic.style.background = 'url(' + JSON.parse(result).playlist[0].coverImgUrl + ')';
                page2PlayListPic.style.backgroundSize = '160px 160px';

                /* 歌单名字 */
                playListName[0].innerText = JSON.parse(result).playlist[0].name.replace(userName.innerHTML,'我');
                playListName[i].innerText = JSON.parse(result).playlist[i].name;
                palyListSongNum[i].innerText = JSON.parse(result).playlist[i].trackCount;
                songNum.innerText = palyListSongNum[0].innerText + "首歌";
                playTime.innerText = JSON.parse(result).playlist[0].totalDuration + '分钟';
                playListId[i] = JSON.parse(result).playlist[i].id;
            }
            /* 点击我的音乐里的歌单 */
            MyMusicLeft.onclick = function(ev){
                var e = ev || window.event;
                var target = e.target || window.event.srcElement;
                //触发子li的子元素时触发li
                while(target.tagName.toLowerCase() != 'li' && target.className != 'MyMusicLeft'){
                    target = target.parentNode;
                }
                for(let i=0;i<allPlayList.length;i++){
                    if(target == allPlayList[i]){
                        playListDetail(playListId[i]);
                    }
                }
            }
            playListDetail(playListId[0]);
            /* 一开始获取我喜欢的音乐的评论 */
            getPlayListComment(playListId[0]);
        },
        error: function(msg){
            console.log(msg);
        }
    })
}
