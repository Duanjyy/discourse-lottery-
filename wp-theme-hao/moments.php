<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
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
                            <li class="item" <?php /* loop over moment : ${moments.items} */ ?>
                                th:with="content=${moment.spec.content}">
                                <div class="bber-content">
                                    <div class="datacont" th:if="${not #strings.isEmpty(content.html)}"
                                         th:utext="${content.html}">
                                    </div>
                                    <th:block th:if="${not #lists.isEmpty(content.medium)}">
                                        <div class="bber-container-img"
                                             th:if="${#strings.contains(content.medium,'PHOTO')}">
                                            <img <?php /* loop over momentItem : ${content.medium} */ ?>
                                                 th:if="${momentItem.type.name == 'PHOTO'}"
                                                 th:src="${isLazyload ? '' : momentItem.url}"
                                                 th:data-lazy-src="${ isLazyload ? momentItem.url : ''}" title="瞬间配图">
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                        </div>
                                        <div <?php /* loop over momentItem : ${content.medium} */ ?> class="bber-music"
                                             th:if="${momentItem.type.name == 'VIDEO'}">
                                            <video th:src="${momentItem.url}"></video>
                                        </div>
                                    
<?php get_footer(); ?>
