<!DOCTYPE html>
<html>
<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
            <link rel="stylesheet" type="text/css" href="<?php echo get_template_directory_uri(); ?>/assets/libs/fcircle/heo-fcircle3.css">

        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <?php get_template_part("macro/content-links"); ?>
                <hr/>
                <!--/* 评论组件 */-->
                <th:block/>
            </div>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>

</html>