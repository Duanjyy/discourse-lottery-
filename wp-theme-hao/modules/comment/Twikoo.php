
<th:block>
    <div class="js-pjax">
        <script src="<?php echo get_template_directory_uri(); ?>/assets/js/comment/twikoo.js"></script>
    </div>
    <!-- 最近评论 -->
    <script>
        window.addEventListener('load', () => {
            const getComment = () => {
                const runTwikoo = () => {
                    twikoo.getRecentComments({
                        envId: "[()]",
                        region: '',
                        pageSize: 20,
                        includeReply: true
                    }).then(function (res) {
                        const twikooArray = res.map(e => {
                            return {
                                'content': btf.changeContent(e.comment,150),
                                'avatar': e.avatar,
                                'nick': e.nick,
                                'url': e.url + '#' + e.id,
                                'date': new Date(e.created).toISOString()
                            }
                        })

                        saveToLocal.set('twikoo-newest-comments', JSON.stringify(twikooArray), 10 / (60 * 24))
                        generateHtml(twikooArray)
                        document.querySelector('#newcomm') && necommHtml(twikooArray)
                    }).catch(function (err) {
                        const $dom = document.querySelector('#card-newest-comments .aside-list')
                        const $newcomm = document.querySelector('#newcomm')
                        $dom.innerHTML = "无法获取评论，请确认相关配置是否正确"
                        if($newcomm){
                            $newcomm.innerHTML = "无法获取评论，请确认相关配置是否正确"
                        }

                    })
                }

                if (typeof twikoo === 'object') {
                    runTwikoo()
                } else {
                    getScript(GLOBAL_CONFIG.source.twikoo.js).then(runTwikoo)
                }
            }

            const generateHtml = array => {
                let result = ''

                if (array.length) {
                    for (let i = 0; i < array.length; i++) {
                        if (i == 6) {
                            break;
                        }
                        result += '<div class=\'aside-list-item\'>'

                        if (true) {
                            let name = 'src'
                            if(){
                                name = 'data-lazy-src'
                            }
                            result += `<a href='' class='thumbnail'><img ='' alt=''><div class='name'><span></span></div></a>`
                        }

                        result += `<div class='content'>
                                <a class='comment' href='' title=''></a>
                                <time datetime=""></time></div>
                                </div>`
                    }
                } else {
                    result += '没有评论'
                }

                let $dom = document.querySelector('#card-newest-comments .aside-list')
                $dom.innerHTML = result
                window.lazyLoadInstance && window.lazyLoadInstance.update()
                window.pjax && window.pjax.refresh($dom)
            }

            const necommHtml = array => {
                let result = ''

                const pagesize = ;
                const defaultpagesize = 5;
                const finalpagesize = pagesize <= 0 ? defaultpagesize : pagesize;

                if (array.length) {
                    for (let i = 0; i < array.length; i++) {

                        if (i == finalpagesize) {
                            break;
                        }
                        result += '<div class="aside-list-item">'

                        if (true) {
                            let name = 'src'
                            if(){
                                name = 'data-lazy-src'
                            }
                            result += `
                            <a class="thumbnail" href="">
                                <img alt="dasda" ="">
                            </a>
                        `
                        }

                        result += `
                        <div class="content">
                            <a class="comment" style="display: -webkit-box;-webkit-line-clamp: 2;-webkit-box-orient: vertical;overflow: hidden;"
                            href="" title="">
                            
                            </a>
                            <div class="name">
                                <span> / </span>
                                <time datetime=""></time>
                            </div>
                        </div>
                    </div>
                  `

                    }
                } else {
                    result += '没有评论'
                }

                let $dom = document.querySelector('#newcomm')
                $dom.innerHTML = result
                window.lazyLoadInstance && window.lazyLoadInstance.update()
                window.pjax && window.pjax.refresh($dom)
            }

            const newestCommentInit = () => {
                if (document.querySelector('#card-newest-comments .aside-list')) {
                    const data = saveToLocal.get('twikoo-newest-comments')
                    if (data) {
                        generateHtml(JSON.parse(data))
                        document.querySelector('#newcomm') &&  necommHtml(JSON.parse(data))
                    } else {
                        getComment()
                    }
                }
            }

            newestCommentInit()
            document.addEventListener('pjax:complete', newestCommentInit)
        })</script>

</th:block>