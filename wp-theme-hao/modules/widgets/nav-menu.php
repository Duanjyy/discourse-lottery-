<th:block th:fragment="nav-menu-recursion(menuItem)">
    <!-- 有子菜单则显示子菜单 -->
    <th:block <?php /* if(${not #lists.isEmpty(menuItem.children)}) */ ?>>
        <!-- 子菜单 -->
        <div class="menus_item_child"
             th:classappend="${#annotations.get(menuItem,'isVertical')=='1'?'vertical_nav':''}">
            <div class="recursion_menus_item" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
                <a class="site-page child" th:target="${childMenu.spec.target?.value}"
                   th:href="@{${childMenu.status.href}}">
                    <th:block <?php /* if(${theme.config.nav.menus.enable_ali_iconfont_symbol_header}) */ ?>>
                        <svg class="ali_icon" aria-hidden="true">
                            <use th:href="${#annotations.getOrDefault(childMenu, 'icon','jiewen joe-icon-zuzhijiagou')}"></use>
                        </svg>
                    </th:block>
                    <th:block <?php /* if(${!theme.config.nav.menus.enable_ali_iconfont_symbol_header}) */ ?>>
                        <i <?php /* if(${!#strings.isEmpty(#annotations.getOrDefault(childMenu, 'icon', ''))}) */ ?>
                           th:class="${#annotations.getOrDefault(childMenu, 'icon', '')}"
                           style="font-size:.9em"></i>
                    </th:block>
                    <span th:text="${childMenu.status.displayName}"></span>
                </a>
                <!--递归调用-->
                <div th:replace="~{modules/widgets/nav-menu :: nav-menu-recursion(menuItem=${childMenu})}"></div>
            </div>
        </div>
    </th:block>
</th:block>

<!-- 导航栏菜单栏 -->
<div id="menus" th:fragment="nav-menu">
    
    <div class="menus_items">
        
        <!-- 第一层仅展示使用，不做跳转 -->
        <div class="menus_item" <?php if (have_posts()) : while (have_posts()) : the_post(); ?>>
            
            <!-- javascript:void(0);" -->
            <a class="site-page" rel="external nofollow"
               <?php /* if(${#lists.isEmpty(menuItem.children)}) */ ?>
               th:target="${menuItem.spec.target?.value}"
               th:href="@{${menuItem.status.href}}">
                <th:block <?php /* if(${theme.config.nav.menus.enable_ali_iconfont_symbol_header}) */ ?>>
                    <svg class="ali_icon" aria-hidden="true">
                        <use th:href="${#annotations.getOrDefault(menuItem, 'icon','jiewen joe-icon-zuzhijiagou')}"></use>
                    </svg>
                </th:block>
                <span th:text="${menuItem.status.displayName}"></span>
            </a>
            
            <a <?php /* if(${not #lists.isEmpty(menuItem.children)}) */ ?> class="site-page" rel="external nofollow">
                <th:block <?php /* if(${theme.config.nav.menus.enable_ali_iconfont_symbol_header}) */ ?>>
                    <svg class="ali_icon" aria-hidden="true">
                        <use th:href="${#annotations.getOrDefault(menuItem, 'icon','jiewen joe-icon-zuzhijiagou')}"></use>
                    </svg>
                </th:block>
                <span th:text="${menuItem.status.displayName}"></span>
            </a>
            <!--递归调用-->
            <div th:replace="~{modules/widgets/nav-menu :: nav-menu-recursion(menuItem=${menuItem})}"></div>
            
            <style type="text/css">
                .ali_icon {
                    width: 1.2em;
                    height: 1.2em;
                    vertical-align: -0.15em;
                    fill: currentColor;
                    overflow: hidden;
                    right: 0;
                }
            </style>
        </div>
    
    </div>
</div>
