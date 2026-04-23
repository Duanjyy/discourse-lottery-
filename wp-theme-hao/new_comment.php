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
                <div></div>
                <div id="comments-page">
                    <th:block <?php /* if() */ ?>
                              <?php /* loop */ ?>>
                        <div class="comment-card">
                            <div class="comment-info">
                                <img class="no-lightbox nolazyload avatar">
                                <div class="comment-information">
                                    <span class="comment-user"></span>
                                    <span class="comment-time"></span>
                                </div>
                            </div>
                            <div class="comment-content">
                            </div>
                            <div class="comment-article"></div>
                        </div>
                    </th:block>

                </div>
                <th:block <?php /* if() */ ?>>
                    <script data-pjax>
                        var postsData = ;
                        var pageData = ;
                        var articles = [{ path: '/links', title: '友链' }, { path: '/bangumis', title: '追番' }, { path: '/equipment', title: '我的装备' }, { path: '/moments', title: '瞬间' }, { path: '/photos', title: '图库' }];

                        if (postsData.length > 0) {
                            postsData.map((item) => {
                                articles.push({
                                    title: item.spec.title,
                                    path: item.status.permalink
                                })
                            })
                        }
                        if (pageData.items.length > 0) {
                            pageData.items.map((item) => {
                                articles.push({
                                    title: item.spec.title,
                                    path: item.status.permalink
                                })
                            })
                        }
                    </script>
                    <script>
                        var config = {
                            mailMd5: GLOBAL_CONFIG.source.comments.mailMd5,
                            twikooUrl: GLOBAL_CONFIG.source.twikoo.twikooUrl,
                            artalkUrl: GLOBAL_CONFIG.source.artalk.artalkUrl,
                            walineUrl: GLOBAL_CONFIG.source.waline.serverURL,
                            use: GLOBAL_CONFIG.source.comments.use
                        };
                        var isTwikoo = config.use == 'Twikoo';
                        var isArtalk = config.use == 'Artalk';
                        var isWaline = config.use == 'Waline';
                        comments();
                        async function comments() {
                            if (isTwikoo) {
                                fetch(GLOBAL_CONFIG.source.twikoo.twikooUrl, {
                                    method: "POST",
                                    body: JSON.stringify({
                                        event: "GET_RECENT_COMMENTS",
                                        accessToken: GLOBAL_CONFIG.source.twikoo.accessToken,
                                        includeReply: !0,
                                        pageSize: 100
                                    }),
                                    headers: {
                                        "Content-Type": "application/json"
                                    }
                                }).then(res => res.json()).then(async ({ data }) => {
                                    const twikooArray = data.map(e => {
                                        return {
                                            'comment': changeContents(e.comment),
                                            'avatar': 'https://cravatar.cn/avatar/' + e.mailMd5,
                                            'nick': e.nick,
                                            'url': e.url,
                                            'barrageBlogger': e.mailMd5 === config.mailMd5,
                                            'id': e.id,
                                            'created': e.created
                                        }
                                    })
                                    renderer(twikooArray)
                                }).catch((err) => { console.log(err); })
                            }
                            if (isArtalk) {
                                const statheaderList = {
                                    method: 'POST',
                                    headers: {
                                        'Content-Type': 'application/x-www-form-urlencoded',
                                        'Origin': window.location.origin
                                    },
                                    body: new URLSearchParams({
                                        'site_name': GLOBAL_CONFIG.source.artalk.siteName,
                                        'limit': '100',
                                        'type': 'latest_comments'
                                    })
                                }
                                fetch(GLOBAL_CONFIG.source.artalk.artalkUrl + 'api/stat', statheaderList)
                                    .then(res => res.json()).then(d => {
                                    const artalk = d.data.map(function (e) {
                                        return {
                                            'comment': changeContents(e.content_marked),
                                            'avatar': 'https://cravatar.cn/avatar/' + e.email_encrypted + '?d=mp&s=240',
                                            'nick': e.nick,
                                            'url': e.page_key,
                                            'barrageBlogger': e.email_encrypted === config.mailMd5,
                                            'id': 'atk-comment-' + e.id,
                                            'created': e.date,
                                        }
                                    })
                                    renderer(artalk)
                                }).catch((err) => { console.log(err); })
                            }
                            if (isWaline) {
                                const loadWaline = () => {
                                    Waline.RecentComments({
                                        serverURL: GLOBAL_CONFIG.source.waline.serverURL,
                                        count: 50
                                    }).then(({ comments }) => {
                                        const walineArray = comments.map(e => {
                                            return {
                                                'comment': changeContents(e.comment),
                                                'avatar': e.avatar,
                                                'nick': e.nick,
                                                'url': e.url,
                                                'barrageBlogger': e.type === 'administrator',
                                                'id': e.objectId,
                                                'created': e.insertedAt,
                                            }
                                        })
                                        renderer(walineArray);
                                    }).catch((err) => { console.log(err); })
                                }
                                if (typeof Waline === 'object') loadWaline()
                                else getScript(GLOBAL_CONFIG.source.waline.js).then(loadWaline)
                            }

                        }

                        function getTitle(url) {
                            let a = articles.find(a => a.path == url)
                            if (a) return a.title
                            return '该文章/页面不存在'
                        }

                        function renderer(data) {
                            let html = "";
                            data.forEach(item => {
                                const a = new Date(item.created),
                                    c = `-- ::`;
                                html += `<div class="comment-card" title="" onclick="pjax.loadUrl('#')">
                                    <div class="comment-info no-lightbox">
                                        <img src="" alt=''/>
                                        <div class="comment-information">
                                                <span class="comment-user"> </span>
                                                <span class="comment-time"></span>
                                        </div>
                                    </div>
                                    <div class="comment-content"></div>
                                    <div class="comment-article">""</div>
                                </div>`
                            })
                            document.getElementById('comments-page').innerHTML = html
                        }
                        function changeContents(content) {
                            if (content === '') return content

                            content = content.replace(/<img.*?src="(.*?)"?[^\>]+>/ig, '[图片]') // replace image link
                            content = content.replace(/<a[^>]+?href=["']?([^"']+)["']?[^>]*>([^<]+)<\/a>/gi, '[链接]') // replace url
                            content = content.replace(/<pre><code>.*?<\/pre>/gi, '[代码]') // replace code
                            content = content.replace(/<[^>]+>/g, "") // remove html tag

                            if (content.length > 150) {
                                content = content.substring(0, 150) + '...'
                            }
                            return content
                        }
                    </script>
                </th:block>

                <style>
                    #comments-page {
                        display: flex;
                        flex-wrap: wrap;
                        gap: 12px;
                        min-height: 100px;
                        width: 100%;
                        margin-top: 1.5rem
                    }

                    #comments-page .comment-card {
                        position: relative;
                        width: calc(100% / 4 - 9px);
                        border-radius: 12px;
                        border: var(--style-border);
                        padding: 14px;
                        cursor: pointer;
                        transition: .3s;
                        overflow: hidden;
                        box-shadow: var(--heo-shadow-border);
                        background: var(--heo-card-bg)
                    }

                    span.isBlogger {
                        background: var(--heo-main);
                        color: white;
                        font-weight: normal;
                        font-size: 13px;
                        line-height: 1;
                        display: inline-flex;
                        padding: 3px 4px 4px 4.5px;
                        border-radius: 3px;
                        margin-left: 5px;
                        letter-spacing: 1px;
                    }

                    @media screen and (max-width: 900px) {
                        #comments-page .comment-card {
                            width: calc(100% / 2 - 6px)
                        }
                    }

                    @media screen and (max-width: 768px) {
                        #comments-page .comment-card {
                            width: 100%
                        }
                    }

                    #comments-page .comment-card:hover {
                        border-color: var(--heo-main)
                    }

                    #comments-page .comment-card:hover .comment-article {
                        opacity: 1;
                        top: 0
                    }

                    #comments-page .comment-card .comment-info {
                        display: flex;
                        align-items: center;
                        padding-bottom: 14px;
                        margin-bottom: 8px;
                        border-bottom: 1px dashed var(--hr-border)
                    }

                    #comments-page .comment-card .comment-info img {
                        width: 50px;
                        height: 50px;
                        object-fit: cover;
                        border-radius: 50%;
                        margin: 0 !important
                    }

                    #comments-page .comment-card .comment-info .comment-information {
                        display: flex;
                        flex-direction: column;
                        margin-left: 12px;
                        line-height: 1.5
                    }

                    #comments-page .comment-card .comment-info .comment-information .comment-user {
                        display: flex;
                        align-items: center;
                        font-weight: 700;
                        font-size: 15px
                    }

                    #comments-page .comment-card .comment-info .comment-information .comment-author::after {
                        content: "\f3a5";
                        font-family: "Font Awesome 6 Free" !important;
                        padding-left: 6px;
                        padding-top: 5px;
                        font-size: 14px;
                        color: #fdc22d
                    }

                    [data-theme=dark] #comments-page .comment-card .comment-info .comment-information .comment-author::after {
                        color: var(--heo-main)
                    }

                    #comments-page .comment-card .comment-info .comment-information .comment-time {
                        opacity: .8;
                        font-size: 15px
                    }

                    #comments-page .comment-card .comment-info .comment-content {
                        margin: 8px 5px 0
                    }

                    .comment-article,
                    .comment-content {
                        transition: .3s;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display: -webkit-box;
                        -webkit-box-orient: vertical;
                        -webkit-line-clamp: 2;
                        line-height: 1.7;
                        font-weight: 400
                    }

                    .comment-article {
                        position: absolute;
                        left: 0;
                        top: 0;
                        height: 100%;
                        width: 100%;
                        z-index: 1;
                        background: var(--heo-main);
                        color: var(--heo-card-bg);
                        margin: 0;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        padding: 1rem;
                        opacity: 0;
                        text-align: center
                    }
                </style>

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
