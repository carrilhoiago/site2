document.addEventListener('DOMContentLoaded', function() {
    const stars = document.querySelectorAll('.stars span');
    const feedbackDiv = document.getElementById('feedback');
    const commentTextarea = document.getElementById('comment');
    const submitButton = document.getElementById('submit');

    stars.forEach(star => {
        star.addEventListener('click', function() {
            const value = parseInt(this.getAttribute('data-value'));

            // Remove active class from all stars
            stars.forEach(s => s.classList.remove('active'));

            // Add active class to clicked star and previous stars
            for (let i = 0; i < value; i++) {
                stars[i].classList.add('active');
            }

            if (value === 5) {
                window.location.href = 'https://www.youtube.com/watch?v=sJ0BH_BEVJA';
            } else {
                feedbackDiv.classList.remove('hidden');
            }
        });
    });

    submitButton.addEventListener('click', function() {
        const selectedStars = document.querySelectorAll('.stars span.active').length;
        const comment = commentTextarea.value;

        // Aqui você pode adicionar a lógica para salvar a avaliação e o comentário em um arquivo TXT
        // Exemplo de como você pode fazer isso com JavaScript puro (não recomendado para produção):
        const blob = new Blob([`Nota: ${selectedStars}\nComentário: ${comment}`], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'feedback.txt';
        a.click();

        alert('Obrigado pelo seu feedback!');
        feedbackDiv.classList.add('hidden');
        commentTextarea.value = '';
        stars.forEach(s => s.classList.remove('active'));
    });
});