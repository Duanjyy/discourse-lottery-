<div class="bbTimeList container" id="bbTimeList"
     <?php /* if() */ ?>>

    <i class="haofont hao-icon-logo-moment" onclick="" style="font-size: 1.3rem;" title="瞬间"></i>

    <!--   未安装插件   -->
    <th:block <?php /* if(!) */ ?>>
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
    <th:block <?php /* if() */ ?>>
        <div class="swiper-container swiper-no-swiping" id="bbtalk" tabindex="-1">
            <div class="swiper-wrapper" id="bber-talk" onclick="pjax.loadUrl('/moments')" <?php /* if() */ ?>>
                <th:block <?php /* loop */ ?>>
                    <div class="li-style swiper-slide"
                         <?php /* if() */ ?>>
                    </div>
                </th:block>
            </div>
        </div>
        <i class="bber-gotobb haofont hao-icon-circle-arrow-right" onclick="location.href='/moments'" title="查看全文"></i>
    </th:block>
    <img <?php /* if( ) */ ?> class="climb"  id="climb"
         onclick="halo.changeMarginLeft(this)">

</div>
