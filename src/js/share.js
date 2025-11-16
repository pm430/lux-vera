import Utils from './utils.js';

// 현재 페이지 정보 가져오기
function getPageInfo() {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(document.title);
    const description = encodeURIComponent(
        document.querySelector('meta[name="description"]')?.content ||
        document.title
    );

    return { url, title, description };
}

// 공유 창 열기
function openShareWindow(url) {
    const width = 600;
    const height = 400;
    const left = (window.screen.width - width) / 2;
    const top = (window.screen.height - height) / 2;

    window.open(
        url,
        'share',
        `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
    );
}

// 페이스북 공유
function shareToFacebook() {
    const { url } = getPageInfo();
    const shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
    openShareWindow(shareUrl);
}

// 트위터 공유
function shareToTwitter() {
    const { url, title } = getPageInfo();
    const shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
    openShareWindow(shareUrl);
}

// 링크 복사 대체 방법
function fallbackCopyLink(url) {
    const textarea = document.createElement('textarea');
    textarea.value = url;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    try {
        document.execCommand('copy');
        Utils.toast('🔗 링크가 복사되었습니다!');
    } catch (err) {
        Utils.toast('❌ 복사에 실패했습니다.');
    }

    document.body.removeChild(textarea);
}


// 링크 복사
function copyLink() {
    const url = window.location.href;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => {
            Utils.toast('🔗 링크가 복사되었습니다!');
        }).catch(() => {
            fallbackCopyLink(url);
        });
    } else {
        fallbackCopyLink(url);
    }
}

// 카카오톡 공유 (Web Share API 또는 링크 복사)
function shareToKakao() {
    const { url, title, description } = getPageInfo();

    // Web Share API 지원 여부 확인
    if (navigator.share) {
        navigator.share({
            title: decodeURIComponent(title),
            text: decodeURIComponent(description),
            url: decodeURIComponent(url)
        }).then(() => {
            Utils.toast('✅ 공유되었습니다!');
        }).catch(() => {
            // Share failed silently
        });
    } else {
        // Web Share API 미지원시 링크 복사
        copyLink();
    }
}

const ShareUtils = {
    shareToFacebook,
    shareToTwitter,
    shareToKakao,
    copyLink
};

export default ShareUtils;