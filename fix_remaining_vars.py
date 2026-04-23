import os
import re

def fix_remaining_raw_vars():
    for root, _, files in os.walk('/workspace/wp-theme-hao'):
        for file in files:
            if file.endswith('.php'):
                file_path = os.path.join(root, file)
                with open(file_path, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                # Fix the double bracket tags left behind like `[[<?php bloginfo("name"); ?>]]`
                content = content.replace('[[<?php bloginfo("name"); ?>]]', '<?php bloginfo("name"); ?>')
                
                # We also need to fix missing values in tags like `<a href="${post.status.permalink}">`
                # Those have been converted to `<?php the_permalink(); ?>` mostly, but let's double check
                
                # Check for any remaining ${...} variables
                content = re.sub(r'\$\{.*?\}', '', content)
                
                # The JS code in footer for "site run time" uses NaN because the time format was not parsed correctly
                # In original footer, it's var birthDay = new Date('${theme.config.basics.siteStartTime}');
                # This was stripped to var birthDay = new Date('');
                # Let's fix it by injecting the PHP customizer variable
                content = content.replace("var birthDay = new Date('')", "var birthDay = new Date('<?php echo get_theme_mod(\"hao_siteStartTime\", \"2023-08-05\"); ?>')")
                content = content.replace("var birthDay = new Date(' ')", "var birthDay = new Date('<?php echo get_theme_mod(\"hao_siteStartTime\", \"2023-08-05\"); ?>')")
                content = content.replace("var birthDay = new Date(' ')", "var birthDay = new Date('<?php echo get_theme_mod(\"hao_siteStartTime\", \"2023-08-05\"); ?>')")
                
                # Fix wp-theme-hao/modules/footer.php specifically
                if 'footer.php' in file_path:
                    # Look for var birthDay = new Date(...)
                    content = re.sub(r'var birthDay = new Date\(.*?\)', 'var birthDay = new Date("<?php echo get_theme_mod(\'hao_siteStartTime\', \'2023-08-05\'); ?>")', content)

                with open(file_path, 'w', encoding='utf-8') as f:
                    f.write(content)

fix_remaining_raw_vars()
