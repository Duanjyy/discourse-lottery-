<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div></div>
                <div id="comments-page">
                    <th:block
                              <?php /* loop over comment,iterStat :  */ ?>>
                        <div class="comment-card">
                            <div class="comment-info">
                                <img class="no-lightbox nolazyload avatar">
                                <div class="comment-information">
                                    <span class="comment-user"></span>
                                    <span class="comment-time"></span>
                                </div>
                            </div>
                            <div class="comment-content">
                            </div>
                            <div class="comment-article"></div>
                        </div>
                    
<?php get_footer(); ?>
