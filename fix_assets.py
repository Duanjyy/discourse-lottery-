import os
import re

def rewrite_assets():
    # Copy fresh head.html to head.php
    with open('/workspace/halo-theme-hao/templates/modules/head.html', 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace assets logic in head.php
    # ${assets_link + '/path/to/file'} -> <?php echo get_template_directory_uri(); ?>/assets/path/to/file
    
    # 1. Replace ${assets_link + '/...'} inside th:src and th:href
    content = re.sub(r'th:src="\$\{assets_link \+ \'([^\']+)\'(?:[^\}]*)\}"', r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
    content = re.sub(r'th:href="\$\{assets_link \+ \'([^\']+)\'(?:[^\}]*)\}"', r'href="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
    
    # 2. If there are other places where ${assets_link + '...'} is used
    content = re.sub(r'\$\{assets_link \+ \'([^\']+)\'[^\}]*\}', r'<?php echo get_template_directory_uri(); ?>/assets\1', content)
    
    # 3. Handle specific th:src that might not use assets_link, just normal path
    content = re.sub(r'th:src="[^"]*assets/([^"]+)"', r'src="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)
    content = re.sub(r'th:href="[^"]*assets/([^"]+)"', r'href="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)

    # Replace th:block
    content = re.sub(r'<th:block[^>]*>', '', content)
    content = re.sub(r'</th:block>', '', content)
    
    # Fix site title
    content = re.sub(r'th:text="\$\{siteTitle\}"', r'<?php bloginfo("name"); ?>', content)

    with open('/workspace/wp-theme-hao/modules/head.php', 'w', encoding='utf-8') as f:
        f.write(content)

    # Let's do a global replace for all PHP files to ensure CSS/JS/images are correct
    for root, dirs, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    file_content = f.read()
                
                # Replace any remaining assets_link
                file_content = re.sub(r'th:src="\$\{assets_link \+ \'([^\']+)\'[^\}]*\}"', r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', file_content)
                file_content = re.sub(r'th:href="\$\{assets_link \+ \'([^\']+)\'[^\}]*\}"', r'href="<?php echo get_template_directory_uri(); ?>/assets\1"', file_content)
                file_content = re.sub(r'\$\{assets_link \+ \'([^\']+)\'[^\}]*\}', r'<?php echo get_template_directory_uri(); ?>/assets\1', file_content)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(file_content)

rewrite_assets()
