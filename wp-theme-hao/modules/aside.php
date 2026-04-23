<!-- 侧边栏 -->
<div class="aside-content" id="aside-content">

    <!-- 侧栏部件，不包含 toc 则直接遍历 -->
    <th:block>
        <th:block <?php /* loop over widget_data,iterStat :  */ ?>>
            <th:block>
                <th:block>
                    <th:block />
                </th:block>
                <th:block>
                    <div class="sticky_layout">
                        <th:block />
                    </div>
                </th:block>
            </th:block>
            <th:block>
                <th:block>
                    <?php get_template_part("modules/widgets/aside/custom_html"); ?>
                </th:block>
                <th:block>
                    <div class="sticky_layout">
                        <?php get_template_part("modules/widgets/aside/custom_html"); ?>
                    </div>
                </th:block>
            </th:block>

        </th:block>
    </th:block>

    <!-- 侧栏部件，toc 之后的组件需要被 sticky_layout 包裹 -->
    <th:block>
        <th:block <?php /* loop over widget_data,iterStat :  */ ?>>
            <th:block>
                <div class="sticky_layout">
            </th:block>
            <th:block>
                <th:block />
            </th:block>
            <th:block>
                <?php get_template_part("modules/widgets/aside/custom_html"); ?>
            </th:block>
            <th:block>
                </div>
            </th:block>
        </th:block>

    </th:block>

</div>