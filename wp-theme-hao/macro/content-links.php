

    
        <div class="flink" id="banners">
            <div class="banners-title">
                <div class="banners-title-small"></div>
                <div class="banners-title-big"></div>
            </div>
            <div class="banner-button-group">
                <a class="banner-button secondary" data-pjax-state="" onclick="travelling()">
                    <i class="haofont hao-icon-paper-plane1"></i>
                    <span class="banner-button-text">随机访问</span>
                </a>
                <a
                        class="banner-button" href="#post-comment" rel="external nofollow">
                    <i class="haofont hao-icon-link"></i>
                    <span class="banner-button-text">申请友链</span>
                </a>
                <a <?php /* if() */ ?>
                   class="banner-button" href="javascript:LinkSubmitWidget.open()" rel="external nofollow">
                    <i class="haofont hao-icon-link"></i>
                    <span class="banner-button-text">申请友链</span>
                </a>
            </div>
            <div class="tags-group-all nowrapMove">
                <div class="tags-group-wrapper">

                         <?php /* if() */ ?>>
                            <div class="tags-group-icon-pair" <?php /* if() */ ?>>
                                <a class="tags-group-icon" target="_blank">
                                    <img>
                                </a>
                                <a class="tags-group-icon" target="_blank">
                                    <img>
                                </a>
                            </div>
                        
                    
                </div>
            </div>
        </div>

        <!--互动友链-->
        

        <div class="flink" id="article-container">

                <h2 <?php /* if() */ ?>>
                    <a class="headerlink"></a>
                     ()
                </h2>

                <div class="flink-desc" <?php /* if() */ ?>></div>

                <!-- 第一个，使用卡片展示 -->
                <div <?php /* if() */ ?>
                     class="site-card-group">

                    <div class="site-card" <?php /* loop */ ?>>
                        <span <?php /* if() */ ?>
                              style="'background-color:' + "
                              class="site-card-tag"></span>

                        <a class="img" target="_blank">
                            <img class="flink-avatar" style="pointer-events: none;">
                        </a>

                        <a class="info cf-friends-link" target="_blank">
                            <div class="site-card-avatar no-lightbox">
                                <img class="flink-avatar cf-friends-avatar">
                            </div>
                            <div class="site-card-text">
                                <span class="title cf-friends-name"></span>
                                <span class="desc"></span>
                            </div>
                        </a>
                    </div>


                </div>

                <div class="flink-list">
                     <?php /* if() */ ?>>
                    <div class="flink-list-item" <?php /* loop */ ?>>
                        <span <?php /* if() */ ?>
                              style="'background-color:' + "
                              class="site-card-tag"></span>
                        <a class="cf-friends-link" rel="external nofollow" target="_blank">
                            <img class="flink-avatar cf-friends-avatar">
                            <div class="flink-item-info no-lightbox">
                                <span class="flink-item-name cf-friends-name"></span>
                                <span class="flink-item-desc"></span>
                                <img>
                            </div>
                        </a>
                    </div>
                </div>

                <div class="flink-list mini">
                     <?php /* if() */ ?>>
                    <div class="flink-list-item" <?php /* loop */ ?>>
                        <a class="cf-friends-link" rel="external nofollow" target="_blank">
                            <img class="flink-avatar cf-friends-avatar">
                            <div class="img-alt is-center"></div>
                            <div class="flink-item-info">
                                <span class="flink-item-name cf-friends-name"></span>
                                <span class="flink-item-desc"></span>
                            </div>
                        </a>
                    </div>
                </div>

            <script>
                var fdataUser = {
                    jsonurl: '',
                    apiurl: "[()]",
                    apipublicurl: '', //默认公共库
                    initnumber: 20,  //首次加载文章数
                    stepnumber: 20,  //更多加载文章数
                    article_sort: 'created', //文章排序 updated or created
                    error_img: 'https://sdn.geekzu.org/avatar/57d8260dfb55501c37dde588e7c3852c'
                }
            </script>
            <script  src="<?php echo get_template_directory_uri(); ?>/assets/libs/fcircle/heo-fcircle3mini.js}"></script>

        </div>

    

