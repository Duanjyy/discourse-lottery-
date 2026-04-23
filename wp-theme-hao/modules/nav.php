<nav class="show" id="nav">
    <div id="nav-group">

        <!-- 导航栏左侧 -->
        <div <?php get_template_part("modules/widgets/nav-left"); ?>
        <div id="page-name-mask">
            <div id="page-name" >
                <a id="page-name-text" onclick="btf.scrollToDest(0,500)"></a>
            </div>
        </div>

        <!-- 导航栏中间 -->
        <div <?php get_template_part("modules/widgets/nav-menu :: nav-menu"); ?>></div>

        <!-- 导航栏右侧 -->
        <div <?php get_template_part("modules/widgets/nav-right"); ?>

    </div>
</nav>