/* 封装Ajax函数 */
function $ajax({method = "get", url, data, success, error}){
    /* 新建对象 */
    var xhr = null;
    try{
        xhr = new XMLHttpRequest();
    }catch(error){
        xhr = new ActiveXObject("Microsoft.XMLHTTP");
    }

    /* 判断data数据存在，则将对象转为字符串 */
    if(data){
        data = queryString(data);
    }

    /* 判断方法是否是GET，且有无数据请求 */
    if(method == "get" && data){
        url += "?" + data;
    }

    xhr.open(method, url, true);

    /* 判断是否为get请求 */
    if(method == "get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded");
        xhr.send(data);
    }

    /* 等待数据响应 */
    xhr.onreadystatechange = function(){
        /* 判断是否解析完成 */
        if(xhr.readyState == 4){
            /* 判断本次下载的状态码是多少 */
            if(xhr.status == 200){
                //判断success函数是否存在
                if(success){
                    success(xhr.responseText);
                }
            }else{
                if(error){
                    error("Error:" + xhr.responseText);
                }
            }
        }
    }
}

/* 将对象转成字符串 */
function queryString(obj){
    var str = "";
    for(var attr in obj){
        str += attr + "=" + obj[attr] + "&";
    }
    return str.substring(0, str.length-1);
}

/* 将时间截化为时间 */
function timestampToDate(timestamp) {
    var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    var Y = date.getFullYear();
    var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1);
    var D = date.getDate();
    var H = date.getHours();
    var m = (date.getMinutes() < 10 ? '0'+(date.getMinutes()) : date.getMinutes());
    var Now = new Date();
    if((Y == Now.getFullYear())){
        /* 今天内 */
        if((M == Now.getMonth()+1) && D == Now.getDate()){
            return '今天 ' + H + ':' + m;
        }else{
            return M + '-' + D;
        }
    }
    return Y + '-' + M + '-' + D;
}

/* 检查时间是否为两位数，只有一位则在前面加个0 */
//参数1：用来装添加0之后的时间，参数2是要验证的时间
function checkTime(a,b){
    if(b < 10){
        a.innerHTML = '0' + b;
    }else{
        a.innerHTML = b;
    }
}