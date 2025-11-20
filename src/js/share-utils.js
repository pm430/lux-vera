// SNS 공유 유틸리티
const ShareUtils = {
    // 현재 페이지 정보 가져오기
    getPageInfo() {
        return {
            url: window.location.href,
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content') || ''
        };
    },

    // 카카오톡 공유
    shareToKakao(customText = null) {
        const pageInfo = this.getPageInfo();
        const text = customText || `${pageInfo.title}\n\n${pageInfo.description}`;

        // 카카오톡 설치 여부 확인
        const kakaoLink = `kakaolink://send?text=${encodeURIComponent(text + '\n' + pageInfo.url)}`;
        const kakaoWeb = `https://story.kakao.com/share?url=${encodeURIComponent(pageInfo.url)}`;

        // 모바일인 경우
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            window.location.href = kakaoLink;
            // 1초 후에도 페이지가 그대로면 웹 버전으로
            setTimeout(() => {
                window.open(kakaoWeb, '_blank');
            }, 1000);
        } else {
            window.open(kakaoWeb, '_blank');
        }
    },

    // 페이스북 공유
    shareToFacebook() {
        const pageInfo = this.getPageInfo();
        const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(pageInfo.url)}`;
        window.open(url, '_blank', 'width=600,height=400');
    },

    // 트위터 공유
    shareToTwitter(customText = null) {
        const pageInfo = this.getPageInfo();
        const text = customText || pageInfo.title;
        const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(pageInfo.url)}`;
        window.open(url, '_blank', 'width=600,height=400');
    },

    // 링크 복사
    async copyLink() {
        const pageInfo = this.getPageInfo();
        try {
            await navigator.clipboard.writeText(pageInfo.url);
            alert('✅ 링크가 복사되었습니다!');
            return true;
        } catch (err) {
            console.error('Failed to copy:', err);
            alert('❌ 링크 복사에 실패했습니다.');
            return false;
        }
    },

    // 네이티브 공유 (모바일)
    async nativeShare(customData = null) {
        const pageInfo = this.getPageInfo();
        const shareData = customData || {
            title: pageInfo.title,
            text: pageInfo.description,
            url: pageInfo.url
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
                return true;
            } catch (err) {
                if (err.name !== 'AbortError') {
                    console.error('Share failed:', err);
                }
                return false;
            }
        } else {
            // 네이티브 공유를 지원하지 않으면 링크 복사
            return await this.copyLink();
        }
    }
};

// 전역으로 노출
window.ShareUtils = ShareUtils;

export default ShareUtils;
