<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav :: nav(title = '文章归档')"); ?>
        </header>
        <main class="layout" id="content-inner">
            <!-- archive -->
            <div id="archive">
                <div class="article-sort-title">文章<sup></sup></div>
                <div class="article-sort" <?php /* loop */ ?>
                     th:with='postRandomImg='>
                    <div class="article-sort-item year"></div>
                    <div class="article-sort" <?php /* loop */ ?>>
                        <!-- 月份没有样式所以不显示 -->
                        <!-- <div class="article-sort-item"></div> -->
                        <div class="article-sort-item" <?php /* loop */ ?>>
                            <a class="article-sort-item-img" href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>">
                                <img>
                            </a>
                            <div class="article-sort-item-info">
                                <div class="article-sort-item-time"><i class="far fa-calendar-alt"></i>
                                    <time class="post-meta-date-created">
                                    </time>
                                </div>
                                <a class="article-sort-item-title" onclick="window.event.cancelBubble=!0"
                                   href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>"></a>
                                <div class="article-sort-item-tags">
                                    <a class="article-meta__tags"
                                       <?php /* loop */ ?>>
                                        <span class="tags-punctuation"></span>
                                    </a>
                                    <span class="article-meta__link">•</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- 分页 -->
                <div></div>
            </div>
            <!-- sidebar -->
            <div></div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>


<?php get_footer(); ?>
