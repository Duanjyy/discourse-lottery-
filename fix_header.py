import re
import os

def fix_header_and_head():
    head_path = '/workspace/wp-theme-hao/modules/head.php'
    header_path = '/workspace/wp-theme-hao/header.php'
    
    # Read modules/head.php
    with open(head_path, 'r', encoding='utf-8') as f:
        head_content = f.read()
        
    # Replace assets_link
    head_content = re.sub(r"\$\{assets_link\s*\+\s*'([^']+)'(?:[^}]*)\}", r"<?php echo get_template_directory_uri(); ?>/assets\1", head_content)
    head_content = re.sub(r"th:src=\"[^\"]*\"", r'src="<?php echo get_template_directory_uri(); ?>/assets/js/custom.js"', head_content) # Be careful with generic replaces
    
    # Specifically for scripts and links in head.php
    # e.g., th:src="${assets_link + '/libs/jquery/jquery.min.js'}"
    head_content = re.sub(r'th:src="\$\{assets_link\s*\+\s*\'([^\']+)\'[^\"]*\}', r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', head_content)
    head_content = re.sub(r'th:href="\$\{assets_link\s*\+\s*\'([^\']+)\'[^\"]*\}', r'href="<?php echo get_template_directory_uri(); ?>/assets\1"', head_content)
    
    # Other th:href and th:src replacements
    head_content = re.sub(r'th:href="[^"]*assets/([^"]+)"', r'href="<?php echo get_template_directory_uri(); ?>/assets/\1"', head_content)
    head_content = re.sub(r'th:src="[^"]*assets/([^"]+)"', r'src="<?php echo get_template_directory_uri(); ?>/assets/\1"', head_content)
    
    # Clean up th:block
    head_content = re.sub(r'<th:block[^>]*>', '', head_content)
    head_content = re.sub(r'</th:block>', '', head_content)
    
    with open(head_path, 'w', encoding='utf-8') as f:
        f.write(head_content)
        
    # Fix header.php
    header_php = """<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php get_template_part('modules/head'); ?>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<?php get_template_part('modules/layouts/layout'); ?>
"""
    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(header_php)

fix_header_and_head()
