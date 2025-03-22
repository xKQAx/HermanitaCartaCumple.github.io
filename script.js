document.addEventListener('DOMContentLoaded', function() {
    const book = document.getElementById('book');
    const cover = document.getElementById('cover');
    const openBtn = document.getElementById('openBtn');
    const closeBtn = document.getElementById('closeBtn');
    const returnHint = document.querySelector('.return-hint');
    const page = document.getElementById('page');
    const pageContent = document.querySelector('.page-content');
    const borderDecoration = document.querySelector('.border-decoration');
    const flowerDecorations = document.querySelectorAll('.flower-decoration');
    const cornerDecorations = document.querySelectorAll('.corner-decoration');
    
    // Función para ajustar el borde decorativo dinámicamente
    function adjustBorder() {
        // Asegurar que el borde se ajuste al contenido
        const contentHeight = pageContent.offsetHeight;
        const pageHeight = page.offsetHeight;
        
        // Si hay scroll, ajustar el borde para cubrir todo el contenido
        if (contentHeight > pageHeight - 80) {
            borderDecoration.style.height = (contentHeight + 30) + 'px';
        } else {
            borderDecoration.style.height = 'auto';
        }
        
        // Ajustar las decoraciones florales
        adjustFlowerDecorations();
        
        // Ajustar las decoraciones de esquina
        adjustCornerDecorations();
    }
    
    // Función para ajustar las decoraciones florales
    function adjustFlowerDecorations() {
        const contentHeight = pageContent.offsetHeight;
        const pageHeight = page.offsetHeight;
        
        // Ajustar las decoraciones de flores inferiores
        if (contentHeight > pageHeight - 80) {
            flowerDecorations[2].style.bottom = 'auto';  // flower-3 (inferior izquierda)
            flowerDecorations[2].style.top = (contentHeight - 20) + 'px';
            
            flowerDecorations[3].style.bottom = 'auto';  // flower-4 (inferior derecha)
            flowerDecorations[3].style.top = (contentHeight - 20) + 'px';
        } else {
            flowerDecorations[2].style.bottom = '20px';
            flowerDecorations[2].style.top = 'auto';
            
            flowerDecorations[3].style.bottom = '20px';
            flowerDecorations[3].style.top = 'auto';
        }
    }
    
    // Función para ajustar las decoraciones de esquina
    function adjustCornerDecorations() {
        const contentHeight = pageContent.offsetHeight;
        const pageHeight = page.offsetHeight;
        
        // Ajustar las decoraciones de esquina inferiores
        if (contentHeight > pageHeight - 80) {
            cornerDecorations[2].style.bottom = 'auto';  // corner-bottom-left
            cornerDecorations[2].style.top = (contentHeight + 10) + 'px';
            
            cornerDecorations[3].style.bottom = 'auto';  // corner-bottom-right
            cornerDecorations[3].style.top = (contentHeight + 10) + 'px';
        } else {
            cornerDecorations[2].style.bottom = '10px';
            cornerDecorations[2].style.top = 'auto';
            
            cornerDecorations[3].style.bottom = '10px';
            cornerDecorations[3].style.top = 'auto';
        }
    }
    
    // Ajustar el borde al cargar y cada vez que se redimensione la ventana
    window.addEventListener('load', adjustBorder);
    window.addEventListener('resize', adjustBorder);
    
    // Ajustar cuando haya scrolls o cambios en el contenido
    page.addEventListener('scroll', adjustBorder);
    
    // Abrir el libro al hacer clic en el botón de abrir
    openBtn.addEventListener('click', function() {
        book.classList.add('open');
        setTimeout(adjustBorder, 100); // Ajustar después de la animación
        
        // Mostrar y ocultar el mensaje de ayuda
        setTimeout(function() {
            returnHint.style.opacity = '1';
            setTimeout(function() {
                returnHint.style.opacity = '0';
            }, 3000);
        }, 1000);
    });
    
    // Cerrar el libro al hacer clic en el botón de cerrar
    closeBtn.addEventListener('click', function() {
        book.classList.remove('open');
    });
    
    // Ejecutar ajuste inicial
    adjustBorder();
});


function viewImage(src) {
    const imgOverlay = document.createElement('div');
    imgOverlay.style.position = 'fixed';
    imgOverlay.style.top = '0';
    imgOverlay.style.left = '0';
    imgOverlay.style.width = '100%';
    imgOverlay.style.height = '100%';
    imgOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    imgOverlay.style.display = 'flex';
    imgOverlay.style.justifyContent = 'center';
    imgOverlay.style.alignItems = 'center';
    imgOverlay.style.zIndex = '1000';
    imgOverlay.onclick = function() {
        document.body.removeChild(imgOverlay);
    };

    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.style.maxWidth = '90%';
    imgElement.style.maxHeight = '90%';
    imgElement.style.boxShadow = '0 0 20px rgba(0, 0, 0, 0.5)';
    imgOverlay.appendChild(imgElement);

    document.body.appendChild(imgOverlay);
}

// Add hover effect to show clickable icon
const photoSpaces = document.querySelectorAll('.photo-space');
photoSpaces.forEach(photoSpace => {
    const icon = document.createElement('i');
    icon.className = 'fas fa-search';
    icon.style.position = 'absolute';
    icon.style.fontSize = '2rem';
    icon.style.color = 'rgba(255, 255, 255, 0.8)';
    icon.style.top = '50%';
    icon.style.left = '50%';
    icon.style.transform = 'translate(-50%, -50%)';
    icon.style.opacity = '0';
    icon.style.transition = 'opacity 0.3s';
    photoSpace.appendChild(icon);

    photoSpace.addEventListener('mouseover', () => {
        icon.style.opacity = '1';
    });

    photoSpace.addEventListener('mouseout', () => {
        icon.style.opacity = '0';
    });
});

document.getElementById('photoInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const photoSpace = document.getElementById('photoSpace');
            photoSpace.style.backgroundImage = `url(${e.target.result})`;
            photoSpace.style.backgroundSize = 'cover';
            photoSpace.style.backgroundPosition = 'center';
            photoSpace.innerHTML = ''; // Remove the label text
        };
        reader.readAsDataURL(file);
    }
});