<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div  th:replace="~{macro/author-content :: author-content(background = ${singlePage.spec.cover},
                        smallTitle = '想做清单',
                        bigTitle = ${singlePage.spec.title},
                        detail = ${singlePage.spec.excerpt.raw},
                        buttonUrl = '',
                        buttonTitle = '')}" ></div>
                <div id="todolist-main" th:if="${not #lists.isEmpty(theme.config.todo.list)}"
                     th:with="todoList = ${theme.config.todo.list}">


                    <div id="todolist-left-container">
                        <th:block <?php /* loop over todo : ${todoList} */ ?>>
                            <div id="todolist-left" th:if="${#strings.equals(todo.seat, 'left')}">
                                <div class="todolist-item">
                                    <h3 class="todolist-title">[[${todo.class_name}]]</h3>
                                    <ul class="todolist-ul">
                                        <th:block th:if="${not #lists.isEmpty(todo.todo_list)}"
                                                  <?php /* loop over data : ${todo.todo_list} */ ?>>
                                            <li th:class="${data.completed ? 'achieve' : ''}">
                                                <i style="font-size: 19px;margin-right: 5px;"
                                                   th:class="${data.completed ? 'haofont  hao-icon-check-circle' : 'haofont hao-icon-yuan'}">
                                                </i>[[${data.content}]]
                                            </li>
                                        
<?php get_footer(); ?>
