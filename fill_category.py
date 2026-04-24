import re

def fill_empty_category_buttons():
    path = '/workspace/wp-theme-hao/modules/widgets/banner-group.php'
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Replace empty `<span class="categoryButtonText"></span>` with some dummy text like "必看" and "热门"
    # The first one is `.bikan`, the second is `.remen`
    
    content = re.sub(r'<a class="categoryButton CB1 bikan">\s*<span class="categoryButtonText"></span>',
                     r'<a class="categoryButton CB1 bikan" href="/">\n                    <span class="categoryButtonText">精选必看</span>', content)
                     
    content = re.sub(r'<a class="categoryButton remen">\s*<span class="categoryButtonText"></span>',
                     r'<a class="categoryButton remen" href="/">\n                    <span class="categoryButtonText">热门文章</span>', content)
                     
    with open(path, 'w', encoding='utf-8') as f:
        f.write(content)

fill_empty_category_buttons()
