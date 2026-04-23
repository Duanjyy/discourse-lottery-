import os
import re
import shutil

src_dir = '/workspace/halo-theme-hao/templates'
dest_dir = '/workspace/wp-theme-hao'

# Wipe clean
shutil.rmtree(dest_dir, ignore_errors=True)
os.makedirs(dest_dir, exist_ok=True)

# Copy assets
shutil.copytree(os.path.join(src_dir, 'assets'), os.path.join(dest_dir, 'assets'))
shutil.copy('/workspace/halo-theme-hao/theme.yaml', dest_dir)
shutil.copy('/workspace/halo-theme-hao/settings.yaml', dest_dir)
shutil.copy('/workspace/style.css.bak', os.path.join(dest_dir, 'style.css'))
shutil.copy('/workspace/functions.php.bak', os.path.join(dest_dir, 'functions.php'))
shutil.copy('/workspace/wp-theme-hao.zip', '/workspace/wp-theme-hao-backup.zip')

def replace_thymeleaf(content):
    # Assets links
    content = re.sub(r'th:src="\$\{assets_link \+ \'([^\']+)\'(?:[^\}]*)\}"', r'src="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
    content = re.sub(r'th:href="\$\{assets_link \+ \'([^\']+)\'(?:[^\}]*)\}"', r'href="<?php echo get_template_directory_uri(); ?>/assets\1"', content)
    content = re.sub(r'\$\{assets_link \+ \'([^\']+)\'[^\}]*\}', r'<?php echo get_template_directory_uri(); ?>/assets\1', content)
    
    content = re.sub(r'th:src="[^"]*assets/([^"]+)"', r'src="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)
    content = re.sub(r'th:href="[^"]*assets/([^"]+)"', r'href="<?php echo get_template_directory_uri(); ?>/assets/\1"', content)
    
    # Template parts
    # <th:block th:replace="~{modules/header/greeting}"/> -> <?php get_template_part("modules/header/greeting"); ?>
    content = re.sub(r'<[a-zA-Z0-9:]+\s+th:replace="~\s*\{\s*([^:\}]+)\s*(?:::.*?)?\}\s*"\s*/>', r'<?php get_template_part("\1"); ?>', content)
    content = re.sub(r'<[a-zA-Z0-9:]+\s+th:replace="~\s*\{\s*([^:\}]+)\s*(?:::.*?)?\}\s*"\s*></[a-zA-Z0-9:]+>', r'<?php get_template_part("\1"); ?>', content)
    
    # Site Title
    content = re.sub(r'\$\{site\.title\}', r'<?php bloginfo("name"); ?>', content)
    content = re.sub(r'th:text="\$\{site\.title\}"', r'<?php bloginfo("name"); ?>', content)
    content = re.sub(r'th:text="\$\{siteTitle\}"', r'<?php bloginfo("name"); ?>', content)
    
    # Post loop logic (simplified to comments for now to avoid breaking syntax)
    content = re.sub(r'th:each="([^"]+)"', r'<?php /* loop over \1 */ ?>', content)
    
    # Post title
    content = re.sub(r'\$\{post\.spec\.title\}', r'<?php the_title(); ?>', content)
    content = re.sub(r'th:text="\$\{post\.spec\.title\}"', r'<?php the_title(); ?>', content)
    
    # Post permalink
    content = re.sub(r'\$\{post\.status\.permalink\}', r'<?php the_permalink(); ?>', content)
    content = re.sub(r'th:href="@\{\$\{post\.status\.permalink\}\}"', r'href="<?php the_permalink(); ?>"', content)
    
    # Remove xmlns:th
    content = content.replace('xmlns:th="http://www.thymeleaf.org"', '')
    
    return content

# Map halo files to wp files
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

def process_file(src_path, dest_path):
    with open(src_path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    content = replace_thymeleaf(content)
    
    # Check if it's a main page template that needs header/footer wrappers
    filename = os.path.basename(dest_path)
    main_pages = list(file_mapping.values()) + ['moments.php', 'music.php', 'todolist.php', 'photos.php', 'album.php', 'bangumis.php', 'author.php', 'equipments.php', 'new_comment.php', 'comments.php']
    
    if filename in main_pages:
        # Extract content block
        match = re.search(r'<th:block th:fragment="content">(.*?)</th:block>', content, re.DOTALL | re.IGNORECASE)
        if match:
            actual_content = match.group(1)
            actual_content = re.sub(r'</html>\s*$', '', actual_content, flags=re.IGNORECASE)
            content = f"<?php get_header(); ?>\n{actual_content}\n<?php get_footer(); ?>\n"
        else:
            # Just strip doctype and html and append
            content = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '', content, flags=re.IGNORECASE)
            content = re.sub(r'</html>\s*$', '', content, flags=re.IGNORECASE)
            content = f"<?php get_header(); ?>\n{content}\n<?php get_footer(); ?>\n"

    # For head.php specifically
    if dest_path.endswith('modules/head.php'):
        content = re.sub(r'<th:block[^>]*>', '', content)
        content = re.sub(r'</th:block>', '', content)
        
    # Ensure dest dir exists
    os.makedirs(os.path.dirname(dest_path), exist_ok=True)
    
    with open(dest_path, 'w', encoding='utf-8') as f:
        f.write(content)

# Walk through src directory
for root, dirs, files in os.walk(src_dir):
    for file in files:
        if file.endswith('.html'):
            src_path = os.path.join(root, file)
            rel_path = os.path.relpath(src_path, src_dir)
            
            # Skip layout.html as we manually handle header/footer
            if rel_path == 'modules/layouts/layout.html':
                continue
                
            if rel_path in file_mapping:
                dest_path = os.path.join(dest_dir, file_mapping[rel_path])
            else:
                dest_path = os.path.join(dest_dir, rel_path.replace('.html', '.php'))
                
            process_file(src_path, dest_path)

# Generate proper header.php and footer.php based on layout.html
with open(os.path.join(src_dir, 'modules/layouts/layout.html'), 'r', encoding='utf-8') as f:
    layout_content = f.read()

layout_content = replace_thymeleaf(layout_content)
parts = layout_content.split('<th:block th:replace="${content}"></th:block>')

top_part = parts[0]
bottom_part = parts[1] if len(parts) > 1 else ""

# Fix top part (header)
top_part = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '<!DOCTYPE html>\n<html <?php language_attributes(); ?>>', top_part)
top_part = top_part.replace('<?php get_template_part("modules/head"); ?>', '<?php get_template_part("modules/head"); ?>\n<?php wp_head(); ?>')
top_part = top_part.replace('<body>', '<body <?php body_class(); ?>>\n<?php wp_body_open(); ?>')
top_part = re.sub(r'</?th:block[^>]*>', '', top_part)

# Fix bottom part (footer)
bottom_part = re.sub(r'</?th:block[^>]*>', '', bottom_part)
bottom_part = bottom_part.replace('</body>', '<?php wp_footer(); ?>\n</body>')

with open(os.path.join(dest_dir, 'header.php'), 'w', encoding='utf-8') as f:
    f.write(top_part)

with open(os.path.join(dest_dir, 'footer.php'), 'w', encoding='utf-8') as f:
    f.write(bottom_part)

print("Reconversion script finished.")
