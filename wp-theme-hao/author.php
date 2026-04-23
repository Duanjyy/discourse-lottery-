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
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav :: nav(title = '作者文章列表')"); ?>
        </header>
        <main class="layout" id="content-inner">
            <div class="recent-posts" id="recent-posts">
                <th:block <?php get_template_part("modules/post-list"); ?>
            </div>
            <div></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>




<?php get_footer(); ?>
