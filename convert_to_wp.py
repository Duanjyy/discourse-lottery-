import os
import re
import shutil

src_dir = '/workspace/halo-theme-hao/templates'
dest_dir = '/workspace/wp-theme-hao'

# Ensure dest directory exists
os.makedirs(dest_dir, exist_ok=True)

def replace_thymeleaf(content):
    # Basic replacements
    content = re.sub(r'th:href="@{/}"', 'href="<?php echo home_url(); ?>"', content)
    content = re.sub(r'th:src="[^"]*assets/([^"]+)"', r'src="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)
    content = re.sub(r'th:href="[^"]*assets/([^"]+)"', r'href="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)
    
    # Replace layout includes
    content = re.sub(r'th:replace="~\{([^}]+)\}"', r'<?php get_template_part("\1"); ?>', content)
    
    # Site Title
    content = re.sub(r'\$\{site\.title\}', r'<?php bloginfo("name"); ?>', content)
    content = re.sub(r'th:text="\$\{site\.title\}"', r'<?php bloginfo("name"); ?>', content)
    
    # Post loop logic (simplified)
    content = re.sub(r'th:each="([^"]+)"', r'<?php if (have_posts()) : while (have_posts()) : the_post(); ?>', content)
    
    # Post title
    content = re.sub(r'\$\{post\.spec\.title\}', r'<?php the_title(); ?>', content)
    content = re.sub(r'th:text="\$\{post\.spec\.title\}"', r'<?php the_title(); ?>', content)
    
    # Post permalink
    content = re.sub(r'\$\{post\.status\.permalink\}', r'<?php the_permalink(); ?>', content)
    content = re.sub(r'th:href="@\{\$\{post\.status\.permalink\}\}"', r'href="<?php the_permalink(); ?>"', content)
    
    # Remove xmlns:th
    content = content.replace('xmlns:th="http://www.thymeleaf.org"', '')
    
    # Basic conditional blocks
    content = re.sub(r'th:if="([^"]+)"', r'<?php /* if(\1) */ ?>', content)
    
    return content

def process_file(src_path, dest_path):
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = replace_thymeleaf(content)
    
    # Ensure dest dir exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Map halo files to wp files
file_mapping = {
    'index.html': 'index.php',
    'post.html': 'single.php',
    'page.html': 'page.php',
    'archives.html': 'archive.php',
    'categories.html': 'category.php',
    'tag.html': 'tag.php',
    'tags.html': 'tags.php',
    'about.html': 'template-about.php',
    'links.html': 'template-links.php',
}

# Walk through src directory
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.html'):
            src_path = os.path.join(root, file)
            rel_path = os.path.relpath(src_path, src_dir)
            
            # Check mapping for top-level files
            if rel_path in file_mapping:
                dest_path = os.path.join(dest_dir, file_mapping[rel_path])
            else:
                # Convert .html to .php
                dest_path = os.path.join(dest_dir, rel_path.replace('.html', '.php'))
                
            process_file(src_path, dest_path)

# Extract header and footer from modules/layouts/layout.html or generate them
header_content = """<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo( 'charset' ); ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<!-- Header -->
<?php get_template_part('modules/head'); ?>
<?php get_template_part('modules/nav'); ?>
"""

footer_content = """
<!-- Footer -->
<?php get_template_part('modules/footer'); ?>
<?php wp_footer(); ?>
</body>
</html>
"""

with open(os.path.join(dest_dir, 'header.php'), 'w', encoding='utf-8') as f:
    f.write(header_content)
    
with open(os.path.join(dest_dir, 'footer.php'), 'w', encoding='utf-8') as f:
    f.write(footer_content)

print("Conversion script finished.")
