<?php get_header(); ?>

<th:block>
    <th:block></th:block>
</th:block>
<th:block>
    <div class="post" id="body-wrap">

        <header class="post-bg" id="page-header">
            <nav></nav>
            <div class="coverdiv loaded" id="coverdiv">
                <img alt="cover" class="nolazyload" id="post-cover">
            </div>

            <div id="post-info">
                <div id="post-firstinfo">
                    <div class="meta-firstline">
                        <!-- 这里要跳转到版权页 -->
                        <th:block
                                  <?php /* if(${not #strings.isEmpty(#annotations.get(post, 'copyrightEnable')) ?
                                          #annotations.get(post, 'copyrightEnable')  == 'true' : theme.config.post.copyrights.enable}) */ ?>>
                            <a class="post-meta-original"
                               title="该文章为原创文章，注意版权协议"
                               <?php /* if() */ ?>
                            >原创</a>
                            <a class="post-meta-original"
                               title="该文章为转载文章，版权归原作者所有"
                               <?php /* if() */ ?>
                            >转载</a>
                        </th:block>
                        <span class="post-meta-categories" <?php /* loop */ ?>
                              <?php /* if() */ ?>>
                            <a class="post-meta-categories">
                            </a>
                        </span>
                        <div class="tag_share" <?php /* if() */ ?>>
                            <div class="post-meta__tag-list">
                                <a class="post-meta__tags" <?php /* loop */ ?>>
                                    <span class="tags-name tags-punctuation"></span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <h1 class="post-title"></h1>
                <div id="post-meta">
                    <div class="meta-secondline">
                        <span class="post-meta-author" data-flag-title="文章作者" title="文章作者">
                            <i class="haofont hao-icon-zuozhe post-meta-icon"></i>
                        </span>
                        <span class="post-meta-wordcount">
                            <i class="haofont hao-icon-file-word post-meta-icon" title="字数"></i>
                            <span class="post-meta-label">字数:</span>
                            <span class="word-count"></span>
                            <span class="post-meta-separator"></span>
                            <i class="haofont hao-icon-clock post-meta-icon" title="阅读耗时"></i>
                            <span class="post-meta-label">阅读耗时:</span>
                            <span> 分钟</span>
                        </span>
                        <span class="post-meta-date">
                            <i class="haofont hao-icon-calendar-days post-meta-icon"></i>
                            <time>
                            </time>
                        </span>
                        <span class="post-meta-date" <?php /* if() */ ?>>
                            <i class="haofont hao-icon-pencil post-meta-icon" title="最后更新时间"></i>
                            <time>
                            </time>
                        </span>
                        <span
                              class="post-meta-wechat">
                            <th:block>
                                <i class="haofont hao-icon-rss post-meta-icon"></i>博客独享
                            </th:block>

                            <th:block <?php /* if() */ ?>>
                                <i class="haofont hao-icon-weixin1 post-meta-icon"></i>公众号同步
                            </th:block>
                        </span>
                        <a class="post-meta-pv" data-flag-title="热度"
                           title="热度" >
                            <i class="haofont hao-icon-fire post-meta-icon"></i>
                            <span class="post-meta-label">热度:</span>
                            <span id="visit"></span>
                        </a>
                        <a <?php /* if() */ ?>
                           class="post-meta-commentcount"  data-flag-title="评论数"
                           title="评论数"
                           href="#post-comment">
                            <i class="haofont hao-icon-chat--fill post-meta-icon" style="font-size: 17px;"></i>
                            <span class="post-meta-label">评论:</span>
                            <span <?php /* if() */ ?>
                                  id="comment-count">
                                <i class="haofont hao-icon-spinner fa-spin"></i>
                            </span>
                            <span <?php /* if() */ ?>
                                  id="twikoo-count">
                                <i class="haofont hao-icon-spinner fa-spin"></i>
                            </span>
                            <span <?php /* if() */ ?>
                                  id="ArtalkCount">
                                <i class="haofont hao-icon-spinner fa-spin"></i>
                            </span>
                        </a>
                        <th:block>
                            <a class="post-meta-editor" sec:authorize="isAuthenticated()" data-flag-title="编辑文章"
                               title="编辑文章"
                               <?php /* if( == ) */ ?>>
                                <i style="margin-top: 2px;" class="haofont hao-icon-bianji post-meta-icon"></i>
                                <span>编辑</span>
                            </a>
                        </th:block>
                    </div>

                </div>
            </div>
            <section class="main-hero-waves-area waves-area">
                <svg class="waves-svg" preserveAspectRatio="none" shape-rendering="auto" viewBox="0 24 150 28"
                     xlink="http://www.w3.org/1999/xlink" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <path
                                d="M -160 44 c 30 0 58 -18 88 -18 s 58 18 88 18 s 58 -18 88 -18 s 58 18 88 18 v 44 h -352 Z"
                                id="gentle-wave"></path>
                    </defs>
                    <g class="parallax">
                        <use href="#gentle-wave" x="48" y="0"></use>
                        <use href="#gentle-wave" x="48" y="3"></use>
                        <use href="#gentle-wave" x="48" y="5"></use>
                        <use href="#gentle-wave" x="48" y="7"></use>
                    </g>
                </svg>
            </section>
        </header>
        <main class="layout" id="content-inner">
            <div id="post">


                <!-- 文章ai摘要 -->
                <div class="post-ai" <?php /* if(${not #strings.isEmpty(#annotations.get(post, 'ai')) ?
                      #annotations.get(post, 'ai') == 'true' : theme.config.post.aiDescription.aiDescriptionEnable}) */ ?>>
                    <div class="ai-title"><i class="haofont hao-icon-bilibili"></i>
                        <div class="ai-title-text">AI-摘要</div>
                        <div <?php /* if() */ ?> id="ai-Toggle">切换</div>
                        <i class="haofont hao-icon-arrow-rotate-right"></i>
                        <div <?php /* if() */ ?> class="ai-tag" id="ai-tag"> GPT</div>
                        <div <?php /* if() */ ?> class="ai-tag" id="ai-tag">Tianli GPT</div>
                    </div>
                    <div class="ai-explanation" style="display: block;">AI初始化中...</div>
                    <div class="ai-btn-box">
                        <div class="ai-btn-item">介绍自己</div>
                        <div class="ai-btn-item">生成本文简介</div>
                        <div class="ai-btn-item">推荐相关文章</div>
                        <div class="ai-btn-item">前往主页</div>
                        <div class="ai-btn-item" id="go-tianli-blog">前往tianli博客</div>
                    </div>
                </div>

                <!-- 文章内容 -->
                <article id="article-container">
                    <th:block <?php /* if() */ ?>>
                        <div class="note simple  warning"  <?php /* if() */ ?>>
                            <p>
                                <th:block/><th:block/>
                            </p>
                        </div>
                    </th:block>
                    <th:block/>
                </article>

                <!-- 文章ai摘要 -->
                <script data-pjax <?php /* if(${not #strings.isEmpty(#annotations.get(post, 'ai')) ?
                      #annotations.get(post, 'ai') == 'true' : theme.config.post.aiDescription.aiDescriptionEnable}) */ ?>
                        src="<?php echo get_template_directory_uri(); ?>/assets/libs/gpt/post-ai.js"></script>

                <!-- 版权声明 -->
                <th:block <?php get_template_part("modules/post/copyright"); ?>></th:block>

                <nav class="pagination-post needEndHide" id="pagination">
                    <div <?php /* if() */ ?>>
                        <a>
                            <img alt="cover" id="preimg" class="nolazyload">
                            <div class="pagination-info">
                                <div class="label">上一篇</div>
                                <div class="prev_info"></div>
                            </div>
                        </a>
                    </div>
                    <div <?php /* if() */ ?>>
                        <a>
                            <img alt="cover" id="preimg" class="nolazyload">
                            <div class="pagination-info">
                                <div class="label">下一篇</div>
                                <div class="next_info"></div>
                            </div>
                        </a>
                    </div>
                </nav>
                <!-- 阅读建议 -->
                <th:block <?php get_template_part("modules/post/relatedPosts"); ?>
                <hr>
                <!--/* 评论组件 */-->
                <th:block/>

            </div>

            <!-- 侧栏 -->
            <div></div>
        </main>

        <!-- 底部 -->
        <footer <?php get_template_part("modules/footer"); ?>

    </div>

</th:block>


<?php get_footer(); ?>
