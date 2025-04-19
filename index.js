document.addEventListener('DOMContentLoaded', () => {
    // Like functionality
    const likeButtons = document.querySelectorAll('.like-btn');
    likeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const likeCount = this.querySelector('span');
            const currentCount = parseInt(likeCount.textContent);
            
            if (this.classList.contains('liked')) {
                likeCount.textContent = (currentCount - 1).toString();
                this.classList.remove('liked');
            } else {
                likeCount.textContent = (currentCount + 1).toString();
                this.classList.add('liked');
            }
        });
    });

    // Comment functionality
    const commentButtons = document.querySelectorAll('.comment-btn');
    commentButtons.forEach(button => {
        button.addEventListener('click', function() {
            const commentCount = this.querySelector('span');
            const currentCount = parseInt(commentCount.textContent);
            commentCount.textContent = (currentCount + 1).toString();
            
            // You can add a comment modal or form here
            alert('Comment feature clicked! Add your comment functionality here.');
        });
    });

    // Share functionality
    const shareButtons = document.querySelectorAll('.share-btn');
    shareButtons.forEach(button => {
        button.addEventListener('click', function() {
            // You can customize the share functionality here
            if (navigator.share) {
                navigator.share({
                    title: 'Check out this video!',
                    text: 'I found this interesting video',
                    url: window.location.href
                })
                .catch(error => console.log('Error sharing:', error));
            } else {
                alert('Share feature clicked! Add your custom share functionality here.');
            }
        });
    });
});
