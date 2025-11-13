/**
 * share.js - Social media sharing functionality
 */

const ShareUtils = (function() {

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
                if (typeof Utils !== 'undefined') {
                    Utils.toast('✅ 공유되었습니다!');
                }
            }).catch((error) => {
                console.log('Share failed:', error);
            });
        } else {
            // Web Share API 미지원시 링크 복사
            copyLink();
        }
    }

    // 링크 복사
    function copyLink() {
        const url = window.location.href;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(url).then(() => {
                if (typeof Utils !== 'undefined') {
                    Utils.toast('🔗 링크가 복사되었습니다!');
                } else {
                    alert('링크가 복사되었습니다!');
                }
            }).catch(() => {
                fallbackCopyLink(url);
            });
        } else {
            fallbackCopyLink(url);
        }
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
            if (typeof Utils !== 'undefined') {
                Utils.toast('🔗 링크가 복사되었습니다!');
            } else {
                alert('링크가 복사되었습니다!');
            }
        } catch (err) {
            if (typeof Utils !== 'undefined') {
                Utils.toast('❌ 복사에 실패했습니다.');
            } else {
                alert('복사에 실패했습니다.');
            }
        }

        document.body.removeChild(textarea);
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

    // 공유 버튼 HTML 생성
    function createShareButtons() {
        return `
            <div class="share-buttons">
                <button class="share-btn" onclick="ShareUtils.shareToFacebook()" title="페이스북 공유">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                </button>
                <button class="share-btn" onclick="ShareUtils.shareToTwitter()" title="트위터 공유">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                </button>
                <button class="share-btn" onclick="ShareUtils.shareToKakao()" title="카카오톡 공유">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 01-1.727-.11l-4.408 2.883c-.501.265-.678.236-.472-.413l.892-3.678c-2.88-1.46-4.785-3.99-4.785-6.866C1.5 6.665 6.201 3 12 3z"/>
                    </svg>
                </button>
                <button class="share-btn" onclick="ShareUtils.copyLink()" title="링크 복사">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                </button>
            </div>
        `;
    }

    // 공유 섹션 삽입
    function insertShareSection(targetElement) {
        if (typeof targetElement === 'string') {
            targetElement = document.querySelector(targetElement);
        }

        if (!targetElement) return;

        const shareSection = document.createElement('div');
        shareSection.className = 'share-section';
        shareSection.innerHTML = `
            <h3 class="share-title">이 페이지 공유하기</h3>
            ${createShareButtons()}
        `;

        targetElement.appendChild(shareSection);
    }

    return {
        shareToFacebook,
        shareToTwitter,
        shareToKakao,
        copyLink,
        createShareButtons,
        insertShareSection
    };
})();
