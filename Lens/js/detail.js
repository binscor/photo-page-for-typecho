$(document).ready(function(){
    var Bucket = 'zhengpictrue-1256600800';
    var Region = 'ap-nanjing';
    var photoName = Base64.decode(window.location.search.split('&')[0]);
    var photoType = "travel/" + photoName;
    var url = "https://" + Bucket + ".cos." + Region + ".myqcloud.com/";
    var cos = new COS({
        getAuthorization: function (options, callback) {
            // 服务端 JS 和 PHP 例子：https://github.com/tencentyun/cos-js-sdk-v5/blob/master/server/
            // 服务端其他语言参考 COS STS SDK ：https://github.com/tencentyun/qcloud-cos-sts-sdk
            // STS 详细文档指引看：https://cloud.tencent.com/document/product/436/14048
            $.get('https://api.binscor.top/api/index', {
                // 可从 options 取需要的参数
            }, function (data) {
                var credentials = data && data.credentials;
                if (!data || !credentials) {
                    return console.error('credentials invalid');
                }
                callback({
                    TmpSecretId: credentials.tmpSecretId,
                    TmpSecretKey: credentials.tmpSecretKey,
                    SecurityToken: credentials.sessionToken,
                    // 建议返回服务器时间作为签名的开始时间，避免用户浏览器本地时间偏差过大导致签名错误
                    StartTime: data.startTime, // 时间戳，单位秒，如：1580000000
                    ExpiredTime: data.expiredTime, // 时间戳，单位秒，如：1580000900
                });

            });
        }
    });
    cos.getBucket({
        Bucket: Bucket,
        Region: Region,
        Prefix: photoType,
        // MaxKeys: 100,
        // Marker: this.config.NextMarker,
    }, function (err, data) {
        var contents = data.Contents;
        var j = 0;
        var datas = Array();
        for (var i = 0; i < contents.length; i++) {
            if (contents[i].Key != "travel/" + photoName + "/") {
                datas[j] = Array();
                datas[j][0] = 'a';
                datas[j][1] = 'b';
                datas[j][2] = url + contents[i].Key + "?imageMogr2/format/webp";
                j++;
            }
        }
        
        var parent = document.getElementById("thumbnails");
        for (var i = 0; i < datas.length; i++) {
            var article = document.createElement("article");
            article.className = "thumb";
            parent.appendChild(article);
            var a = document.createElement("a");
            a.className = "thumbnail";
            a.href = datas[i][2];
            article.appendChild(a);
            var img = document.createElement("img");
            img.src = datas[i][2] + "";
            a.appendChild(img);
            var h2 = document.createElement("h2");
            h2.innerHTML = datas[i][0];
            article.appendChild(h2);
            var p = document.createElement("p");
            p.innerHTML = datas[i][1];
            article.appendChild(p);
        }
        main.init();
    });
    
});
