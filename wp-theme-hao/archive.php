<!DOCTYPE html>
<html 
      th:replace="~{modules/layouts/layout :: layout(content = ~{::content}, htmlType = 'archive',title = ${'文章归档' + ' | ' + site.title}, head = ~{::head})}">
<th:block th:fragment="head">
    <th:block th:replace="~{modules/common/open-graph :: open-graph(_title = '文章归档',
                _permalink = '/archives',
                _cover = ${theme.config.other.opengraph.image},
                _excerpt = ${site.seo.description},
                _type = 'website')}"></th:block>
</th:block>
<th:block th:fragment="content">

    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <nav <?php get_template_part("modules/nav :: nav(title = '文章归档')"); ?>></nav>
        </header>
        <main class="layout" id="content-inner">
            <!-- archive -->
            <div id="archive">
                <div class="article-sort-title">文章<sup>[[${siteStatsFinder.getStats().post}]]</sup></div>
                <div class="article-sort" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                     th:with='postRandomImg=${#strings.contains(theme.config.layout.postRandomImg,"?") ? theme.config.layout.postRandomImg+"&" : theme.config.layout.postRandomImg+"?"}'>
                    <div class="article-sort-item year" th:text="${archive.year}"></div>
                    <div class="article-sort" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
                        <!-- 月份没有样式所以不显示 -->
                        <!-- <div class="article-sort-item" th:text="${month.month}"></div> -->
                        <div class="article-sort-item" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
                            <a class="article-sort-item-img" th:href="@{<?php the_permalink(); ?>}"
                               th:title="<?php the_title(); ?>">
                                <img th:alt="<?php the_title(); ?>"
                                     th:src="${#strings.isEmpty(post.spec.cover) ? postRandomImg+post.spec.title : thumbnail.gen(post.spec.cover, 's')}">
                            </a>
                            <div class="article-sort-item-info">
                                <div class="article-sort-item-time"><i class="far fa-calendar-alt"></i>
                                    <time class="post-meta-date-created"
                                          th:attr="datetime=${#dates.format(post.spec.publishTime,'yyyy-MM-dd HH:mm:ss')}"
                                          th:text="${#dates.format(post.spec.publishTime,'yyyy-MM-dd')}"
                                          th:title="'创建于' + ${#dates.format(post.spec.publishTime,'yyyy-MM-dd HH:mm:ss')}">
                                    </time>
                                </div>
                                <a class="article-sort-item-title" onclick="window.event.cancelBubble=!0"
                                   th:href="@{<?php the_permalink(); ?>}" th:text="<?php the_title(); ?>"
                                   th:title="<?php the_title(); ?>"></a>
                                <div class="article-sort-item-tags">
                                    <a class="article-meta__tags"
                                       <?php if (have_posts()) : while (have_posts()) : the_post(); ?> th:href="@{${tag.status.permalink}}">
                                        <span class="tags-punctuation">[[${tag.spec.displayName}]]</span>
                                    </a>
                                    <span class="article-meta__link">•</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div th:replace="~{modules/widgets/page :: page('/archives',${archives},false,'')}"></div>
            </div>
            <!-- sidebar -->
            <div th:replace="~{modules/aside :: aside(${theme.config.sidebar.widgetss.indexWidget})}"></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
    </div>

</th:block>

</html>