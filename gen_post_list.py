import os

def generate_post_list():
    content = """<?php
// WP loop for post list
if ( have_posts() ) :
    $count = 0;
    while ( have_posts() ) : the_post();
        $count++;
        // Get post thumbnail or fallback to a random placeholder
        $thumbnail_url = get_the_post_thumbnail_url(get_the_ID(), 'medium');
        if (!$thumbnail_url) {
            $thumbnail_url = 'https://picsum.photos/seed/' . get_the_ID() . '/800/600'; // Random image based on post ID
        }
        
        $is_even = ($count % 2 == 0) ? 'even' : 'odd';
        $is_pinned = is_sticky() ? 'pinned-post-item' : '';
        
        // Let's assume layout configs
        $cols = get_theme_mod('hao_post_cols', 'card'); 
        $location = get_theme_mod('hao_postLocation', 'both');
?>
    <div class="recent-post-item <?php echo esc_attr($cols . ' ' . $location . ' ' . $is_even . ' ' . $is_pinned); ?>" onclick="pjax.loadUrl('<?php the_permalink(); ?>')">
        <div class="post_cover left_radius">
            <a title="<?php echo esc_attr(get_the_title()); ?>" href="<?php the_permalink(); ?>">
                <img class="post_bg" alt="<?php echo esc_attr(get_the_title()); ?>" data-lazy-src="<?php echo esc_url($thumbnail_url); ?>" src="<?php echo esc_url($thumbnail_url); ?>">
            </a>
        </div>
        <div class="recent-post-info">
            <div class="recent-post-info-top">
                <div class="recent-post-info-top-tips">
                    <?php if (is_sticky()) : ?>
                        <span class="sticky-warp sticky">置顶</span>
                    <?php endif; ?>
                    
                    <?php
                    $categories = get_the_category();
                    if ( ! empty( $categories ) ) {
                        foreach( $categories as $category ) {
                            echo '<span class="original" title="' . esc_attr( $category->name ) . '">' . esc_html( $category->name ) . '</span>';
                        }
                    }
                    ?>
                    <a class="unvisited-post" href="<?php the_permalink(); ?>" title="<?php echo esc_attr(get_the_title()); ?>" data-pjax-state="">阅读</a>
                </div>
                <a class="article-title" title="<?php echo esc_attr(get_the_title()); ?>" href="<?php the_permalink(); ?>">
                    <?php the_title(); ?>
                </a>
                
                <div class="content">
                    <?php echo wp_trim_words( get_the_excerpt(), 20, '...' ); ?>
                </div>
            </div>
            
            <div class="article-meta-wrap">
                <span class="article-meta tags">
                    <?php
                    $tags = get_the_tags();
                    if ( $tags ) {
                        foreach ( $tags as $tag ) {
                            echo '<a class="article-meta__tags" href="' . esc_url( get_tag_link( $tag->term_id ) ) . '">';
                            echo '<span class="tags-punctuation">#</span>' . esc_html( $tag->name ) . '<span class="tagsPageCount">' . esc_html( $tag->count ) . '</span>';
                            echo '</a>';
                        }
                    }
                    ?>
                </span>
                
                <span class="post-meta-date">
                    <i class="haofont hao-icon-calendar-days" style="font-size: 13px;"></i>
                    <span class="article-meta-label">发表于</span>
                    <time datetime="<?php echo get_the_date('c'); ?>" title="<?php echo get_the_date('Y-m-d H:i:s'); ?>">
                        <?php echo get_the_date('Y-m-d'); ?>
                    </time>
                </span>
            </div>
        </div>
    </div>
<?php
    endwhile;
    
    // Pagination
    echo '<nav id="pagination">';
    echo '<div class="pagination">';
    echo paginate_links( array(
        'prev_text' => '<i class="haofont hao-icon-angle-left"></i>',
        'next_text' => '<i class="haofont hao-icon-angle-right"></i>',
    ) );
    echo '</div>';
    echo '</nav>';
    
else :
    echo '<p>没有找到任何文章。</p>';
endif;
?>
"""
    with open('/workspace/wp-theme-hao/modules/post-list.php', 'w', encoding='utf-8') as f:
        f.write(content)

generate_post_list()
