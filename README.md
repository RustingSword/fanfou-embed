# 将饭否消息嵌入网页中

## Usage

见`demo.html`:

```
<!DOCTYPE html>
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <script type="text/javascript" charset="utf-8" src="fanfouembed.js"></script>
    <style type="text/css">
    body {background: #eee;}
    </style>
</head>
<body>
    <script type="text/javascript">
        ffstatus.embedMessage("http://fanfou.com/statuses/kSKBi4eZ-qQ");
        ffstatus.embedMessage("http://fanfou.com/statuses/jUYCGbbeMUM");
        ffstatus.embedMessage("http://fanfou.com/statuses/qBfN_C5UfrU");
    </script>
</body>
```

result:

![嵌入的消息](/demo.png)

## 致谢

JS 代码来自[饭否博客插件](http://fanfou.com/badge/step3?bsp=other&type=js)
CSS代码来自[饭否主站](http://static.fanfou.com/css/base.css?v=85a0092e)
饭否 API 参考文档[statuses.show](https://github.com/FanfouAPI/FanFouAPIDoc/wiki/statuses.show)
