<?php get_header(); ?>


    



    <div class="page" id="body-wrap">

        <!-- 头部导航栏 -->
        <header class="not-top-img" id="page-header">
            <nav></nav>
        </header>

        <main class="layout hide-aside" id="content-inner">
            <div id="page">


                    <style>
                        @media screen and (max-width: 600px) {

                            #afterimg,
                            #beforeimg {
                                display: none !important
                            }
                        }

                        @media screen and (min-width: 600px) {
                            #article-container img {
                                margin: 0 auto 0
                            }

                            #form-wrap {
                                overflow: hidden;
                                height: 447px;
                                position: relative;
                                top: 0;
                                transition: all 1s ease-in-out .3s;
                                z-index: 0
                            }

                            #form-wrap:hover {
                                height: px;
                                top: -200px
                            }

                            #beforeimg {
                                position: absolute;
                                bottom: 126px;
                                left: 0;
                                background-repeat: no-repeat;
                                width: 530px;
                                height: 317px;
                                z-index: -100;
                                pointer-events: none
                            }

                            #afterimg {
                                position: absolute;
                                bottom: -2px;
                                left: 0;
                                background-repeat: no-repeat;
                                width: 530px;
                                height: 259px;
                                z-index: 100;
                                pointer-events: none
                            }

                            #envelope {
                                position: relative;
                                overflow: visible;
                                width: 500px;
                                margin: 0 auto;
                                transition: all 1s ease-in-out .3s;
                                padding-top: 200px
                            }

                            #maincontent {
                                width: 530px;
                                margin: 20px auto 0
                            }

                            .formmain {
                                background: #fff;
                                width: 95%;
                                max-width: 800px;
                                margin: auto auto;
                                border-radius: 5px;
                                border: 1px solid;
                                overflow: hidden;
                                -webkit-box-shadow: 0 0 20px 0 #000;
                                box-shadow: 0 0 20px 0 #000
                            }
                        }

                        [data-theme=dark] .formmain {
                            background: #323232
                        }

                        [data-theme=dark] .comments {
                            background: #5a5a5a !important
                        }
                    </style>


                    <div id="article-container">
                        <div id="maincontent">
                            <div id="form-wrap">
                                <img class="no-lightbox entered loaded" id="beforeimg">
                                <div id="envelope">
                                    <form>
                                        <div class="formmain" style="pointer-events:none">
                                            <img class="headerimg no-lightbox entered loaded"
 style="width:100%;overflow:hidden;pointer-events:none">
                                            <div class="comments-main">
                                                <h3 class="title3"
 style="text-decoration:none;color:var(--heo-theme);text-align:center">
                                                    来自<?php bloginfo("name"); ?>的留言:</h3>
                                                <div class="comments"
 style="text-align:center;border-bottom:#ddd 1px solid;border-left:#ddd 1px solid;padding-bottom:20px;background-color:#eee;margin:15px 0;padding-left:20px;padding-right:20px;border-top:#ddd 1px solid;border-right:#ddd 1px solid;padding-top:20px">

                                                    <div <?php /* loop */ ?>></div>

                                                </div>
                                                <div class="bottomcontent" style="text-align:center;margin-top:40px">
                                                    <img class="bottomimg no-lightbox entered loaded"
 style="width:100%;margin:5px auto 5px auto;display:block;pointer-events:none">
                                                </div>
                                                <p class="bottomhr" style="font-size:12px;text-align:center;color:#999">
                                                    </p>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <img id="afterimg" class="no-lightbox entered loaded">
                            </div>
                        </div>
                    </div>

                

                <div class="flink" id="article-container">
                    
                </div>

                <hr>
                <!--/* 评论组件 */-->
                
            </div>

        </main>
        <!-- 底部 -->
        <?php get_template_part("modules/footer"); ?>
    </div>




<?php get_footer(); ?>
