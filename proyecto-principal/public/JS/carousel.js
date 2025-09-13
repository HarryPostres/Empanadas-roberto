const images = document.querySelector('.carousel-images');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
const total = images.children.length;

nextBtn.addEventListener('click', () => {
    index = (index + 1) % total;
    images.style.transform = `translateX(-${index * 100}%)`;
});

prevBtn.addEventListener('click', () =>{
    index = (index - 1 +total) % total;
    images.style.transform = `translateX(-${index * 100}%)`;
})
