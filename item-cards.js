const items = [
    { id: 1000, name: 'novement+', price: 2.4, description: 'the set of scripts that allow you to achieve a super smooth and realistic movement system at all', category: 'scripts' },
    { id: 2000, name: 'typing+', price: 1.8, description: 'the module allows you to improve any text in your game by adding various animations for letters, text appearance, and disappearance.', category: 'scripts' },
    { id: 3000, name: 'voice+', price: 2, description: 'integrate a custom voice chat system into the game that allows you to apply voice filters such as reverb, chorus, and more', category: 'scripts' },
    { id: 4000, name: 'smooth mouse', price: 0.8, description: 'the simple script that allows you to smoothly zoom in and out with the mouse wheel', category: 'scripts' },
    { id: 5000, name: 'handcamera toolkit', price: 1.5, description: 'fun-made handcamera camera system, has a large number of first-person settings', category: 'scripts' },
];

const itemsGrid = document.getElementById('itemsGrid');
const searchInput = document.getElementById('searchInput');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchOption = document.getElementById('search-type');

function displayItems(itemsToShow) {
    itemsGrid.innerHTML = '';
    
    itemsGrid.style.opacity = '0';
    itemsGrid.style.transform = 'translateY(20px)';
    itemsGrid.style.transition = 'opacity 0.4s ease-out';
    
    setTimeout(() => {
        itemsGrid.style.opacity = '1';
        itemsGrid.style.transform = 'translateY(0)';
    }, 50);
    
    itemsToShow.forEach((item, index) => {
        const card = document.createElement('button');
        card.className = 'item-card';
        card.dataset.category = item.category;
        card.innerHTML = `
            <h3>${item.name}</h3>
            <img class='item-icon' src="./resourses/script_icon.png" alt="script">
            <p class='description'>${item.description}</p>
            <p>price: ${item.price}$</p>
            <p>category: ${item.category}</p>
        `;
        card.style.opacity = '0';
        card.style.filter = 'blur(30px)';
        card.style.transform = 'translateY(15px) rotateX(30deg)';
        card.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
        card.style.willChange = 'opacity, filter, transform';
        
        itemsGrid.appendChild(card);
        
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.filter = 'blur(0)';
            card.style.transform = 'translateY(0) rotateX(0)';
        }, 100);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    let currentFilter = 'all'; // Добавляем переменную для хранения текущего фильтра
    let currentItems = items; // И текущий отфильтрованный список
    
    displayItems(currentItems);
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            currentFilter = btn.dataset.filter; // Сохраняем текущий фильтр
            currentItems = currentFilter === 'all' 
                ? items 
                : items.filter(item => item.category === currentFilter);
            
            displayItems(currentItems);
        });
    });
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const searchType = searchOption.value.toLowerCase();
        
        // Сначала применяем фильтр по категории
        const filteredByCategory = currentFilter === 'all' 
            ? items 
            : items.filter(item => item.category === currentFilter);
        
        // Затем применяем поиск
        const filteredItems = filteredByCategory.filter(item => 
            item[searchType].toLowerCase().includes(searchTerm)
        );
        
        displayItems(filteredItems);
    });
});
