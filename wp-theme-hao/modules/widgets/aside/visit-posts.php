<div class="card-widget card-recent-post" th:with='
    postRandomImg='>
    <div class="item-headline"><i class="haofont hao-icon-eicon_map-2-line1"></i><span>热门文章</span></div>
    <div class="aside-list">
        <!-- 热门文章，用户可以自定义展示数量 -->
        <div class="aside-list-item" <?php /* loop */ ?>>
            <a class="thumbnail" href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>">
                <img>
            </a>
            <div class="content">
                <a class="title" href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>"></a>
                <time>
                </time>
            </div>
        </div>
    </div>
</div>