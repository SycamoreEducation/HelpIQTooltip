document.write('<style type="text/css">.tooltip-wrap{position:absolute;display:none;width:300px;left:0;top:0;z-index:20000;overflow:hidden}.tooltip .tooltip-close{width:16px;height:16px;background:url(http://www.helpdocsonline.com/tooltips/close.png) 0 0 no-repeat;cursor:pointer;text-indent:-9999em;overflow:hidden;display:block;font-size:0;float:right;margin:2px 3px 2px 4px;}.tooltip-loading{background:url(http://www.helpdocsonline.com/tooltips/loading.gif) 3px 5px no-repeat;padding:6px 6px 3px 25px;height:17px;border-style:solid;border-width:0;width:50px;font:12px Arial,Helvetica,sans-serif;}.tooltip{opacity:1;filter:none}</style>');
jQuery.extend({
    helpiqTip: function () {
        var b = {
            fadeEffect: [true, 150],
            userOffset: [10, 10],
            hideDelay: 500,
            showDelay: 500,
            tipWidth: 0,
            defaultTipWidth: 20,
            loadingHTML: '<div class="tooltip-loading"></div>',
            id: 0,
            autoClose: true,
            hideTimer: null,
            showTimer: null,
            cssReady: 0,
            evt: null,
            el: null,
            positionTip: function (i, j) {
                var f = b;
                var l = (window.innerWidth) ? window.innerWidth - 15 : f.iebody.clientWidth - 15;
                var n = (window.innerHeight) ? window.innerHeight - 18 : f.iebody.clientHeight - 15;
                var d = window.pageXOffset ? window.pageXOffset : f.iebody.scrollLeft;
                var c = window.pageYOffset ? window.pageYOffset : f.iebody.scrollTop;
                var k = i.get(0).offsetWidth;
                var m = i.get(0).offsetHeight;
                var h = j.pageX + this.userOffset[0];
                var g = j.pageY + this.userOffset[1];
                if ((j.clientX + this.userOffset[0] + parseInt(this.tipWidth) - d) > l) {
                    h = j.pageX - this.tipWidth
                }
                g = (j.clientY + m - c > n) ? g - (2 * this.userOffset[0]) : g;
                i.css({
                    left: h,
                    top: g,
                    overflow: "hidden"
                })
            },
            showTip: function (c, d) {
                if (this.fadeEffect[0]) {
                    c.hide().fadeIn(this.fadeEffect[1])
                } else {
                    c.show()
                }
                c.css({
                    overflow: "visible"
                })
            },
            hideTip: function (c) {
                $tooltip = a;
                if (this.fadeEffect[0]) {
                    $tooltip.fadeOut(this.fadeEffect[1])
                } else {
                    $tooltip.hide()
                }
            },
            delayShow: function (g) {
                var g = this.evt,
                    f = this.el,
                    d = b;
                b.showMask(g);
                var c = f.titleurl + "&css_ready=" + d.cssReady;
                jQuery.getJSON(c, function (i) {
                    var m = i.data;
                    var l = m.width || 300,
                        e = [m.offset_x ? parseInt(m.offset_x) : 10, m.offset_y ? parseInt(m.offset_y) : 10],
                        h = m.auto_close ? (m.auto_close == "1") : 1,
                        n = m.id || 99999999999,
                        k = a;
                    k.css("width", l + "px");
                    d.id = n;
                    d.autoClose = h;
                    d.userOffset = e;
                    var j = '<div class="tooltip">';
                    if (!d.autoClose) {
                        j += '<a class="tooltip-close" href="#">close</a>'
                    }
                    j += m.content;
                    j += "</div>";
                    if (i.css) {
                        j += '<style type="text/css">' + i.css + " .tooltip{display:block}</style>"
                    }
                    k.hide().html(j);
                    d.tipWidth = l;
                    d.positionTip(k, g);
                    d.showTip(k, g);
                    k.get(0).loadsuccess = true;
                    jQuery(k).find(".tooltip-close").click(function (o) {
                        b.hideTip(a, o);
                        return false
                    })
                })
            },
            showMask: function (d) {
                var c = a;
                this.userOffset = [10, 10];
                this.tipWidth = this.defaultTipWidth;
                this.positionTip(c, d);
                c.width(this.tipWidth).html(this.loadingHTML).show()
            },
            initTips: function (f, e) {
                var d = jQuery.trim(f.getAttribute("title"));
                d = d.replace("tip:", "");
                var h = d.lastIndexOf("/");
                var g = d.substring(h);
                g = g.replace("ID", "");
                g = g.replace("/", "");
                d = d.substring(0, h) + "/tooltip/get_tip/?id=" + g + "&callback=?";
                f.titleurl = d;
                f.titleposition = e + " pos";
                var c = jQuery(f);
                c.removeAttr("title");
                c.bind("mouseover", function (i) {
                    if (b.hideTimer) {
                        clearTimeout(b.hideTimer)
                    }
                    if (b.showTimer) {
                        clearTimeout(b.showTimer)
                    }
                    b.evt = i;
                    b.el = this;
                    b.showTimer = setTimeout(function (j) {
                        b.delayShow()
                    }, b.showDelay)
                });
                c.bind("mouseout", function (i) {
                    if (b.hideTimer) {
                        clearTimeout(b.hideTimer)
                    }
                    if (b.showTimer) {
                        clearTimeout(b.showTimer)
                    }
                    b.hideTimer = setTimeout(function (j) {
                        if (b.autoClose) {
                            b.hideTip()
                        }
                    }, b.hideDelay)
                })
            }
        };
        b.iebody = (document.compatMode && document.compatMode != "BackCompat") ? document.documentElement : document.body;
        if (jQuery(".helpiq-tip").length <= 0) {
            jQuery('<div class="helpiq-tip tooltip-wrap"></div>').appendTo("body")
        }
        var a = jQuery(".helpiq-tip");
        jQuery('*[title^="tip:"]').each(function (c) {
            b.initTips(this, c)
        });
        jQuery(document).click(function (g) {
            var d = g.target;
            var f = jQuery(d).parents(".tooltip");
            var c = jQuery(".helpiq-tip");
            if (f.length <= 0 && !jQuery(d).hasClass("tooltip")) {
                b.hideTip(c, g)
            }
        })
    }
});
jQuery(document).ready(function () {
    jQuery.helpiqTip()
});
