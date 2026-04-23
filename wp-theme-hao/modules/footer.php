<!-- 页脚模块 -->
<footer id="footer" xmlns:th="http://www.w3.org/1999/xhtml">

    <div id="heo-footer-bar" <?php /* if(${theme.config.footer.footer_bar.footer_bar_enable}) */ ?>>
        <div class="footer-logo"><th:block th:utext="${theme.config.footer.footer_bar.logo}"></th:block></div>
        <div class="footer-bar-description">[[${theme.config.footer.footer_bar.description}]]</div>
        <a class="footer-bar-link" href="/" data-pjax-state="">了解更多</a>
    </div>

    <!-- 社交链接，需要填入 href class title -->
    <div id="footer_deal">
        <th:block th:with="socialMedias = ${theme.config.footer.social_media.socialMediaLeft}">
            <a th:class="${socialMedia.option_social_data == 'custom' ? 'custom_socials' : 'deal_link'}" rel="external nofollow" target="_blank" <?php /* loop */ ?>
               th:href="${socialMedia.url}" th:title="${socialMedia.name}">
                <i <?php /* if(${socialMedia.option_social_data == 'icon'  || #strings.isEmpty(socialMedia.option_social_data)}) */ ?>
                   th:class="${socialMedia.icon}"></i>
                <th:block <?php /* if(${socialMedia.option_social_data == 'custom'}) */ ?> th:utext="${socialMedia.icon}"></th:block>
            </a>
        </th:block>

        <img <?php /* if(${not #strings.isEmpty(theme.config.footer.social_media.centerImg)}) */ ?> class="footer_mini_logo"
             th:with="img = @{${theme.config.footer.social_media.centerImg}}" th:src="${isLazyload ? '' : img}"
             th:data-lazy-src="${ isLazyload ? img : ''}" title="返回顶部" onclick="btf.scrollToDest(0, 500)">

        <th:block th:with="socialMedias = ${theme.config.footer.social_media.socialMediaRight}">
            <a th:class="${socialMedia.option_social_data == 'custom' ? 'custom_socials' : 'deal_link'}" rel="external nofollow" target="_blank" <?php /* loop */ ?>
               th:href="${socialMedia.url}" th:title="${socialMedia.name}">
                <i <?php /* if(${socialMedia.option_social_data == 'icon' || #strings.isEmpty(socialMedia.option_social_data)}) */ ?>
                   th:class="${socialMedia.icon}"></i>
                <th:block <?php /* if(${socialMedia.option_social_data == 'custom'}) */ ?> th:utext="${socialMedia.icon}"></th:block>
            </a>
        </th:block>
    </div>

    <!-- 相关地址  -->
    <th:block <?php /* if(${not #strings.isEmpty(theme.config.footer.menu)}) */ ?>
              th:with="footMenu = ${menuFinder.getByName(theme.config.footer.menu)}">
        <div id="heo-footer" <?php /* if(${not #lists.isEmpty(footMenu.menuItems)}) */ ?>>
            <div class="footer-group" <?php /* loop */ ?>>
                <h3 class="footer-title" th:text="${menuItem.status.displayName}"></h3>
                <div class="footer-links">
                    <a class="footer-item" <?php /* loop */ ?>
                       th:href="@{${childMenu.status.href}}" th:target="${childMenu.spec.target?.value}"
                       th:text="${childMenu.status.displayName}">
                    </a>
                </div>
            </div>
            <div <?php /* if(${theme.config.footer.footer_group.enable_footer_group}) */ ?> class="footer-group">
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

    <div class="copyright"
         <?php /* if(${not #strings.isEmpty(theme.config.basics.siteStartTime) && theme.config.footer.footerContent.style_one.owner_enable}) */ ?>>
        ©[[${#strings.arraySplit(theme.config.basics.siteStartTime, '-')[0]}]] - [[${#dates.format(new
        java.util.Date(), 'yyyy')}]] By [[<?php bloginfo("name"); ?>]]
    </div>
    <div class="copyright"
         <?php /* if(${#strings.isEmpty(theme.config.basics.siteStartTime) && theme.config.footer.footerContent.style_one.owner_enable}) */ ?>>
        ©[[${#dates.format(new java.util.Date(), 'yyyy')}]] By [[<?php bloginfo("name"); ?>]]
    </div>
    <div <?php /* if(${theme.config.footer.footerContent.style_one.runtime_enable}) */ ?> id="workboard"></div>
    <p <?php /* if(${theme.config.footer.footerContent.style_one.bdageitem_enable && not #lists.isEmpty(theme.config.footer.footerContent.style_one.bdageitem)}) */ ?>
       th:with="bdageitem = ${theme.config.footer.footerContent.style_one.bdageitem}"
       id="ghbdages" style="width:60%;margin: 0 auto 0;">
        <a class="github-badge" <?php /* loop */ ?> target="_blank" th:href="@{${data.link}}"
           style="margin-inline:5px" th:title="${data.message}">
            <img th:with=" img = @{${data.shields}}" th:src="${isLazyload ? '' : img}"
                 th:data-lazy-src="${ isLazyload ? img : ''}" th:alt="${data.message}" />
        </a>
    </p>
    <span <?php /* if(${!theme.config.footer.footerContent.default_enable_group.default_enable}) */ ?> style="padding: 5px 5px;">

    </span>

    <style>
        .copyright,
        #ghbdages,
        #workboard {
            text-align: center;
        }
    </style>

    <style
            <?php /* if(${(theme.config.footer.footerContent.style_one.owner_enable
            || (not #lists.isEmpty(theme.config.footer.footerContent.style_one.bdageitem) && theme.config.footer.footerContent.style_one.bdageitem_enable )
            || theme.config.footer.footerContent.style_one.runtime_enable)
        && theme.config.footer.footerContent.default_enable_group.default_enable}) */ ?>>
        #heo-footer {
            margin-bottom: 1rem;
        }
    </style>

    <div <?php /* if(${theme.config.footer.footerContent.default_enable_group.default_enable}) */ ?> id="footer-banner" th:style="|padding:${theme.config.footer.footerContent.default_enable_group.footer_banner_padding}rem|">
        <div class="footer-banner-links">
            <div class="footer-banner-left">
                <div id="footer-banner-tips">
                    <div style="display: flex;flex-direction: row;align-items: center;">
                        <th:block <?php /* if(${not #strings.isEmpty(theme.config.basics.siteStartTime)}) */ ?>>
                            ©[[${#strings.arraySplit(theme.config.basics.siteStartTime, '-')[0]}]] - [[${#dates.format(new
                            java.util.Date(), 'yyyy')}]]
                        </th:block>
                        <th:block <?php /* if(${#strings.isEmpty(theme.config.basics.siteStartTime)}) */ ?>>
                            ©[[${#dates.format(new java.util.Date(), 'yyyy')}]]
                        </th:block>
                        By <a class="footer-banner-link" href="/" target="_blank">[[<?php bloginfo("name"); ?>]]</a>
                    </div>
                </div>
            </div>
            <div class="footer-banner-right">
                
                <!-- 又拍云 -->
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.yunzhichi && theme.config.footer.footerContent.default_enable_group.yunzhichi_list == 'upyun_cloud'}) */ ?>
                   class="footer-banner-link cloud" href="https://www.upyun.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img th:src="${assets_link + '/images/footer/upyun-5.png'}" alt="upyun" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 阿里云 -->
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.yunzhichi && theme.config.footer.footerContent.default_enable_group.yunzhichi_list == 'aliyun_cloud'}) */ ?>
                   class="footer-banner-link cloud" href="https://www.aliyun.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img th:src="${assets_link + '/images/footer/aliyun.png'}" alt="aliyun_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 腾讯云 -->
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.yunzhichi && theme.config.footer.footerContent.default_enable_group.yunzhichi_list == 'tencent_cloud'}) */ ?>
                   class="footer-banner-link cloud" href="https://cloud.tencent.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img th:src="${assets_link + '/images/footer/tencent.png'}" alt="tencent_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 华为云 -->
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.yunzhichi && theme.config.footer.footerContent.default_enable_group.yunzhichi_list == 'huawei_cloud'}) */ ?>
                   class="footer-banner-link cloud" href="https://www.huaweicloud.com/"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img th:src="${assets_link + '/images/footer/huawei.png'}" alt="huawei_cloud" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <!-- 自定义云服务信息 -->
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.yunzhichi && theme.config.footer.footerContent.default_enable_group.yunzhichi_list == 'custom_cloud' && not #strings.isEmpty(theme.config.footer.footerContent.default_enable_group.yunzhichi_url)}) */ ?>
                   class="footer-banner-link cloud" th:href="@{${theme.config.footer.footerContent.default_enable_group.yunzhichi_url_link}}"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img th:src="@{${theme.config.footer.footerContent.default_enable_group.yunzhichi_url}}" alt="custom_cloud" class="cloud-logo"/>
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                
                <!-- 订阅 需要 RSS 插件支持 -->
                <a class="footer-banner-link" href="/rss.xml" <?php /* if(${pluginFinder.available('PluginFeed')} and ${theme.config.footer.footerContent.default_enable_group.dingyue}) */ ?>>订阅</a>
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.zhuti}) */ ?> class="footer-banner-link" href="https://github.com/liuzhihang/halo-theme-hao">主题</a>
                <a <?php /* if(${theme.config.footer.footerContent.default_enable_group.about}) */ ?> class="footer-banner-link" href="/about">关于</a>
                <a <?php /* if(${not #strings.isEmpty(theme.config.basics.icp) && theme.config.footer.footerContent.default_enable_group.icp_icon}) */ ?>
                   class="footer-banner-link" href="https://beian.miit.gov.cn/#/Integrated/index"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span <?php /* if(${not #strings.startsWith(theme.config.basics.icp, 'http')}) */ ?>>[[${theme.config.basics
                        .icp}]]</span>
                    <img <?php /* if(${#strings.startsWith(theme.config.basics.icp, 'http')}) */ ?>
                         th:src="@{${theme.config.basics.icp}}" alt="icp"/>
                </a>
                <a <?php /* if(${not #strings.isEmpty(theme.config.basics.gongan) && theme.config.footer.footerContent.default_enable_group.gongwangan}) */ ?>
                   class="footer-banner-link" href="http://www.beian.gov.cn/portal/registerSystemInfo"
                   rel="noopener external nofollow noreferrer noopener"
                   target="_blank">
                    <span <?php /* if(${not #strings.startsWith(theme.config.basics.gongan, 'http')}) */ ?>>[[${theme.config.basics.gongan}]]</span>
                    <img <?php /* if(${#strings.startsWith(theme.config.basics.gongan, 'http')}) */ ?>
                         th:src="@{${theme.config.basics.gongan}}" alt="gongan"/>
                </a>
                <a class="footer-banner-link cc" th:href="${theme.config.basics.copyrightAgreement}"
                   <?php /* if(${not #strings.isEmpty(theme.config.basics.copyrightAgreement) && theme.config.footer.footerContent.default_enable_group.yingsi}) */ ?> title="cc协议">
                    <i class="haofont hao-icon-copyright-line"></i>
                    <i class="haofont hao-icon-creative-commons-by-line"></i>
                    <i class="haofont hao-icon-creative-commons-nc-line"></i>
                    <i class="haofont hao-icon-creative-commons-nd-line"></i>
                </a>
            </div>
        </div>
    </div>


    <!-- 右下角 snackbar 弹窗 -->
    <div <?php /* if(${theme.config.tool.snackbar.switch}) */ ?> class="needEndHide" id="cookies-window">
        <div class="cookies-window-title" th:text="${theme.config.tool.snackbar.introductionTitle}"></div>
        <div class="cookies-window-content"><span class="cookies-tip"
                                                  th:text="${theme.config.tool.snackbar.introductionTip}"></span>
            <a class="cookies-link" th:href="@{${theme.config.tool.snackbar.introductionUrl}}"
               th:title="${theme.config.tool.snackbar.introductionName}" data-pjax-state=""><i
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
    
    <th:block <?php /* if(${theme.config.top.global_background.enable_global_background_img}) */ ?>>
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


