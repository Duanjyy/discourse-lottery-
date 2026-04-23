<!-- 目录条，这里使用和 category-bar 同样的 css -->
<div id="category-bar">
    <div class="category-bar-items" id="category-bar-items">
        <div class="category-bar-item select" id="category-bar-home">
            <a href="/">首页</a>
        </div>

        <th:block <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
            <div class="category-bar-item"
                 <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                 th:id="${tagItem.spec.displayName}">
                <a th:href="@{${tagItem.status.permalink}}" th:text="${tagItem.spec.displayName}"></a>
            </div>
        </th:block>

    </div>
    <a class="category-bar-more" <?php get_template_part("modules/bar/more"); ?>>更多</a>
</div>
