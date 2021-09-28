# photo page for typecho

# 使用说明
### 安装

将`photo-page-for-typecho`文件夹内的`.php`文件上传至你所使用的主题根目录（可选两种模板），如默认主题路径`/usr/themes/default`，然后在typecho后台创建空白单页，根据你所上传的文件，将模板选择`Multiverse风格照片集`或`Lens风格照片集`。鉴于GoogleFont服务在国内完全正常使用，暂不使用第三方镜像加速。

注：你无需下载`master`下的所有文件，静态文件均采用了jsDelivr公共CDN加速；强烈建议使用对象存储保存照片，以便程序自动调用图片云处理功能。


### 调用格式

```
标题,简介,图片链接
```

多图以回车结束，每一行代表一张图片的信息。

例如：
```
picture1,2020年01月01日拍摄,https://ww2.sinaimg.cn/large/006uAlqKgy1fzlbjrxju2j31400u04qz.jpg
picture2,2020年01月02日拍摄,https://ww2.sinaimg.cn/large/006uAlqKgy1fzlbjrxju2j31400u04qz.jpg
picture3,2020年01月03日拍摄,https://ww2.sinaimg.cn/large/006uAlqKgy1fzlbjrxju2j31400u04qz.jpg
```

### 自定义字段

[可选] `about`：控制指定位置的文本，可自定义关于等信息；

[可选] `CDN`：用以匹配你所使用的对象存储服务商，目前支持又拍云、阿里云OSS、七牛云、腾讯云，本字段目的在于使用云图像处理动态生成缩略图。对应填写内容为：`UPYUN`/`OSS`/`KODO`/`COS`；

[可选] 社交链接字段 `Twitter`, `Facebook`, `Instagram`, `GitHub`，给相应字段填入链接即可。
