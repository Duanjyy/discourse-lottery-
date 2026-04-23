<?php get_header(); ?>

    <div class="post" id="body-wrap">

        <header class="post-bg" id="page-header">
            <?php get_template_part("modules/nav"); ?>
            <div class="coverdiv loaded" id="coverdiv">
                <img alt="cover" class="nolazyload" id="post-cover">
            </div>

            <div id="post-info">
                <div id="post-firstinfo">
                    <div class="meta-firstline">
                        <!-- 这里要跳转到版权页 -->
                        <th:block>
                            <a class="post-meta-original"
                               title="该文章为原创文章，注意版权协议"
                            >原创</a>
                            <a class="post-meta-original"
                               title="该文章为转载文章，版权归原作者所有"
                            >转载</a>
                        
<?php get_footer(); ?>
