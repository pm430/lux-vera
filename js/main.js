// 후원 링크 열기
function openSponsor(type) {
    const links = {
        toss: 'https://toss.me/yourusername', // 본인의 토스 링크로 변경
        kakaopay: 'https://qr.kakaopay.com/yourid', // 본인의 카카오페이 링크로 변경
        github: 'https://github.com/sponsors/yourusername' // 본인의 GitHub Sponsors 링크로 변경
    };
    
    if (links[type]) {
        window.open(links[type], '_blank');
    } else {
        alert('준비 중입니다!');
    }
}

// 페이지 로드 시 애니메이션
$(document).ready(function() {
    // 카드 애니메이션
    $('.util-card').each(function(index) {
        $(this).css('opacity', '0');
        $(this).delay(index * 100).animate({
            opacity: 1
        }, 500);
    });
});

// 유틸리티 함수들
const Utils = {
    // 클립보드에 복사
    copyToClipboard: function(text) {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(text).then(function() {
                alert('클립보드에 복사되었습니다!');
            }).catch(function(err) {
                console.error('복사 실패:', err);
                fallbackCopy(text);
            });
        } else {
            fallbackCopy(text);
        }
        
        function fallbackCopy(text) {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.opacity = '0';
            document.body.appendChild(textarea);
            textarea.select();
            try {
                document.execCommand('copy');
                alert('클립보드에 복사되었습니다!');
            } catch (err) {
                alert('복사에 실패했습니다.');
            }
            document.body.removeChild(textarea);
        }
    },
    
    // 에러 표시
    showError: function(element, message) {
        $(element).addClass('error').removeClass('success').text(message);
    },
    
    // 성공 표시
    showSuccess: function(element, message) {
        $(element).addClass('success').removeClass('error').text(message);
    },
    
    // 결과 표시
    showResult: function(element, content) {
        $(element).removeClass('error success').text(content);
    }
};
