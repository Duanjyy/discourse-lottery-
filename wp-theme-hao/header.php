<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<!-- head 中自定义的  -->

<head>
    <?php get_template_part("modules/head"); ?>
    <?php wp_head(); ?>
    <link
          rel="stylesheet">
    <!--  解决 katex pjax问题 -->
    <script defer=""
            src="/plugins/plugin-katex/assets/static/katex.min.js"></script>
    <script src="<?php echo get_template_directory_uri(); ?>/assets/js/custom.js"></script>
    
        
    

</head>

<body <?php body_class(); ?>>
<?php wp_body_open(); ?>

<!-- loading 页面 -->
<?php get_template_part("modules/loading-box"); ?>

<!-- 网站背景 -->
<div id="web_bg">
    <div>
        <img
             class="global_background_img"
        />
        <video
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


<script
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
<?php get_template_part("modules/widgets/console"); ?>

<?php get_template_part("modules/sidebar"); ?>

<!-- 左下角音乐 -->

    <?php get_template_part("modules/widgets/nav-music"); ?>


<!-- 内容 -->
