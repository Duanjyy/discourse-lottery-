<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <th:block>
                    <th:block <?php /* loop over group :  */ ?>>
                        <th:block>
                            <div class="author-content author-content-item essayPage single">
                                <div class="card-content">
                                    <div class="author-content-item-tips">相册集</div>
                                    <span class="author-content-item-title"></span>
                                    <div class="content-bottom">
                                        <div class="tips"></div>
                                    </div>
                                    <div class="banner-button-group">
                                        <a class="banner-button" target="_blank">
                                            <i class="haofont hao-icon-circle-arrow-right"></i>
                                            <span class="banner-button-text"></span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        
<?php get_footer(); ?>
