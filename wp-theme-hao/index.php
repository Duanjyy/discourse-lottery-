<?php get_header(); ?>

    
    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header th:class="${theme.config.top.above.enable_above ? 'full_page' : 'not-top-img'}" id="page-header">
            <?php get_template_part("modules/nav"); ?>
            <!-- 问候语 -->
            <?php get_template_part("modules/header/greeting"); ?>
            <!-- 第一屏 -->
            <?php get_template_part("modules/header/index-img"); ?>
        </header>
        <div id="home_top">
            <!-- 每日说说 -->
            <?php get_template_part("modules/moment"); ?>
            <!-- 置顶内容 -->
            <?php get_template_part("modules/recent-top"); ?>
        </div>
        <main class="layout" id="content-inner" th:classappend="${theme.config.sidebar.location}">
            <div class="recent-posts" id="recent-posts">
                
                <!-- 分类导航栏 -->
                <div th:replace="~{'modules/bar/' + ${theme.config.layout.navs.nav}}"></div>
                
                <?php get_template_part("modules/post-list"); ?>
            
            </div>
            <?php get_template_part("modules/aside"); ?>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
