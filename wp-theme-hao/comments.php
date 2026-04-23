<?php get_header(); ?>


    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>

        <main class="layout hide-aside" id="content-inner">
            <div id="page">

                <th:block th:if="${theme.config.envelope_comment.enable_envelope_comment}">
                    <th:block th:if="${not #strings.isEmpty(theme.config.envelope_comment.title)}"
                              th:utext="${theme.config.envelope_comment.title}">
                    
<?php get_footer(); ?>
