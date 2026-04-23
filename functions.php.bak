<?php

// Enqueue Theme Assets
function hao_enqueue_assets() {
    wp_enqueue_style('hao-style', get_stylesheet_uri());
    wp_enqueue_style('hao-custom-style', get_template_directory_uri() . '/assets/css/custom.css');
    wp_enqueue_script('hao-custom-js', get_template_directory_uri() . '/assets/js/custom.js', array(), false, true);
}
add_action('wp_enqueue_scripts', 'hao_enqueue_assets');

// Theme Support
function hao_theme_support() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
    register_nav_menus(array(
        'primary' => __('Primary Menu', 'hao'),
    ));
}
add_action('after_setup_theme', 'hao_theme_support');

// Customizer Settings
function hao_customize_register($wp_customize) {
    $wp_customize->add_section('hao_basics', array(
        'title' => __('基础', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_siteTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_siteTitle', array(
        'label' => __('站点名称', 'hao'),
        'section' => 'hao_basics',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_siteStartTime', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_siteStartTime', array(
        'label' => __('建站时间', 'hao'),
        'section' => 'hao_basics',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_icp', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_icp', array(
        'label' => __('ICP 备案', 'hao'),
        'section' => 'hao_basics',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_gongan', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_gongan', array(
        'label' => __('公安备案', 'hao'),
        'section' => 'hao_basics',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_copyrightAgreement', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_copyrightAgreement', array(
        'label' => __('版权协议', 'hao'),
        'section' => 'hao_basics',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_nav', array(
        'title' => __('导航', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_menus_pc_leftMenu', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_menus_pc_leftMenu', array(
        'label' => __('pc端左侧菜单', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_menus_phone_leftMenu', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_menus_phone_leftMenu', array(
        'label' => __('移动左侧菜单', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_menus_phone_menu', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_menus_phone_menu', array(
        'label' => __('移动主菜单', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_menus_enable_ali_iconfont_symbol_header', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_menus_enable_ali_iconfont_symbol_header', array(
        'label' => __('阿里巴巴IconFont Symbol', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_leftMenu', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_leftMenu', array(
        'label' => __('站点名左侧菜单', 'hao'),
        'section' => 'hao_nav',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_right_travelling', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_right_travelling', array(
        'label' => __('开往按钮', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_right_article', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_right_article', array(
        'label' => __('随机文章', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_right_darkMode', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_right_darkMode', array(
        'label' => __('切换模式', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_right_navLogin', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_right_navLogin', array(
        'label' => __('登入按钮', 'hao'),
        'section' => 'hao_nav',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_right_console', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_right_console', array(
        'label' => __('中控台', 'hao'),
        'section' => 'hao_nav',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_top', array(
        'title' => __('顶部', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_above_enable_above', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_enable_above', array(
        'label' => __('above_enable_above', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_above_typed', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_typed', array(
        'label' => __('打字机显示的文字', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_above_enable_typed_random', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_enable_typed_random', array(
        'label' => __('随机文字', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_above_enable_above_video', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_enable_above_video', array(
        'label' => __('背景模式', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_above_index_video', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_index_video', array(
        'label' => __('动态壁纸', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_above_index_img', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_index_img', array(
        'label' => __('PC背景图', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_above_phone_index_img', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_above_phone_index_img', array(
        'label' => __('移动端背景图', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_global_background_enable_global_background_img', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_global_background_enable_global_background_img', array(
        'label' => __('全局透明背景图', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_global_background_enable_global_background_above_video', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_global_background_enable_global_background_above_video', array(
        'label' => __('全局背景模式', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_global_background_global_background_img', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_global_background_global_background_img', array(
        'label' => __('全局背景图片', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_global_background_global_background_video', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_global_background_global_background_video', array(
        'label' => __('全局背景视频', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_moment', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_moment', array(
        'label' => __('瞬间说说', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_climb_climbEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_climb_climbEnable', array(
        'label' => __('climb_climbEnable', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_climb_climbImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_climb_climbImg', array(
        'label' => __('图片', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_recentTop', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_recentTop', array(
        'label' => __('顶部 Banner', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_BannerLeft_bannersBackground', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerLeft_bannersBackground', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerLeft_techStack', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerLeft_techStack', array(
        'label' => __('个人技术栈', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerLeft_bannersTitleBig', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerLeft_bannersTitleBig', array(
        'label' => __('大标题', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerLeft_bannersTitleSmall', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerLeft_bannersTitleSmall', array(
        'label' => __('小标题', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerLeft_categoryGroup', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerLeft_categoryGroup', array(
        'label' => __('BannerLeft_categoryGroup', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerRight_todayRecommend', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerRight_todayRecommend', array(
        'label' => __('今日推荐', 'hao'),
        'section' => 'hao_top',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_BannerRight_todayRecommendContent', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerRight_todayRecommendContent', array(
        'label' => __('今日推荐', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerRight_recommendPost', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerRight_recommendPost', array(
        'label' => __('推荐文章', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_BannerRight_recommendPostCustom', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_BannerRight_recommendPostCustom', array(
        'label' => __('自定义文章', 'hao'),
        'section' => 'hao_top',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_layout', array(
        'title' => __('布局', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_navs_nav', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_nav', array(
        'label' => __('导航条显示内容', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_navs_navCategory', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_navCategory', array(
        'label' => __('自定义分类', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_navs_navTag', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_navTag', array(
        'label' => __('自定义标签', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_navs_navCustomUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_navCustomUrl', array(
        'label' => __('自定义路径', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_navs_navMore', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_navMore', array(
        'label' => __('更多按钮跳转地址', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_navs_navMoreCustomUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_navs_navMoreCustomUrl', array(
        'label' => __('文章导航更多跳转路径', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_post_cols', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_post_cols', array(
        'label' => __('文章布局', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_post_postLocation', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_post_postLocation', array(
        'label' => __('封面位置', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_postRandomImg', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_postRandomImg', array(
        'label' => __('随机封面', 'hao'),
        'section' => 'hao_layout',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_articleCardPolish', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_articleCardPolish', array(
        'label' => __('首页文章卡片(擦亮效果)', 'hao'),
        'section' => 'hao_layout',
        'type' => 'checkbox',
    ));

    $wp_customize->add_section('hao_sidebar', array(
        'title' => __('侧栏', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_location', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_location', array(
        'label' => __('侧边栏位置', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_widgetss_indexWidget', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_widgetss_indexWidget', array(
        'label' => __('首页', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_widgetss_postWidget', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_widgetss_postWidget', array(
        'label' => __('文章页', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_widgetss_tagWidget', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_widgetss_tagWidget', array(
        'label' => __('标签页', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_widgetss_categoryWidget', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_widgetss_categoryWidget', array(
        'label' => __('分类页', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_widgetss_pageWidget', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_widgetss_pageWidget', array(
        'label' => __('自定义页', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_profileStyle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_profileStyle', array(
        'label' => __('样式', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_backgroundImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_backgroundImg', array(
        'label' => __('背景图片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_stickerImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_stickerImg', array(
        'label' => __('贴纸', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_desc', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_desc', array(
        'label' => __('卡片名称下面的描述', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_helloText', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_helloText', array(
        'label' => __('作者打招呼', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_profileName', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_profileName', array(
        'label' => __('卡片名称', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_profileDesc', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_profileDesc', array(
        'label' => __('描述信息', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_profile_socialMedia', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_profile_socialMedia', array(
        'label' => __('社交媒体', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_wechat_color', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_wechat_color', array(
        'label' => __('背景颜色', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_wechat_wechatImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_wechat_wechatImg', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_wechat_url', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_wechat_url', array(
        'label' => __('链接', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_wechat_wechatImgFace', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_wechat_wechatImgFace', array(
        'label' => __('公众号正面图', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_wechat_wechatImgBack', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_wechat_wechatImgBack', array(
        'label' => __('公众号背面图', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_power_powerLink', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_power_powerLink', array(
        'label' => __('赞助地址', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_power_showNum', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_power_showNum', array(
        'label' => __('最大展示条数', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_power_username', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_power_username', array(
        'label' => __('赞助用户名', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_musicUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_musicUrl', array(
        'label' => __('跳转地址', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_lightMsimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_lightMsimg', array(
        'label' => __('浅色卡片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_lightBackMsimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_lightBackMsimg', array(
        'label' => __('浅色翻页卡片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_darkMsimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_darkMsimg', array(
        'label' => __('深色卡片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_darkBackMsimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_darkBackMsimg', array(
        'label' => __('深色翻页卡片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_steam_steamUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_steam_steamUrl', array(
        'label' => __('跳转地址', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_steam_cardSteam', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_steam_cardSteam', array(
        'label' => __('卡片', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_recentPost', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_recentPost', array(
        'label' => __('最新文章/热门文章', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_newcomment_newcommentUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_newcomment_newcommentUrl', array(
        'label' => __('跳转地址', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_newcomment_newcommentnumber', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_newcomment_newcommentnumber', array(
        'label' => __('数量', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_newcomment_providerMirror', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_newcomment_providerMirror', array(
        'label' => __('头像服务镜像地址', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_categoryQuantity', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_categoryQuantity', array(
        'label' => __('文章分类', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tagQuantity', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_tagQuantity', array(
        'label' => __('文章标签', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_archivesQuantity', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_archivesQuantity', array(
        'label' => __('文章归档', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tags_switch', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_tags_switch', array(
        'label' => __('标签&归档&统计 (标签按钮开关)', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_archive_switch', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_archive_switch', array(
        'label' => __('标签&归档&统计 (归档按钮开关)', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_adbox_adType', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_adbox_adType', array(
        'label' => __('广告类型', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_adbox_ad_google', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_adbox_ad_google', array(
        'label' => __('Google AdSence', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_adbox_ad_custom', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_adbox_ad_custom', array(
        'label' => __('自定义区域', 'hao'),
        'section' => 'hao_sidebar',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_footer', array(
        'title' => __('页脚', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_footer_bar_footer_bar_enable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footer_bar_footer_bar_enable', array(
        'label' => __('footer_bar_footer_bar_enable', 'hao'),
        'section' => 'hao_footer',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_footer_bar_logo', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footer_bar_logo', array(
        'label' => __('logo', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_footer_bar_description', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footer_bar_description', array(
        'label' => __('描述', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_social_media_centerImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_social_media_centerImg', array(
        'label' => __('中间 logo', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_social_media_socialMediaLeft', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_social_media_socialMediaLeft', array(
        'label' => __('左侧', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_social_media_socialMediaRight', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_social_media_socialMediaRight', array(
        'label' => __('右侧', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_menu', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_menu', array(
        'label' => __('相关链接', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_footer_group_enable_footer_group', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footer_group_enable_footer_group', array(
        'label' => __('footer_group_enable_footer_group', 'hao'),
        'section' => 'hao_footer',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_footer_group_num', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footer_group_num', array(
        'label' => __('友链数', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_footerContent_default_enable_group', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footerContent_default_enable_group', array(
        'label' => __('底部页脚', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_footerContent_style_one', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_footerContent_style_one', array(
        'label' => __('中间', 'hao'),
        'section' => 'hao_footer',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_post', array(
        'title' => __('文章', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_dynamicBackground', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_dynamicBackground', array(
        'label' => __('动态主色', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_opacity', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_opacity', array(
        'label' => __('目录模糊效果', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_aiDescription_aiDescriptionEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_aiDescriptionEnable', array(
        'label' => __('aiDescription_aiDescriptionEnable', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_aiDescription_gptName', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_gptName', array(
        'label' => __('名称', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_mode', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_mode', array(
        'label' => __('模式', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_switchBtn', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_switchBtn', array(
        'label' => __('显示切换按钮', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_aiDescription_btnLink', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_btnLink', array(
        'label' => __('链接地址', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_randomNum', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_randomNum', array(
        'label' => __('随机次数', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_basicWordCount', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_basicWordCount', array(
        'label' => __('字符数', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_key', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_key', array(
        'label' => __('key', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_aiDescription_Referer', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_aiDescription_Referer', array(
        'label' => __('你的博客地址', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_passage_tips_enable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_passage_tips_enable', array(
        'label' => __('passage_tips_enable', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_passage_tips_day', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_passage_tips_day', array(
        'label' => __('更新时间大于天数显示', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_passage_tips_content', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_passage_tips_content', array(
        'label' => __('温馨提示文案', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_update_time', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_update_time', array(
        'label' => __('最后更新时间', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_copyrightsStyle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_copyrightsStyle', array(
        'label' => __('版权样式', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_desc', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_desc', array(
        'label' => __('版权样式一(描述)', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_post_edit_enable_post_edit', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_post_edit_enable_post_edit', array(
        'label' => __('post_edit_enable_post_edit', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_post_edit_post_edit_url', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_post_edit_post_edit_url', array(
        'label' => __('运营模式与责任地址', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_share_right_mobile_edit', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_share_right_mobile_edit', array(
        'label' => __('share_right_mobile_edit', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_share_right_weibo_edit', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_share_right_weibo_edit', array(
        'label' => __('share_right_weibo_edit', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_share_right_copyurl_edit', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_share_right_copyurl_edit', array(
        'label' => __('share_right_copyurl_edit', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_copyrights_enable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_copyrights_enable', array(
        'label' => __('copyrights_enable', 'hao'),
        'section' => 'hao_post',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_copyrights_originalUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_copyrights_originalUrl', array(
        'label' => __('原创链接', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_copyrights_reprintUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_copyrights_reprintUrl', array(
        'label' => __('转载链接', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_copyrights_content', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_copyrights_content', array(
        'label' => __('原创声明内容', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_copyrights_reprintContent', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_copyrights_reprintContent', array(
        'label' => __('转载声明内容', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_recommendQuantity', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_recommendQuantity', array(
        'label' => __('阅读建议', 'hao'),
        'section' => 'hao_post',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_categories', array(
        'title' => __('分类', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_use', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_use', array(
        'label' => __('页面样式', 'hao'),
        'section' => 'hao_categories',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_moment', array(
        'title' => __('瞬间', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_backgroundImg', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_backgroundImg', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_moment',
    )));

    $wp_customize->add_setting('hao_smallTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_smallTitle', array(
        'label' => __('小标题', 'hao'),
        'section' => 'hao_moment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_bigTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_bigTitle', array(
        'label' => __('大标题', 'hao'),
        'section' => 'hao_moment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_detail', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_detail', array(
        'label' => __('描述', 'hao'),
        'section' => 'hao_moment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_buttonTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_buttonTitle', array(
        'label' => __('按钮标题', 'hao'),
        'section' => 'hao_moment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_buttonUrl', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_buttonUrl', array(
        'label' => __('按钮跳转连链接', 'hao'),
        'section' => 'hao_moment',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_link', array(
        'title' => __('友链', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_smallTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_smallTitle', array(
        'label' => __('小标题', 'hao'),
        'section' => 'hao_link',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_bigTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_bigTitle', array(
        'label' => __('大标题', 'hao'),
        'section' => 'hao_link',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_fcircleUrl', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_fcircleUrl', array(
        'label' => __('鱼塘链接', 'hao'),
        'section' => 'hao_link',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_linksUrl', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_linksUrl', array(
        'label' => __('友链链接', 'hao'),
        'section' => 'hao_link',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_linksCanvas', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_linksCanvas', array(
        'label' => __('互动友链', 'hao'),
        'section' => 'hao_link',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_comment', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_comment', array(
        'label' => __('启用评论', 'hao'),
        'section' => 'hao_link',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_linksArticle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_linksArticle', array(
        'label' => __('底部显示内容', 'hao'),
        'section' => 'hao_link',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_fmomentsPageSize', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_fmomentsPageSize', array(
        'label' => __('友链每页数量', 'hao'),
        'section' => 'hao_link',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_photos', array(
        'title' => __('图库', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_photosStyle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_photosStyle', array(
        'label' => __('样式', 'hao'),
        'section' => 'hao_photos',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_topLink', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_topLink', array(
        'label' => __('返回地址 (填写图库分组地址)', 'hao'),
        'section' => 'hao_photos',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_detail', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_detail', array(
        'label' => __('描述', 'hao'),
        'section' => 'hao_photos',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tagEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_tagEnable', array(
        'label' => __('图片标签', 'hao'),
        'section' => 'hao_photos',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_backgroundImg', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_backgroundImg', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_photos',
    )));

    $wp_customize->add_section('hao_todo', array(
        'title' => __('待办清单', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_list', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_list', array(
        'label' => __('待办清单列表', 'hao'),
        'section' => 'hao_todo',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_equipment', array(
        'title' => __('我的装备', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_backgroundImg', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_backgroundImg', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_equipment',
    )));

    $wp_customize->add_setting('hao_smallTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_smallTitle', array(
        'label' => __('小标题', 'hao'),
        'section' => 'hao_equipment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_bigTitle', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_bigTitle', array(
        'label' => __('大标题', 'hao'),
        'section' => 'hao_equipment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_detail', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_detail', array(
        'label' => __('描述', 'hao'),
        'section' => 'hao_equipment',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_envelope_comment', array(
        'title' => __('留言板', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_enable_envelope_comment', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_envelope_comment', array(
        'label' => __('信笺', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_title', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_title', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_custom_pic_cover', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_custom_pic_cover', array(
        'label' => __('头部图片', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_custom_pic_line', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_custom_pic_line', array(
        'label' => __('底部图片', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_custom_pic_beforeimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_custom_pic_beforeimg', array(
        'label' => __('前半部分图片', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_custom_pic_afterimg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_custom_pic_afterimg', array(
        'label' => __('后半部分图片', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_message_list', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_message_list', array(
        'label' => __('正文', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_bottom', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_bottom', array(
        'label' => __('底部文本', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_height', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_height', array(
        'label' => __('高度', 'hao'),
        'section' => 'hao_envelope_comment',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_about', array(
        'title' => __('关于', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_aboutAuthorImage', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_aboutAuthorImage', array(
        'label' => __('图片', 'hao'),
        'section' => 'hao_about',
    )));

    $wp_customize->add_setting('hao_widget_list', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_widget_list', array(
        'label' => __('小部件', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_author_info_left_tags', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_author_info_left_tags', array(
        'label' => __('个人标签-左', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_author_info_right_tags', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_author_info_right_tags', array(
        'label' => __('个人标签-右', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_content', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_content', array(
        'label' => __('我的介绍', 'hao'),
        'section' => 'hao_about',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_idea', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_idea', array(
        'label' => __('我的想法', 'hao'),
        'section' => 'hao_about',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_helloAbout', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_helloAbout', array(
        'label' => __('我的问候', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_authorCareers_authorCareersTitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_authorCareers_authorCareersTitle', array(
        'label' => __('生涯标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_authorCareers_authorCareersTags', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_authorCareers_authorCareersTags', array(
        'label' => __('标签', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_authorCareers_authorCareersBackground', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_authorCareers_authorCareersBackground', array(
        'label' => __('背景图', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_personalities', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_personalities', array(
        'label' => __('人格', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_authorCareersPhoto', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_authorCareersPhoto', array(
        'label' => __('图片', 'hao'),
        'section' => 'hao_about',
    )));

    $wp_customize->add_setting('hao_textarea', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_textarea', array(
        'label' => __('文本块', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game_game_tips', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game_game_tips', array(
        'label' => __('提示文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game_game_title', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game_game_title', array(
        'label' => __('游戏标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game_game_uid', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game_game_uid', array(
        'label' => __('游戏 ID', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game_game_bg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game_game_bg', array(
        'label' => __('爱好游戏背景', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game_loading_bar', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game_loading_bar', array(
        'label' => __('爱好游戏logo', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_game2_type', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_game2_type', array(
        'label' => __('game2_game2_type', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_game2_tips', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_game2_tips', array(
        'label' => __('提示文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_game2_title', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_game2_title', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_comic_list', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_comic_list', array(
        'label' => __('追番列表', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_game2_uid', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_game2_uid', array(
        'label' => __('游戏 ID', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_game2_game2_bg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_game2_game2_bg', array(
        'label' => __('游戏背景', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_like_like_tips', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_like_like_tips', array(
        'label' => __('提示文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_like_like_title', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_like_like_title', array(
        'label' => __('偏好标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_like_like_bottom', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_like_like_bottom', array(
        'label' => __('底部文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_like_like_bg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_like_like_bg', array(
        'label' => __('背景图片', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_music_tips', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_music_tips', array(
        'label' => __('提示文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_music_title', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_music_title', array(
        'label' => __('偏好标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_music_link', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_music_link', array(
        'label' => __('按钮链接', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_music_music_bg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_music_music_bg', array(
        'label' => __('背景图片', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_LingQueMonitorID', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_LingQueMonitorID', array(
        'label' => __('51la 网站统计', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_map_StrengthenTitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_map_StrengthenTitle', array(
        'label' => __('居住地', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_map_background', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_map_background', array(
        'label' => __('地图亮色模式背景', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_map_backgroundDark', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_map_backgroundDark', array(
        'label' => __('地图暗色模式背景', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_map_authorInfo', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_map_authorInfo', array(
        'label' => __('个人信息', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_xjlc', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_xjlc', array(
        'label' => __('心路历程', 'hao'),
        'section' => 'hao_about',
        'type' => 'textarea',
    ));

    $wp_customize->add_setting('hao_tenyear_tenyear_enable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_tenyear_enable', array(
        'label' => __('tenyear_tenyear_enable', 'hao'),
        'section' => 'hao_about',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_tenyear_tenyear_tips', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_tenyear_tips', array(
        'label' => __('提示文字', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tenyear_tenyear_title', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_tenyear_title', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tenyear_tenyear_content', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_tenyear_content', array(
        'label' => __('描述', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tenyear_start_time', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_start_time', array(
        'label' => __('开始时间', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_tenyear_end_time', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_tenyear_end_time', array(
        'label' => __('结束时间', 'hao'),
        'section' => 'hao_about',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_aboutReward', array(
        'title' => __('关于（打赏）', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_aboutRewardEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_aboutRewardEnable', array(
        'label' => __('aboutRewardEnable', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_title', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_title', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_content', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_content', array(
        'label' => __('内容', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_reward_reward_md_url', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_reward_md_url', array(
        'label' => __('名单地址', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_reward_enable_reward_wz', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_enable_reward_wz', array(
        'label' => __('文章页面打赏', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_reward_enable_reward', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_enable_reward', array(
        'label' => __('关于页面打赏', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_reward_name', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_name', array(
        'label' => __('按钮标题', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_reward_wxPay', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_wxPay', array(
        'label' => __('微信收款码', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_reward_alipay', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_reward_alipay', array(
        'label' => __('支付宝收款码', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_rewardNumber', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_rewardNumber', array(
        'label' => __('标记金额', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_reward_list', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_reward_list', array(
        'label' => __('打赏名单', 'hao'),
        'section' => 'hao_aboutReward',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_comments', array(
        'title' => __('评论', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_commentsEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_commentsEnable', array(
        'label' => __('开关', 'hao'),
        'section' => 'hao_comments',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_use', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_use', array(
        'label' => __('请选择评论系统', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_lazyload', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_lazyload', array(
        'label' => __('评论懒加载', 'hao'),
        'section' => 'hao_comments',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_artalks_server', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_artalks_server', array(
        'label' => __('Artalk评论 - 后端URL', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_artalks_siteName', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_artalks_siteName', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_artalks_artalkJs', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_artalks_artalkJs', array(
        'label' => __('Artalk评论 - js', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_artalks_artalkCss', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_artalks_artalkCss', array(
        'label' => __('Artalk评论 - css', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_twikoos_envId', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_twikoos_envId', array(
        'label' => __('Twikoo评论 - 环境id/后端URL', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_twikoos_accessToken', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_twikoos_accessToken', array(
        'label' => __('Twikoo评论 - 管理员令牌', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_twikoos_js', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_twikoos_js', array(
        'label' => __('Twikoo评论 - js', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_walines_serverURL', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_walines_serverURL', array(
        'label' => __('Waline评论 - 后端URL', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_walines_walinesJs', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_walines_walinesJs', array(
        'label' => __('Waline评论 - js', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_walines_walinesCss', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_walines_walinesCss', array(
        'label' => __('Waline评论 - css', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_walines_locale', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_walines_locale', array(
        'label' => __('选项', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_visitorMail_visitorMailEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_visitorMail_visitorMailEnable', array(
        'label' => __('visitorMail_visitorMailEnable', 'hao'),
        'section' => 'hao_comments',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_visitorMail_mail', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_visitorMail_mail', array(
        'label' => __('匿名邮箱', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_commentBarrageConfig_commentBarrageEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_commentBarrageConfig_commentBarrageEnable', array(
        'label' => __('commentBarrageConfig_commentBarrageEnable', 'hao'),
        'section' => 'hao_comments',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_commentBarrageConfig_maxBarrage', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_commentBarrageConfig_maxBarrage', array(
        'label' => __('同时最多显示弹幕数', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_commentBarrageConfig_barrageTime', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_commentBarrageConfig_barrageTime', array(
        'label' => __('弹幕显示间隔时间ms', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_commentBarrageConfig_mailMd5', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_commentBarrageConfig_mailMd5', array(
        'label' => __('评论 - 博主邮箱MD5值', 'hao'),
        'section' => 'hao_comments',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_style', array(
        'title' => __('样式', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_colorScheme', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_colorScheme', array(
        'label' => __('默认配色', 'hao'),
        'section' => 'hao_style',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_themeLightSkin', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hao_themeLightSkin', array(
        'label' => __('主题浅色基色', 'hao'),
        'section' => 'hao_style',
    )));

    $wp_customize->add_setting('hao_themeDarkSkin', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hao_themeDarkSkin', array(
        'label' => __('主题深色基色', 'hao'),
        'section' => 'hao_style',
    )));

    $wp_customize->add_setting('hao_universe', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_universe', array(
        'label' => __('深色模式粒子效果', 'hao'),
        'section' => 'hao_style',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_translate_defaultEncoding', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_translate_defaultEncoding', array(
        'label' => __('默认语言', 'hao'),
        'section' => 'hao_style',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_translate_translateEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_translate_translateEnable', array(
        'label' => __('允许切换语言', 'hao'),
        'section' => 'hao_style',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_fontFamily', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_fontFamily', array(
        'label' => __('全局字体', 'hao'),
        'section' => 'hao_style',
        'type' => 'textarea',
    ));

    $wp_customize->add_section('hao_code', array(
        'title' => __('代码块', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_enable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable', array(
        'label' => __('启用代码块', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_title', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_title', array(
        'label' => __('启用代码标题', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_hr', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_hr', array(
        'label' => __('启用代码标题分割线', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_line', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_line', array(
        'label' => __('启用代码行号', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_copy', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_copy', array(
        'label' => __('启用代码复制', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_expander', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_expander', array(
        'label' => __('启用代码折叠', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_enable_height_limit', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_enable_height_limit', array(
        'label' => __('启用代码高度限制', 'hao'),
        'section' => 'hao_code',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_height_limit', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_height_limit', array(
        'label' => __('代码高度限制', 'hao'),
        'section' => 'hao_code',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_theme_light', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_theme_light', array(
        'label' => __('代码块主题（浅色）随着系统主题变化', 'hao'),
        'section' => 'hao_code',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_theme_dark', array(
        'default' => '',
        'sanitize_callback' => 'wp_kses_post',
    ));
    $wp_customize->add_control('hao_theme_dark', array(
        'label' => __('代码块主题（深色）随着系统主题变化', 'hao'),
        'section' => 'hao_code',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_tool', array(
        'title' => __('小部件', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_rightMenu_rightMenuEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_rightMenu_rightMenuEnable', array(
        'label' => __('rightMenu_rightMenuEnable', 'hao'),
        'section' => 'hao_tool',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_rightside_rightsideEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_rightside_rightsideEnable', array(
        'label' => __('rightside_rightsideEnable', 'hao'),
        'section' => 'hao_tool',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_rightside_readmode', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_rightside_readmode', array(
        'label' => __('阅读模式', 'hao'),
        'section' => 'hao_tool',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_nav_music_nav_musicEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_nav_music_nav_musicEnable', array(
        'label' => __('左下角音乐', 'hao'),
        'section' => 'hao_tool',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_nav_music_id', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_nav_music_id', array(
        'label' => __('音乐的id', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_nav_music_server', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_nav_music_server', array(
        'label' => __('服务', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_nav_music_all_playlist', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_nav_music_all_playlist', array(
        'label' => __('播放列表地址', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_nav_music_meting_api', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_nav_music_meting_api', array(
        'label' => __('音乐api', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_snackbar_switch', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_snackbar_switch', array(
        'label' => __('snackbar_switch', 'hao'),
        'section' => 'hao_tool',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_snackbar_introductionTitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_snackbar_introductionTitle', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_snackbar_introductionTip', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_snackbar_introductionTip', array(
        'label' => __('内容', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_snackbar_introductionUrl', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_snackbar_introductionUrl', array(
        'label' => __('点击跳转地址', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_snackbar_introductionName', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_snackbar_introductionName', array(
        'label' => __('按钮标题', 'hao'),
        'section' => 'hao_tool',
        'type' => 'text',
    ));

    $wp_customize->add_section('hao_other', array(
        'title' => __('其他设置', 'hao'),
        'priority' => 30,
    ));

    $wp_customize->add_setting('hao_staticResource_use', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_staticResource_use', array(
        'label' => __('类型选择', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_staticResource_cdn_link', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_staticResource_cdn_link', array(
        'label' => __('cdn地址，外链地址', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_opengraph_image', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_opengraph_image', array(
        'label' => __('默认图片', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_vanillaLazyload_enable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_vanillaLazyload_enable', array(
        'label' => __('vanillaLazyload_enable', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_vanillaLazyload_loadingImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_vanillaLazyload_loadingImg', array(
        'label' => __('加载图片', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_vanillaLazyload_errorImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_vanillaLazyload_errorImg', array(
        'label' => __('图片加载失败图', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_diytitle_diytitleEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_diytitle_diytitleEnable', array(
        'label' => __('diytitle_diytitleEnable', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_diytitle_leaveTitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_diytitle_leaveTitle', array(
        'label' => __('离开', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_diytitle_backTitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_diytitle_backTitle', array(
        'label' => __('回到', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_loadingBoxs_loadingBoxEnable', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_loadingBoxs_loadingBoxEnable', array(
        'label' => __('loadingBoxs_loadingBoxEnable', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_loadingBoxs_loadingBoxImg', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_loadingBoxs_loadingBoxImg', array(
        'label' => __('加载图片', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_loadingBoxs_loadProgressBar', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_loadingBoxs_loadProgressBar', array(
        'label' => __('加载进度条', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_error_404_subtitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_error_404_subtitle', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_error_404_background', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_error_404_background', array(
        'label' => __('背景', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_error_500_subtitle', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_error_500_subtitle', array(
        'label' => __('标题', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_error_500_background', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_error_500_background', array(
        'label' => __('背景', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

    $wp_customize->add_setting('hao_bubbleEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_bubbleEnable', array(
        'label' => __('页面卡片顶部气泡升起效果', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_scrollbarLinearGradientEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_scrollbarLinearGradientEnable', array(
        'label' => __('渐变滚动条效果', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_tagRandomColorEnable', array(
        'default' => '',
        'sanitize_callback' => 'wp_validate_boolean',
    ));
    $wp_customize->add_control('hao_tagRandomColorEnable', array(
        'label' => __('标签云随机颜色效果', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_greeting_enable_greeting', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_greeting_enable_greeting', array(
        'label' => __('greeting_enable_greeting', 'hao'),
        'section' => 'hao_other',
        'type' => 'checkbox',
    ));

    $wp_customize->add_setting('hao_greeting_setting', array(
        'default' => '',
        'sanitize_callback' => 'sanitize_text_field',
    ));
    $wp_customize->add_control('hao_greeting_setting', array(
        'label' => __('问候语配置', 'hao'),
        'section' => 'hao_other',
        'type' => 'text',
    ));

}
add_action('customize_register', 'hao_customize_register');

