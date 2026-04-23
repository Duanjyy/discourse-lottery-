import os
import re

def add_global_config():
    head_path = '/workspace/wp-theme-hao/modules/head.php'
    
    with open(head_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    global_config_js = """
    <script>
        var GLOBAL_CONFIG = {
            root: '<?php echo home_url("/"); ?>',
            algolia: undefined,
            localSearch: undefined,
            translate: {"defaultEncoding":2,"translateDelay":0,"msgToTraditionalChinese":"繁","msgToSimplifiedChinese":"简"},
            noticeOutdate: undefined,
            highlight: {"plugin":"prismjs","highlightCopy":true,"highlightLang":true,"highlightHeightLimit":false},
            copy: {
                success: '复制成功',
                error: '复制错误',
                noSupport: '浏览器不支持'
            },
            relativeDate: {
                homepage: true,
                post: true
            },
            runtime: '<?php echo get_theme_mod("hao_siteStartTime", "2023-08-05"); ?>',
            date_suffix: {
                just: '刚刚',
                min: '分钟前',
                hour: '小时前',
                day: '天前',
                month: '个月前'
            },
            copyright: undefined,
            lightbox: 'fancybox',
            Snackbar: {"chs_to_cht":"你已切换为繁体","cht_to_chs":"你已切换为简体","day_to_night":"你已切换为深色模式","night_to_day":"你已切换为浅色模式","bgLight":"#49b1f5","bgDark":"#1f1f1f","position":"top-center"},
            source: {
                justifiedGallery: {
                    js: '<?php echo get_template_directory_uri(); ?>/assets/libs/fjGallery/fjGallery.min.js',
                    css: '<?php echo get_template_directory_uri(); ?>/assets/libs/fjGallery/fjGallery.min.css'
                }
            },
            isPhotoFigcaption: true,
            islazyload: true,
            isAnchor: true,
            shortcutKey: true,
            isFriendLinksInFooter: true,
            isMusic: false,
            prism: {
                enable: true
            }
        };
        var heo = {
            changeTimeInArticleQueue: [],
            themeColor: '#49b1f5'
        };
    </script>
    """
    
    if "var GLOBAL_CONFIG" not in content:
        content += global_config_js
        
    with open(head_path, 'w', encoding='utf-8') as f:
        f.write(content)

add_global_config()
