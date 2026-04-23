<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <th:block th:if="${#strings.equals(theme.config.photos.photosStyle, 'default')}">
                    <th:block <?php /* loop over group : ${photoFinder.groupBy()} */ ?>>
                        <th:block
                                th:if="${#strings.equals(group.metadata.name, param.group) && not #strings.isEmpty(param.group)}"
                                th:with="description = ${#annotations.get(group, 'description')},
                         background = ${#annotations.get(group, 'background')}">
                            <div class="author-content author-content-item essayPage single"
                                 th:style="'background:url('+${background}+') left 28% / cover no-repeat !important;'">
                                <div class="card-content">
                                    <div class="author-content-item-tips">相册集</div>
                                    <span class="author-content-item-title" th:text="${group.spec.displayName}"></span>
                                    <div class="content-bottom">
                                        <div class="tips" th:text="${description}"></div>
                                    </div>
                                    <div class="banner-button-group">
                                        <a class="banner-button" target="_blank"
                                           th:attr="onclick='pjax.loadUrl(\''+ ${theme.config.photos.topLink} +'\')'">
                                            <i class="haofont hao-icon-circle-arrow-right"></i>
                                            <span class="banner-button-text" th:text="返回"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        
<?php get_footer(); ?>
