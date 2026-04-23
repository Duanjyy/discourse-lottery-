<div class="bbTimeList container" id="bbTimeList"
     <?php /* if(${theme.config.top.moment}) */ ?>>

    <i class="haofont hao-icon-logo-moment" onclick="" style="font-size: 1.3rem;" title="瞬间"></i>

    <!--   未安装插件   -->
    <th:block <?php /* if(!${pluginFinder.available('PluginMoments')}) */ ?>>
        <div class="swiper-container swiper-no-swiping" id="bbtalk" tabindex="-1">
            <div class="swiper-wrapper" id="bber-talk"
                 onclick="location.href=location.href='https\:\/\/github.com/halo-sigs/plugin-moments'">
                <div class="li-style swiper-slide">这里需要安装瞬间的插件</div>
                <div class="li-style swiper-slide">去安装吧！</div>
            </div>
        </div>
        <i class="bber-gotobb haofont hao-icon-circle-arrow-right"
           onclick="location.href=location.href='https\:\/\/github.com/halo-sigs/plugin-moments'" title="下载插件"></i>
    </th:block>

    <!--   瞬间插件   -->
    <th:block <?php /* if(${pluginFinder.available('PluginMoments')}) */ ?>>
        <div class="swiper-container swiper-no-swiping" id="bbtalk" tabindex="-1">
            <div class="swiper-wrapper" id="bber-talk" onclick="pjax.loadUrl('/moments')" <?php /* if(${momentFinder}) */ ?>>
                <th:block <?php /* loop */ ?> th:with="content=${moment.spec.content}">
                    <div class="li-style swiper-slide"
                         <?php /* if(${not #strings.isEmpty(content.raw)}) */ ?>
                         th:utext="${content.raw}">
                    </div>
                </th:block>
            </div>
        </div>
        <i class="bber-gotobb haofont hao-icon-circle-arrow-right" onclick="location.href='/moments'" title="查看全文"></i>
    </th:block>
    <img <?php /* if(${theme.config.top.climb.climbEnable && theme.config.top.recentTop} ) */ ?> class="climb"  id="climb"
         th:src="${isLazyload ? '' : theme.config.top.climb.climbImg}"
         onclick="halo.changeMarginLeft(this)"
         th:data-lazy-src="${ isLazyload ? theme.config.top.climb.climbImg : ''}">

</div>
