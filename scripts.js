const Modal = {
    open() {
        const modal = document.getElementsByClassName("modal-overlay");
        modal[0].classList.add("active");
    },

    close(){
        const modal = document.getElementsByClassName("modal-overlay");
        modal[0].classList.remove("active");
    }
}

const Transaction = {

    all: [
        {
            
            description: "Luz",
            amount: -50001,
            date: "06/06/2021"
        },
    
        {
            
            description: "Website",
            amount: 500000,
            date: "06/06/2021"
        },
        {
            
            description: "Água",
            amount: -20000,
            date: "06/06/2021"
        },
    
        {
            description: "Telefone",
            amount: -1000,
            date: "07/06/2021"
        }
    ],

    add(transaction) {
        Transaction.all.push(transaction);

        App.reload();
    },

    remove(index) {
        Transaction.all.splice(index, 1);
        App.reload();
    },

    incomes() {
        let income = 0;

        Transaction.all.forEach( transaction => {
            if (transaction.amount > 0) {
                income += transaction.amount;
            }
        });

        return income;
    },

    expenses() {
        let expense = 0;

        Transaction.all.forEach( transaction => {
            if (transaction.amount < 0) {
                expense += transaction.amount;
            }
        });

        return expense;
    },

    total() {
        
       return Transaction.incomes() + Transaction.expenses();
    }
}

const DOM = {
    transactionsContainer: document.querySelector("#data-table tbody"),

    addTransaction(transaction, index) {

        const tr = document.createElement("tr");
        tr.innerHTML = DOM.innerHTMLTransaction(transaction);

        DOM.transactionsContainer.appendChild(tr);
       
    },

    innerHTMLTransaction(transaction) {
        const CSSclass = transaction.amount > 0 ? "income" : "expense";
        const amount = Utils.formatCurrency(transaction.amount);

        const html = `        
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td>
                <img src="./assets/minus.svg" alt="Remover Transação" onclick="show()">
            </td>        
        `
        return html;
    },

    updateBalance() {
        document.getElementById("incomeDisplay").innerHTML = Utils.formatCurrency(Transaction.incomes());

        document.getElementById("expenseDisplay").innerHTML = Utils.formatCurrency(Transaction.expenses());

        document.getElementById("totalDisplay").innerHTML = Utils.formatCurrency(Transaction.total());
    },

    clearTransactions() {
        DOM.transactionsContainer.innerHTML = "";
    }
}

const Utils = {

    formatAmount(value) {
        value = Number(value) * 100;
        return value;
    },

    formatDate(date) {
        const splittedDate = date.split("-");
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`;
    },

    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : "";

        value = String(value).replace(/\D/g, "");
        value = Number(value) / 100;

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });

        return signal + value;
    }
}

const Form = {
    description: document.querySelector("input#description"),
    amount: document.querySelector("input#amount"),
    date: document.querySelector("input#date"),

    getValues() {
        return {
            description: this.description.value,
            amount: this.amount.value,
            date: this.date.value
        }
    },

    formatValues(){
        let { description, amount, date} = this.getValues();

        amount = Utils.formatAmount(amount);

        date = Utils.formatDate(date);

        return {
            description,
            amount,
            date
        }
    },

    validateField() {
        const { description, amount, date } = this.getValues();

        if ( description.trim() === "" || amount.trim() === "" ||  date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    saveTransaction(transaction) {
        Transaction.add(transaction);
    },

    clearFields() {
        this.description.value = "";
        this.amount.value = "";
        this.date.value = "";
    },

    submit(event) {
        event.preventDefault();

        try {
            // Check the fields
            Form.validateField();

            // formatting fields
            const transaction = Form.formatValues();

            Form.saveTransaction(transaction);

            // Clear fields form
            Form.clearFields();
            
            Modal.close();

        }catch(err) {
            alert(err.message);
        }
    }
}


const App = {
    init() {
        Transaction.all.forEach( transaction => DOM.addTransaction(transaction));

        DOM.updateBalance();
    },

    reload() {
        DOM.clearTransactions();
        this.init();
    }
}

App.init();

