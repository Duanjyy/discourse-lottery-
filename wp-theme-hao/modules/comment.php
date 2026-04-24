
    <!-- 已知问题 PJAX 下，comment 首次请求会出错。当前的临时解决办法是使用 js 重试 -->
    <div id="post-comment">
        <div class="comment-head">
            <div class="comment-headline"><i class="haofont hao-icon-chat--fill" style="font-size: 20px;"></i> <span>评论</span></div>
            <div  class="comment-randomInfo">
                <a <?php /* if() */ ?>
                   onclick="heo.addRandomCommentInfo()" href="javascript:void(0)">匿名评论</a>
                <a href="/privacy">隐私政策</a>
            </div>
            <div class="comment-tips" id="comment-tips">
                <span>你无需删除空行，直接评论以获取最佳展示效果</span>
            </div>
        </div>

            <div id="twikoo-wrap"></div>
            <style>
                #twikoo .tk-tag-green {
                    background-color: #3b70fc;
                    border: none;
                    border-radius: 4px;
                    color: #fff;
                }

            </style>
        

        <div <?php /* if() */ ?>
             id="artalk-wrap"></div>

        <div <?php /* if(${#strings.equals(theme.config.comments.use, 'Waline')
              && not #strings.isEmpty(theme.config.comments.walines.serverURL)}) */ ?> id="waline-wrap"></div>

        <halo:comment <?php /* if() */ ?> colorScheme="document.documentElement.getAttribute('data-theme')"/>
    </div>
