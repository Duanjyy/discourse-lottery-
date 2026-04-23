import yaml
import sys

def parse_settings(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        data = yaml.safe_load(f)
    
    forms = data.get('spec', {}).get('forms', [])
    
    php_code = "<?php\n\n"
    php_code += "// Enqueue Theme Assets\n"
    php_code += "function hao_enqueue_assets() {\n"
    php_code += "    wp_enqueue_style('hao-style', get_stylesheet_uri());\n"
    php_code += "    wp_enqueue_style('hao-custom-style', get_template_directory_uri() . '/assets/css/custom.css');\n"
    php_code += "    wp_enqueue_script('hao-custom-js', get_template_directory_uri() . '/assets/js/custom.js', array(), false, true);\n"
    php_code += "}\n"
    php_code += "add_action('wp_enqueue_scripts', 'hao_enqueue_assets');\n\n"
    
    php_code += "// Theme Support\n"
    php_code += "function hao_theme_support() {\n"
    php_code += "    add_theme_support('title-tag');\n"
    php_code += "    add_theme_support('post-thumbnails');\n"
    php_code += "    register_nav_menus(array(\n"
    php_code += "        'primary' => __('Primary Menu', 'hao'),\n"
    php_code += "    ));\n"
    php_code += "}\n"
    php_code += "add_action('after_setup_theme', 'hao_theme_support');\n\n"
    
    php_code += "// Customizer Settings\n"
    php_code += "function hao_customize_register($wp_customize) {\n"
    
    for group in forms:
        group_id = group.get('group', 'general')
        group_label = group.get('label', group_id)
        
        php_code += f"    $wp_customize->add_section('hao_{group_id}', array(\n"
        php_code += f"        'title' => __('{group_label}', 'hao'),\n"
        php_code += f"        'priority' => 30,\n"
        php_code += f"    ));\n\n"
        
        for field in group.get('formSchema', []):
            field_name = field.get('name')
            if not field_name: continue
            
            field_label = field.get('label', field_name)
            field_type = field.get('$formkit', 'text')
            
            # Simple mapping
            wp_type = 'text'
            if field_type == 'textarea' or field_type == 'code': wp_type = 'textarea'
            if field_type == 'switch': wp_type = 'checkbox'
            if field_type == 'color': wp_type = 'color'
            if field_type == 'attachment': wp_type = 'image'
            
            if field_type == 'group':
                # Group inside group, skipping for simplicity or flattening
                children = field.get('children', [])
                for child in children:
                    c_name = f"{field_name}_{child.get('name')}"
                    c_label = child.get('label', c_name)
                    c_type = child.get('$formkit', 'text')
                    c_wp_type = 'text'
                    if c_type == 'switch': c_wp_type = 'checkbox'
                    
                    php_code += f"    $wp_customize->add_setting('hao_{c_name}', array(\n"
                    php_code += f"        'default' => '',\n"
                    php_code += f"        'sanitize_callback' => 'sanitize_text_field',\n"
                    php_code += f"    ));\n"
                    php_code += f"    $wp_customize->add_control('hao_{c_name}', array(\n"
                    php_code += f"        'label' => __('{c_label}', 'hao'),\n"
                    php_code += f"        'section' => 'hao_{group_id}',\n"
                    php_code += f"        'type' => '{c_wp_type}',\n"
                    php_code += f"    ));\n\n"
            else:
                php_code += f"    $wp_customize->add_setting('hao_{field_name}', array(\n"
                php_code += f"        'default' => '',\n"
                if wp_type == 'checkbox':
                    php_code += f"        'sanitize_callback' => 'wp_validate_boolean',\n"
                else:
                    php_code += f"        'sanitize_callback' => 'wp_kses_post',\n"
                php_code += f"    ));\n"
                
                if wp_type == 'image':
                    php_code += f"    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'hao_{field_name}', array(\n"
                    php_code += f"        'label' => __('{field_label}', 'hao'),\n"
                    php_code += f"        'section' => 'hao_{group_id}',\n"
                    php_code += f"    )));\n\n"
                elif wp_type == 'color':
                    php_code += f"    $wp_customize->add_control(new WP_Customize_Color_Control($wp_customize, 'hao_{field_name}', array(\n"
                    php_code += f"        'label' => __('{field_label}', 'hao'),\n"
                    php_code += f"        'section' => 'hao_{group_id}',\n"
                    php_code += f"    )));\n\n"
                else:
                    php_code += f"    $wp_customize->add_control('hao_{field_name}', array(\n"
                    php_code += f"        'label' => __('{field_label}', 'hao'),\n"
                    php_code += f"        'section' => 'hao_{group_id}',\n"
                    php_code += f"        'type' => '{wp_type}',\n"
                    php_code += f"    ));\n\n"

    php_code += "}\n"
    php_code += "add_action('customize_register', 'hao_customize_register');\n\n"
    
    with open('/workspace/wp-theme-hao/functions.php', 'w', encoding='utf-8') as f:
        f.write(php_code)

if __name__ == '__main__':
    parse_settings('/workspace/halo-theme-hao/settings.yaml')
