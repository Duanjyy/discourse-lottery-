<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout" id="content-inner">
            <div class="recent-posts" id="recent-posts">
                <?php get_template_part("modules/post-list"); ?>
            </div>
            <?php get_template_part("modules/aside"); ?>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
