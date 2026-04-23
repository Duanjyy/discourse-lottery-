<?php get_header(); ?>

<th:block>
    <th:blockname"); ?>,
                _permalink = '',
                _cover = ,
                _excerpt = ,
                _type = 'website')}"></th:block>
</th:block>
<th:block>
    
    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header id="page-header">
            <nav></nav>
            <!-- 问候语 -->
            <th:block <?php get_template_part("modules/header/greeting"); ?>
            <!-- 第一屏 -->
            <th:block <?php get_template_part("modules/header/index-img"); ?>
        </header>
        <div id="home_top">
            <!-- 每日说说 -->
            <div <?php get_template_part("modules/moment"); ?>
            <!-- 置顶内容 -->
            <div <?php get_template_part("modules/recent-top"); ?>
        </div>
        <main class="layout" id="content-inner">
            <div class="recent-posts" id="recent-posts">
                
                <!-- 分类导航栏 -->
                <div></div>
                
                <th:block <?php get_template_part("modules/post-list"); ?>
            
            </div>
            <div></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>




<?php get_footer(); ?>
