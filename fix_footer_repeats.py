import re

def fix_footer_repeats():
    path = '/workspace/wp-theme-hao/modules/footer.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The screenshot shows the copyright line "©2023 - By 汤圆测试" and "本网站由...提供CDN加速" repeated multiple times.
    # This is because the original HTML has multiple `th:if` blocks for different cloud providers
    # And since we stripped the `th:if` but left the HTML, all of them are displaying at once!
    
    # 1. We will keep ONLY ONE cloud provider for demo purposes, and strip the rest.
    # Keep upyun, remove aliyun, tencent, huawei, custom
    
    # Let's just hardcode a clean footer banner right section
    clean_right = """
            <div class="footer-banner-right">
                <a class="footer-banner-link cloud" href="https://www.aliyun.com/" rel="noopener external nofollow noreferrer noopener" target="_blank">
                    <span>本网站由</span>&nbsp;&nbsp;
                    <img alt="aliyun" src="<?php echo get_template_directory_uri(); ?>/assets/images/footer/aliyun.png" class="cloud-logo" />
                    &nbsp;&nbsp;<span>提供CDN加速/云存储服务</span>
                </a>
                <a class="footer-banner-link" href="/rss.xml">订阅</a>
                <a class="footer-banner-link" href="https://github.com/liuzhihang/halo-theme-hao">主题</a>
                <a class="footer-banner-link" href="/about">关于</a>
                <a class="footer-banner-link cc" title="cc协议">
                    <i class="haofont hao-icon-copyright-line"></i>
                    <i class="haofont hao-icon-creative-commons-by-line"></i>
                    <i class="haofont hao-icon-creative-commons-nc-line"></i>
                    <i class="haofont hao-icon-creative-commons-nd-line"></i>
                </a>
            </div>
    """
    
    # Replace everything between `<div class="footer-banner-right">` and `</div>`
    content = re.sub(r'<div class="footer-banner-right">.*?</div>\s*</div>\s*</div>', clean_right + '\n        </div>\n    </div>', content, flags=re.DOTALL)
    
    # Also there are multiple copyright lines
    # <div class="copyright"> ©2023 -  By <?php bloginfo("name"); ?> </div>
    # <div class="copyright"> ©2026 By <?php bloginfo("name"); ?> </div>
    # Let's just keep one.
    
    copyright_clean = """
    <div class="copyright">
        ©<?php echo get_theme_mod("hao_siteStartTime", "2023"); ?> - <?php echo date("Y"); ?> By <?php bloginfo("name"); ?>
    </div>
    """
    content = re.sub(r'<div class="copyright".*?</div>\s*<div class="copyright".*?</div>', copyright_clean, content, flags=re.DOTALL)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_footer_repeats()
