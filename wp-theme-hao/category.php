<?php get_header(); ?>


    <div class="page" id="body-wrap">
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout" id="content-inner">
            <div id="category">
                <div id="category-bar">
                    <div class="category-bar-items" id="category-bar-items">
                        <div class="category-bar-item" id="category-bar-home">
                            <a href="/">首页</a>
                        </div>
                        <div class="category-bar-item"
                             th:classappend="${category.metadata.name == categoryItem.metadata.name} ? ' select'"
                             <?php /* loop over categoryItem : ${categoryFinder.listAll()} */ ?>
                             th:id="${categoryItem.spec.slug}">
                            <a th:href="@{${categoryItem.status.permalink}}"
                               th:text="${categoryItem.spec.displayName}"></a>
                        </div>
                    </div>
                    <!-- 跳转到分类页 -->
                    <a class="category-bar-more" href="/categories">更多</a>
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
