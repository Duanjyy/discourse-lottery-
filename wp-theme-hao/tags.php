<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page"><h1 class="page-title" style="display: inline;">标签</h1>
                <div class="tag-cloud-title is-center">标签 - <span class="tag-cloud-amount">0</span></div>
                <div class="tag-cloud-list is-center">
                    <a <?php /* loop over tagItem : ${tagFinder.listAll()} */ ?>
                       th:href="@{${tagItem.status.permalink}}"
                       th:id="${tagItem.spec.displayName}" th:style="'font-size: 1em; color:' + ${tagItem.spec.color} ">
                        <span class="tags-punctuation">[[${tagItem.spec.displayName}]]</span>

                        <span class="tagsPageCount">[[${tagItem.status.visiblePostCount}]]</span>
                    </a>

                </div>
            </div>
        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>


<?php get_footer(); ?>
