import os
import re

def fix_unclosed_divs():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # If a line ends with `<div class="something"`, it needs a `>`
                # Sometimes it might be `<div class="something" ` with spaces.
                # Let's match `<[a-zA-Z0-9-]+\s+class="[^"]+"\s*$` and append `>`
                content = re.sub(r'(<[a-zA-Z0-9-]+\s+(?:class|id|style)="[^"]+"\s*)$', r'\1>', content, flags=re.MULTILINE)
                
                # Also match lines that end with `<div ` or `<a ` but missing > because `<?php` got wiped
                # E.g. `<div ` -> `<div >`
                # Actually, simpler: if a line ends with a tag name or attribute but no `>`, and the next line is NOT attributes
                # Let's just fix the specific pattern we saw: `<div class="[^"]+"$`
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_unclosed_divs()
