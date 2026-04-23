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
                
                <div id="about-page">
                    
                    
                    <div class="author-info">
                        <div class="author-tag-left"
                             <?php /* if() */ ?>>
                            <span class="author-tag" <?php /* loop */ ?>></span>
                        </div>
                        <div class="author-img">
                            <th:block>
                                <img>
                            </th:block>
                        </div>
                        <div class="author-tag-right"
                             <?php /* if() */ ?>>
                            <span class="author-tag" <?php /* loop */ ?>></span>
                        </div>
                    </div>
                    <div class="author-title"></div>
                    
                    <th:block></th:block>
                    
                    <div class="author-content">
                        <div class="create-site-post author-content-item single">
                        </div>
                    </div>
                    
                    <th:block <?php get_template_part("modules/widgets/about-widgets/tenyear"); ?>></th:block>
                    
                    <th:block <?php get_template_part("modules/widgets/about-widgets/about-reward"); ?>></th:block>
                
                </div>
                
                <th:block <?php /* if() */ ?>>
                    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/tenyear.css" media="all"
                          onload="this.media='all'">
                    <script> (() => {
                        let t = document.querySelector(".progress"),
                                n = document.querySelector(".past-time"),
                                o = document.querySelector(".percentage-label"),
                                r = document.querySelector(".start-time"),
                                s = document.querySelector(".end-time"),
                                a = new Date("[()]").getTime(),
                                i = new Date("[()]").getTime(),
                                c = ((new Date).getTime() - a) / (i - a) * 100,
                                u = c <= 100 ? c + "%" : "100%",
                                m = c <= 100 ? c.toFixed(0) + "%" : "已达标 ";
                        if (c < 10){
                            m = "";
                        }
                        n.style.setProperty("--past-time-percentage", c + "%"), t.style.setProperty("--progress-percentage", u), o.textContent = m, o.style.left = `calc(% - 3rem)`, r.textContent = "" + new Date(a).toLocaleDateString(), s.textContent = "" + new Date(i).toLocaleDateString(), setTimeout(() => {
                            o.style.visibility = "visible"
                        }, 2500);
                    })()
                    </script>
                </th:block>
            
            
            </div>
        
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>

</th:block>


<?php get_footer(); ?>
