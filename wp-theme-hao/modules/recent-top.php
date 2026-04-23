<!-- 置顶的文章-->
<div class="recent-top-post-group" id="recent-top-post-group" th:if="${theme.config.top.recentTop}">
    <div class="recent-post-top" id="recent-post-top">
        <!-- banner -->
        <?php get_template_part("modules/widgets/banner-group"); ?>
        <!-- top -->
        <?php get_template_part("modules/widgets/top-group"); ?>
    </div>
</div>