<?php get_header(); ?>

    
    <div class="page" id="body-wrap">
        
        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                
                <div id="about-page">
                    
                    
                    <div class="author-info">
                        <div class="author-tag-left">
                            <span class="author-tag" <?php /* loop over authorTag :  */ ?>></span>
                        </div>
                        <div class="author-img">
                            <th:block>
                                <img>
                            
<?php get_footer(); ?>
