
    <!-- 有子菜单则显示子菜单 -->

        <!-- 子菜单 -->
        <div class="menus_item_child">
            <div class="recursion_menus_item" <?php /* loop */ ?>>
                <a class="site-page child">

                        <svg class="ali_icon" aria-hidden="true">
                            <use></use>
                        </svg>

                        <i <?php /* if() */ ?>
                           style="font-size:.9em"></i>
                    
                    <span></span>
                </a>
                <!--递归调用-->
                <div></div>
            </div>
        </div>
    


<!-- 导航栏菜单栏 -->
<div id="menus">
    
    <div class="menus_items">
        
        <!-- 第一层仅展示使用，不做跳转 -->
        <div class="menus_item" <?php /* loop */ ?>>
            
            <!-- javascript:void(0);" -->
            <a class="site-page" rel="external nofollow"
               <?php /* if() */ ?>>

                    <svg class="ali_icon" aria-hidden="true">
                        <use></use>
                    </svg>
                
                <span></span>
            </a>
            
            <a <?php /* if() */ ?> class="site-page" rel="external nofollow">

                    <svg class="ali_icon" aria-hidden="true">
                        <use></use>
                    </svg>
                
                <span></span>
            </a>
            <!--递归调用-->
            <div></div>
            
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
