<!-- 通讯录 -->
<div class="card-widget card-friend-link">
    <div class="item-headline"><i class="haofont hao-icon-tongxunlu07"
 style="font-size: 0.9rem;font-weight: 700;"></i><span>通讯录</span></div>
    <div class="card-friend-link-container">
         <?php /* if() */ ?>>

            <details <?php /* if() */ ?>
                     class="card-friend-class-name">
                <summary class="card-friend-class-desc">
                    <sapn></sapn>
                    <sapn></sapn>
                </summary>
                <a <?php /* loop */ ?>
                   class="card-friend-item online-friend-link"
                   target="_blank"><img class="no-lightbox card-friend-avatar">
                    <div class="card-friend-details">
                        <div class="card-friend-name"></div>
                        <div class="card-friend-descr" ></div>
                    </div>
                </a>
            </details>
            <details <?php /* if() */ ?>
                     class="card-friend-class-name">
                <summary class="card-friend-class-desc">
                    <sapn></sapn>
                    <sapn></sapn>
                </summary>
                <a <?php /* loop */ ?>
                   class="card-friend-item offline-friend-link"
                   target="_blank"><img class="no-lightbox card-friend-avatar">
                    <div class="card-friend-details">
                        <div class="card-friend-name"></div>
                        <div class="card-friend-descr" ></div>
                    </div>
                </a>
            </details>

        

    </div>


</div>