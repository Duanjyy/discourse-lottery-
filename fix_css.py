import re

def fix_css_and_buttons():
    path = '/workspace/wp-theme-hao/modules/widgets/banner-group.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Fix invalid gradients
    content = content.replace('linear-gradient(to right, , )', 'linear-gradient(to right, #49b1f5, #5bc0de)')
    
    # Fix empty banners-link-btn content
    # They should have text like "热门文章" and "置顶推荐"
    # Current structure:
    # <a class="banners-link-btn blb-hot">
    #     <i ></i>
    #     <img alt="icon"/>
    # </a>
    # We will replace the whole <a> tag to make it clean
    
    hot_btn = """<a class="banners-link-btn blb-hot" href="/">
                    <i class="haofont hao-icon-fire"></i>
                    <span class="banners-link-title">热门文章</span>
                </a>"""
    content = re.sub(r'<a class="banners-link-btn blb-hot">.*?</a>', hot_btn, content, flags=re.DOTALL)
    
    top_btn = """<a class="banners-link-btn blb-top" href="/">
                    <i class="haofont hao-icon-thumbs-up"></i>
                    <span class="banners-link-title">推荐阅读</span>
                </a>"""
    content = re.sub(r'<a class="banners-link-btn blb-top">.*?</a>', top_btn, content, flags=re.DOTALL)
    
    # Check for empty <div class="banners-title-small">
    content = re.sub(r'<div class="banners-title-small">\s*</div>', '<div class="banners-title-small">发现精彩</div>', content)
    content = re.sub(r'<h1 class="banners-title-big">\s*</h1>', '<h1 class="banners-title-big">欢迎来到我的博客</h1>', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_css_and_buttons()
