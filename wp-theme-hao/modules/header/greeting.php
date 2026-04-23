<!-- 第一屏 -->
<th:block>
    <div id="greetingBox"></div>
    <style>
        #greetingBox {
            position: fixed;
            top: 10px;
            left: 15%;
            width: 400px;
            text-align: center;
            z-index: 10000;
            pointer-events: none
        }

        #greeting {
            display: inline-block;
            position: relative;
            opacity: 0;
            top: -110px;
            padding: 5px 40px;
            border-radius: 50px;
            background-color: #fff;
            color: #000;
            font-size: small;
            transition: .5s;
            box-shadow: rgb(0 0 0 / 5%) 0 10px 20px
        }

        #greeting.shown {
            opacity: 1;
            top: 0
        }
    </style>
    <script>
        (() => {
            const greeting = .map((itme) => {
                return itme.realNode
            })
            let e = greeting.length !== 0 ? greeting : [
                {
                    greeting: "晚安😴",
                    start_time: 0,
                    end_time: 5
                }, {
                    greeting: "早上好鸭👋, 祝你一天好心情！",
                    start_time: 6,
                    end_time: 9
                }, {
                    greeting: "上午好👋, 状态很好，鼓励一下～",
                    start_time: 10,
                    end_time: 10
                }, {
                    greeting: "11点多啦, 在坚持一下就吃饭啦～",
                    start_time: 11,
                    end_time: 11
                }, {
                    greeting: "午安👋, 宝贝",
                    start_time: 12,
                    end_time: 14
                }, {
                    greeting: "🌈充实的一天辛苦啦！",
                    start_time: 14,
                    end_time: 18
                }, {
                    greeting: "19点喽, 奖励一顿丰盛的大餐吧🍔。",
                    start_time: 19,
                    end_time: 19
                }, {
                    greeting: "晚上好👋, 在属于自己的时间好好放松😌~",
                    start_time: 20,
                    end_time: 24
                }];
            let t = document.createElement("div");
            t.id = "greeting", setTimeout((() => {
                t.classList.add("shown")
            }), 1e3);
            let i = document.querySelector("#greetingBox");
            i.appendChild(t);
            const n = (new Date).getHours();
            let r = "晚上好👋";
            for (let t = 0; t < e.length; t++) if (n >= e[t].start_time && n <= e[t].end_time) {
                r = e[t].greeting;
                break
            }
            t.innerHTML = r, setTimeout((() => {
                t.classList.remove("shown"), setTimeout((() => {
                    i.remove()
                }), 500)
            }), 3e3)
        })()
    </script>
</th:block>