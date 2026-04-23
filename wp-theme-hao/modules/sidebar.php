<!-- 侧栏，主要是手机端时会使用 -->
<div id="sidebar">
    <div id="menu-mask"></div>
    <div id="sidebar-menus">
        <span class="sidebar-menu-item-title">功能</span>
        <div class="sidebar-menu-item">
            <a class="darkmode_switchbutton menu-child" href="javascript:void(0);" onclick="rm.switchDarkMode()"
               rel="external nofollow" title="显示模式切换">
                <i class="haofont hao-icon-moon" style="font-size: 0.9rem;"></i>
                <span>显示模式</span>
            </a>
        </div>
        <th:block <?php /* if() */ ?>>
            <div class="back-menu-list-groups">
                <div class="back-menu-list-group" <?php /* loop */ ?>>

                    <th:block <?php /* if() */ ?>>
                        <!-- 菜单必须有子项才会展示 -->
                        <div class="back-menu-list-title"></div>
                        <div class="back-menu-list">
                            <th:block <?php /* loop */ ?>>
                                <a class="back-menu-item" rel="external nofollow"
                                   target="_blank">
                                    <!-- icon -->
                                    <img <?php /* if() */ ?>
                                         class="back-menu-item-icon">
                                    <span class="back-menu-item-text"></span>
                                </a>
                            </th:block>
                        </div>

                    </th:block>
                </div>

            </div>
        </th:block>
        <th:block <?php /* if() */ ?>
        >
            <div class="menus_items">
                <div class="menus_item" <?php /* loop */ ?>>
                    <th:block <?php /* if() */ ?>>
                        <a class="site-page" href="javascript:void(0);" rel="external nofollow">
                            <span></span>
                        </a>
                        <th:block <?php /* if() */ ?>>
                            <ul class="menus_item_child">
                                <li <?php /* loop */ ?>>
                                    <a class="site-page child">
                                        <th:block <?php /* if() */ ?>>
                                            <i <?php /* if() */ ?>></i>
                                        </th:block>
                                        <th:block <?php /* if() */ ?>>
                                            <svg class="ali_icon" aria-hidden="true">
                                                <use></use>
                                            </svg>
                                        </th:block>
                                        <span></span>
                                    </a>
                                </li>
                            </ul>
                        </th:block>
                    </th:block>
                </div>
            </div>
        </th:block>
        <span class="sidebar-menu-item-title">标签</span>
        <div class="card-widget card-tags card-archives card-webinfo card-allinfo">
            <div class="item-headline"></div>
            <div class="card-tag-cloud">
                <a class="tag-item" style="font-size:1em" <?php /* loop */ ?>>
                    <!-- 角标 -->
                    <sup></sup>
                </a>
            </div>
        </div>
    </div>
</div>
