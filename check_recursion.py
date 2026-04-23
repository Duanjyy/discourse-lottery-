import os

def check_all_recursions():
    # List all template parts and check if they include themselves
    issues = []
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                
                # relative path like "modules/aside"
                rel_path = os.path.relpath(file_path, '/workspace/wp-theme-hao')
                base_part = rel_path.replace('.php', '')
                
                # Check if file content has <?php get_template_part("base_part"); ?>
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                if f'<?php get_template_part("{base_part}"); ?>' in content:
                    issues.append(file_path)
                    
                    # Fix it immediately by commenting it out
                    content = content.replace(f'<?php get_template_part("{base_part}"); ?>', f'<?php /* recursive call to {base_part} removed */ ?>')
                    with open(file_path, 'w', encoding='utf-8') as f:
                        f.write(content)
                        
    return issues

issues = check_all_recursions()
if issues:
    print(f"Fixed recursive includes in: {issues}")
else:
    print("No other infinite recursive includes found.")
