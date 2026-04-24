<!-- 最新评论 -->
<div class="card-widget card-recent-post" >
    <a <?php /* if() */ ?>
       title="查看更多"
       class="card-more-btn"
       style="cursor:pointer" draggable="false"><i class="haofont hao-icon-chevron-right"></i></a>
    <div class="item-headline"><i class="haofont hao-icon-chat--fill" style="font-size: 19px;"></i><span>最新评论</span></div>
    <div class="aside-list" id="newcomm">

            <div <?php /* loop */ ?> class="aside-list-item">
                <span></span>
                <a class="thumbnail" data-pjax-state="">
                    <img alt="头像">
                </a>
                <div class="content">
                    <a class="comment"
 style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;"
                       data-pjax-state="">

                    </a>
                    <div class="name">
                        <span>stonewu / </span>
                        <time></time>
                    </div>
                </div>
            </div>
        
    </div>
</div>
