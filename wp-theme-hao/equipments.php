<?php get_header(); ?>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div ></div>
                <div id="equipment">
                    <th:block <?php /* loop over group :  */ ?>>
                        <div class="equipment-item">
                            <h2 class="equipment-item-title"></h2>
                            <div class="equipment-item-description"></div>
                            <div class="equipment-item-content">
                                <div class="equipment-item-content-item" <?php /* loop over equipment :  */ ?>>
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
                    
<?php get_footer(); ?>
