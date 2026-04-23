<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout" id="content-inner">
            <!-- archive -->
            <div id="archive">
                <div class="article-sort-title">文章<sup></sup></div>
                <div class="article-sort" <?php /* loop over archive :  */ ?>
                     th:with='postRandomImg='>
                    <div class="article-sort-item year"></div>
                    <div class="article-sort" <?php /* loop over month :  */ ?>>
                        <!-- 月份没有样式所以不显示 -->
                        <!-- <div class="article-sort-item"></div> -->
                        <div class="article-sort-item" <?php /* loop over post :  */ ?>>
                            <a class="article-sort-item-img">
                                <img>
                            </a>
                            <div class="article-sort-item-info">
                                <div class="article-sort-item-time"><i class="far fa-calendar-alt"></i>
                                    <time class="post-meta-date-created">
                                    </time>
                                </div>
                                <a class="article-sort-item-title" onclick="window.event.cancelBubble=!0"></a>
                                <div class="article-sort-item-tags">
                                    <a class="article-meta__tags"
                                       <?php /* loop over tag :  */ ?>>
                                        <span class="tags-punctuation"></span>
                                    </a>
                                    <span class="article-meta__link">•</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <?php get_template_part("modules/widgets/page"); ?>
            </div>
            <!-- sidebar -->
            <?php get_template_part("modules/aside"); ?>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
