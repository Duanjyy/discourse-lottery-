<!DOCTYPE html>
<html>

<!-- head 中自定义的  -->

<head>
    <th:block/>
    <link <?php /* if(${#strings.equals(theme.config.comments.use, 'Waline')
    && not #strings.isEmpty(theme.config.comments.walines.serverURL)}) */ ?>
          rel="stylesheet">
    <!--  解决 katex pjax问题 -->
    <script <?php /* if() */ ?> defer=""
            src="/plugins/plugin-katex/assets/static/katex.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/custom.js"></script>
    <th:block <?php /* if() */ ?>>
        <th:block/>
    </th:block>

</head>

<body>

<!-- loading 页面 -->
<th:block <?php get_template_part("modules/loading-box"); ?>

<!-- 网站背景 -->
<div id="web_bg">
    <div <?php /* if() */ ?>>
        <img <?php /* if() */ ?>
             class="global_background_img"
        />
        <video <?php /* if() */ ?>
               class="index-video"
               id="index-video"
               autoplay=""
               loop=""
               muted=""
               playsinline=""
               webkit-playsinline=""
               style="display:block;object-fit:cover;width:100%;height:100%;pointer-events:none;">
        </video>
    </div>
</div>

<th:block <?php /* if() */ ?>>
    <style>
        @media screen and (min-width: 1300px) {
            .global_background_img {
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                opacity: 1;
                position: fixed;
                z-index: -999;
                background: var(--heo-background);
                background-attachment: fixed;
                background-repeat: no-repeat;
                background-size: cover;
            }
        }
        
        @media screen and (max-width: 1300px) {
            .global_background_img {
                display: none;
            }
        }
    
    </style>
</th:block>

<script <?php /* if() */ ?>
>
    function toRandomPost() {
        // 随机跳转全站的一篇文章
        let permalink = /**/ "/";
        
        // 当前窗口打开
        //window.location.href = permalink;
        pjax.loadUrl(permalink);
        // window.open(permalink);
    }

</script>

<!-- 网站背景 -->
<div id="an_music_bg"></div>

<!-- 控制台 -->
<div <?php get_template_part("modules/widgets/console"); ?>

<div <?php get_template_part("modules/sidebar"); ?>

<!-- 左下角音乐 -->
<th:block <?php /* if() */ ?>>
    <div <?php get_template_part("modules/widgets/nav-music"); ?>
</th:block>

<!-- 内容 -->
<th:block></th:block>


<!-- todo 右下角悬浮操作按钮 -->
<th:block <?php get_template_part("modules/widgets/rightside"); ?>


<div <?php get_template_part("modules/widgets/right-menu"); ?>

<div>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/utils.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/halo.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/main.js"></script>
    <script charset="utf-8" data-pjax src="<?php echo get_template_directory_uri(); ?>/assets/zhheo/blogex.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/tw_cn.js"></script>
    <!-- https://instant.page/ 网站预加载， 放在 </body> 之前 -->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/instantpage/instantpage.min.js"
            type="module"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/vanilla-lazyload/lazyload.iife.min.js"></script>
    
    <!-- 右下角通知 https://www.polonel.com/snackbar/ -->
    <!-- todo head 中有它的 css，应该可以写一块，并改成后台可配置的功能，代码中应该还有他的 js -->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/node-snackbar/snackbar.min.js"></script>
    
    <div class="js-pjax">
        <!-- 动态标题 -->
        <script <?php get_template_part("modules/common/diytitle"); ?>
    </div>
    
    <!-- 评论 -->
    <th:block <?php /* if() */ ?>>
        <th:block></th:block>
        <script <?php /* if() */ ?>>var visitorMail = "[()]";</script>
    </th:block>
    
    <!--音乐-->
    <script>var meting_api = "[()]"; </script>
    
    <!-- 深色模式下添加粒子效果canvas -->
    <canvas <?php /* if() */ ?> id="universe" width="1312" height="880"></canvas>
    <script <?php /* if() */ ?> async="" src="<?php echo get_template_directory_uri(); ?>/assets/libs/canvas/dark.js"></script>
    
    <!-- https://davidshimjs.github.io/qrcodejs/ 生成二维码 -->
    <!-- 应该是文章页分享使用 -->
    <script data-pjax src="<?php echo get_template_directory_uri(); ?>/assets/libs/qrcode/qrcode.min.js" ></script>
    
    <!--  https://raphamorim.io/waterfall.js/  应该是这个 还有相关的 js 代码 是否可以调整-->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/waterfall/waterfall.min.js"></script>
    
    <!-- 获取主色 https://lokeshdhakar.com/projects/color-thief/ -->
    <!--<script src="<?php echo get_template_directory_uri(); ?>/assets/libs/color-thief/color-thief.umd.js}"></script>-->
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/fast-average-color/index.browser.min.js"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/view-image/view-image.min.js"></script>

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/libs/aplayer/APlayer.min.css"
          media="all" onload="this.media='all'">
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/aplayer/APlayer.min.js"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/aplayer/Meting2.min.js"></script>
    
    <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/pjax/pjax.min.js"></script>
    
    <!-- swiper 在瞬间滚动时会使用 -->
    <script <?php /* if() */ ?> data-pjax
            src="<?php echo get_template_directory_uri(); ?>/assets/libs/swiper/swiper-bundle.min.js"></script>
    
    <!-- 右键菜单 -->
    <script <?php /* if() */ ?>
            src="<?php echo get_template_directory_uri(); ?>/assets/zhheo/rightmenu.js"></script>
    
    <!-- 评论弹幕 -->
    <script <?php /* if(${ ( ( not #strings.isEmpty(theme.config.comments.twikoos.envId)  && not #strings.isEmpty(theme.config.comments.twikoos.accessToken) ) ||
        ( not #strings.isEmpty(theme.config.comments.artalks.server) && not #strings.isEmpty(theme.config.comments.artalks.siteName)) ||
          (#strings.equals(theme.config.comments.use, 'Waline') && not #strings.isEmpty(theme.config.comments.walines.serverURL)) )
        && theme.config.comments.commentBarrageConfig.commentBarrageEnable
        && theme.config.comments.commentsEnable}) */ ?> data-pjax=""
            src="<?php echo get_template_directory_uri(); ?>/assets/zhheo/commentBarrage.js"></script>
    
    <!-- Tocbot 目录生成 start -->
    <th:block <?php get_template_part("modules/common/toc-bot"); ?>
    
    <!-- 51统计 -->
    <th:block <?php get_template_part("modules/common/51-la"); ?>
    
    <script>
        let pjaxSelectors = ['title', '#config-diff', '#body-wrap', '#rightside-config-hide', '#rightside-config-show', '.js-pjax', '#site-config']
        
        pjaxSelectors.unshift('meta[property="og:type"]', 'meta[property="og:image"]', 'meta[property="og:title"]', 'meta[property="og:url"]', 'meta[property="og:description"]'
                , 'meta[name="twitter:title"]', 'meta[name="twitter:url"]', 'meta[name="twitter:description"]', 'meta[name="twitter:image"]')
        
        var pjax = new Pjax({
            elements: 'a:not([target="_blank"])',
            selectors: pjaxSelectors,
            cacheBust: false,
            analytics: false,
            scrollRestoration: false
        })
        
        document.addEventListener('pjax:send', function () {
            
            // removeEventListener toc scroll
            window.removeEventListener('scroll', window.tocScrollFn)
            
            typeof preloader === 'object' && preloader.initLoading()
            
            if (window.aplayers) {
                for (let i = 0; i < window.aplayers.length; i++) {
                    if (!window.aplayers[i].options.fixed) {
                        window.aplayers[i].destroy()
                    }
                }
            }
            
            typeof typed === 'object' && typed.destroy()
            
            //reset readmode
            const $bodyClassList = document.body.classList
            $bodyClassList.contains('read-mode') && $bodyClassList.remove('read-mode')
        })
        
        document.addEventListener('pjax:complete', function () {
            window.refreshFn()
            
            document.querySelectorAll('script[data-pjax]').forEach(item => {
                        const newScript = document.createElement('script')
                        const content = item.text || item.textContent || item.innerHTML || ""
                        Array.from(item.attributes).forEach(attr => newScript.setAttribute(attr.name, attr.value))
                        newScript.appendChild(document.createTextNode(content))
                        item.parentNode.replaceChild(newScript, item)
                    }
            )
            
            GLOBAL_CONFIG.lazyload.enable && window.lazyLoadInstance.update()
            
            typeof chatBtnFn === 'function' && chatBtnFn()
            typeof panguInit === 'function' && panguInit()
            
            // google analytics
            typeof gtag === 'function' && gtag('config', '', {
                'page_path': window.location.pathname
            });
            
            // baidu analytics
            typeof _hmt === 'object' && _hmt.push(['_trackPageview', window.location.pathname]);
            
            typeof loadMeting === 'function' && document.getElementsByClassName('aplayer').length && loadMeting()
            
            // Analytics
            if (false) {
                MtaH5.pgv()
            }
            
            // prismjs
            typeof Prism === 'object' && Prism.highlightAll()
            
            typeof preloader === 'object' && preloader.endLoading()
        })
        
        document.addEventListener('pjax:error', (e) => {
                    if (e.request.status === 404 || e.request.status === 500) {
                        window.location.href = e.request.responseURL;
                    }
                }
        )
    </script>


</div>

<!-- 根据配置设置 css 变量值，全局 css 通过变量值进行处理 -->
<th:block <?php get_template_part("'modules/variables/layout'"); ?>></th:block>

<script data-pjax="">
    
    //页脚友联
    GLOBAL_CONFIG.isFriendLinksInFooter && heo.addFriendLinksInFooter()
    //音乐页面切换歌曲调用
    if (GLOBAL_CONFIG.isMusic) {
        heo.changeMusicBg(false);
    }
    //代码块
    if (GLOBAL_CONFIG.prism.enable) {
        halo.addPrismTool()
        halo.dataCodeTheme()
    }

</script>
</body>

</html>
