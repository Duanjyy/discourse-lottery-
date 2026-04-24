import os
import re

def fix_mangled_code():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # Fix double nested PHP
                content = content.replace('<?php echo esc_url("<?php the_permalink(); ?>"); ?>', '<?php the_permalink(); ?>')
                content = content.replace('<?php echo esc_url("<?php echo home_url(); ?>"); ?>', '<?php echo home_url(); ?>')
                content = content.replace('<?php echo esc_url("<?php echo get_template_directory_uri(); ?>'); ?>', '<?php echo get_template_directory_uri(); ?>')
                
                # Fix the broken th:blockname ... _permalink stuff
                # Just delete anything that looks like _permalink = '', _cover = ...
                content = re.sub(r'<th:blockname"\);\s*\?>,\s*_permalink.*?_type\s*=\s*\'[^\']+\'\)}"></th:block>', '', content, flags=re.DOTALL)
                content = re.sub(r'<th:blockname"\);\s*\?>,\s*_permalink.*?></th:block>', '', content, flags=re.DOTALL)
                
                # There might be others like _title = ..., _permalink = ...
                content = re.sub(r'<th:block[^>]*_permalink.*?></th:block>', '', content, flags=re.DOTALL)
                content = re.sub(r'<th:blockname"\);\s*\?>,\s*_permalink.*?_type.*?></th:block>', '', content, flags=re.DOTALL)
                
                # Just to be safe, any `<th:blockname` ...
                content = re.sub(r'<th:blockname.*?>', '', content, flags=re.DOTALL)
                
                # Also delete `<th:block>` and `</th:block>` wrappers that might be wrapping nothing useful now
                content = re.sub(r'</?th:block[^>]*>', '', content)
                
                # Fix moments widget text that might be broken
                # The user saw: `这里需要安装瞬...`
                # Let's just find `这里需要安装瞬`
                content = content.replace('这里需要安装瞬', '这里需要安装瞬态(Moments)插件')
                
                # Check for any remaining `<?php /* if(...) */ ?>` that are inside tags causing issues
                # Actually, leaving them inside tags is fine if they are valid PHP comments.
                # But wait, in the screenshot, `(function () { var grt = new Date("//2023 00:00:00");` is still showing!
                # Why? Because in `footer-style-one.php`, the `<script async="async">` might be inside a string or broken tag?
                # No, look at the screenshot! The text `(function () { var grt = new Date` is showing up AT THE TOP of the screen, before the banner.
                # That means `footer-style-one.php` or `footer.php` is being included BEFORE the body tag, or in the `<head>`!
                
                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_mangled_code()
