<!-- 关于小组件 -->
<th:block th:fragment="about-widgets(widgets)"
          th:if="${not #lists.isEmpty(widgets)}">
    <th:block <?php /* loop over widget : ${widgets} */ ?>>
        <th:block th:replace="~{'modules/widgets/about-widgets/'+ ${widget}}"/>
    </th:block>
</th:block>