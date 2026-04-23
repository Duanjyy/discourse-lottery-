import os
import re

def clean_thymeleaf_markup():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # 1. Remove [[${...}]] patterns (Thymeleaf inline evaluation)
                # Since these are complex Halo backend variables, we can't reliably map them to WP. 
                # Instead, we will replace them with empty strings or comments to prevent them from displaying as raw text on the frontend.
                
                # Special cases for footer copyright where NaN is showing
                # [[${#strings.arraySplit(theme.config.basics.siteStartTime, '-')[0]}]]
                # [[${#dates.format(new java.util.Date(), 'yyyy')}]]
                if 'footer' in file:
                    content = re.sub(r'\[\[\$\{#dates\.format\(new java\.util\.Date\(\),\s*\'yyyy\'\)\}\]\]', r'<?php echo date("Y"); ?>', content)
                    content = re.sub(r'\[\[\$\{#strings\.arraySplit\(theme\.config\.basics\.siteStartTime,\s*\'-\'\)\[0\]\}\]\]', r'<?php echo get_theme_mod("hao_siteStartTime", "2023"); ?>', content)
                
                # General regex to wipe [[${...}]] to avoid ugly raw tags
                content = re.sub(r'\[\[\$\{.*?\}\]\]', '', content, flags=re.DOTALL)
                
                # 2. Remove all `th:xxxx="..."` attributes inside HTML tags
                # Such as th:if, th:classappend, th:src, th:text, etc.
                content = re.sub(r'\s+th:[a-zA-Z\-]+="[^"]*"', '', content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

clean_thymeleaf_markup()
