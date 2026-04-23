<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>
        <main class="layout" id="content-inner">
            <div id="tag">
                <div id="tag-page-tags">
                    <a style="font-size:1em;color:#3c228c"
                       <?php /* loop */ ?>>
                        <span class="tags-punctuation"></span>
                        <span class="tagsPageCount"></span>
                    </a>
                </div>
                <!-- 文章 -->
                <th:block />
            </div>
            <!-- sidebar -->
            <div></div>
        </main>

        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>


<?php get_footer(); ?>
