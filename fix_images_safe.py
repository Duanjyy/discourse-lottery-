import os
import re

def fix_all_images_and_links():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix the complex img variable assignment in banners and authorCareers
                content = re.sub(r'th:with="\s*img\s*=\s*\$\{assets_link\s*\+\s*\'([^\']+)\'\}\"\s*th:src="\$\{img\}"', 
                                 r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
                
                # Sometimes it spans multiple lines, or order is different
                content = re.sub(r'th:with="\s*img\s*=\s*\$\{assets_link\s*\+\s*\'([^\']+)\'\}\"', 
                                 r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
                content = content.replace('th:src="${img}"', '') # Remove the now redundant th:src
                
                # Replace generic th:src that uses assets_link
                content = re.sub(r'th:src="\$\{assets_link\s*\+\s*\'([^\']+)\'(?:[^\}]*)\}"', 
                                 r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
                                 
                # Replace generic th:href that uses assets_link
                content = re.sub(r'th:href="\$\{assets_link\s*\+\s*\'([^\']+)\'(?:[^\}]*)\}"', 
                                 r'href="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
                                 
                # Replace static assets without assets_link var but with th:src
                content = re.sub(r'th:src="([^"]*assets/[^"]+)"', r'src="<?php echo get_template_directory_uri(); ?>/\1"', content)
                content = re.sub(r'th:href="([^"]*assets/[^"]+)"', r'href="<?php echo get_template_directory_uri(); ?>/\1"', content)
                
                # Replace URLs inside th:href="@{...}"
                content = re.sub(r'th:href="@\{([^}]+)\}"', r'href="<?php echo esc_url("\1"); ?>"', content)
                content = re.sub(r'th:src="@\{([^}]+)\}"', r'src="<?php echo esc_url("\1"); ?>"', content)
                
                # th:style
                content = re.sub(r'th:style="([^"]+)"', r'style="\1"', content)
                
                # Remove `th:classappend` gracefully by turning it into a class if possible, or wiping
                # Usually it has conditions, so let's just wipe it to prevent raw syntax from showing up
                content = re.sub(r'\s*th:classappend="[^"]*"', '', content)
                
                # Now safely strip remaining th: tags (except those we just converted to src/href)
                content = re.sub(r'\s+th:[a-zA-Z\-]+="[^"]*"', '', content)
                
                # Clean [[${...}]] to prevent raw string display
                content = re.sub(r'\[\[\$\{.*?\}\]\]', '', content, flags=re.DOTALL)
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_all_images_and_links()
