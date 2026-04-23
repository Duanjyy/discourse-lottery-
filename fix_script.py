import re

def fix_script_tag():
    path = '/workspace/wp-theme-hao/modules/common/footer-style-one.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # The issue is `<script <?php /* if(...) */ ?> async="async">` 
    # Because of the stripping, it might have become invalid HTML
    # We will just replace it with `<script async="async">`
    content = re.sub(r'<script\s+<\?php.*?\?>\s+async="async">', '<script async="async">', content)
    
    # Also clean up the remaining [(${...})] variables
    content = re.sub(r'\[\(\$\{.*?\}\)\]', '', content)
    
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fix_script_tag()
