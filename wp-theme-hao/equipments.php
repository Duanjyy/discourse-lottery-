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
                <div ></div>
                <div id="equipment" <?php /* if() */ ?>>
                    <th:block <?php /* loop */ ?>>
                        <div class="equipment-item">
                            <h2 class="equipment-item-title"></h2>
                            <div class="equipment-item-description"></div>
                            <div class="equipment-item-content">
                                <div class="equipment-item-content-item" <?php /* loop */ ?>>
                                    <div class="equipment-item-content-item-cover">
                                        <img class="equipment-item-content-item-image">
                                    </div>
                                    <div class="equipment-item-content-item-info">
                                        <div class="equipment-item-content-item-name">
                                            
                                        </div>
                                        <div class="equipment-item-content-item-specification">
                                        </div>
                                        <div class="equipment-item-content-item-description">
                                            
                                        </div>
                                        <div class="equipment-item-content-item-toolbar">
                                            <a class="equipment-item-content-item-link" target="_blank">详情</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </th:block>
                </div>
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
