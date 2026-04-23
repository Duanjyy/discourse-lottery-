import re

def clean_header_footer():
    header_path = '/workspace/wp-theme-hao/header.php'
    footer_path = '/workspace/wp-theme-hao/footer.php'
    
    with open(header_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    content = content.replace('<?php /* if(${head != null}) */ ?>>', '<?php /* if(${head != null}) */ ?>')
    content = content.replace('<th:block th:replace="${head}"/>', '')
    content = content.replace('<!-- loading 页面 -->\n/>', '<!-- loading 页面 -->\n<?php get_template_part("modules/loading-box"); ?>')
    content = content.replace('<?php get_template_part("modules/loading-box"); ?>/>', '<?php get_template_part("modules/loading-box"); ?>')
    
    # Check for other empty /> due to regex stripping
    content = re.sub(r'^\s*/>\s*$', '', content, flags=re.MULTILINE)
    
    # Fix th:href in header
    content = re.sub(r'th:href="\$\{not #strings.isEmpty[^\}]*\}"', r'href="https://cdn.cbd.int/@waline/client@2.15.7/dist/waline.css"', content)

    with open(header_path, 'w', encoding='utf-8') as f:
        f.write(content)
        
    with open(footer_path, 'r', encoding='utf-8') as f:
        f_content = f.read()
    
    f_content = re.sub(r'^\s*/>\s*$', '', f_content, flags=re.MULTILINE)
    f_content = f_content.replace('<?php get_template_part("modules/widgets/console"); ?>/>', '<?php get_template_part("modules/widgets/console"); ?>')
    f_content = f_content.replace('<?php get_template_part("modules/sidebar"); ?>/>', '<?php get_template_part("modules/sidebar"); ?>')
    f_content = f_content.replace('<?php get_template_part("modules/widgets/nav-music"); ?>/>', '<?php get_template_part("modules/widgets/nav-music"); ?>')
    f_content = f_content.replace('<?php get_template_part("modules/widgets/rightside"); ?>/>', '<?php get_template_part("modules/widgets/rightside"); ?>')
    f_content = f_content.replace('<?php get_template_part("modules/widgets/right-menu"); ?>/>', '<?php get_template_part("modules/widgets/right-menu"); ?>')
    
    with open(footer_path, 'w', encoding='utf-8') as f:
        f.write(f_content)

clean_header_footer()
