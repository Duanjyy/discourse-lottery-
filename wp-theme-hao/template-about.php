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
                        <div class="author-tag-left"
                             th:if="${not #lists.isEmpty(theme.config.about.author_info_left_tags)}"
                             th:with="authorTags = ${theme.config.about.author_info_left_tags}">
                            <span class="author-tag" <?php /* loop over authorTag : ${authorTags} */ ?>
                                  th:text="${authorTag}"></span>
                        </div>
                        <div class="author-img">
                            <th:block th:with="
                                    defaultImg = <?php echo get_template_directory_uri(); ?>/assets/images/hao-logo.jpg,
                                    finalImg = ${#strings.isEmpty(theme.config.about?.aboutAuthorImage)
                                               ? defaultImg
                                               : theme.config.about.aboutAuthorImage}
                                ">
                                <img th:src="${finalImg}">
                            
<?php get_footer(); ?>
