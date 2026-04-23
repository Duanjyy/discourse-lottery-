<!-- 版权样式默认 -->
<th:block  <?php /* if() */ ?>>
    <div class="post-tools" id="post-tools">
        <div class="post-tools-left">

            <!-- 打赏 -->
            <div <?php /* if() */ ?> class="post-reward"
                 onclick="AddRewardMask()">
                <div class="reward-button button&#45;&#45;animated" title="赞赏作者"><i class="haofont hao-icon-hand-heart-fill"></i>
                    打赏作者
                </div>
                <div class="reward-main">
                    <ul class="reward-all"><span class="reward-title">感谢你赐予我前进的力量</span>
                        <ul class="reward-group">
                            <li class="reward-item"><a
                                                       target="_blank">
                                <img alt="微信" class="post-qr-code-img"></a>
                                <div class="post-qr-code-desc">微信</div>
                            </li>
                            <li class="reward-item"><a
                                                       target="_blank"><img alt="支付宝" class="post-qr-code-img"></a>
                                <div class="post-qr-code-desc">支付宝</div>
                            </li>
                        </ul>
                        <a class="reward-main-btn"
                           target="_blank">
                            <div class="reward-text">赞赏者名单</div>
                            <div class="reward-dec">因为你们的支持让我意识到写文章的价值🙏</div>
                        </a>
                    </ul>
                </div>
            </div>

            <!-- 说明 -->
            <div <?php /* if() */ ?> class="reward-link mode"><a
                    class="reward-link-button">
                <i class="haofont hao-icon-plant-fill"></i>运营模式与责任</a>
            </div>

            <!-- 分享 -->
            <div class="share-link mobile" <?php /* if() */ ?>>
                <div class="share-qrcode">
                    <div class="share-button" title="使用手机访问这篇文章"><i class="haofont hao-icon-qrcode"></i>
                    </div>
                    <div class="share-main">
                        <div class="share-main-all">
                            <div id="qrcode"></div>
                            <div class="reward-dec">使用手机访问这篇文章</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="share-link weibo" <?php /* if() */ ?>>
                <a class="share-button" rel="noopener external nofollow noreferrer noopener" target="_blank" title="分享到微博">
                    <i class="haofont hao-icon-weibo" style="font-size:22px"></i></a>
            </div>
            <div class="share-link copyurl" <?php /* if() */ ?>>
                <div class="share-button" id="post-share-url" onclick="rm.copyPageUrl()" title="复制链接"><i
                        class="haofont hao-icon-link"></i></div>
            </div>
        </div>
        <div class="post-tools-right">
            <div class="tag_share">
                <div class="post-meta__tag-list">
                    <a class="post-meta__tags" <?php /* loop */ ?>>
                        <span class="tags-punctuation"></span>

                        <span class="tagsPageCount"></span>
                    </a>
                </div>
            </div>
        </div>
    </div>

    <!-- 版权声明 -->
    <div class="post-copyright">
        <div class="post-copyright__author" >
            <!-- 版权页 以及版权描述文字 -->
            <a <?php /* if() */ ?>
               class="post-copyright__original"
               title="该文章为原创文章，注意版权协议">原创</a>
            <a <?php /* if() */ ?>
               class="post-copyright__original"
               title="该文章为转载文章，版权归原作者所有">转载</a>
            <a class="post-copyright-title" href="#"><span></span></a>
        </div>
        <div class="post-copyright__type">
            <span class="post-copyright-info" id="post-copyright-url">
                <a href="javascript:window.location.href;">[[<?php the_title(); ?>]]</a>
            </span>
            <button class="post-copyright-copybtn" onclick="rm.copyPageUrl()">
                <i class="haofont hao-icon-paste"></i>
            </button>
        </div>
        <div class="post-copyright__notice" <?php /* if() */ ?>>
            <span class="post-copyright-info">
            </span>
        </div>
    </div>

    <link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/css/post-copyright.css">
</th:block>
