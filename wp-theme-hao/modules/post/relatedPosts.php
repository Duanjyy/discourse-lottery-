
<!-- 阅读建议 -->
<th:block>
    <div class="relatedPosts">
        <div class="headline">
            <i class="haofont hao-icon-cainixihuan" style="font-size: 1.1rem;"></i>
            <span>阅读建议</span>
        </div>
        <!-- 六篇文章 -->
        <div class="relatedPosts-list">
            <!-- 建议阅读，这里可以自定义文章数量，然后遍历展示 -->
            <th:block <?php /* loop over recommandPost,iterStat : */ ?>>
                <div>
                    <a>
                        <img alt="cover" class="cover" id="preimg">
                        <div class="content is-center">
                            <div class="date" style="color: white"><i class="far fa-calendar-alt fa-fw"></i>
                                
                            </div>
                            <div class="title" style="color: white"></div>
                        </div>
                    </a>
                </div>
            </th:block>
        </div>
        <!-- 两篇文章 -->
        <div class="relatedPosts-list">
            <th:block <?php /* loop over recommandPost,iterStat : */ ?>>
                <div>
                    <a>
                        <img class="cover" alt="cover">
                        <div class="content is-center">
                            <div class="date"><i class="far fa-calendar-alt fa-fw"></i>
                                </div>
                            <div class="title"></div>
                        </div>
                    </a>
                </div>
            </th:block>
        </div>
    </div>
    <link rel="stylesheet"
          href="<?php echo get_template_directory_uri(); ?>/assets/css/related-posts-six.css">
    <link rel="stylesheet"
          href="<?php echo get_template_directory_uri(); ?>/assets/css/related-posts-two.css">
</th:block>