<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div></div>
                <div id="bber">
                    <section class="timeline page-1">
                        <ul class="list" id="waterfall">
                            <li class="item" <?php /* loop */ ?>>
                                <div class="bber-content">
                                    <div class="datacont" <?php /* if() */ ?>>
                                    </div>
                                    <th:block <?php /* if() */ ?>>
                                        <div class="bber-container-img"
                                             <?php /* if() */ ?>>
                                            <img <?php /* loop */ ?>
                                                 <?php /* if() */ ?> title="瞬间配图">
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                        </div>
                                        <div <?php /* loop */ ?> class="bber-music"
                                             <?php /* if() */ ?>>
                                            <video></video>
                                        </div>
                                    </th:block>
                                </div>

                                <hr>
                                <div class="bber-bottom">
                                    <div class="bber-info">
                                        <div class="bber-info-time"><i class="haofont hao-icon-clock"></i>
                                            <time class="datatime"></time>
                                        </div>
                                    </div>
                                    <a class="bber-reply" <?php /* if() */ ?>
                                       data-pjax-state=""> <i class="haofont hao-icon-chat--fill"
                                                              style="font-size: 20px;"></i>
                                    </a>
                                </div>
                            </li>
                        </ul>
                    </section>
                    <!--  分页还没写 -->
                </div>
                <div id="bber-tips" style="color: var(--heo-secondtext);">- 只展示最近30条短文 -</div>
                <script>heo.reflashEssayWaterFall();</script>
                <hr <?php /* if() */ ?>
                <!--/* 评论组件 */-->
                <th:block />
            </div>

        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
        <!-- 卡片顶部气泡效果 -->
        <script <?php /* if() */ ?> async data-pjax
                src="<?php echo get_template_directory_uri(); ?>/assets/libs/canvas/bubble.js"></script>
    </div>

</th:block>


<?php get_footer(); ?>
