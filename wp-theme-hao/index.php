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
        <header th:class="${theme.config.top.above.enable_above ? 'full_page' : 'not-top-img'}" id="page-header">
            <nav th:replace="~{modules/nav :: nav(title = ${siteTitle})}"></nav>
            <!-- 问候语 -->
            <th:block <?php get_template_part("modules/header/greeting"); ?>/>
            <!-- 第一屏 -->
            <th:block <?php get_template_part("modules/header/index-img"); ?>/>
        </header>
        <div id="home_top">
            <!-- 每日说说 -->
            <div <?php get_template_part("modules/moment"); ?>/>
            <!-- 置顶内容 -->
            <div <?php get_template_part("modules/recent-top"); ?>/>
        </div>
        <main class="layout" id="content-inner" th:classappend="${theme.config.sidebar.location}">
            <div class="recent-posts" id="recent-posts">
                
                <!-- 分类导航栏 -->
                <div th:replace="~{'modules/bar/' + ${theme.config.layout.navs.nav}}"></div>
                
                <th:block <?php get_template_part("modules/post-list"); ?>/>
            
            </div>
            <div th:replace="~{modules/aside :: aside(${theme.config.sidebar.widgetss.indexWidget})}"></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
    </div>

</th:block>



</html>
