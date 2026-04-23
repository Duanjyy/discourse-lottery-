<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div></div>
                <div id="bber">
                    <section class="timeline page-1">
                        <ul class="list" id="waterfall">
                            <li class="item" <?php /* loop over moment :  */ ?>>
                                <div class="bber-content">
                                    <div class="datacont">
                                    </div>
                                    <th:block>
                                        <div class="bber-container-img">
                                            <img <?php /* loop over momentItem :  */ ?> title="瞬间配图">
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                            <div class="bber-content-noimg"></div>
                                        </div>
                                        <div <?php /* loop over momentItem :  */ ?> class="bber-music">
                                            <video></video>
                                        </div>
                                    
<?php get_footer(); ?>
