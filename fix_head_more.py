import os
import re

def fix_head_more():
    path = '/workspace/wp-theme-hao/modules/head.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = content.replace('<title <?php bloginfo("name"); ?>></title>', '<title><?php bloginfo("name"); ?></title>')
    
    # Also fix th:href for favicon
    content = re.sub(r'th:href="@\{\$\{#strings.isEmpty\(site.favicon\)[^\}]*\}\}"', r'href="<?php echo get_template_directory_uri(); ?>/assets/images/hao-logo.jpg"', content)
    
    # Strip remaining th: tags safely
    content = re.sub(r'\s+th:[a-zA-Z\-]+="[^"]*"', '', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_head_more()
