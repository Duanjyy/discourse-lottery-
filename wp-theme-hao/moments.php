<!DOCTYPE html>
<html 
      th:replace="~{modules/layouts/layout :: layout(content = ~{::content}, htmlType = 'moments',title = ${title + ' | ' + site.title}, head = ~{::head}, _title = ${title})}">
<th:block th:fragment="head">
    <th:block th:replace="~{modules/common/open-graph :: open-graph(_title = ${_title},
                _permalink = '/moments',
                _cover = ${theme.config.other.opengraph.image},
                _excerpt = ${site.seo.description},
                _type = 'website')}"></th:block>
</th:block>
<th:block th:fragment="content">

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav th:replace="~{modules/nav :: nav(title = ${_title})}"></nav>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div th:replace="~{macro/author-content :: author-content(background = ${theme.config.moment.backgroundImg},
                        smallTitle = ${theme.config.moment.smallTitle},
                        bigTitle = ${theme.config.moment.bigTitle},
                        detail = ${theme.config.moment.detail},
                        buttonUrl = ${theme.config.moment.buttonUrl},
                        buttonTitle = ${theme.config.moment.buttonTitle})}"></div>
                <div id="bber">
                    <section class="timeline page-1">
                        <ul class="list" id="waterfall">
                            <li class="item" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                                th:with="content=${moment.spec.content}">
                                <div class="bber-content">
                                    <div class="datacont" <?php /* if(${not #strings.isEmpty(content.html)}) */ ?>
                                         th:utext="${content.html}">
                                    </div>
                                    <th:block <?php /* if(${not #lists.isEmpty(content.medium)}) */ ?>>
                                        <div class="bber-container-img"
                                             <?php /* if(${#strings.contains(content.medium,'PHOTO')}) */ ?>>
                                            <img <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                                                 <?php /* if(${momentItem.type.name == 'PHOTO'}) */ ?>
                                                 th:src="${isLazyload ? '' : momentItem.url}"
                                                 th:data-lazy-src="${ isLazyload ? momentItem.url : ''}" title="瞬间配图">
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                        </div>
                                        <div <?php if (have_posts()) : while (have_posts()) : the_post(); ?> class="bber-music"
                                             <?php /* if(${momentItem.type.name == 'VIDEO'}) */ ?>>
                                            <video th:src="${momentItem.url}"></video>
                                        </div>
                                    </th:block>
                                </div>

                                <hr>
                                <div class="bber-bottom">
                                    <div class="bber-info">
                                        <div class="bber-info-time"><i class="haofont hao-icon-clock"></i>
                                            <time class="datatime"
                                                  th:text="${#dates.format(moment.spec.releaseTime,'yyyy-MM-dd')}"></time>
                                        </div>
                                    </div>
                                    <a class="bber-reply" <?php /* if(${theme.config.comments.use != 'commentWidget'}) */ ?>
                                       th:onclick="rightMenuCommentText([[${content.html}]]);"
                                       data-pjax-state=""> <i class="haofont hao-icon-chat--fill"
                                                              style="font-size: 20px;"></i>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <!--  分页还没写 -->
                </div>
                <div id="bber-tips" style="color: var(--heo-secondtext);">- 只展示最近30条短文 -</div>
                <script>heo.reflashEssayWaterFall();</script>
                <hr <?php /* if(${theme.config.comments.use != 'commentWidget'}) */ ?> />
                <!--/* 评论组件 */-->
                <th:block th:replace="~{modules/comment :: comment(group = 'content.halo.run',
                  kind = 'SinglePage',
                  name = 'moments',
                  allowComment = ${theme.config.comments.use != 'commentWidget'})}" />
            </div>

        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
        <!-- 卡片顶部气泡效果 -->
        <script <?php /* if(${theme.config.other.bubbleEnable}) */ ?> async data-pjax
                th:src="${assets_link + '/libs/canvas/bubble.js'}"></script>
    </div>

</th:block>

</html>