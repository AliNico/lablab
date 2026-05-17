// 1. Navigation & Smooth Scroll
function scrollToSection(id) {
    document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

// 2. Scroll Reveal Animations
function revealOnScroll() {
    const reveals = document.querySelectorAll('.reveal');
    const windowHeight = window.innerHeight;
    
    reveals.forEach(reveal => {
        const elementTop = reveal.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
            
            // Trigger the typing animation ONLY when the letter section is scrolled into view
            if(reveal.classList.contains('envelope-container') && !isTypingStarted) {
                typeLetter();
                isTypingStarted = true;
            }
        }
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll(); // Trigger once on load in case elements are already visible

// 3. Typing Animation for Love Letter
/* YOUR UPDATED LETTER TEXT */
const letterText = "Dear lablab,\n\nfirst of all, I MISS YOU COOMEREEEE BALIK KA NA KJASHFJHGASGFDHASGDJ!!!!!!!! okay tapos nako mag tantrums hehe. Okay, zerious na po. Three months, who would've thought? I know that we have been struggling lately, but i'm happy. I'm happy that we still find a reason to stay, to hold on to each other even at challenging times. Thank you for your patience, support, and understanding lab. I know i've been hard to deal with, so thank you for staying, for trying with me kahit na there are 10 billion reazons to give up. i hope to love you more and more. I wish now that we can never stop loving and caring for each other.\n\nmahal kita lablab";
let i = 0;
let isTypingStarted = false;

function typeLetter() {
    if (i < letterText.length) {
        const char = letterText.charAt(i);
        // Safely handle line breaks
        if (char === '\n') {
            document.getElementById("typewriter-text").innerHTML += "<br>";
        } else {
            document.getElementById("typewriter-text").innerHTML += char;
        }
        i++;
        setTimeout(typeLetter, 65); // Adjust typing speed here (lower is faster)
    } else {
        // Automatically scroll to the 'memories' section 3 seconds after typing is done
        setTimeout(() => {
            scrollToSection('memories');
        }, 3000); 
    }
}

// 4. Lightbox logic for Gallery & Auto-Scroll to Reasons
const modal = document.getElementById("lightbox");
const modalImg = document.getElementById("modal-img");
const captionText = document.getElementById("modal-caption");

const viewedPics = new Set();
let hasScrolledToReasons = false;

function openModal(imgSrc, caption) {
    modal.style.display = "flex";
    // Tiny delay to ensure display:flex is registered before adding opacity class
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
    modalImg.src = imgSrc; 
    captionText.innerHTML = caption;
    
    // Track that this picture was viewed
    viewedPics.add(imgSrc);
}

function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = "none";
        
        // Check if all pictures have been viewed
        const totalPics = document.querySelectorAll('.polaroid').length;
        if (viewedPics.size >= totalPics && !hasScrolledToReasons) {
            hasScrolledToReasons = true;
            // Wait 1 second after closing the last picture, then scroll to reasons
            setTimeout(() => {
                scrollToSection('reasons');
            }, 1000);
        }
    }, 400); // Wait for CSS transition to finish
}

// Close lightbox if user clicks anywhere outside the image
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        closeModal();
    }
});

// 5. Reasons Reveal, Floating Heart Interactions & Auto-Scroll to Music
const clickedReasons = new Set();
let hasScrolledToMusic = false;

function showReason(button, message) {
    // Soft squeeze animation on click
    button.style.transform = "scale(0.95)";
    
    setTimeout(() => {
        button.innerHTML = message;
        button.style.transform = "scale(1)";
        button.style.backgroundColor = "rgba(255, 255, 255, 0.9)";
        button.style.color = "#c4607f";
        button.style.fontWeight = "bold";
        button.style.borderColor = "#ffb6c1";
    }, 200);
    
    createFloatingHeart(button);
    
    // Track that this reason was clicked
    clickedReasons.add(message);
    
    // Check if all reasons have been clicked
    const totalReasons = document.querySelectorAll('.reason-btn').length;
    if (clickedReasons.size >= totalReasons && !hasScrolledToMusic) {
        hasScrolledToMusic = true;
        // Wait 3 seconds so she can read the final reason and see the heart float, then scroll to music
        setTimeout(() => {
            scrollToSection('music');
        }, 3000);
    }
}

// 6. Music Player Logic
let isPlaying = false;
const bgMusic = document.getElementById("bg-music");
const playPauseBtn = document.getElementById("play-pause-btn");
const vinyl = document.getElementById("vinyl-disc");

function toggleMusic() {
    if (isPlaying) {
        bgMusic.pause();
        playPauseBtn.innerText = "Play";
        vinyl.classList.remove("playing");
    } else {
        // Wrapped in a catch block in case audio file is missing
        bgMusic.play().catch(e => {
            alert("Please replace 'placeholder-audio.mp3' in the HTML with a real audio file! 🎵");
        });
        playPauseBtn.innerText = "Pause";
        vinyl.classList.add("playing");
    }
    isPlaying = !isPlaying;
}

// 7. Ambient Petals & Heart Generation
function createPetals() {
    const container = document.querySelector('.petal-container');
    const petalCount = 15; // Number of floating petals
    
    for(let j = 0; j < petalCount; j++) {
        let petal = document.createElement('div');
        petal.classList.add('petal');
        petal.style.left = Math.random() * 100 + 'vw';
        petal.style.animationDuration = (Math.random() * 12 + 10) + 's';
        petal.style.animationDelay = Math.random() * 8 + 's';
        petal.style.width = (Math.random() * 15 + 12) + 'px';
        petal.style.height = petal.style.width;
        container.appendChild(petal);
    }
}
createPetals();

function createFloatingHeart(element) {
    const heart = document.createElement('div');
    heart.innerHTML = '💖';
    heart.style.position = 'absolute';
    
    const rect = element.getBoundingClientRect();
    // Position at the center top of the clicked button
    heart.style.left = (rect.left + rect.width / 2) + 'px';
    heart.style.top = (rect.top + window.scrollY) + 'px'; 
    
    heart.style.transition = 'all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    heart.style.opacity = '1';
    heart.style.zIndex = '1000';
    document.body.appendChild(heart);

    // Trigger float up
    setTimeout(() => {
        heart.style.transform = `translateY(-120px) scale(1.8)`;
        heart.style.opacity = '0';
    }, 10);

    // Cleanup DOM
    setTimeout(() => {
        heart.remove();
    }, 1500);
}

// 8. Final Cinematic Bloom Ending
function triggerBloom() {
    const overlay = document.getElementById('bloom-overlay');
    overlay.classList.add('active');
    
    overlay.innerHTML = '<h1 style="color:#c4607f; font-family:\'Playfair Display\', serif; font-size:clamp(3rem, 8vw, 5rem); text-align:center; text-shadow: 0 0 20px rgba(255,255,255,0.8); animation: fadeInUp 2s forwards;">now send me vm kisses!! duhhhhhhh!!!</h1>';
}