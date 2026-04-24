<!-- 推荐文章 -->
<div class="topGroup" id="topGroup"
     th:with='topGroupPosts = ,
    postRandomImg='>
    <div class="recent-post-group">
        <div class="recent-post-item" <?php /* loop */ ?>
             <?php /* if() */ ?>>

            <div class="post_cover">
                <a href="<?php the_permalink(); ?>">
                    <span class="recent-post-top-text">荐</span>
                    <img class="post_bg">
                         th:with=' img = ' />
                </a>
            </div>
            <div class="recent-post-info">
                <a class="article-title" href="<?php the_permalink(); ?>">
                </a>
            </div>
        </div>
        <!-- 自定义的文章右上角的推荐文章 -->
        <div class="recent-post-item" <?php /* loop */ ?>
             <?php /* if() */ ?>>
            
                <div class="post_cover">
                    <a href="<?php the_permalink(); ?>">
                        <span class="recent-post-top-text">荐</span>
                        <img class="post_bg">
                             th:with='img = ' />
                    </a>
                </div>
                <div class="recent-post-info">
                    <a class="article-title" href="<?php the_permalink(); ?>">
                    </a>
                </div>
            
        </div>
    </div>

    <!-- 今日推荐 -->
    <div class="todayCard" id="todayCard" <?php /* if() */ ?>>
        <div class="todayCard-info">
            <div class="todayCard-tips"></div>
            <div class="todayCard-title"></div>
        </div>
        <div class="todayCard-cover"
 style="'background:url('+  +') no-repeat center/cover'">
        </div>
        <div class="banner-button-group">
            <a class="banner-button" onclick="window.event.cancelBubble=!0;heo.hideTodayCard()">
                <i class="haofont hao-icon-circle-plus"></i>
                <span class="banner-button-text">更多推荐</span>
            </a>
        </div>
    </div>
</div>