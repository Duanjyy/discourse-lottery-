import os
import re

def fix_all_self_closing_php():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                content = content.replace('<?php get_template_part("modules/loading-box"); ?>/>', '<?php get_template_part("modules/loading-box"); ?>')
                content = re.sub(r'<\?php get_template_part\("([^"]+)"\);\s*\?>/>', r'<?php get_template_part("\1"); ?>', content)
                content = re.sub(r'<th:block <\?php get_template_part\("([^"]+)"\);\s*\?>/>', r'<?php get_template_part("\1"); ?>', content)
                content = re.sub(r'<div <\?php get_template_part\("([^"]+)"\);\s*\?>/>', r'<?php get_template_part("\1"); ?>', content)
                content = re.sub(r'<nav <\?php get_template_part\("([^"]+)"\);\s*\?>></nav>', r'<?php get_template_part("\1"); ?>', content)
                content = re.sub(r'<footer <\?php get_template_part\("([^"]+)"\);\s*\?>/>', r'<?php get_template_part("\1"); ?>', content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_all_self_closing_php()
