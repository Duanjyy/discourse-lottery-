import os
import re
import shutil

src_dir = '/workspace/halo-theme-hao/templates'
dest_dir = '/workspace/wp-theme-hao'

shutil.copytree(os.path.join(src_dir, 'assets'), os.path.join(dest_dir, 'assets'))
shutil.copy('/workspace/halo-theme-hao/theme.yaml', dest_dir)
shutil.copy('/workspace/halo-theme-hao/settings.yaml', dest_dir)
shutil.copy('/workspace/style.css.bak', os.path.join(dest_dir, 'style.css'))
shutil.copy('/workspace/functions.php.bak', os.path.join(dest_dir, 'functions.php'))

def translate_thymeleaf(content):
    # 1. Assets Links
    content = re.sub(r'\$\{assets_link\s*\+\s*\'([^\']+)\'(?:[^\}]*)\}', r'<?php echo get_template_directory_uri(); ?>/assets\1', content)
    content = re.sub(r'\$\{assets_link\}', r'<?php echo get_template_directory_uri(); ?>/assets', content)
    
    # 2. Fix the specific `img` variable assignment
    # e.g., th:with=" img = <?php echo get_template_directory_uri(); ?>/assets/images/icons/AfterEffect.png"
    # followed by th:src="${img}"
    # Let's just blindly replace th:src="${img}" with the image if they are close, or just convert th:with to PHP
    content = re.sub(r'th:with="\s*img\s*=\s*(<\?php echo get_template_directory_uri\(\); \?>/assets/[^"]+)"', r'<?php $img = "\1"; ?>', content)
    content = re.sub(r'th:src="\$\{img\}"', r'src="<?php echo $img; ?>"', content)
    
    # 3. Other generic src/href mapping
    content = re.sub(r'th:src="@\{([^}]+)\}"', r'src="<?php echo home_url("\1"); ?>"', content)
    content = re.sub(r'th:href="@\{([^}]+)\}"', r'href="<?php echo home_url("\1"); ?>"', content)
    content = re.sub(r'th:src="([^"]+)"', r'src="\1"', content)
    content = re.sub(r'th:href="([^"]+)"', r'href="\1"', content)
    
    # 4. th:classappend
    # e.g., th:classappend="${theme.config.layout.post.cols}"
    # We will just turn them into generic classes for now so layout doesn't break
    content = re.sub(r'th:classappend="([^"]+)"', r'class="\1"', content)
    # The \1 might be a Thymeleaf expression, let's just strip the expression and keep safe strings if possible.
    # Actually, if we just let the PHP echo it, it might fail. Let's just remove th:classappend but hardcode common classes!
    # For content-inner:
    content = content.replace('th:classappend="${theme.config.sidebar.location}"', 'class="right"')
    content = content.replace('th:classappend="${not #lists.isEmpty(theme.config.sidebar.widgetss.pageWidget) ? \'\' : \'hide-aside\'}"', '')
    
    # 5. th:style
    content = re.sub(r'th:style="([^"]+)"', r'style="\1"', content)
    
    # 6. Site Title and other basic text
    content = re.sub(r'th:text="\$\{site\.title\}"', r'<?php bloginfo("name"); ?>', content)
    content = re.sub(r'th:text="\$\{siteTitle\}"', r'<?php bloginfo("name"); ?>', content)
    content = re.sub(r'th:text="\$\{post\.spec\.title\}"', r'<?php the_title(); ?>', content)
    
    # 7. Post loop logic
    content = re.sub(r'th:each="([^"]+)"', r'<?php /* loop over \1 */ ?>', content)
    
    # 8. th:if and th:unless
    content = re.sub(r'th:if="([^"]+)"', r'<?php /* if(\1) */ ?>', content)
    content = re.sub(r'th:unless="([^"]+)"', r'<?php /* unless(\1) */ ?>', content)
    
    # 9. Replace template parts
    content = re.sub(r'<[a-zA-Z0-9:]+\s+th:replace="~\s*\{\s*([^:\}]+)\s*(?:::.*?)?\}\s*"\s*/>', r'<?php get_template_part("\1"); ?>', content)
    content = re.sub(r'<[a-zA-Z0-9:]+\s+th:replace="~\s*\{\s*([^:\}]+)\s*(?:::.*?)?\}\s*"\s*></[a-zA-Z0-9:]+>', r'<?php get_template_part("\1"); ?>', content)
    
    # 10. Remove raw [[${...}]] tags to prevent weird text
    content = re.sub(r'\[\[\$\{.*?\}\]\]', '', content, flags=re.DOTALL)
    
    # 11. Clean up remaining th: attributes
    content = re.sub(r'\s+th:[a-zA-Z\-]+="[^"]*"', '', content)
    
    # 12. Remove xmlns:th
    content = content.replace('xmlns:th="http://www.thymeleaf.org"', '')
    
    # 13. Remove <th:block> tags but keep content
    content = re.sub(r'</?th:block[^>]*>', '', content)
    
    return content

file_mapping = {
    'index.html': 'index.php',
    'post.html': 'single.php',
    'page.html': 'page.php',
    'archives.html': 'archive.php',
    'categories.html': 'category.php',
    'tag.html': 'tag.php',
    'tags.html': 'tags.php',
    'about.html': 'template-about.php',
    'links.html': 'template-links.php',
}

for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.html'):
            src_path = os.path.join(root, file)
            rel_path = os.path.relpath(src_path, src_dir)
            
            if rel_path == 'modules/layouts/layout.html':
                continue
                
            if rel_path in file_mapping:
                dest_path = os.path.join(dest_dir, file_mapping[rel_path])
            else:
                dest_path = os.path.join(dest_dir, rel_path.replace('.html', '.php'))
                
            with open(src_path, 'r', encoding='utf-8') as f:
                content = f.read()
                
            content = translate_thymeleaf(content)
            
            # Wrap main templates
            filename = os.path.basename(dest_path)
            main_pages = list(file_mapping.values()) + ['moments.php', 'music.php', 'todolist.php', 'photos.php', 'album.php', 'bangumis.php', 'author.php', 'equipments.php', 'new_comment.php', 'comments.php']
            
            if filename in main_pages:
                match = re.search(r'<th:block th:fragment="content">(.*?)</th:block>', content, re.DOTALL | re.IGNORECASE)
                if match:
                    actual_content = match.group(1)
                    actual_content = re.sub(r'</html>\s*$', '', actual_content, flags=re.IGNORECASE)
                    content = f"<?php get_header(); ?>\n{actual_content}\n<?php get_footer(); ?>\n"
                else:
                    content = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '', content, flags=re.IGNORECASE)
                    content = re.sub(r'</html>\s*$', '', content, flags=re.IGNORECASE)
                    content = f"<?php get_header(); ?>\n{content}\n<?php get_footer(); ?>\n"

            os.makedirs(os.path.dirname(dest_path), exist_ok=True)
            with open(dest_path, 'w', encoding='utf-8') as f:
                f.write(content)

# Handle header and footer
with open(os.path.join(src_dir, 'modules/layouts/layout.html'), 'r', encoding='utf-8') as f:
    layout = f.read()
    
layout = translate_thymeleaf(layout)
parts = layout.split('<?php get_template_part("${content}"); ?>')

if len(parts) == 2:
    top_part = parts[0]
    bottom_part = parts[1]
    
    top_part = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '<!DOCTYPE html>\n<html <?php language_attributes(); ?>>', top_part)
    top_part = top_part.replace('<?php get_template_part("modules/head"); ?>', '<?php get_template_part("modules/head"); ?>\n<?php wp_head(); ?>')
    top_part = top_part.replace('<body>', '<body <?php body_class(); ?>>\n<?php wp_body_open(); ?>')
    
    bottom_part = bottom_part.replace('</body>', '<?php wp_footer(); ?>\n</body>')
    
    with open(os.path.join(dest_dir, 'header.php'), 'w', encoding='utf-8') as f:
        f.write(top_part)
    with open(os.path.join(dest_dir, 'footer.php'), 'w', encoding='utf-8') as f:
        f.write(bottom_part)
else:
    print("Failed to split layout.html")
    
print("Translation finished.")
