<!--
    分页模块

    @param  path       '/path/page/n' 中的 `/path` 需要保留 `/`
    @param  pageInfo   Halo类型UrlContextListResult<ListedPostVo>
    @param  isIndex    是否主页
    @param  _param     参数
 -->
<nav id="pagination" th:fragment="page(path,pageInfo,isIndex,_param)">
    <div class="pagination" th:with="paths = ${isIndex ? path+'/' : path}">

        <!-- 页码按钮 -->
        <th:block <?php /* if(${pageInfo.page > 3}) */ ?>>
            <a class="page-number" th:href="${paths}" th:text="1" onclick="scrollToPost()"></a>
            <span class="space" <?php /* if(${pageInfo.page != 4}) */ ?>>…</span>
        </th:block>

        <th:block <?php /* loop */ ?>>
            <span class="page-number current" <?php /* if(${pageInfo.page} == ${index}) */ ?> th:text="${pageInfo.page}"></span>
            <a class="page-number" th:unless="${pageInfo.page == index}"
               <?php /* if(${index > 0 && index <= pageInfo.totalPages}) */ ?>
               th:href="${#strings.equals(index, '1') ? paths + _param : path+'/page/'+index  + _param}"
               th:text="${index}"
               onclick="scrollToPost()"></a>
        </th:block>

        <th:block <?php /* if(${pageInfo.totalPages - pageInfo.page > 2}) */ ?>>
            <span class="space" <?php /* if(${pageInfo.totalPages - pageInfo.page != 3}) */ ?>>…</span>
            <a class="page-number"
               th:href="${path+'/page/'+pageInfo.totalPages+_param}"
               th:text="${pageInfo.totalPages}"
               onclick="scrollToPost()"></a>
        </th:block>
        <!-- 翻页按钮 -->
        <a class="extend prev" rel="prev"
           <?php /* if(${pageInfo.hasPrevious}) */ ?>
           th:href="${pageInfo.prevUrl}"
           onclick="scrollToPost()">
            <i class="haofont hao-icon-chevron-left fa-fw"></i>
            <div class="pagination_tips_prev">上页</div>
        </a>

        <a class="extend next"
           rel="next" <?php /* if(${pageInfo.hasNext}) */ ?>
           th:href="${pageInfo.nextUrl}"
           onclick="scrollToPost()">
            <div class="pagination_tips_next">下页</div>
            <i class="haofont hao-icon-chevron-right fa-fw"></i>
        </a>
        <div <?php /* if(${pageInfo.totalPages > 1}) */ ?> class="toPageGroup">
            <input id="toPageText" maxlength="3" title="跳转到指定页面"
                   oninput="value=value.replace(/[^0-9]/g,'')"
                   onkeyup="if (this.value === '0') this.value = ''">
            <a id="toPageButton" onclick="heo.toPage();"><i class="haofont hao-icon-angles-right"></i>
            </a>
        </div>

        <script <?php /* if(${theme.config.top.above.enable_above}) */ ?>>
            function scrollToPost() {
                if (document.querySelector(".pl-container")) {
                    setTimeout(() => {
                        btf.scrollToDest(window.innerHeight, 500);
                    }, 1000)
                }
            }
        </script>
        <script th:unless="${theme.config.top.above.enable_above}">
            function scrollToPost() {
            }
        </script>

    </div>
</nav>
