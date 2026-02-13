document.addEventListener('DOMContentLoaded', () => {
    // Scroll Animation (Stage Entry Effect)
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = document.querySelectorAll('.section-title, .artist-card, .news-item, .event-info-box, .article-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1)';
        observer.observe(el);
    });

    // Handle intersection changes (inline style toggle)
    const handleViewChange = () => {
        animateElements.forEach(el => {
            if (el.classList.contains('in-view')) {
                el.style.opacity = '1';
                el.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial check and on scroll
    window.addEventListener('scroll', handleViewChange);
    handleViewChange(); // Initial trigger

    // Hero Slider Logic
    const slides = document.querySelectorAll('.slide');
    let currentSlide = 0;

    function nextSlide() {
        if (!slides.length) return;
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    if (slides.length > 0) {
        setInterval(nextSlide, 5000); // Switch every 5 seconds
    }

    // Smooth Scroll for Navigation
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Dynamic Social Wall Logic ---
    const tweetPool = [
        {
            user: "メムロイロ🌽AI町おこし挑戦中",
            handle: "@memuroiro",
            avatar: "assets/img/icon_manachuri.jpg",
            body: "あ…あのこれ… 喜んでもらえるかわからないけど… チタタプして、十勝のミルクチョコレートにして作ったの。 男の子はこういうのが好きっ…",
            time: "8時間前"
        },
        {
            user: "メムロイロ🌽AI町おこし挑戦中",
            handle: "@memuroiro",
            avatar: "assets/img/icon_manachuri.jpg",
            body: "十勝式雪だるまフルボッコエクササイズ。これ、痩せたい人におすすめかも…？ #AIart #芽室町",
            time: "2日前"
        },
        {
            user: "メムロイロ🌽AI町おこし挑戦中",
            handle: "@memuroiro",
            avatar: "assets/img/icon_manachuri.jpg",
            body: "フレーム補完の機能、思わず「ハッ」としました！ みなさんの作品を見ることは、本当に学びが盛りだくさんです☺️",
            time: "2時間前"
        },
        {
            user: "メムロイロ🌽AI町おこし挑戦中",
            handle: "@memuroiro",
            avatar: "assets/img/icon_manachuri.jpg",
            body: "そう！それ！ソラチ！ 私も、家で豚丼食べるときは、小学生のときからその赤キャップです… 十勝の味！",
            time: "15時間前"
        },
        {
            user: "まなちゅり/AIコミソン運営",
            handle: "@manachurion",
            avatar: "assets/img/icon_manachuri.jpg",
            body: "公式YouTubeチャンネルを立ち上げました！AIコミソンフェスのプレミア公開はこちらで行います！登録よろしくお願い致します！",
            time: "3日前"
        },
        {
            user: "おさるなもんきち",
            handle: "@osaruna7741",
            avatar: "", // Dummy
            body: "真剣に馬鹿をやる、その心意気大好きです。 #芽室町 ってどんなところなんでしょう？ そこから見て行きたいですね。 #AIコミソンフェス",
            time: "1日前"
        },
        {
            user: "REI",
            handle: "@s_k_r_rei",
            avatar: "", // Dummy
            body: "当日は朝7時からボランティアをします(大嘘) #AIコミソンフェス 盛り上がってきました！",
            time: "2日前"
        }
    ];

    const tweetContainer = document.getElementById('tweet-container');
    const refreshBtn = document.getElementById('refresh-feed');

    function createTweetHTML(tweet) {
        const avatarHTML = tweet.avatar
            ? `<img src="${tweet.avatar}" alt="${tweet.user}" class="tweet-avatar">`
            : `<div class="tweet-avatar-dummy">${tweet.user[0]}</div>`;

        return `
            <div class="tweet-card">
                <div class="tweet-user">
                    ${avatarHTML}
                    <div class="user-meta">
                        <span class="display-name">${tweet.user}</span>
                        <span class="user-handle">${tweet.handle}</span>
                    </div>
                </div>
                <p class="tweet-body">${tweet.body}</p>
                <span class="tweet-time">${tweet.time}</span>
            </div>
        `;
    }

    function refreshFeed() {
        if (!tweetContainer) return;

        // Shuffle and pick 3
        const shuffled = [...tweetPool].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);

        // Clear and animate in
        tweetContainer.style.opacity = '0';
        setTimeout(() => {
            tweetContainer.innerHTML = selected.map(createTweetHTML).join('');
            tweetContainer.style.opacity = '1';
        }, 300);
    }

    if (refreshBtn) {
        refreshBtn.addEventListener('click', () => {
            refreshBtn.classList.add('loading');
            refreshFeed();
            setTimeout(() => refreshBtn.classList.remove('loading'), 500);
        });
    }

    // Auto-rotate every 10 seconds
    if (tweetContainer) {
        refreshFeed();
        setInterval(refreshFeed, 10000);
    }
});
