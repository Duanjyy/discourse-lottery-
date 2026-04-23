<!-- 目录条 -->
<div id="category-bar">
    <div class="category-bar-items" id="category-bar-items">
        <div class="category-bar-item select" id="category-bar-home">
            <a href="/">首页</a>
        </div>

        <th:block <?php /* loop over navCategory :  */ ?>>
            <div class="category-bar-item"
                 <?php /* loop over categoryItem :  */ ?>>
                <a></a>
            </div>
        </th:block>

    </div>
    <a class="category-bar-more">更多</a>
</div>
