<!-- 页脚模块 -->
<footer id="footer" xmlns:th="http://www.w3.org/1999/xhtml">

    <div id="heo-footer-bar">
        <div class="footer-logo"><th:block></th:block></div>
        <div class="footer-bar-description"></div>
        <a class="footer-bar-link" href="/" data-pjax-state="">了解更多</a>
    </div>

    <!-- 社交链接，需要填入 href class title -->
    <div id="footer_deal">
        <th:block>
            <a rel="external nofollow" target="_blank" <?php /* loop over socialMedia :  */ ?>>
                <i></i>
                <th:block></th:block>
            </a>
        </th:block>

        <img class="footer_mini_logo" title="返回顶部" onclick="btf.scrollToDest(0, 500)">

        <th:block>
            <a rel="external nofollow" target="_blank" <?php /* loop over socialMedia :  */ ?>>
                <i></i>
                <th:block></th:block>
            </a>
        </th:block>
    </div>

    <!-- 相关地址  -->
    <th:block>
        <div id="heo-footer">
            <div class="footer-group" <?php /* loop over menuItem :  */ ?>>
                <h3 class="footer-title"></h3>
                <div class="footer-links">
                    <a class="footer-item" <?php /* loop over childMenu :  */ ?>>
                    </a>
                </div>
            </div>
            <div class="footer-group">
                <div class="footer-title-group">
                    <h3 class="footer-title">友链</h3>
                    <a class="random-friends-btn" id="footer-random-friends-btn"
                       href="javascript:heo.addFriendLinksInFooter();" rel="external nofollow" title="换一批友情链接"
                       data-pjax-state="external"><i class="haofont hao-icon-arrow-rotate-right" style="font-size: 16px;"></i></a>
                </div>
                <div class="footer-links" id="friend-links-in-footer"></div>
            </div>
        </div>

    </th:block>
    <!-- 底部 banner -->
    <halo:footer />

    <div class="copyright">
        ©<?php echo get_theme_mod("hao_siteStartTime", "2023"); ?> -  By <?php bloginfo("name"); ?>
    </div>
    <div class="copyright">
        ©<?php echo date("Y"); ?> By <?php bloginfo("name"); ?>
    </div>
    <div id="workboard"></div>
    <p
       id="ghbdages" style="width:60%;margin: 0 auto 0;">
        <a class="github-badge" <?php /* loop over data :  */ ?> target="_blank"
           style="margin-inline:5px">
            <img />
        </a>
    </p>
    <span style="padding: 5px 5px;">

    </span>

    <style>
        .copyright,
        #ghbdages,
        #workboard {
            text-align: center;
        }
    </style>

    <style>
        #heo-footer {
            margin-bottom: 1rem;
        }
    </style>

    <div id="footer-banner">
        <div class="footer-banner-links">
            <div class="footer-banner-left">
                <div id="footer-banner-tips">
                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <th:block>
                            ©<?php echo get_theme_mod("hao_siteStartTime", "2023"); ?> - 
                        </th:block>
                        <th:block>
                            ©<?php echo date("Y"); ?>
                        </th:block>
                        By <a class="footer-banner-link" href="/" target="_blank"><?php bloginfo("name"); ?></a>
                    </div>
                </div>
            </div>
            <div class="footer-banner-right">
                
                <!-- 又拍云 -->
                <a
                   class="footer-banner-link cloud" href="https://www.upyun.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/footer/upyun-5.png" alt="upyun" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 阿里云 -->
                <a
                   class="footer-banner-link cloud" href="https://www.aliyun.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/footer/aliyun.png" alt="aliyun_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 腾讯云 -->
                <a
                   class="footer-banner-link cloud" href="https://cloud.tencent.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/footer/tencent.png" alt="tencent_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 华为云 -->
                <a
                   class="footer-banner-link cloud" href="https://www.huaweicloud.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img src="<?php echo get_template_directory_uri(); ?>/assets/images/footer/huawei.png" alt="huawei_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 自定义云服务信息 -->
                <a
                   class="footer-banner-link cloud"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img alt="custom_cloud" class="cloud-logo"/>
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                
                <!-- 订阅 需要 RSS 插件支持 -->
                <a class="footer-banner-link" href="/rss.xml">订阅</a>
                <a class="footer-banner-link" href="https://github.com/liuzhihang/halo-theme-hao">主题</a>
                <a class="footer-banner-link" href="/about">关于</a>
                <a
                   class="footer-banner-link" href="https://beian.miit.gov.cn/#/Integrated/index"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span></span>
                    <img alt="icp"/>
                </a>
                <a
                   class="footer-banner-link" href="http://www.beian.gov.cn/portal/registerSystemInfo"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span></span>
                    <img alt="gongan"/>
                </a>
                <a class="footer-banner-link cc" title="cc协议">
                    <i class="haofont hao-icon-copyright-line"></i>
                    <i class="haofont hao-icon-creative-commons-by-line"></i>
                    <i class="haofont hao-icon-creative-commons-nc-line"></i>
                    <i class="haofont hao-icon-creative-commons-nd-line"></i>
                </a>
            </div>
        </div>
    </div>


    <!-- 右下角 snackbar 弹窗 -->
    <div class="needEndHide" id="cookies-window">
        <div class="cookies-window-title"></div>
        <div class="cookies-window-content"><span class="cookies-tip"></span>
            <a class="cookies-link" data-pjax-state=""><i
                    class="bber-gotobb haofont hao-icon-circle-arrow-right"></i></a>
        </div>
    </div>
    <div id="quit-box" onclick="RemoveRewardMask()"></div>

    <!--评论弹幕弹窗 -->
    <div class="comment-barrage needEndHide" style="display: none;"></div>

    <style>
        a.footer-banner-link.cloud {
            display: flex;
            align-items: center;
        }
        img.cloud-logo {
            height: 32px;
        }
    </style>
    
    <th:block>
        <style>
            @media screen and (min-width: 1300px) {
                #footer {
                    background: linear-gradient(180deg, var(--heo-card-bg-none) 0%, #fff0 25%);
                    margin-top: 0.5rem;
                    display: flex;
                    flex-direction: column;
                }
            }
            
            @media screen and (max-width: 1300px) {
                #footer {
                    background: linear-gradient(180deg, var(--heo-background) 0%, #fff0 25%);
                    margin-top: 0;
                    z-index: 3;
                }
            }
        
        </style>
    </th:block>
    
</footer>


