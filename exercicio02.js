//Gabriel Rodrigues
class HeapTarefas {
  constructor(capacidade) {
    this.capacidade = capacidade;
    this.heap = [];
  }

  _pai(i) { return Math.floor((i - 1) / 2); }
  _esq(i) { return 2 * i + 1; }
  _dir(i) { return 2 * i + 2; }

  _subir(i) {
    while (i > 0 && this.heap[this._pai(i)].prioridade < this.heap[i].prioridade) {
      [this.heap[i], this.heap[this._pai(i)]] = [this.heap[this._pai(i)], this.heap[i]];
      i = this._pai(i);
    }
  }

  _descer(i) {
    let maior = i;
    const esq = this._esq(i);
    const dir = this._dir(i);

    if (esq < this.heap.length && this.heap[esq].prioridade > this.heap[maior].prioridade)
      maior = esq;
    if (dir < this.heap.length && this.heap[dir].prioridade > this.heap[maior].prioridade)
      maior = dir;

    if (maior !== i) {
      [this.heap[i], this.heap[maior]] = [this.heap[maior], this.heap[i]];
      this._descer(maior);
    }
  }

  inserir(tarefa) {
    if (this.heap.length >= this.capacidade) {
      console.log("Heap cheio.");
      return;
    }
    if (this.buscar(tarefa.descricao)) {
      console.log(`Tarefa '${tarefa.descricao}' já existe.`);
      return;
    }
    this.heap.push(tarefa);
    this._subir(this.heap.length - 1);
  }

  buscar(descricao) {
    return this.heap.some(t => t.descricao === descricao);
  }

  removerMaisUrgente() {
    if (this.heap.length === 0) return null;
    const raiz = this.heap[0];
    const ultimo = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = ultimo;
      this._descer(0);
    }
    return raiz;
  }

  listar() {
    const copia = [...this.heap];
    copia.sort((a, b) => b.prioridade - a.prioridade);
    for (const t of copia) {
      console.log(`${t.descricao} (prioridade ${t.prioridade})`);
    }
  }
}

// Teste
const fila = new HeapTarefas(10);

fila.inserir({ descricao: "Trocar cabo do servidor", prioridade: 80 });
fila.inserir({ descricao: "Atualizar antivírus", prioridade: 40 });
fila.inserir({ descricao: "Resolver bug na rede", prioridade: 90 });
fila.inserir({ descricao: "Trocar cabo do servidor", prioridade: 85 }); // Duplicado

fila.removerMaisUrgente();

console.log("Fila atual:");
fila.listar();
// Esperado: Trocar cabo..., Atualizar antivírus
