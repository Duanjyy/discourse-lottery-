<!-- 侧边栏 -->
<div class="aside-content" id="aside-content">
    <!-- 博主信息 -->
    <?php get_template_part("modules/widgets/aside/profile"); ?>
    
    <div class="sticky_layout">
        <!-- 归档 -->
        <?php get_template_part("modules/widgets/aside/archives"); ?>
        
        <!-- 分类 -->
        <?php get_template_part("modules/widgets/aside/categories"); ?>
        
        <!-- 标签 -->
        <?php get_template_part("modules/widgets/aside/tags"); ?>
        
        <!-- 最新文章 -->
        <?php get_template_part("modules/widgets/aside/recent-posts"); ?>
    </div>
</div>
