
    <!-- 解决 pjax问题  自动识别语言-->

        <script src="/plugins/PluginPrismJS/assets/static/highlight.js/highlight.min.js"></script>


        <script>
            document.addEventListener("pjax:complete", function () {
                hljs.highlightAll()
            })
        </script>

        <script data-pjax
                src="/plugins/PluginPrismJS/assets/static/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js"></script>

    

    <!-- 自动识别语言 -->

        <script src="<?php echo get_template_directory_uri(); ?>/assets/libs/prism/highlight.min.js"></script>


        <script>
            document.addEventListener("pjax:complete", function () {
                hljs.highlightAll()
            })
            document.addEventListener("DOMContentLoaded", function () {
                hljs.highlightAll()
            })
        </script>

    


