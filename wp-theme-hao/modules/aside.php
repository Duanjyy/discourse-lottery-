<!-- 侧边栏 -->
<div class="aside-content" id="aside-content" th:fragment="aside(widgets)"
     <?php /* if(${theme.config.sidebar.location != 'hide-aside' && not #lists.isEmpty(widgets)}) */ ?>>

    <!-- 侧栏部件，不包含 toc 则直接遍历 -->
    <th:block <?php /* if(${not #strings.contains(widgets, 'toc')}) */ ?>>
        <th:block <?php /* loop */ ?>>
            <th:block th:unless="${widget_data.widget=='custom_html'}">
                <th:block <?php /* if(not ${iterStat.last}) */ ?>>
                    <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
                </th:block>
                <th:block <?php /* if(${iterStat.last}) */ ?>>
                    <div class="sticky_layout">
                        <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
                    </div>
                </th:block>
            </th:block>
            <th:block <?php /* if(${widget_data.widget=='custom_html'}) */ ?>>
                <th:block <?php /* if(not ${iterStat.last}) */ ?>>
                    <th:block th:replace="~{modules/widgets/aside/custom_html :: custom_html(${widget_data})}" />
                </th:block>
                <th:block <?php /* if(${iterStat.last}) */ ?>>
                    <div class="sticky_layout">
                        <th:block th:replace="~{modules/widgets/aside/custom_html :: custom_html(${widget_data})}" />
                    </div>
                </th:block>
            </th:block>

        </th:block>
    </th:block>

    <!-- 侧栏部件，toc 之后的组件需要被 sticky_layout 包裹 -->
    <th:block <?php /* if(${#strings.contains(widgets, 'toc')}) */ ?>>
        <th:block <?php /* loop */ ?>>
            <th:block <?php /* if(${widget_data.widget=='toc'}) */ ?>>
                <div class="sticky_layout">
            </th:block>
            <th:block th:unless="${widget_data.widget=='custom_html'}">
                <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
            </th:block>
            <th:block <?php /* if(${widget_data.widget=='custom_html'}) */ ?>>
                <th:block th:replace="~{modules/widgets/aside/custom_html :: custom_html(${widget_data})}" />
            </th:block>
            <th:block <?php /* if(${iterStat.count==widgets.size()}) */ ?>>
                </div>
            </th:block>
        </th:block>

    </th:block>

</div>