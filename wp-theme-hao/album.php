<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>

    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>
        <main class="layout hide-aside" id="content-inner">
            <div id="page">
                <div id="album" <?php /* if() */ ?>>
                    <div></div>

                    <div class="card-album">
                        <th:block <?php /* loop */ ?>>
                            <div class="card">
                                <img class="card_cover"
                                >
                                <div class="card__content">
                                    <p class="card__category"></p>
                                    <h3 class="card__heading"></h3>
                                </div>
                            </div>
                        </th:block>
                        <th:block <?php /* loop */ ?>>
                            <div class="album-content-nocover"></div>
                        </th:block>
                    </div>
                </div>
                <div class="gallery-groups" <?php /* if() */ ?>>
                    <h2 style="text-align:center;"></h2>
                    <div class="gallery-group-main">
                        <th:block <?php /* loop */ ?>>
                            <figure class="gallery-group no-lightbox">
                                <img class="gallery-group-img no-lightbox"
                                     alt="Group Image Gallery">
                                <figcaption>
                                    <div class="gallery-group-name"></div>
                                    <p></p><a target="_blank"
                                                                                           rel="noopener"></a>
                                </figcaption>
                            </figure>
                        </th:block>
                    </div>
                </div>
                <style>
                    .gallery-groups {
                        box-shadow: var(--heo-shadow-border);
                        padding: 1rem 2rem;
                        border-radius: 12px;
                        background: var(--heo-card-bg);
                        border: var(--style-border);
                        width: 100%;
                        align-self: flex-start;
                        animation: slide-in 0.6s 0.1s backwards;
                    }

                    :root {
                        --album-background-dark: #2d3548;
                        --album-text-light: rgba(255, 255, 255, 0.6);
                        --album-text-lighter: rgba(255, 255, 255, 0.9);
                        --album-spacing-s: 8px;
                        --album-spacing-m: 16px;
                        --album-spacing-l: 24px;
                        --album-spacing-xl: 32px;
                        --album-spacing-xxl: 64px
                    }

                    #album .card-album {
                        width: 100%;
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                        margin: var(--album-spacing-xxl) 0 0
                    }

                    #album .card-album .album-content-nocover {
                        width: calc(100% / 4 - 40px)
                    }

                    #album .card-album .card {
                        list-style: none;
                        position: relative;
                        display: flex;
                        width: calc(100% / 4 - 10px);
                        padding: 10px
                    }

                    #album .card-album .card:hover {
                        cursor: pointer
                    }

                    #album .card_cover {
                        border-radius: var(--album-spacing-l);
                        filter: brightness(.75) saturate(1.2) contrast(.85);
                        transform-origin: center;
                        transform: scale(1) translateZ(0);
                        transition: filter .2s linear, transform .2s linear;
                        max-width: 100%;
                        overflow: hidden;
                        height: 550px;
                        width: 100%;
                        max-width: 100%;
                        object-fit: cover;
                        border-radius: var(--album-spacing-l)
                    }

                    #album .card:hover .card_cover {
                        transform: scale(1.05) translateZ(0);
                        filter: brightness(.9) saturate(1.2) contrast(1)
                    }

                    #album .card-album:hover>.card:not(:hover) .card_cover {
                        filter: brightness(.5) saturate(.9) contrast(1.2) blur(20px)
                    }

                    #album .card__content {
                        left: 0;
                        padding: var(--album-spacing-l);
                        position: absolute;
                        top: 0
                    }

                    #album .card__category {
                        color: var(--album-text-light);
                        font-size: .8rem;
                        margin-bottom: var(--album-spacing-s);
                        text-transform: uppercase
                    }

                    #album .card__heading {
                        color: var(--album-text-lighter);
                        font-size: 1.5rem;
                        text-shadow: 2px 2px 20px rgba(0, 0, 0, .2);
                        line-height: 1.4;
                        word-spacing: 100vw
                    }

                    @media (min-width: 1024px) {
                        #album img.card_cover {
                            height: 600px
                        }
                    }

                    @media (max-width: 960px) {
                        #album .card-album .card {
                            width: calc(100% / 2 - 40px)
                        }
                    }

                    @media (max-width: 540px) {
                        #album .card-album .card {
                            width: calc(100%)
                        }
                    }
                </style>
                <!--/* 评论组件 */-->
                <th:block />
            </div>

        </main>
        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>
        <!-- 卡片顶部气泡效果 -->
        <script <?php /* if() */ ?> async data-pjax
                src="<?php echo get_template_directory_uri(); ?>/assets/libs/canvas/bubble.js"></script>
    </div>

</th:block>


<?php get_footer(); ?>
