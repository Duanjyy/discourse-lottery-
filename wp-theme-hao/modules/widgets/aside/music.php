<?php get_header(); ?>
<!-- 音乐卡片 -->
<div >
    <div class="item-headline-music"><i class="haofont hao-icon-music"></i><span>音乐天地</span></div>

    <div class="card-widget card-music">
        <div id="flip-wrapper-card">
            <div id="flip-music">
                <div class="msimg">
                </div>
                <div class="back msimg">
                </div>
            </div>
        </div>

    </div>
    <style>
        [data-theme=dark] #aside-content #flip-wrapper-card #flip-music .msimg {
            background: url("[()]") center center/100% no-repeat !important
        }

        [data-theme=dark] #aside-content #flip-wrapper-card #flip-music .back.msimg {
            background: url("[()]") center center/100% no-repeat !important
        }
    </style>

</div>
<?php get_footer(); ?>
