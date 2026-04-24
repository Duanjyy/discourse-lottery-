<!-- 公共的 head 部分，可以定义部分 links,scripts,styles -->

    <meta charset="UTF-8">
    <meta content="IE=edge" http-equiv="X-UA-Compatible">
    <meta content="width=device-width,initial-scale=1" name="viewport">
    <meta content="telephone=no" name="format-detection">
    <meta content="var(--heo-card-bg)" name="theme-color">
    <title></title>
    <link rel="shortcut icon"/>

    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/jquery/jquery.min.js"></script>

    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/heo.js"></script>

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/zhheo/zhheoblog.css">

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/zhheo/custom.css">

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/zhheo/commentBarrage.css">

    <style <?php /* if() */ ?>>
        *::-webkit-scrollbar-thumb {
            background-color: var(--heo-main);
            background-image: -webkit-linear-gradient(45deg,rgba(255,255,255,.4) 25%,transparent 25%,transparent 50%,rgba(255,255,255,.4) 50%,rgba(255,255,255,.4) 75%,transparent 75%,transparent);
            border-radius: 2em
        }
    </style>

    <!-- swiper 在瞬间滚动时会使用 -->
    <link <?php /* if() */ ?> rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/libs/swiper/swiper-bundle.min.css"/>
    
    <!-- 右下角通知 -->
    <link href="<?php echo get_template_directory_uri(); ?>/assets/libs/node-snackbar/snackbar.min.css"
          media="print"
          onload='this.media="all"'
          rel="stylesheet"

    <!-- 代码块自动识别语言 -->
    <?php get_template_part("modules/common/code"); ?>
    <!--  代码块-->
    <?php get_template_part("macro/prism-code"); ?>

    <!-- 页脚内容-样式一 -->
    <?php get_template_part("modules/common/footer-style-one"); ?>

    <script>
        (win => {
            win.saveToLocal = {
                set: function setWithExpiry(key, value, ttl) {
                    if (ttl === 0) return
                    const now = new Date()
                    const expiryDay = ttl * 86400000
                    const item = {
                        value: value,
                        expiry: now.getTime() + expiryDay,
                    }
                    localStorage.setItem(key, JSON.stringify(item))
                },

                get: function getWithExpiry(key) {
                    const itemStr = localStorage.getItem(key)

                    if (!itemStr) {
                        return undefined
                    }
                    const item = JSON.parse(itemStr)
                    const now = new Date()

                    if (now.getTime() > item.expiry) {
                        localStorage.removeItem(key)
                        return undefined
                    }
                    return item.value
                }
            }

            win.getScript = url => new Promise((resolve, reject) => {
                const script = document.createElement('script')
                script.src = url
                script.async = true
                script.onerror = reject
                script.onload = script.onreadystatechange = function () {
                    const loadState = this.readyState
                    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
                    script.onload = script.onreadystatechange = null
                    resolve()
                }
                document.head.appendChild(script)
            })

            win.getCSS = (url,id = false) => new Promise((resolve, reject) => {
                const link = document.createElement('link')
                link.rel = 'stylesheet'
                link.href = url
                if (id) link.id = id
                link.onerror = reject
                link.onload = link.onreadystatechange = function() {
                    const loadState = this.readyState
                    if (loadState && loadState !== 'loaded' && loadState !== 'complete') return
                    link.onload = link.onreadystatechange = null
                    resolve()
                }
                document.head.appendChild(link)
            })

            win.activateDarkMode = function () {
                document.documentElement.setAttribute('data-theme', 'dark')
                document.documentElement.classList.add('color-scheme-dark')
                heo.initThemeColor()
            }
            win.activateLightMode = function () {
                document.documentElement.setAttribute('data-theme', 'light')
                document.documentElement.classList.remove('color-scheme-dark')
                heo.initThemeColor()
            }
            const t = saveToLocal.get('theme')

            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
            const isLightMode = window.matchMedia('(prefers-color-scheme: light)').matches
            const isNotSpecified = window.matchMedia('(prefers-color-scheme: no-preference)').matches
            const hasNoSupport = !isDarkMode && !isLightMode && !isNotSpecified

            if (t === undefined) {
                if (isLightMode) activateLightMode()
                else if (isDarkMode) activateDarkMode()
                else if (isNotSpecified || hasNoSupport) {
                    const now = new Date()
                    const hour = now.getHours()
                    const isNight = hour <= 6 || hour >= 18
                    isNight ? activateDarkMode() : activateLightMode()
                }
                window.matchMedia('(prefers-color-scheme: dark)').addListener(function (e) {
                    if (saveToLocal.get('theme') === undefined) {
                        e.matches ? activateDarkMode() : activateLightMode()
                    }
                })
            } else if (t === 'light') activateLightMode()
            else activateDarkMode()

            if("" === 'dark')
                activateDarkMode()
            if("" === 'light')
                activateLightMode()

            const asideStatus = saveToLocal.get('aside-status')
            if (asideStatus !== undefined) {
                if (asideStatus === 'hide') {
                    document.documentElement.classList.add('hide-aside')
                } else {
                    document.documentElement.classList.remove('hide-aside')
                }
            }
        })(window)
    </script>

    <!-- 动态加载条 -->
    <script data-pace-options="{ &quot;restartOnRequestAfter&quot;:false,&quot;eventLag&quot;:false}"
            src="<?php echo get_template_directory_uri(); ?>/assets/libs/pace/pace.min.js"
            <?php /* if() */ ?>>
    </script>

    <!-- 复制 https://githubfast.com/zenorocha/clipboard.js -->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/clipboard/clipboard.min.js"></script>

    <!-- 关于统计-->
    <script <?php /* if() */ ?> src="<?php echo get_template_directory_uri(); ?>/assets/libs/countup/countup.js"></script>

    <!-- icon图标 -->
    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/icon/iconfont.css">

    <?php get_template_part("modules/variables/site-config"); ?>




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
    