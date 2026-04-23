<?php get_header(); ?>
<!-- 目录条，这里使用和 category-bar 同样的 css -->
<div id="category-bar">
    <div class="category-bar-items" id="category-bar-items">
        <div class="category-bar-item select" id="category-bar-home">
            <a href="/">首页</a>
        </div>

        <th:block>

            <div class="category-bar-item"
                 <?php /* loop over tagItem :  */ ?>>
                <a></a>
            </div>

        </th:block>
    </div>
    <a class="category-bar-more">更多</a>
</div>

<?php get_footer(); ?>
