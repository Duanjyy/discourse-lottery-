<!-- 爱好 -->
<div class="author-content" >
    <div class="author-content-item game-lol"
         style="'background: url('+ @{} +') top / cover no-repeat'">
        <div class="card-content">
            <div class="author-content-item-tips">

            </div><span class="author-content-item-title"></span>
            <div class="content-bottom">
                <div class="icon-group">
                    <div class="loading-bar" role="presentation" aria-hidden="true"></div>
                </div>
                <div class="tips"></div>
            </div>
        </div>
    </div>
    <div <?php /* if() */ ?> class="author-content-item game-wolf"
         style="'background: url('+ @{} +') top / cover no-repeat'">
        <div class="card-content">
            <div class="author-content-item-tips">

            </div><span class="author-content-item-title"></span>
            <div class="content-bottom">
                <div class="tips"></div>
            </div>
        </div>
    </div>
    <div <?php /* if() */ ?> class="author-content-item comic-content">
        <div class="card-content">
            <div class="author-content-item-tips"></div>
            <div class="author-content-item-title"></div>
            <div class="comic-box" >
                <a  <?php /* loop */ ?>
                    class="comic-item"
                    rel="external nofollow noreferrer" target="_blank" draggable="false">
                    <div class="comic-item-cover"><img
                            draggable="false" >
                    </div>
                </a>
            </div>
        </div>
    </div>
    <style>
        .loading-bar::after {
            content: "";
            position: absolute;
            top: 500px;
            left: 0;
            filter: drop-shadow(0 -500px 0 #ece5d8);
            width: 500px;
            height: 62.5px;
            background: url() no-repeat left 100%;
            background-size: 500px 62.5px;
            background-position-x: 0;
        }
    </style>
</div>