<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout" th:classappend="${not #lists.isEmpty(theme.config.sidebar.widgetss.pageWidget) ? '' : 'hide-aside'}" id="content-inner">
            <div id="page">
                <div  id="article-container"
                      th:class="${ theme.config.code.enable_line || pluginFinder.available('PluginPrismJS') ? 'line-numbers' : ''}"
                      th:utext="${singlePage.content.content}"></div>
                <hr>
                <!--/* 评论组件 */-->
                <th:block
                        th:replace="~{modules/comment :: comment(group = 'content.halo.run',
                  kind = 'SinglePage',
                  name = ${singlePage.metadata.name},
                  allowComment = ${singlePage.spec.allowComment})}"/>

            </div>

            <!-- 侧栏 -->
            <?php get_template_part("modules/aside"); ?>

        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
