import os
import re

def fix_layout():
    layout_path = '/workspace/wp-theme-hao/modules/layouts/layout.php'
    header_path = '/workspace/wp-theme-hao/header.php'
    footer_path = '/workspace/wp-theme-hao/footer.php'
    
    with open(layout_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Split content by `<th:block th:replace="${content}"></th:block>`
    parts = content.split('<th:block th:replace="${content}"></th:block>')
    if len(parts) == 2:
        top_part = parts[0]
        bottom_part = parts[1]
        
        # Clean up top part
        top_part = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '<!DOCTYPE html>\n<html <?php language_attributes(); ?>>', top_part)
        
        # Replace <head> logic
        # Instead of `<th:block th:replace="~{modules/head :: head(htmlType = ${htmlType})}"/>`, we use wp_head() and get_template_part
        top_part = top_part.replace('<th:block th:replace="~{modules/head :: head(htmlType = ${htmlType})}"/>', '<?php get_template_part("modules/head"); ?>\n<?php wp_head(); ?>')
        
        # Replace <body>
        top_part = top_part.replace('<body>', '<body <?php body_class(); ?>>\n<?php wp_body_open(); ?>')
        
        # Clean up th: blocks
        top_part = re.sub(r'</?th:block[^>]*>', '', top_part)
        bottom_part = re.sub(r'</?th:block[^>]*>', '', bottom_part)
        
        # Add wp_footer() before </body>
        bottom_part = bottom_part.replace('</body>', '<?php wp_footer(); ?>\n</body>')
        
        with open(header_path, 'w', encoding='utf-8') as f:
            f.write(top_part)
            
        with open(footer_path, 'w', encoding='utf-8') as f:
            f.write(bottom_part)

fix_layout()
