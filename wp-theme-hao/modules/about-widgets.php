<!-- 关于小组件 -->
<th:block th:fragment="about-widgets(widgets)"
          <?php /* if(${not #lists.isEmpty(widgets)}) */ ?>>
    <th:block <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
        <th:block th:replace="~{'modules/widgets/about-widgets/'+ ${widget}}"/>
    </th:block>
</th:block>