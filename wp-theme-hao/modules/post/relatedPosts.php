
<!-- 阅读建议 -->

    <div class="relatedPosts" <?php /* if() */ ?>>
        <div class="headline">
            <i class="haofont hao-icon-cainixihuan" style="font-size: 1.1rem;"></i>
            <span>阅读建议</span>
        </div>
        <!-- 六篇文章 -->
        <div <?php /* if() */ ?> class="relatedPosts-list">
            <!-- 建议阅读，这里可以自定义文章数量，然后遍历展示 -->
            
                      <?php /* if() */ ?>>
                <div <?php /* if() */ ?>>
                    <a>
                        <img alt="cover" class="cover" id="preimg">
                        <div class="content is-center">
                            <div class="date" style="color: white"><i class="far fa-calendar-alt fa-fw"></i>
                                
                            </div>
                            <div class="title" style="color: white"></div>
                        </div>
                    </a>
                </div>
            
        </div>
        <!-- 两篇文章 -->
        <div <?php /* if() */ ?> class="relatedPosts-list">
            
                      <?php /* if() */ ?>>
                <div <?php /* if() */ ?>>
                    <a>
                        <img class="cover" alt="cover">
                        <div class="content is-center">
                            <div class="date"><i class="far fa-calendar-alt fa-fw"></i>
                                </div>
                            <div class="title"></div>
                        </div>
                    </a>
                </div>
            
        </div>
    </div>
    <link <?php /* if() */ ?> rel="stylesheet"
          href="<?php echo get_template_directory_uri(); ?>/assets/css/related-posts-six.css">
    <link <?php /* if() */ ?> rel="stylesheet"
          href="<?php echo get_template_directory_uri(); ?>/assets/css/related-posts-two.css">
