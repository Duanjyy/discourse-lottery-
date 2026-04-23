<th:block
        th:with='postItems=,
          postRandomImg='>
    
    <!-- card，需要添加在没有图片时使用随机图片 -->
    <div class="recent-post-item"
         <?php /* loop over post,iStat :  */ ?>>
        <div class="post_cover left_radius">
            <a>
                <img class="post_bg"
                     th:with='img = '>
            </a>
        </div>
        <div class="recent-post-info">
            <div class="recent-post-info-top">
                <div class="recent-post-info-top-tips">
                    <span class="sticky-warp sticky">置顶</span></span>
                    <!-- 类别非空时 -->
                    <th:block>
                        <span <?php /* loop over category :  */ ?>
                              class="original"></span>
                    </th:block>
                    <!--                    <span class="lastestpost">最新</span>-->
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
                        <a class="article-meta__tags" event.cancelbubble
                           onclick="window.event.cancelBubble=!0"
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
        
        <!-- 文章卡片擦亮效果 -->
        <style>
            #recent-posts > .recent-post-item:not(a)::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 200%;
                background: linear-gradient(to right, transparent, white, transparent);
                transform: translateX(-200%);
                transition: transform 0.5s linear;
                z-index: 1;
            }
            
            #recent-posts > .recent-post-item:not(a):hover::before {
                transform: translateX(100%) skewX(-60deg);
            }
        </style>
    </div>
    
    <!-- 分页 -->
    <?php get_template_part("modules/widgets/page"); ?>

</th:block>
