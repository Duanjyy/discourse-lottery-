import os

def hide_default_widgets():
    path = '/workspace/wp-theme-hao/index.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Wrap moment
    content = content.replace('<?php get_template_part("modules/moment"); ?>',
                              '<?php if(get_theme_mod("hao_moment", false)) : ?>\n                <?php get_template_part("modules/moment"); ?>\n            <?php endif; ?>')
                              
    # Wrap recent-top
    content = content.replace('<?php get_template_part("modules/recent-top"); ?>',
                              '<?php if(get_theme_mod("hao_recentTop", false)) : ?>\n                <?php get_template_part("modules/recent-top"); ?>\n            <?php endif; ?>')
                              
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

hide_default_widgets()
