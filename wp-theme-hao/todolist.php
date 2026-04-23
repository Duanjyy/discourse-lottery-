<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div ></div>
                <div id="todolist-main" <?php /* if() */ ?>>


                    <div id="todolist-left-container">
                        <th:block <?php /* loop */ ?>>
                            <div id="todolist-left" <?php /* if() */ ?>>
                                <div class="todolist-item">
                                    <h3 class="todolist-title"></h3>
                                    <ul class="todolist-ul">
                                        <th:block <?php /* if() */ ?>
                                                  <?php /* loop */ ?>>
                                            <li>
                                                <i style="font-size: 19px;margin-right: 5px;">
                                                </i>
                                            </li>
                                        </th:block>
                                    </ul>
                                </div>
                            </div>
                        </th:block>
                    </div>
                    <div id="todolist-right-container">
                        <th:block <?php /* loop */ ?>>
                            <div id="todolist-right" <?php /* if() */ ?>>
                                <div class="todolist-item">
                                    <h3 class="todolist-title"></h3>
                                    <ul>
                                        <th:block <?php /* if() */ ?>
                                                  <?php /* loop */ ?>>
                                            <li>
                                                <i style="font-size: 19px;margin-right: 5px;">
                                                </i>
                                            </li>
                                        </th:block>
                                    </ul>
                                </div>
                            </div>
                        </th:block>
                    </div>


                </div>


                <style>
                    :root {
                        --todo-border: 1px solid #f7a796;
                    }

                    [data-theme=dark] {
                        --todo-border: 1px solid #51908b;
                    }

                    .todolist-item i.haofont {
                        display: var(--fa-display,inline-block);
                    }

                    #todolist-main {
                        display: flex;
                        flex-direction: row;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        margin: 16px 0 10px
                    }

                    #todolist-main li {
                        list-style: none;
                        font-size: 17px
                    }

                    #todolist-main ul {
                        margin: 0;
                        padding: 0
                    }

                    #todolist-left-container, #todolist-right-container {
                        display: flex;
                        flex-direction: column;
                        justify-content: start;
                        align-items: center;
                        width: 50%;
                    }

                    #todolist-left {
                        width: 100%;
                        padding: 0 8px 0 0
                    }

                    #todolist-right {
                        width: 100%;
                        padding: 0 0 0 8px
                    }

                    .todolist-item {
                        position: relative;
                        background: #fae4df;
                        border-radius: 12px;
                        padding: 10px 1rem 1.2rem;
                        border: 2px dashed #f7a796;
                        margin-bottom: 1rem
                    }

                    @media screen and (max-width: 768px) {
                        #todolist-left-container, #todolist-right-container {
                            width: 100%;
                        }

                        #todolist-left, #todolist-right {
                            padding: 0 0 0 0
                        }
                    }

                    [data-theme=dark] .todolist-item {
                        background: #242424;
                        border: 2px dashed #51908b
                    }


                    h3.todolist-title {
                        margin: 0 !important;
                        border-bottom: var(--todo-border)
                    }

                    .todolist-item li {
                        margin: 0 !important;
                        border-bottom: var(--todo-border);
                    }

                    .todolist-item li::marker {
                        content: none;
                    }

                    li.achieve {
                        opacity: .8;
                        text-decoration: line-through;
                    }
                </style>

                <th:block/>
            </div>


        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
        <!-- 卡片顶部气泡效果 -->
        <script <?php /* if() */ ?> async data-pjax
                src="<?php echo get_template_directory_uri(); ?>/assets/libs/canvas/bubble.js"></script>
    </div>

</th:block>


<?php get_footer(); ?>
