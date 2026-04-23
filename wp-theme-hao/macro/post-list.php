<th:block>
    <div class="recent-posts" id="recent-posts"
         th:with='postItems=,
                     postRandomImg='>
        <!-- card，需要添加在没有图片时使用随机图片 -->
        <div class="recent-post-item" <?php /* loop over post,iStat :  */ ?>>

            <div class="post_cover left_radius">
                <a>
                    <img class="post_bg"
                         th:with='img = '>
                </a>
            </div>
            <div class="recent-post-info">
                <div class="recent-post-info-top">
                    <div class="recent-post-info-top-tips">
                        <!-- 类别非空时 -->
                        <th:block>
                            <span <?php /* loop over category :  */ ?>
                                  class="original"></span>
                        </th:block>
                        <a class="unvisited-post"
                           data-pjax-state="">未读</a>
                    </div>
                    <a class="article-title">
                    </a>
                    <div class="content"></div>
                </div>

                <div class="article-meta-wrap">
                    <!-- tag -->
                    <th:block>
                        <span class="article-meta tags">
                            <a class="article-meta__tags" event.cancelbubble onclick="window.event.cancelBubble=!0"
                               <?php /* loop over tag :  */ ?>>
                                <span class="tags-punctuation"></span>
                            </a>
                        </span>
                    </th:block>
                    <!-- 创建时间 -->
                    <span class="post-meta-date">
                        <i class="far fa-calendar-alt"></i>
                        <time style="display: inline;">
                        </time>
                        <time style="display: inline;">
                        </time>
                        <time style="display: inline;">
                        </time>
                    </span>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <?php get_template_part("modules/widgets/page"); ?>

    </div>
</th:block>