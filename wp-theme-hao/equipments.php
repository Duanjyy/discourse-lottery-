<?php get_header(); ?>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <?php get_template_part("modules/nav"); ?>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div  th:replace="~{macro/author-content :: author-content(background = ${theme.config.equipment.backgroundImg},
                        smallTitle = ${theme.config.equipment.smallTitle},
                        bigTitle = ${theme.config.equipment.bigTitle},
                        detail = ${theme.config.equipment.detail},
                        buttonUrl = '',
                        buttonTitle = '')}" ></div>
                <div id="equipment" th:if="${not #lists.isEmpty(groups)}">
                    <th:block <?php /* loop over group : ${groups} */ ?>>
                        <div class="equipment-item">
                            <h2 class="equipment-item-title">[[${group.spec.displayName}]]</h2>
                            <div class="equipment-item-description">[[${group.spec.description}]]</div>
                            <div class="equipment-item-content" th:with="equipmentList = ${group.equipments}">
                                <div class="equipment-item-content-item" <?php /* loop over equipment : ${equipmentList} */ ?>>
                                    <div class="equipment-item-content-item-cover">
                                        <img class="equipment-item-content-item-image"
                                             th:alt="${equipment.spec.displayName}"
                                             th:src="${isLazyload ? '' : equipment.spec.cover}"
                                             th:data-lazy-src="${ isLazyload ? equipment.spec.cover : ''}">
                                    </div>
                                    <div class="equipment-item-content-item-info">
                                        <div class="equipment-item-content-item-name"
                                             th:onclick="rm.rightmenuCopyText([[${equipment.spec.displayName}]]);btf.snackbarShow('已复制装备名称');">
                                            [[${equipment.spec.displayName}]]
                                        </div>
                                        <div class="equipment-item-content-item-specification">[[${equipment.spec.specification}]]
                                        </div>
                                        <div class="equipment-item-content-item-description">
                                            [[${equipment.spec.description}]]
                                        </div>
                                        <div class="equipment-item-content-item-toolbar">
                                            <a class="equipment-item-content-item-link" th:href="${equipment.spec.url}" target="_blank">详情</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    
<?php get_footer(); ?>
