//Gabriel Rodrigues

class Aluno {
  constructor(nome, cpf) {
    this.nome = nome;
    this.cpf = cpf;
  }
}

class TabelaHashAlunos {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.tabela = new Array(capacidade).fill(null).map(() => []);
  }

  _hash(cpf) {
    let soma = 0;
    for (let i = 0; i < cpf.length; i++) {
      soma += cpf.charCodeAt(i);
    }
    return soma % this.capacidade;
  }

  inserir(aluno) {
    const indice = this._hash(aluno.cpf);
    const lista = this.tabela[indice];

    if (lista.some(a => a.cpf === aluno.cpf)) {
      console.log(`Aluno com CPF ${aluno.cpf} já está cadastrado.`);
      return;
    }

    lista.push(aluno);
  }

  buscar(cpf) {
    const indice = this._hash(cpf);
    const lista = this.tabela[indice];
    return lista.find(a => a.cpf === cpf) || null;
  }

  remover(cpf) {
    const indice = this._hash(cpf);
    const lista = this.tabela[indice];
    const index = lista.findIndex(a => a.cpf === cpf);
    if (index !== -1) {
      lista.splice(index, 1);
    }
  }

  listarOrdenado() {
    const todos = this.tabela.flat();
    todos.sort((a, b) => a.nome.localeCompare(b.nome));
    for (const aluno of todos) {
      console.log(aluno.nome);
    }
  }
}

// Teste
const tabela = new TabelaHashAlunos(10);

tabela.inserir(new Aluno("Carlos", "123"));
tabela.inserir(new Aluno("Ana", "456"));
tabela.inserir(new Aluno("Bruno", "789"));
tabela.inserir(new Aluno("Carlos", "123")); // duplicado, não insere

tabela.remover("456");

console.log("Lista ordenada por nome:");
tabela.listarOrdenado();
// Esperado: Bruno, Carlos
