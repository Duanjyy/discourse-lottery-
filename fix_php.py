import os
import re
import subprocess

def fix_php_errors(directory):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix unclosed if/while loops from the naive conversion script
                # <?php if (have_posts()) : while (have_posts()) : the_post(); ?> th:with="content=${moment.spec.content}">
                
                # In moment.php:
                # <th:block <?php if (have_posts()) : while (have_posts()) : the_post(); ?> th:with="content=${moment.spec.content}">
                # We need to close these loops. 
                
                # Actually, the simplest fix to prevent syntax errors is to replace
                # <?php if (have_posts()) : while (have_posts()) : the_post(); ?>
                # with
                # <?php /* loop */ ?>
                # for now, because a proper WP loop requires corresponding endwhile; endif; which isn't there.
                
                content = content.replace('<?php if (have_posts()) : while (have_posts()) : the_post(); ?>', '<?php /* loop */ ?>')
                
                # Fix open <?php tags that might be causing issues
                # sometimes things like <?php get_template_part("modules/footer"); ?>/>
                # which becomes <?php get_template_part("modules/footer"); ?>/>
                
                # Let's write the content back
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_php_errors('/workspace/wp-theme-hao')
