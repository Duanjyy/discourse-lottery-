<!DOCTYPE html>
<html lang="zh-CN"
      >

<th:block>
    
    <div class="page" id="body-wrap">
        <div class="errors">
            
            <!-- 头部导航栏 -->
            <div>
                <header class="not-top-img" id="page-header">
                    <?php get_template_part("modules/nav :: nav(title = '404')"); ?>
                </header>
            </div>
            <div id="error-wrap">
                <div class="error-content">
                    <div class="error-img"
                         style="'background-image: url('++')'">
                    </div>
                    <div class="error-info">
                        <h1 class="error_title">404</h1>
                        <div class="error_subtitle"></div>
                        <a class="button--animated" href="/"
                           data-pjax-state=""><i class="fas fa-rocket"></i>回到主页</a>
                    </div>
                </div>
            </div>
            
            <!-- 默认设置前 6 篇文章 -->
            <div class="aside-list">
                <div class="aside-list-group"
                     th:with='topGroupPosts = ,
                postRandomImg='>
                    <div <?php /* loop */ ?> class="aside-list-item">
                        <a class="thumbnail div_border"
                           href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>"><img
                                loading="lazy"
                                th:src=''></a>
                        <div class="content">
                            <a class="title" href="<?php echo esc_url("<?php the_permalink(); ?>"); ?>"
                               data-pjax-state=""></a>
                            <!-- <time datetime="2023-06-08T04:08:22.000Z" title="创建 2023-06-08 12:08:22">2023-06-08</time> -->
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
    </div>
</th:block>

<style>
    .div_border{
        border-radius: 0.5rem;
    }
</style>

</html>
