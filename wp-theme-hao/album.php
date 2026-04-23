<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div id="album" th:if="${#strings.equals(theme.config.photos.photosStyle, 'default')}">
                    <div th:replace="~{macro/author-content :: author-content(background = ${singlePage.spec.cover},
                        smallTitle = '相册集',
                        bigTitle = ${singlePage.spec.title},
                        detail = ${singlePage.spec.excerpt.raw},
                        buttonUrl = '',
                        buttonTitle = '')}"></div>

                    <div class="card-album">
                        <th:block <?php /* loop over group : ${photoFinder.groupBy()} */ ?>>
                            <div class="card" th:onclick="pjax.loadUrl([['/photos?group='+${group.metadata.name}]])">
                                <img class="card_cover"
                                     th:src="${isLazyload ? '' : #annotations.get(group, 'cover')}"
                                     th:data-lazy-src="${ isLazyload ? #annotations.get(group, 'cover') : ''}"
                                >
                                <div class="card__content">
                                    <p class="card__category" th:text="${group.spec.displayName}"></p>
                                    <h3 class="card__heading" th:text="${#annotations.get(group, 'description')}"></h3>
                                </div>
                            </div>
                        
<?php get_footer(); ?>
