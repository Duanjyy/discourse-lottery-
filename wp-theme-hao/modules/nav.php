<nav class="show" id="nav">
    <div id="nav-group">

        <!-- 导航栏左侧 -->
        <?php get_template_part("modules/widgets/nav-left"); ?>
        <div id="page-name-mask">
            <div id="page-name" >
                <a id="page-name-text" onclick="btf.scrollToDest(0,500)"></a>
            </div>
        </div>

        <!-- 导航栏中间 -->
        <?php get_template_part("modules/widgets/nav-menu"); ?>

        <!-- 导航栏右侧 -->
        <?php get_template_part("modules/widgets/nav-right"); ?>

    </div>
</nav>