import os
import re

def fix_unclosed_tags():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                content = re.sub(r'(<[a-zA-Z0-9-]+\s+(?:class|id|style)="[^"]+"\s*)$', r'\1>', content, flags=re.MULTILINE)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_unclosed_tags()
