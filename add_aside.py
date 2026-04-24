import re

def add_aside():
    path = '/workspace/wp-theme-hao/index.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace `<div></div>\n        </main>` with `<?php get_template_part("modules/aside"); ?>\n        </main>`
    content = re.sub(r'<div></div>\s*</main>', r'<?php get_template_part("modules/aside"); ?>\n        </main>', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

add_aside()
