import os

def fix_profile():
    content = """<?php
// User profile widget in sidebar
$author_id = 1; // Default admin
$author_name = get_the_author_meta('display_name', $author_id);
$author_desc = get_the_author_meta('description', $author_id);
$avatar_url = get_avatar_url($author_id);
if (!$avatar_url) {
    $avatar_url = get_template_directory_uri() . '/assets/images/hao-logo.jpg';
}
?>
<div class="card-widget card-info">
    <div class="is-center">
        <div class="avatar-img">
            <img src="<?php echo esc_url($avatar_url); ?>" alt="avatar">
        </div>
        <div class="author-info__name"><?php echo esc_html($author_name); ?></div>
        <div class="author-info__description"><?php echo esc_html($author_desc ? $author_desc : 'A WordPress Site'); ?></div>
    </div>
    
    <div class="card-info-data site-data is-center">
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <div class="headline">文章</div>
            <div class="length-num"><?php echo wp_count_posts()->publish; ?></div>
        </a>
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <div class="headline">分类</div>
            <div class="length-num"><?php echo wp_count_terms('category'); ?></div>
        </a>
        <a href="<?php echo esc_url(home_url('/')); ?>">
            <div class="headline">标签</div>
            <div class="length-num"><?php echo wp_count_terms('post_tag'); ?></div>
        </a>
    </div>
</div>
"""
    with open('/workspace/wp-theme-hao/modules/widgets/aside/profile.php', 'w', encoding='utf-8') as f:
        f.write(content)

fix_profile()
