<!-- tag & stat 粘性布局 -->
<div class="card-widget card-tags card-archives card-webinfo card-allinfo">


        <span <?php /* if() */ ?>>
            <?php get_template_part("modules/widgets/aside/contain/tags-contain"); ?> <?php /* if() */ ?>

            <hr>
        </span>

    <span <?php /* if() */ ?>>
            <?php get_template_part("modules/widgets/aside/contain/archive-contain"); ?>

            <hr>
        </span>


    <?php get_template_part("modules/widgets/aside/contain/stat-contain"); ?>

</div>
