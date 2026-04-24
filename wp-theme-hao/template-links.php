<?php get_header(); ?>


    


    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav :: nav(title = '友链')"); ?>
            <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/assets/libs/fcircle/heo-fcircle3.css">
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                

                <hr <?php /* if() */ ?>
                <!--/* 评论组件 */-->
                
                <style>
                    /*修复友链页面表情选择器无法显示完全的bug*/
                    .tk-submit {
                        overflow: inherit !important;
                    }
                </style>
            </div>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>




<?php get_footer(); ?>
