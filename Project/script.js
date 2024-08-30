document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter-value');
    const speed = 200; 

    const startCounting = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-count');
            const count = +counter.innerText;

            const increment = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + increment);
                setTimeout(updateCount, 20);
            } else {
                counter.innerText = target;
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                startCounting(counter);
                observer.unobserve(counter); 
            }
        });
    }, { threshold: 0.5 }); 

    counters.forEach(counter => {
        observer.observe(counter);
    });
});

function changeCarousel(id) {
    let clientname = ['Amanda Mortan', 'Abdullah'];
    let clientRole = ['Head manager, Slack', 'Team Leader, Vintorix'];
    let feedback = ['Everything was so nice. Food was really great as they say. Easy to order, great service, and whole environment was very unique. Happy to make a visit in Epicurean.', 'Everything was so nice. Food was really great as they say. Easy to order, great service, and whole environment was very unique. Happy to make a visit in Epicurean.'];

    let image = document.getElementById("test-img");
    let name = document.getElementById("test-name");
    let role = document.getElementById("test-role");
    let feed = document.getElementById('test-feed');

    
    image.classList.add('fade-out');
    name.classList.add('fade-out');
    role.classList.add('fade-out');
    feed.classList.add('fade-out');

    
    setTimeout(() => {
        
        image.src = `assets/images/testimonal/testimonial-${id}.png`;
        name.innerText = clientname[id-1];
        role.innerText = clientRole[id-1];
        feed.innerText = feedback[id-1];

        
        image.classList.remove('fade-out');
        name.classList.remove('fade-out');
        role.classList.remove('fade-out');
        feed.classList.remove('fade-out');

        image.classList.add('fade-in');
        name.classList.add('fade-in');
        role.classList.add('fade-in');
        feed.classList.add('fade-in');

        
        setTimeout(() => {
            image.classList.remove('fade-in');
            name.classList.remove('fade-in');
            role.classList.remove('fade-in');
            feed.classList.remove('fade-in');
        }, 200); 

    }, 200); 

    changeActive(id);
}


function changeActive(clickedId) {
    
    const buttons = document.querySelectorAll('.carousal-btn button');

    
    buttons.forEach(button => button.classList.remove('active'));

    
    const clickedButton = document.getElementById(clickedId);
    clickedButton.classList.add('active');
}

function changeHero(pt) {
    let imgOption = pt.querySelectorAll('img');
    let image = document.getElementById("hero-img");
    
    
    let activeImg = pt.querySelector('.active');
    let imgNum = parseInt(activeImg.src.split("/")[6].split("-")[1].split(".")[0]);

    
    let nextIndex = (imgNum % imgOption.length); 

    
    activeImg.classList.remove('active');

    
    imgOption[nextIndex].classList.add('active');

    
    image.src = imgOption[nextIndex].src;
}

function handleForm(event) {
    event.preventDefault(); 

    const formData = new FormData(event.target); 

    fetch('submit.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.text()) 
    .then(result => {
        console.log('Success:', result);
        alert('Form submitted successfully!'); 
        
        event.target.reset();
    })
    .catch(error => {
        console.error('Error:', error);
        alert('There was an error submitting the form.'); 
    });
}

