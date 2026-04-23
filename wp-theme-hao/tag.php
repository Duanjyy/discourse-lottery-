<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout" id="content-inner">
            <div id="tag">
                <div id="tag-page-tags">
                    <a style="font-size:1em;color:#3c228c"
                       <?php /* loop over tagItem :  */ ?>>
                        <span class="tags-punctuation"></span>
                        <span class="tagsPageCount"></span>
                    </a>
                </div>
                <!-- 文章 -->
                <?php get_template_part("macro/post-list"); ?>
            </div>
            <!-- sidebar -->
            <?php get_template_part("modules/aside"); ?>
        </main>

        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
