const menu = document.getElementById('menu');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const closeModalBtn = document.getElementById('close-modal-btn');
const cartCounter = document.getElementById('cart-count');
const adressInput = document.getElementById('adress')
const adressWarn = document.getElementById('adress-warn');

let cart = [];

//abrindo modal carrinho
cartBtn.addEventListener('click', () => {
    //toda vez que clicar no carrinho, sera atualizado.
    updateCartModal();

    cartModal.style.display = 'flex'
});

//fechar modal quando clicar fora
cartModal.addEventListener('click', (event) => {
    if (event.target === cartModal) {
        cartModal.style.display = 'none'
    }
});

closeModalBtn.addEventListener('click', () => {
    cartModal.style.display = 'none'
});

menu.addEventListener('click', (event) => {
    let parentButton = event.target.closest('.add-to-cart-btn')
    if (parentButton) {
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price'))
        addToCart(name, price)
    }
});

//Função para criar os itens que serão colocados no carrinho
function addToCart(name, price) {
    const existingItem = cart.find(item => item.name === name)

    if (existingItem) {
        existingItem.qtd += 1
    } else {
        cart.push({
            name,
            price,
            qtd: 1,
        })

        updateCartModal()
    }
};


//Atualiza o carrinho
function updateCartModal() {
    cartItemsContainer.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('flex', 'justfy-between', 'mb-4', 'flex-col')

        cartItemElement.innerHTML = `
        <div class='flex items-center justify-between'>
            <div>
                <p class='font-medium'>${item.name}</p>
                <p>Qtd:${item.qtd}</p>
                <p class='font-medium mt-2'>R$${item.price.toFixed(2)}</p>
            </div> 

            <button class='remove-from-cart-btn' data-name='${item.name}'>
                remover
            </button>
        </div>            
        `

        total += item.price * item.qtd;

        cartItemsContainer.appendChild(cartItemElement);
    });

    //transformando o total em reais br
    cartTotal.textContent = total.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });

    cartCounter.innerHTML = cart.length;
};

//Função para remover o item do carrinho

cartItemsContainer.addEventListener('click', (event) => {
    //pegando o nome do item dentro do Button 'remove-from-cart-btn'
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const name = event.target.getAttribute('data-name');

        removeItemCart(name);
    }
})

function removeItemCart(name) {
    const index = cart.findIndex(item => item.name === name);

    //-1 porque o findIndex retorna -1 quando nao acha nada
    if (index !== -1) {
        const item = cart[index];

        if (item.qtd > 1) {
            item.qtd -= 1;
            updateCartModal();
            return;
        }
        //splice remove um item de um array
        //e precisa do (index ,itens a serem removidos)
        cart.splice(index, 1);
        updateCartModal();
    }
}

adressInput.addEventListener('input', (event) => {
    let inputValeu = event.target.value

    if(inputValeu !== ''){
        adressInput.classList.remove('border-red-500');
        adressWarn.classList.add('hidden')
    }
})

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) return;
    if (adressInput.value === '') {
        adressWarn.classList.remove('hidden')
        adressInput.classList.add('border-red-500')
    }
})