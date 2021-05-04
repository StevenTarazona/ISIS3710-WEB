const url =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

fetch(url)
  .then((response) => response.json())
  .then((response) => {
    let cart = [];
    let total = 0;

    let nav = document.getElementById("nav");

    response.forEach((element) => {
      let li = document.createElement("li");
      li.className = "nav-item";
      let a = document.createElement("a");
      a.className = "nav-link";
      a.innerText = element.name;
      a.href = "#";
      a.addEventListener("click", function (e) {
        e.preventDefault();
        displayCards(element);
      });
      li.append(a);
      nav.append(li);
    });

    document.getElementById("cart").addEventListener("click", (e) => {
      e.preventDefault();
      displayCart("");
    });

    function displayCards(element) {
      document.getElementById("title").innerText = element.name;
      let products = element.products;
      let cards = document.getElementById("data");
      cards.innerHTML = "";
      cards.className = "row mb-4";
      for (let index = 0; index < products.length; index++) {
        let div = document.createElement("div");
        div.className = "col-lg-3 col-sm-6 mb-4";
        let card = document.createElement("div");
        card.className = "card";
        let img = document.createElement("img");
        img.className = "card-img-top";
        img.src = products[index].image;
        img.alt = element.name;
        card.append(img);

        let cBody = document.createElement("div");
        cBody.className = "card-body";

        let cTitle = document.createElement("h4");
        cTitle.className = "card-title";
        cTitle.innerText = products[index].name;
        cBody.append(cTitle);

        let cText = document.createElement("p");
        cText.className = "card-text";
        cText.innerText = products[index].description;
        cText.className = "description";
        let cPrice = document.createElement("b");
        cPrice.innerText = "$" + products[index].price;
        cPrice.className = "price";
        cText.append(document.createElement("br"));
        let cTextP = document.createElement("p");
        cTextP.append(cPrice);
        cBody.append(cText);
        cBody.append(cTextP);

        cBody.append(document.createElement("br"));
        cBody.append(newBtn("add to cart", addToCart));

        card.append(cBody);
        div.append(card);
        cards.append(div);
      }
    }

    document.getElementById("confirm").addEventListener("click", cleanCart);
    function cleanCart() {
      cart = [];
      total = 0;
      document.getElementById("numItems").innerText = 0;
      displayCart();
    }

    function confirm() {
      console.log(cart);
      cleanCart();
    }

    function displayCart() {
      let data = document.getElementById("data");
      data.innerHTML = "";
      let table = document.createElement("table");
      table.className = "table table-striped";
      let thead = document.createElement("thead");
      thead.append(
        addRow(["item", "Qty.", "Description", "Unit Price", "Amount"], "th")
      );
      let tbody = document.createElement("tbody");
      for (let index = 0; index < cart.length; index++) {
        tbody.append(addRow(cart[index], "td"));
      }
      table.append(thead);
      table.append(tbody);
      data.append(table);

      let row = document.createElement("div");
      row.className = "row w-100";
      let col1 = document.createElement("div");
      col1.className = "col-auto mr-auto";
      let totalT = document.createElement("b");
      totalT.innerText = "Total: $" + total.toFixed(2);
      col1.append(totalT);
      let col2 = document.createElement("div");
      col2.className = "col-auto";
      let cancel = newBtn("cancel");
      cancel.setAttribute("data-toggle", "modal");
      cancel.setAttribute("data-target", "#myModal");
      cancel.className = "btn redBtn";
      col2.append(cancel);
      let col3 = document.createElement("div");
      col3.className = "col-auto";
      let confirmOrd = newBtn("confirm order", confirm);
      confirmOrd.className = "btn yellowBtn";
      col3.append(confirmOrd);
      row.append(col1);
      row.append(col2);
      row.append(col3);
      data.append(row);
    }

    function addToCart(e) {
      e.preventDefault();
      let elements = e.target.closest("div");
      const title = elements.querySelector(".card-title").innerText;
      const price = parseFloat(
        elements.querySelector(".price").innerText.slice(1)
      );
      const found = cart.find((element) => element.Description == title);
      if (!found) {
        const row = {
          item: cart.length + 1,
          Qty: 1,
          Description: title,
          "Unit Price": price,
          Amount: price,
        };
        cart.push(row);
      } else {
        found.Qty++;
        found.Amount = (found.Amount+price).toFixed(2);
      }
      total += price;
      let numItems = document.getElementById("numItems");
      numItems.innerText = parseInt(numItems.innerText) + 1;
    }

    //Crea una nueva fila
    function addRow(data, tag) {
      let row = document.createElement("tr");
      Object.keys(data).forEach((j) => {
        let element = document.createElement(tag);
        element.innerText = data[j];
        row.append(element);
      });
      return row;
    }

    //Crea un nuevo boton
    function newBtn(name, click) {
      let btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-dark " + name.replace(/\s+/g, "");
      btn.innerText = name[0].toUpperCase() + name.slice(1);
      btn.addEventListener("click", click);
      return btn;
    }
  });
