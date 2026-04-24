import os
import re

def fix_broken_tag_includes():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace `<tag <?php get_template_part(...) ?>` with `<?php get_template_part(...) ?>`
                # Sometimes it's `<div <?php get_template_part(...) ?>`
                # Let's find `<[a-zA-Z0-9-]+\s*(<\?php\s*get_template_part[^>]+?\?>)`
                # And replace it with `\1`
                content = re.sub(r'<[a-zA-Z0-9-]+\s+(<\?php\s+get_template_part[^>]+?\?>)', r'\1', content)
                
                # Let's also fix `<th:blockname"); ?>, _permalink = '', _cover = , _excerpt = , _type = 'website')}`> ` leftovers
                # Clean up lines 3-8 of index.php which look like `, \n >`
                content = re.sub(r'^\s*,\s*\n\s*>\s*$', '', content, flags=re.MULTILINE)
                content = re.sub(r'^\s*,\s*$', '', content, flags=re.MULTILINE)
                content = re.sub(r'^\s*>\s*$', '', content, flags=re.MULTILINE)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_broken_tag_includes()
