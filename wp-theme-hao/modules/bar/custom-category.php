<!-- 目录条 -->
<div id="category-bar">
    <div class="category-bar-items" id="category-bar-items">
        <div class="category-bar-item select" id="category-bar-home">
            <a href="/">首页</a>
        </div>

        <th:block <?php /* loop over navCategory : ${theme.config.layout.navs.navCategory} */ ?>>
            <div class="category-bar-item"
                 <?php /* loop over categoryItem : ${categoryFinder.getByName(navCategory)} */ ?>
                 th:id="${categoryItem.spec.displayName}">
                <a th:href="@{${categoryItem.status.permalink}}" th:text="${categoryItem.spec.displayName}"></a>
            </div>
        </th:block>

    </div>
    <a class="category-bar-more" th:replace="~{modules/bar/more}">更多</a>
</div>
