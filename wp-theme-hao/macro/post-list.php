<th:block th:fragment="post-list(_path)">
    <div class="recent-posts" id="recent-posts"
         th:with='postItems=${posts.items},
                     postRandomImg=${#strings.contains(theme.config.layout.postRandomImg,"?") ? theme.config.layout.postRandomImg+"&" : theme.config.layout.postRandomImg+"?"}'>
        <!-- card，需要添加在没有图片时使用随机图片 -->
        <div class="recent-post-item" th:classappend="${theme.config.layout.post.cols} + ' ' +
                        ${theme.config.layout.post.postLocation} + ' ' +
                        (${iStat.even} ? 'even' : 'odd') + ' ' +
                        (${post.spec.pinned} ? 'pinned-post-item' : '')"
             th:attr="onclick='pjax.loadUrl(\''+ @{<?php the_permalink(); ?>} +'\')'" <?php /* loop */ ?>>

            <div class="post_cover left_radius">
                <a th:attr="title=<?php the_title(); ?>" th:href="@{<?php the_permalink(); ?>}">
                    <img class="post_bg"
                         th:with='img = ${#strings.isEmpty(post.spec.cover) ? postRandomImg+post.spec.title : thumbnail.gen(post.spec.cover, "m")}'
                         th:alt="<?php the_title(); ?>" th:data-lazy-src="${ isLazyload ? img : ''}"
                         th:src="${isLazyload ? '' : img}">
                </a>
            </div>
            <div class="recent-post-info">
                <div class="recent-post-info-top">
                    <div class="recent-post-info-top-tips">
                        <!-- 类别非空时 -->
                        <th:block <?php /* if(${not #lists.isEmpty(post.categories)}) */ ?>>
                            <span <?php /* loop */ ?> th:href="@{${category.status.permalink}}"
                                  th:text="${category.spec.displayName}" th:title="${category.spec.displayName}"
                                  class="original"></span>
                        </th:block>
                        <a class="unvisited-post" th:href="@{<?php the_permalink(); ?>}" th:title="<?php the_title(); ?>"
                           data-pjax-state="">未读</a>
                    </div>
                    <a class="article-title" th:attr="title=<?php the_title(); ?>" th:href="@{<?php the_permalink(); ?>}"
                       th:text="<?php the_title(); ?>">
                    </a>
                    <div class="content" th:text="${post.status.excerpt}"></div>
                </div>

                <div class="article-meta-wrap">
                    <!-- tag -->
                    <th:block <?php /* if(${not #lists.isEmpty(post.tags)}) */ ?>>
                        <span class="article-meta tags">
                            <a class="article-meta__tags" event.cancelbubble onclick="window.event.cancelBubble=!0"
                               <?php /* loop */ ?> th:href="@{${tag.status.permalink}}"
                               th:title="${tag.spec.displayName}">
                                <span class="tags-punctuation">[[${#strings.trim(tag.spec.displayName)}]]</span>
                            </a>
                        </span>
                    </th:block>
                    <!-- 创建时间 -->
                    <span class="post-meta-date"
                          th:with="days=${(new java.util.Date().getTime()-post.spec.publishTime.toEpochMilli())/86400000}">
                        <i class="far fa-calendar-alt"></i>
                        <time style="display: inline;" th:datetime="${post.spec.publishTime}" <?php /* if(${days > 30}) */ ?>
                              th:text="${#dates.format(post.spec.publishTime,'yyyy-MM-dd')}"
                              th:title="${#dates.format(post.spec.publishTime,'yyyy-MM-dd')}+创建">
                        </time>
                        <time style="display: inline;" th:datetime="${post.spec.publishTime}"
                              <?php /* if(${days <= 30 && days > 0}) */ ?> th:text="${days}+天前"
                              th:title="${#dates.format(post.spec.publishTime,'yyyy-MM-dd')}+创建">
                        </time>
                        <time style="display: inline;" th:datetime="${post.spec.publishTime}" <?php /* if(${days == 0}) */ ?>
                              th:text="最近" th:title="${#dates.format(post.spec.publishTime,'yyyy-MM-dd')}+创建">
                        </time>
                    </span>
                </div>
            </div>
        </div>
        <!-- 分页 -->
        <div th:replace="~{modules/widgets/page :: page(${_path},${posts},false,'')}"></div>

    </div>
</th:block>