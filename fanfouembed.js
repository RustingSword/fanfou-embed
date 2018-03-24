fanfou = new Object();
fanfou.Embedder = function() {
    this.server = "https://api.fanfou.com";
    this.embedded_msg_count = 0;
};
fanfou.Embedder.prototype = {
    injectCSS: function() {
        if (this.has_fanfou_css == true)
            return;
        this.has_fanfou_css = true;
        var css = `
        .ui-roundedbox {
            max-width:600px;
            font-size: 12px;
            line-height: 150%;
            display: block;
            margin: 0 auto;
            margin-bottom: 5px;
        }
        .ui-roundedbox-content { padding: 25px 15px 10px; position: static; * left: 0; top: 0;}
        #topbox {
            background: #fff;
            border-top-left-radius: 10px;
            border-top-right-radius: 10px;
            -moz-border-radius-topleft: 10px;
            -webkit-border-top-right-radius: 10px;
            -webkit-border-top-left-radius: 10px;
            margin-left: 0 !important;
        }

        #info {position: relative; padding: 0 0 5px;}
        #info #avatar {
            float: left;
            background: #fff;
            overflow: hidden;
        }

        #latest {
            margin-left: 115px;
            _zoom: 1;
        }
        #latest h1 {
            padding: 0 10px 8px;
            font-size: 16px;
            line-height: 120%;
        }
        #latest h2 {
            position: relative;
            padding-left: 10px;
            font-size: 14px;
            font-weight: normal;
            word-wrap: break-word;
            overflow: hidden;
            -o-text-overflow: ellipsis;
        }
        #latest h2 .content {
            white-space: pre-line;
        }
        #latest h2 a.photo {
            float: right;
        }
        .zoom {
            position: relative;
            z-index: 1;
            zoom: 1;
        }
        #latest h2 a.photo img {
            display: block;
            max-width: 100px;
            width: 100px;
        }
        a.photo img {
            border: 0;
            vertical-align: middle;
            padding: 2px;
            border: 1px solid #ccc;
            background: #fff;
            margin-bottom: 2px;
        }
        #latest .stamp {
            display: block;
            margin-top: 20px;
            color: #999;
            font-size: 12px;
            zoom: 1;
        }
        .stamp a {
            border-bottom: 1px dotted #999;
            color: #999;
            text-decoration: none;
        }
        .method {
            margin-left: .3em;
        }
        #latest h2:after {
            content: ".";
            display: block;
            font-size: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
        #info:after {
            content: ".";
            display: block;
            font-size: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
        .bottombox {
            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;
            -moz-border-radius-bottomright: 10px;
            -webkit-border-bottom-right-radius: 10px;
            -moz-border-radius-bottomleft: 10px;
            -webkit-border-bottom-left-radius: 10px;
            height: 15px;
            background-color: #fff;
        }
        .ui-roundedbox:after {
            content: ".";
            display: block;
            font-size: 0;
            line-height: 0;
            clear: both;
            visibility: hidden;
        }
`;

        var node = document.createElement('style');
        node.type = 'text/css';
        if (node.styleSheet)
            node.styleSheet.cssText = css;
        else
            node.appendChild(document.createTextNode(css));
        document.getElementsByTagName('head')[0].appendChild(node);
    },
    getDate: function(_1) {
        var _2 = _1.split(" ");
        var _1 = _2[1] + " " + _2[2] + ", " + _2[5] + " " + _2[3];
        var _3 = new Date();
        var _4 = Date.parse(_1) - _3.getTimezoneOffset() * 60 * 1000;
        return new Date(_4);
    },
    fullDate: function(_5) {
        return _5.getFullYear() + "-" + (_5.getMonth() >= 9 ? "" : "0") + (_5.getMonth() + 1) + "-" + (_5.getDate() > 9 ? "" : "0") + _5.getDate() + " " + (_5.getHours() > 9 ? "" : "0") + _5.getHours() + ":" + (_5.getMinutes() > 9 ? "" : "0") + _5.getMinutes();
    },
    readableDate: function(_6) {
        var _7 = _6.valueOf();
        var _8 = new Date();
        var _9 = parseInt((_8.getTime() - _7) / 1000);
        if (_9 < 60) {
            return _9 + " \u79d2\u524d";
        } else {
            if (_9 < 60 * 60) {
                return (parseInt(_9 / 60)).toString() + " \u5206\u949f\u524d";
            } else {
                if (_9 < 60 * 60 * 24) {
                    return "\u7ea6 " + (parseInt(_9 / 3600)).toString() + " \u5c0f\u65f6\u524d";
                } else {
                    return this.fullDate(_6);
                }
            }
        }
    },
    createName: function(_a) {
        var h1 = document.createElement('h1');
        var _b = document.createElement("a");
        _b.href = 'https://fanfou.com/' + _a.user.id;
        _b.title = _a.user.name;
        _b.target = "_blank";
        _b.appendChild(document.createTextNode(_a.user.screen_name));
        h1.appendChild(_b);
        return h1;
    },
    createText: function(_c) {
        var span = document.createElement('span');
        span.className = 'content';
        if (_c.photo) {
            var photo_anchor = document.createElement('a');
            photo_anchor.className = 'photo zoom';
            photo_anchor.href = _c.photo.largeurl;
            thumb = document.createElement('img');
            thumb.src = _c.photo.thumburl;
            photo_anchor.appendChild(thumb);
            span.appendChild(photo_anchor);
        }
        var fix_relative_url = _c.text.replace(/href=\"\//g, 'href="https://fanfou.com/');
        span.innerHTML += fix_relative_url;
        return span;
    },
    createStamp: function(_d) {
        var stamp = document.createElement('span');
        stamp.className = 'stamp';

        var _e = document.createElement("a");
        var _f = this.getDate(_d.created_at);
        _e.appendChild(document.createTextNode(this.readableDate(_f)));
        _e.href = "https://fanfou.com/statuses/" + _d.id;
        _e.className = "time";
        _e.title = this.fullDate(_f);
        _e.target = "_blank";

        var method = document.createElement('span');
        method.className = 'method';
        method.innerHTML = this.createMethod(_d);

        stamp.appendChild(_e);
        stamp.appendChild(method);
        return stamp;
    },
    createMethod: function(msg) {
        var text = '通过 ';
        if (msg.source == '手机上网')
            method = '<a href="https://help.fanfou.com/mobile_wap.html" target="_blank">手机上网</a>';
        else
            method = msg.source;
        text += method + ' 发送';
        return text;
    },
    display: function(msg) {
        container_id = 'fanfou-embed-body' + this.embedded_msg_count;
        if (! document.getElementById(container_id))
            document.write('<div id="' + container_id + '" class="ui-roundedbox"></div>');
        var container = document.getElementById(container_id);
        this.embedded_msg_count += 1;

        var topbox = document.createElement('div');
        topbox.id = 'topbox';
        topbox.className = 'ui-roundedbox-content';

        var info = document.createElement('div');
        info.id = 'info';

        var avatar = document.createElement('div');
        avatar.id = 'avatar';

        var img_link = document.createElement('a');
        img_link.href = 'https://fanfou.com/' + msg.user.id;

        var img = document.createElement('img');
        img.src = msg.user.profile_image_url_large;
        img.alt = msg.user.screen_name;
        img.className = 'msgat';
        img_link.appendChild(img);

        avatar.appendChild(img_link);

        var latest = document.createElement('div');
        latest.id = "latest";
        latest.className = "msg";
        latest.appendChild(this.createName(msg));

        var h2 = document.createElement('h2');
        h2.appendChild(this.createText(msg));
        h2.appendChild(this.createStamp(msg));
        latest.appendChild(h2);

        info.appendChild(avatar);
        info.appendChild(latest);

        topbox.appendChild(info);
        container.appendChild(topbox);

        bottombox = document.createElement('div');
        bottombox.className = 'bottombox';
        container.appendChild(bottombox);
    },
    extractIdFromUrl: function(msg_id) {
        return msg_id.split("/").pop();
    },

    embedMessage: function(msg_id) {
        var pure_id = this.extractIdFromUrl(msg_id);
        document.write("<script type=\"text/javascript\" charset=\"utf-8\" src=\"" + this.server + "/statuses/show.json?format=html&amp;cb=ffstatus.display&amp;id=" + pure_id + "\"></" + "script>");
    }
}
ffstatus = new fanfou.Embedder();
ffstatus.injectCSS();
