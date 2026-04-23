<div class="card-widget heo-right-widget" id="card-wechat">
    <div id="flip-wrapper">
        <div id="flip-content">
            <div class="face"></div>
            <div class="back face"></div>
        </div>
    </div>

    <style>
        #aside-content .card-widget#card-wechat {
            background: [()];
        }
        #aside-content .card-widget#card-wechat::before {
            position: absolute;
            width: 100%;
            height: 90%;
            left: 0;
            top: 0;
            background: url() center center no-repeat;
            content: '';
            background-size: cover;
            transition: .2s cubic-bezier(.45,.04,.43,1.21)
        }
        #aside-content .card-widget#card-wechat:hover:before {
            top: 100%;
            opacity: 0;
            transition: .3s ease-out
        }

    </style>
</div>
