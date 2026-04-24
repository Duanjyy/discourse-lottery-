import os
import re

def fix_mangled_styles():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix the case where my previous script added `>` before `style=`
                # Match `">\n\s*style="` and replace with `"\n style="`
                # Actually, `class="something">\n style="` -> `class="something"\n style="`
                content = re.sub(r'class="([^"]+)">\s*\n\s*style="', r'class="\1"\n style="', content)
                content = re.sub(r'id="([^"]+)">\s*\n\s*style="', r'id="\1"\n style="', content)
                
                # Fix the trailing `style="...">'` where we need to ensure it's closed
                # Actually if it's `style="...">'` it's already closed. But wait, `style="'...'"` is valid.
                # Just make sure we don't have dangling `style="`
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_mangled_styles()
