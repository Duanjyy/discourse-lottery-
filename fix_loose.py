import os
import re

def fix_loose_tags_and_text():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix orphaned />
                # A lot of times we stripped <th:block ... /> down to just `/>`
                # Let's remove any `/>` that starts a line, or is preceded only by spaces/newlines
                content = re.sub(r'(?m)^\s*/>\s*$', '', content)
                content = re.sub(r'>\s*/>', '>', content) # `<div ...> />` -> `<div>`
                
                # Fix [[汤圆测试]] or [[xxx]]
                # Actually, in thymeleaf, it's [[${...}]]. But maybe it resolved partially to [[SiteName]]?
                # We can't know the exact site name safely without catching others, but let's wipe generic [[...]] if it's text
                content = re.sub(r'\[\[<\?php bloginfo\("name"\); \?>\]\]', '<?php bloginfo("name"); ?>', content)
                content = re.sub(r'\[\[.*?\]\]', '', content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_loose_tags_and_text()
