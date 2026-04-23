<!-- tag & stat 粘性布局 -->
<div class="card-widget card-tags card-archives card-webinfo card-allinfo">


        <span <?php /* if(${theme.config.sidebar.tags_switch}) */ ?>>
            <th:block <?php get_template_part("modules/widgets/aside/contain/tags-contain"); ?> <?php /* if(${theme.config.sidebar.tags_switch}) */ ?>/>

            <hr>
        </span>

    <span <?php /* if(${theme.config.sidebar.archive_switch}) */ ?>>
            <th:block <?php get_template_part("modules/widgets/aside/contain/archive-contain"); ?> />

            <hr>
        </span>


    <th:block <?php get_template_part("modules/widgets/aside/contain/stat-contain"); ?> />

</div>
