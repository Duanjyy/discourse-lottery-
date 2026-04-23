import os
import re

def fix_trailing_spaces():
    for root, dirs, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Fix trailing spaces in get_template_part
                content = re.sub(r'<\?php get_template_part\("([^"]+?)\s+"\);\s*\?>', r'<?php get_template_part("\1"); ?>', content)
                
                # Add wp_head() if missing
                if file == 'header.php':
                    if '<?php wp_head(); ?>' not in content:
                        content = content.replace('<?php get_template_part("modules/head"); ?>', '<?php get_template_part("modules/head"); ?>\n    <?php wp_head(); ?>')
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_trailing_spaces()
