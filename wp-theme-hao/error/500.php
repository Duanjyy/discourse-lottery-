<!DOCTYPE html>
<html lang="zh-CN"
      th:replace="~{modules/layouts/layout :: layout(content = ~{::content}, htmlType = '500', title = '500', head = null)}"
      >

<th:block th:fragment="content">
    
    <div class="page" id="body-wrap">
        <div class="errors">
            
            <!-- 头部导航栏 -->
            <div>
                <header class="not-top-img" id="page-header">
                    <nav <?php get_template_part("modules/nav :: nav(title = '500')"); ?>></nav>
                </header>
            </div>
            <div id="error-wrap">
                <div class="error-content">
                    <div class="error-img"
                         th:style="'background-image: url('+${theme.config.other.error_500.background}+')'">
                    </div>
                    <div class="error-info">
                        <h1 class="error_title">500</h1>
                        <div class="error_subtitle">[[${theme.config.other.error_500.subtitle}]]</div>
                        <a class="button--animated" href="/"
                           data-pjax-state=""><i class="fas fa-rocket"></i>回到主页</a>
                    </div>
                </div>
            </div>
            
            <!-- 默认设置前 6 篇文章 -->
            <div class="aside-list">
                <div class="aside-list-group"
                     th:with='topGroupPosts = ${postFinder.list(1,6)},
                postRandomImg=${#strings.contains(theme.config.layout.postRandomImg,"?") ? theme.config.layout.postRandomImg+"&" : theme.config.layout.postRandomImg+"?"}'>
                    <div <?php /* loop */ ?> class="aside-list-item">
                        <a class="thumbnail div_border"
                           th:href="@{<?php the_permalink(); ?>}"
                           th:title="<?php the_title(); ?>"><img
                                loading="lazy"
                                th:src='${#strings.isEmpty(post.spec.cover) ? postRandomImg+post.spec.title : thumbnail.gen(post.spec.cover, "m")}'
                                th:alt="<?php the_title(); ?>"></a>
                        <div class="content">
                            <a class="title" th:href="@{<?php the_permalink(); ?>}"
                               th:title="<?php the_title(); ?>"
                               data-pjax-state="">[[<?php the_title(); ?>]]</a>
                            <!-- <time datetime="2023-06-08T04:08:22.000Z" title="创建 2023-06-08 12:08:22">2023-06-08</time> -->
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
    </div>
</th:block>
<style>
    .div_border {
        border-radius: 0.5rem;
    }
</style>
</html>
