<!-- 侧边栏 -->
<div class="aside-content" id="aside-content" th:fragment="aside(widgets)"
     th:if="${theme.config.sidebar.location != 'hide-aside' && not #lists.isEmpty(widgets)}">

    <!-- 侧栏部件，不包含 toc 则直接遍历 -->
    <th:block th:if="${not #strings.contains(widgets, 'toc')}">
        <th:block <?php /* loop over widget_data,iterStat : ${widgets} */ ?>>
            <th:block th:unless="${widget_data.widget=='custom_html'}">
                <th:block th:if="not ${iterStat.last}">
                    <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
                </th:block>
                <th:block th:if="${iterStat.last}">
                    <div class="sticky_layout">
                        <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
                    </div>
                </th:block>
            </th:block>
            <th:block th:if="${widget_data.widget=='custom_html'}">
                <th:block th:if="not ${iterStat.last}">
                    <?php get_template_part("modules/widgets/aside/custom_html"); ?>
                </th:block>
                <th:block th:if="${iterStat.last}">
                    <div class="sticky_layout">
                        <?php get_template_part("modules/widgets/aside/custom_html"); ?>
                    </div>
                </th:block>
            </th:block>

        </th:block>
    </th:block>

    <!-- 侧栏部件，toc 之后的组件需要被 sticky_layout 包裹 -->
    <th:block th:if="${#strings.contains(widgets, 'toc')}">
        <th:block <?php /* loop over widget_data,iterStat : ${widgets} */ ?>>
            <th:block th:if="${widget_data.widget=='toc'}">
                <div class="sticky_layout">
            </th:block>
            <th:block th:unless="${widget_data.widget=='custom_html'}">
                <th:block th:replace="~{'modules/widgets/aside/'+ ${widget_data.widget}}" />
            </th:block>
            <th:block th:if="${widget_data.widget=='custom_html'}">
                <?php get_template_part("modules/widgets/aside/custom_html"); ?>
            </th:block>
            <th:block th:if="${iterStat.count==widgets.size()}">
                </div>
            </th:block>
        </th:block>

    </th:block>

</div>