<!DOCTYPE html>
<html 
      th:replace="~{modules/layouts/layout :: layout(content = ~{::content}, htmlType = 'index', title = null, head = ~{::head})}">
<th:block th:fragment="head">
    <th:block th:replace="~{modules/common/open-graph :: open-graph(_title = <?php bloginfo("name"); ?>,
                _permalink = '',
                _cover = ${theme.config.other.opengraph.image},
                _excerpt = ${site.seo.description},
                _type = 'website')}"></th:block>
</th:block>
<th:block th:fragment="content">

    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav <?php get_template_part("modules/nav :: nav(title = '作者文章列表')"); ?>></nav>
        </header>
        <main class="layout" id="content-inner" th:classappend="${theme.config.sidebar.location}">
            <div class="recent-posts" id="recent-posts">
                <th:block <?php get_template_part("modules/post-list"); ?>/>
            </div>
            <div th:replace="~{modules/aside :: aside(${theme.config.sidebar.widgetss.indexWidget})}"></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
    </div>

</th:block>



</html>
