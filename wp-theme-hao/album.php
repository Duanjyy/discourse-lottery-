<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div id="album">
                    <div></div>

                    <div class="card-album">
                        <th:block <?php /* loop over group :  */ ?>>
                            <div class="card">
                                <img class="card_cover"
                                >
                                <div class="card__content">
                                    <p class="card__category"></p>
                                    <h3 class="card__heading"></h3>
                                </div>
                            </div>
                        
<?php get_footer(); ?>
