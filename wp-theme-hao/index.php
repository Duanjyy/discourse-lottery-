<?php get_header(); ?>

    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header id="page-header">
            <nav></nav>
            <!-- 问候语 -->
            <?php get_template_part("modules/header/greeting"); ?>
            <!-- 第一屏 -->
            <?php get_template_part("modules/header/index-img"); ?>
        </header>
        <div id="home_top">
            <!-- 每日说说 -->
            <?php if(get_theme_mod("hao_moment", false)) : ?>
                <?php get_template_part("modules/moment"); ?>
            <?php endif; ?>
            <!-- 置顶内容 -->
            <?php if(get_theme_mod("hao_recentTop", false)) : ?>
                <?php get_template_part("modules/recent-top"); ?>
            <?php endif; ?>
        </div>
        <main class="layout" id="content-inner">
            <div class="recent-posts" id="recent-posts">
                
                <!-- 分类导航栏 -->
                <div></div>
                
                <?php get_template_part("modules/post-list"); ?>
            
            </div>
            <?php get_template_part("modules/aside"); ?>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>






<?php get_footer(); ?>
