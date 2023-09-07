import data from "./database.js"

//Criação dos Cards
let cartQuantities = 0
let cartPurchase = 0

const mainCardsSection = document.querySelector('.main-cards')
const cartList = document.querySelector('.cart-list')
const tinyCards = document.querySelector('.cart-list')
const cartEmpty = document.querySelector(".cart-empty")

function createProductCards(array){
  const mainCards = document.createElement('ul')
  mainCards.classList.add('cards-list')
  mainCardsSection.appendChild(mainCards)

  let card
  for(let i = 0; i < array.length; i++){

      //Criando o card
      card = document.createElement('li')
      card.classList.add("productCard")

      //ID
      card.setAttribute('id', `product_${array[i].id}`)

      //Imagem
      let image = document.createElement('img')
      image.src = array[i].img
      image.alt = `Imagem Produto`
      card.appendChild(image)

      //Tags
      let tag = document.createElement('span')
      tag.innerText = `${array[i].tag[0]}`
      tag.classList.add("tags")
      card.appendChild(tag)

      //Nome
      let nome = document.createElement('h4')
      nome.innerText = `${array[i].nameItem}`
      card.appendChild(nome)

      //Descrição
      let description = document.createElement('p')
      description.innerText = `${array[i].description}`
      card.appendChild(description)

      //Preço
      let price = document.createElement('p')
      price.innerText = `R$ ${array[i].value},00`
      price.classList.add("value")
      card.appendChild(price)

      //Botão Adicionar ao carrinho
      let buttonAddToCart = document.createElement('button')
      buttonAddToCart.innerText = "Adicionar ao Carrinho"
      buttonAddToCart.type="button"
      buttonAddToCart.classList.add("add_to_cart")
      card.appendChild(buttonAddToCart)
      
      //ADD Evento ao card

      buttonAddToCart.addEventListener('click', function(card){
        let idElemento = array[i].id;        
        if(!verificaCard(idElemento)){

          cartQuantities++
          document.querySelector("#totalItens").innerText = `${cartQuantities}`
  
          cartPurchase+= array[i].value
          document.querySelector("#totalPurchase").innerText = `R$ ${cartPurchase},00`
         
         let cardAlternativo = searchForProducts(idElemento)   
         let elemento = createMiniCard(cardAlternativo)
          tinyCards.appendChild(elemento)
        }else{
          alert("Apenas um item por CPF")
        }
        console.log(cartList.children.length)
        if(cartList.children.length > 0){
          cartEmpty.classList.add('none');
        }
        

      })
        
      //Adicionando na section
      mainCards.appendChild(card)
    }
  }

//Função create cards

  function searchForProducts(id){
    for(let i = 0; i<data.length ; i++){
        if(data[i].id == id ){
            return data[i]
        }
    }
  }

  function createMiniCard(element){
        
    let miniCard = document.createElement('li')
    miniCard.classList.add("cartCard")
    miniCard.setAttribute('id',`miniCard_${element.id}`)

    let div1 = document.createElement('div')
    div1.classList.add("miniImage")
    let div2 = document.createElement('div')
    div2.classList.add("miniCard")

    //Mini Imagem
    let tinyImage = document.createElement('img')
    tinyImage.src = element.img
    tinyImage.alt = `Imagem Produto`
    div1.appendChild(tinyImage)
      
    //MiniCard
    let miniName = document.createElement("p")
    miniName.innerText =`${element.nameItem}`
    div2.appendChild(miniName)

    let miniPrice = document.createElement("p")
    miniPrice.innerText = `R$${element.value},00`
    div2.appendChild(miniPrice)

    let buttonRemoveFromCart= document.createElement('button')
    buttonRemoveFromCart.innerText = "Remover"
    buttonRemoveFromCart.type="button"
    buttonRemoveFromCart.classList.add("remove_from_cart")

    buttonRemoveFromCart.addEventListener('click',
function(){
    //Removendo elemento Pai
      let father = document.querySelector(`#miniCard_${element.id}`)
      father.remove();

      if(cartList.children.length == 0){
        cartEmpty.classList.remove('none');
      }
  
    //Atualizando quantidades
       cartQuantities--
        document.querySelector("#totalItens").innerText = `${cartQuantities}`

        cartPurchase-= element.value
        document.querySelector("#totalPurchase").innerText = `R$ ${cartPurchase},00`
      
})
div2.appendChild(buttonRemoveFromCart)

      miniCard.appendChild(div1)
      miniCard.appendChild(div2)

      return miniCard
  }

//Função verifica cards

  function verificaCard(id){
  let pseudoCard = document.querySelector('#miniCard_'+id);
  if(pseudoCard == null){
      return false;
  }else{
    return true;
  }
}


//Criação dos Botões de Filtro

function removeCardSection(){
   let sectionToBeRemoved = document.querySelector('.cards-list')
   sectionToBeRemoved.remove()
}


function filter(tag){
 if(tag === "Todos"){
  return data
 }

 let productsFiltered=[]
 
 for(let i=0; i<data.length; i++){
  if(data[i].tag[0] === tag){
    productsFiltered.push(data[i])
  }
}
return productsFiltered
}

let allButton = document.getElementById('allProducts')
allButton.addEventListener("click", function(){
  const cardsFiltered = filter("Todos");
  removeCardSection();
  createProductCards(cardsFiltered);
})

let accessoryButton = document.getElementById('accessory')
accessoryButton.addEventListener("click", function(){
  const cardsFiltered = filter("Acessórios");
  removeCardSection();
  createProductCards(cardsFiltered);
})

let shirtButton = document.getElementById('shirt')
shirtButton.addEventListener("click", function(){
  const cardsFiltered = filter("Camisetas");
  removeCardSection();
  createProductCards(cardsFiltered);
})

//Configuração da Barra de pesquisa
function findProductBySearch(){
  let value = document.querySelector(".search-input").value
  let search = value.replace(' ','')
  let search2= search.toLowerCase()

  let searchItem =[];
  for(let i=0; i<data.length; i++){
    let productName = data[i].nameItem.replace(' ','')
    let nameProduct = productName.toLowerCase()
    let tagMin = data[i].tag[0].toLowerCase()

    if(nameProduct == search2 ||tagMin == search2 ){
      searchItem.push(data[i])
    }
  }
  return searchItem

}

let searchButton = document.querySelector(".search-button")
searchButton.addEventListener('click',
function(){
  let resultado = findProductBySearch()
  removeCardSection();
  createProductCards(resultado);
  
  if(resultado.length == 0){
    alert("Não há resultados compativeis com a pesquisa")
  }
})


createProductCards(data)
