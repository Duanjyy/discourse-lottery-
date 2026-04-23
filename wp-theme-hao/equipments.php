<!DOCTYPE html>
<html 
      th:replace="~{modules/layouts/layout :: layout(content = ~{::content}, htmlType = 'equipments',title = ${title + ' | ' + site.title}, head = ~{::head},_title = ${title})}">
<th:block th:fragment="head">
    <th:block th:replace="~{modules/common/open-graph :: open-graph(_title = ${_title},
                _permalink = '/equipments',
                _cover = ${theme.config.other.opengraph.image},
                _excerpt = ${site.seo.description},
                _type = 'website')}"></th:block>
</th:block>
<th:block th:fragment="content">
    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav th:replace="~{modules/nav :: nav(title = ${_title})}"></nav>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div  th:replace="~{macro/author-content :: author-content(background = ${theme.config.equipment.backgroundImg},
                        smallTitle = ${theme.config.equipment.smallTitle},
                        bigTitle = ${theme.config.equipment.bigTitle},
                        detail = ${theme.config.equipment.detail},
                        buttonUrl = '',
                        buttonTitle = '')}" ></div>
                <div id="equipment" <?php /* if(${not #lists.isEmpty(groups)}) */ ?>>
                    <th:block <?php /* loop */ ?>>
                        <div class="equipment-item">
                            <h2 class="equipment-item-title">[[${group.spec.displayName}]]</h2>
                            <div class="equipment-item-description">[[${group.spec.description}]]</div>
                            <div class="equipment-item-content" th:with="equipmentList = ${group.equipments}">
                                <div class="equipment-item-content-item" <?php /* loop */ ?>>
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
                    </th:block>
                </div>
            </div>
        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>/>
        <!-- 卡片顶部气泡效果 -->
        <script <?php /* if(${theme.config.other.bubbleEnable}) */ ?> async data-pjax
                th:src="${assets_link + '/libs/canvas/bubble.js'}"></script>
    </div>

</th:block>

</html>