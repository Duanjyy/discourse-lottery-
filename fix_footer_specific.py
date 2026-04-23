import os
import re

def fix_footer_specific():
    for root, _, files in os.walk('/workspace/wp-theme-hao/modules'):
        for file in files:
            if 'footer' in file and file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace the complex dates and NaN issue
                content = re.sub(r'\[\[\$\{#dates\.format\(new java\.util\.Date\(\),\s*\'yyyy\'\)\}\]\]', r'<?php echo date("Y"); ?>', content)
                content = re.sub(r'\[\[\$\{#strings\.arraySplit\(theme\.config\.basics\.siteStartTime,\s*\'-\'\)\[0\]\}\]\]', r'<?php echo get_theme_mod("hao_siteStartTime", "2023"); ?>', content)
                
                content = content.replace('var birthDay = new Date(\'${theme.config.basics.siteStartTime}\')', 'var birthDay = new Date(\'<?php echo get_theme_mod("hao_siteStartTime", "2023-08-05"); ?>\')')
                
                # Now wipe remaining
                content = re.sub(r'\[\[\$\{.*?\}\]\]', '', content, flags=re.DOTALL)
                content = re.sub(r'\s+th:[a-zA-Z\-]+="[^"]*"', '', content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_footer_specific()
