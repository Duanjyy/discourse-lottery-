import os
import re

def rewrite_templates(directory):
    main_files = [
        'index.php', 'single.php', 'page.php', 'archive.php',
        'category.php', 'tag.php', 'tags.php', 'template-about.php',
        'template-links.php', 'moments.php', 'music.php', 'todolist.php',
        'photos.php', 'album.php', 'bangumis.php', 'author.php', 'equipments.php',
        'new_comment.php', 'comments.php'
    ]
    
    for filename in main_files:
        filepath = os.path.join(directory, filename)
        if not os.path.exists(filepath):
            continue
            
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Check if already rewritten to avoid double get_header()
        if "<?php get_header(); ?>" in content:
            continue
            
        # We need to strip the wrapping HTML layout logic of Thymeleaf.
        # It usually looks like:
        # <!DOCTYPE html>
        # <html th:replace="...">
        # <th:block th:fragment="head"> ... </th:block>
        # <th:block th:fragment="content">
        #   [ACTUAL CONTENT]
        # </th:block>
        
        # Remove everything before <th:block th:fragment="content">
        match = re.search(r'<th:block th:fragment="content">(.*?)</th:block>', content, re.DOTALL | re.IGNORECASE)
        
        if match:
            actual_content = match.group(1)
            # Remove the last </html> if it exists in actual_content
            actual_content = re.sub(r'</html>\s*$', '', actual_content, flags=re.IGNORECASE)
            
            # Wrap with WordPress tags
            new_content = f"<?php get_header(); ?>\n{actual_content}\n<?php get_footer(); ?>\n"
            
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
        else:
            # If no content block, just prepend header and append footer
            # But remove <!DOCTYPE html> <html ...> and </html>
            content = re.sub(r'<!DOCTYPE html>\s*<html[^>]*>', '', content, flags=re.IGNORECASE)
            content = re.sub(r'</html>\s*$', '', content, flags=re.IGNORECASE)
            new_content = f"<?php get_header(); ?>\n{content}\n<?php get_footer(); ?>\n"
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)

rewrite_templates('/workspace/wp-theme-hao')
