<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>
        <main class="layout" id="content-inner">
            <div id="page">
                <div  id="article-container"></div>
                <hr>
                <!--/* 评论组件 */-->
                <th:block/>

            </div>

            <!-- 侧栏 -->
            <div></div>

        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>


<?php get_footer(); ?>
