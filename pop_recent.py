import os

def populate_recent_posts():
    content = """<div class="card-widget card-recent-post">
    <div class="item-headline"><i class="haofont hao-icon-eicon_map-2-line1"></i><span>最近发布</span></div>
    <div class="aside-list">
        <?php
        $recent_posts = wp_get_recent_posts(array(
            'numberposts' => 5,
            'post_status' => 'publish'
        ));
        foreach($recent_posts as $post) :
            $thumbnail = get_the_post_thumbnail_url($post['ID'], 'thumbnail');
            if (!$thumbnail) {
                $thumbnail = 'https://picsum.photos/seed/' . $post['ID'] . '/150/150';
            }
        ?>
        <div class="aside-list-item">
            <a class="thumbnail" href="<?php echo get_permalink($post['ID']); ?>">
                <img src="<?php echo esc_url($thumbnail); ?>" alt="<?php echo esc_attr($post['post_title']); ?>">
            </a>
            <div class="content">
                <a class="title" href="<?php echo get_permalink($post['ID']); ?>"><?php echo esc_html($post['post_title']); ?></a>
                <time><?php echo get_the_date('Y-m-d', $post['ID']); ?></time>
            </div>
        </div>
        <?php endforeach; wp_reset_query(); ?>
    </div>
</div>
"""
    with open('/workspace/wp-theme-hao/modules/widgets/aside/recent-posts.php', 'w', encoding='utf-8') as f:
        f.write(content)

populate_recent_posts()
