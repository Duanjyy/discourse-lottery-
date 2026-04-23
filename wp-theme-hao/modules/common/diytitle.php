<!-- 动态标题 -->
<script
        <?php /* if() */ ?>>
    var leaveTitle = '';
    var backTitle = '';
    var OriginTitile = "[()]"
    var titleTime
    document.addEventListener('visibilitychange', function () {
        if (document.hidden) {
            //离开当前页面时标签显示内容
            document.title = leaveTitle
            clearTimeout(titleTime)
        } else {
            //返回当前页面时标签显示内容
            document.title = backTitle + OriginTitile
            //两秒后变回正常标题
            titleTime = setTimeout(function () {
                document.title = OriginTitile
            }, 2000)
        }
    })
</script>