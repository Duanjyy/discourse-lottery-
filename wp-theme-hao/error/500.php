<!DOCTYPE html>
<html lang="zh-CN"
      >

<th:block>
    
    <div class="page" id="body-wrap">
        <div class="errors">
            
            <!-- 头部导航栏 -->
            <div>
                <header class="not-top-img" id="page-header">
                    <?php get_template_part("modules/nav"); ?>
                </header>
            </div>
            <div id="error-wrap">
                <div class="error-content">
                    <div class="error-img">
                    </div>
                    <div class="error-info">
                        <h1 class="error_title">500</h1>
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
                    <div <?php /* loop over post :  */ ?> class="aside-list-item">
                        <a class="thumbnail div_border"><img
                                loading="lazy"
                                th:src=''></a>
                        <div class="content">
                            <a class="title"
                               data-pjax-state="">[[<?php the_title(); ?>]]</a>
                            <!-- <time datetime="2023-06-08T04:08:22.000Z" title="创建 2023-06-08 12:08:22">2023-06-08</time> -->
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>
</th:block>
<style>
    .div_border {
        border-radius: 0.5rem;
    }
</style>
</html>
