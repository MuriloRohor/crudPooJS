class Produto {
    constructor() {
        this.id = 1;
        this.arrayProdutos = [];
        this.editId = null;
    }

    salvar() {
        let produto = this.lerDados();

        if (this.validaCampos(produto)) {
            if(this.editId == null) {
                this.adicionar(produto);
            } else {
                this.adicionar.atualizar(this.editId, produto);
            }
        }
        this.listaTabela();
        this.cancelar();
    }

    cancelar() {
        document.getElementById('produto').value = '';
        document.getElementById('valor').value = '';

    }

    validaCampos(produto) {
        let msg = '';

        if (produto.nomeProduto == '') {
            msg += '- Informe o nome do Produto \n';
        }
        if (produto.valor == '') {
            msg += '- Informe o valor do Produto \n';
        }
        if (msg != '') {
            alert(msg);
            return false
        }
        return true;
    }

    lerDados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeProduto = document.getElementById('produto').value;
        produto.valor = document.getElementById('valor').value;

        return produto;
    }

    adicionar(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    atualizar(id, produto) {
        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if(this.arrayProdutos[i].id == id) {
                this.arrayProdutos[i].nomeProduto = produto.nomeProduto;
                this.arrayProdutos[i].valor = produto.valor;            
            }
        }
    }

    deletar(id) {
        if (confirm(`Deseja deletar o Item ${id} ?`)) {
            let tbody = document.getElementById('tbody');

            for (let i = 0; i < this.arrayProdutos.length; i++) {
                if (this.arrayProdutos[i].id == id) {
                    this.arrayProdutos.splice(i, 1);
                    tbody.deleteRow(i);
                }
            }
        }
    }

    prepararEdit(dados) {
        this.editId = dados.id;

        document.getElementById('produto').value = dados.nomeProduto;
        document.getElementById('valor').value = dados.valor;
        document.getElementById('btn1').innerText = 'Atualizar';
    }

    listaTabela() {
        let tbody = document.getElementById('tbody');
        tbody.innerText = ''

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_valor = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeProduto;
            td_valor.innerText = this.arrayProdutos[i].valor;

            td_id.classList.add('center')
            td_acoes.classList.add('center')

            let imgEdit = document.createElement('img');
            imgEdit.src = 'icons/edit.svg';
            imgEdit.setAttribute("onclick", "produto.prepararEdit(" + JSON.stringify(this.arrayProdutos[i]) + ")");

            let imgDelet = document.createElement('img');
            imgDelet.src = 'icons/delete.svg';
            imgDelet.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");


            td_acoes.appendChild(imgDelet);
            td_acoes.appendChild(imgEdit);
        }
    }
}

var produto = new Produto();