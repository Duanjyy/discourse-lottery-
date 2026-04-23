<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav :: nav(title = '分类')"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">

            <div id="page">
                <h1 class="page-title" style="display: inline;">分类</h1>
                <div <?php /* if() */ ?> class="category-lists">
                    <div class="category-title is-center">分类 - <span class="category-amount">11</span></div>
                    <div class="tag-cloud-list is-center">
                        <a style="font-size: 1em;" <?php /* loop */ ?>>
                            <span style="font-size: 22px;"
                                  class="tags-punctuation"></span>

                            <span class="tagsPageCount"></span></a>
                    </div>
                </div>
                <th:block <?php /* if() */ ?>>
                    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/libs/no3d/no3d.css">
                    <div id="libCategories" >
                        <div id="lib-cards" class="container" >
                            <a <?php /* loop */ ?>>
                                <card>
                                    <h1 slot="header"></h1>
                                    <p slot="content"></p>
                                </card>
                            </a>
                        </div>
                    </div>
                    <div>
                        <script data-pjax src="<?php echo get_template_directory_uri(); ?>/assets/libs/vue/vue.min.js"></script>
                        <script data-pjax src="<?php echo get_template_directory_uri(); ?>/assets/libs/no3d/no3d.min.js"></script>
                    </div>
                </th:block>
            </div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>


<?php get_footer(); ?>
