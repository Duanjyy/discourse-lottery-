<?php get_header(); ?>

    <div class="post" id="body-wrap">

        <header class="post-bg" id="page-header">
            <?php get_template_part("modules/nav"); ?>
            <div class="coverdiv loaded" id="coverdiv">
                <img alt="cover" class="nolazyload" id="post-cover"
                     th:src="${#strings.isEmpty(post.spec.cover) ? theme.config.layout.postRandomImg : post.spec.cover}">
            </div>

            <div id="post-info">
                <div id="post-firstinfo">
                    <div class="meta-firstline">
                        <!-- 这里要跳转到版权页 -->
                        <th:block th:with="copyrightUrl =${#annotations.get(post, 'copyrightUrl')}"
                                  th:if="${not #strings.isEmpty(#annotations.get(post, 'copyrightEnable')) ?
                                          #annotations.get(post, 'copyrightEnable')  == 'true' : theme.config.post.copyrights.enable}">
                            <a class="post-meta-original"
                               title="该文章为原创文章，注意版权协议"
                               th:if="${#strings.equals(#annotations.getOrDefault(post, 'copyrightType','original'),'original')}"
                               th:href="@{${not #strings.isEmpty(copyrightUrl) ? copyrightUrl :
                                not #strings.isEmpty(theme.config.post.copyrights.originalUrl) ? theme.config.post.copyrights.originalUrl : '#'}}"
                            >原创</a>
                            <a class="post-meta-original"
                               title="该文章为转载文章，版权归原作者所有"
                               th:if="${#strings.equals(#annotations.getOrDefault(post, 'copyrightType','original'),'reprint')}"
                               th:href="@{${not #strings.isEmpty(copyrightUrl) ? copyrightUrl :
                                not #strings.isEmpty(theme.config.post.copyrights.originalUrl) ? theme.config.post.copyrights.reprintUrl : '#'}}"
                            >转载</a>
                        
<?php get_footer(); ?>
