import os
import re

def fix_broken_th_blocks():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Replace `<th:block <?php get_template_part(...) ?>` with just `<?php get_template_part(...) ?>`
                content = re.sub(r'<th:block\s*(<\?php\s*get_template_part[^>]+?\?>)', r'\1', content)
                
                # The same for `<div <?php get_template_part(...) ?>` if any got mangled
                # Let's just fix the th:block ones specifically as they are 100% wrong
                content = re.sub(r'</?th:block[^>]*>', '', content)
                
                # Let's fix the specific _permalink issue
                # `_permalink = '', _cover = , _excerpt = , _type = 'website')}`
                content = re.sub(r'<th:blockname.*?\'website\'\)}"></th:block>', '', content, flags=re.DOTALL)
                content = re.sub(r'<th:blockname.*?>', '', content, flags=re.DOTALL)
                
                # `<?php echo esc_url("<?php the_permalink(); ?>"); ?>`
                content = content.replace('<?php echo esc_url("<?php the_permalink(); ?>"); ?>', '<?php the_permalink(); ?>')
                
                # The string `_permalink = '',` etc might be loose text now.
                content = re.sub(r'_permalink\s*=\s*\'\',\s*_cover\s*=.*?_type\s*=\s*\'website\'\)}"', '', content, flags=re.DOTALL)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_broken_th_blocks()
