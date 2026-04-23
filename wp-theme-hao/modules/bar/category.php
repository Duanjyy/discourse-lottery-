<!-- 目录条 -->
<div id="category-bar">
    <div class="category-bar-items" id="category-bar-items">
        <div class="category-bar-item select" id="category-bar-home">
            <a href="/">首页</a>
        </div>

        <th:block th:with="categories = ${categoryFinder.listAll()}">

            <div class="category-bar-item"
                 <?php /* loop */ ?>
                 th:id="${categoryItem.spec.displayName}">
                <a th:href="@{${categoryItem.status.permalink}}" th:text="${categoryItem.spec.displayName}"></a>
            </div>

        </th:block>
    </div>
    <a class="category-bar-more" <?php get_template_part("modules/bar/more"); ?>>更多</a>
</div>