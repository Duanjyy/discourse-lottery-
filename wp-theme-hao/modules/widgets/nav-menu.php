<th:block>
    <!-- 有子菜单则显示子菜单 -->
    <th:block>
        <!-- 子菜单 -->
        <div class="menus_item_child">
            <div class="recursion_menus_item" <?php /* loop over childMenu :  */ ?>>
                <a class="site-page child">
                    <th:block>
                        <svg class="ali_icon" aria-hidden="true">
                            <use></use>
                        </svg>
                    </th:block>
                    <th:block>
                        <i
                           style="font-size:.9em"></i>
                    </th:block>
                    <span></span>
                </a>
                <!--递归调用-->
                <?php /* recursive menu call removed */ ?>
            </div>
        </div>
    </th:block>
</th:block>

<!-- 导航栏菜单栏 -->
<div id="menus">
    
    <div class="menus_items">
        
        <!-- 第一层仅展示使用，不做跳转 -->
        <div class="menus_item" <?php /* loop over menuItem :  */ ?>>
            
            <!-- javascript:void(0);" -->
            <a class="site-page" rel="external nofollow">
                <th:block>
                    <svg class="ali_icon" aria-hidden="true">
                        <use></use>
                    </svg>
                </th:block>
                <span></span>
            </a>
            
            <a class="site-page" rel="external nofollow">
                <th:block>
                    <svg class="ali_icon" aria-hidden="true">
                        <use></use>
                    </svg>
                </th:block>
                <span></span>
            </a>
            <!--递归调用-->
            <?php /* recursive menu call removed */ ?>
            
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
