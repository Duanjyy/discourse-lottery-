import os

def fix_banner():
    content = """<?php
// Default index-img module
// We'll use get_theme_mod or standard fallback for the site's top banner.
$bg_url = get_theme_mod('hao_top_background_img', 'https://picsum.photos/1920/1080?random=1');
$site_name = get_bloginfo('name');
$site_desc = get_bloginfo('description');
?>

<div id="site-info">
    <h1 id="site-title"><?php echo esc_html($site_name); ?></h1>
    <div id="site-subtitle">
        <span id="subtitle"><?php echo esc_html($site_desc); ?></span>
    </div>
</div>

<div id="scroll-down">
    <i class="haofont hao-icon-angle-down scroll-down-effects"></i>
</div>

<style>
    #page-header {
        background-image: url('<?php echo esc_url($bg_url); ?>');
        background-color: #49b1f5;
        background-position: center center;
        background-size: cover;
        background-repeat: no-repeat;
    }
</style>
"""
    with open('/workspace/wp-theme-hao/modules/header/index-img.php', 'w', encoding='utf-8') as f:
        f.write(content)

fix_banner()
