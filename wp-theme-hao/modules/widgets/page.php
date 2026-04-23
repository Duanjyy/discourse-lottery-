<?php get_header(); ?>
<!--
    分页模块

    @param  path       '/path/page/n' 中的 `/path` 需要保留 `/`
    @param  pageInfo   Halo类型UrlContextListResult<ListedPostVo>
    @param  isIndex    是否主页
    @param  _param     参数
 -->
<nav id="pagination">
    <div class="pagination">

        <!-- 页码按钮 -->
        <th:block>
            <a class="page-number" onclick="scrollToPost()"></a>
            <span class="space">…</span>
        </th:block>

        <th:block <?php /* loop over index: */ ?>>
            <span class="page-number current"></span>
            <a class="page-number"
               onclick="scrollToPost()"></a>
        </th:block>

        <th:block>
            <span class="space">…</span>
            <a class="page-number"
               onclick="scrollToPost()"></a>
        </th:block>
        <!-- 翻页按钮 -->
        <a class="extend prev" rel="prev"
           onclick="scrollToPost()">
            <i class="haofont hao-icon-chevron-left fa-fw"></i>
            <div class="pagination_tips_prev">上页</div>
        </a>

        <a class="extend next"
           rel="next"
           onclick="scrollToPost()">
            <div class="pagination_tips_next">下页</div>
            <i class="haofont hao-icon-chevron-right fa-fw"></i>
        </a>
        <div class="toPageGroup">
            <input id="toPageText" maxlength="3" title="跳转到指定页面"
                   oninput="value=value.replace(/[^0-9]/g,'')"
                   onkeyup="if (this.value === '0') this.value = ''">
            <a id="toPageButton" onclick="heo.toPage();"><i class="haofont hao-icon-angles-right"></i>
            </a>
        </div>

        <script>
            function scrollToPost() {
                if (document.querySelector(".pl-container")) {
                    setTimeout(() => {
                        btf.scrollToDest(window.innerHeight, 500);
                    }, 1000)
                }
            }
        </script>
        <script>
            function scrollToPost() {
            }
        </script>

    </div>
</nav>

<?php get_footer(); ?>
