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
            amount: -3686,
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

    formatData(){
        console.log("Formatar os dados");
    },

    validateField() {
        const { description, amount, date } = this.getValues();

        if ( description.trim() === "" || amount.trim() === "" ||  date.trim() === "") {
            throw new Error("Por favor, preencha todos os campos");
        }
    },

    submit(event) {
        event.preventDefault();

        try {
            // Check the fields
            Form.validateField();

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

