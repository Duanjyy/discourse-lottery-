<!-- 标签 -->
<th:block>

    <div class="item-headline"></div>
    <div class="card-tag-cloud">
        <a class="tag-item" style="font-size:1em" <?php /* loop over tag,iterStat :  */ ?>>
            <!-- 角标 -->
            <sup></sup>
        </a>
    </div>
    <script>
        for (const tag of document.getElementsByClassName('tag-item')) {
            let randomColor ="#"+((1<<24)*Math.random()|0).toString(16);
            tag.style.color = randomColor;
        }
    </script>

</th:block>