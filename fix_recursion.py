import os
import re

def fix_recursion():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Check for infinite recursion of the same file via get_template_part
                # specifically if a file includes itself directly
                
                # In nav-menu.php, it's replacing th:replace="~{modules/widgets/nav-menu :: nav-menu-recursion(menuItem=${childMenu})}"
                # with <?php get_template_part("modules/widgets/nav-menu"); ?>
                # This causes an infinite loop in PHP when it includes itself without conditions.
                
                # For nav-menu.php
                if file == 'nav-menu.php' and 'modules/widgets/nav-menu' in file_path:
                    # Let's just comment out the recursive call for now, 
                    # as true recursion in WP menu requires a Walker class anyway
                    content = content.replace('<?php get_template_part("modules/widgets/nav-menu"); ?>', '<?php /* recursive menu call removed */ ?>')
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_recursion()
