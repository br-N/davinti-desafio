import { AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  async function createContato(e) {
    e.preventDefault();
    const resp = await axios.post("http://localhost:3333/contato", {
      nome: nome,
      idade: parseInt(idade),
      numero: numero,
    });
    setNome("");
    setIdade("");
    setNumero("");
    readContatos();
  }

  async function readContatos() {
    const resp = await axios.get("http://localhost:3333/contato");
    setContatos(resp.data);
  }

  async function updateContato(e) {
    e.preventDefault();
    const resp = await axios.patch("http://localhost:3333/contato", {
      id: edit.id,
      nome: nome,
      idade: parseInt(idade),
    });
    const resp2 = await axios.patch("http://localhost:3333/telefone/", {
      id: edit.Telefone[edit.Telefone.length - 1].id,
      numero: numero,
    });
    setNome("");
    setIdade("");
    setNumero("");
    setEdit("");
    readContatos();
  }

  async function deleteContato(contato) {
    const resp = await axios.delete(
      `http://localhost:3333/contato/${contato.id}`
    );
    readContatos();
  }

  const [contatos, setContatos] = useState([]);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [numero, setNumero] = useState("");
  const [edit, setEdit] = useState();

  useEffect(() => {
    readContatos();
  }, []);

  return (
    <div className="flex flex-col items-center gap-16 bg-slate-500 w-full h-screen">
      <p className="text-4xl mt-4">DESAFIO DAVINTI</p>
      <div className="flex flex-row flex-wrap mx-4 gap-32">
        {!edit ? (
          <div className="flex flex-col gap-8 text-right">
            <p className="text-2xl text-center font-semibold">
              CADASTRAR CONTATO
            </p>

            <form className="flex flex-col gap-8 text-xl">
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  onChange={(event) => {
                    setNome(event.target.value);
                  }}
                  value={nome}
                />
              </label>
              <label>
                Idade:
                <input
                  type="number"
                  name="idade"
                  onChange={(event) => {
                    setIdade(event.target.value);
                  }}
                  value={idade}
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  name="telefone"
                  onChange={(event) => {
                    setNumero(event.target.value);
                  }}
                  value={numero}
                />
              </label>
              <input
                className="bg-red-300 rounded"
                type="submit"
                value="Enviar"
                onClick={createContato}
              />
            </form>
          </div>
        ) : (
          <div className="flex flex-col gap-8 text-right">
            <p className="text-2xl text-center font-semibold">EDITAR CONTATO</p>
            <form className="flex flex-col gap-8 text-xl">
              <label>
                Nome:
                <input
                  type="text"
                  name="name"
                  onChange={(event) => {
                    setNome(event.target.value);
                  }}
                  value={nome}
                />
              </label>
              <label>
                Idade:
                <input
                  type="number"
                  name="idade"
                  onChange={(event) => {
                    setIdade(event.target.value);
                  }}
                  value={idade}
                />
              </label>
              <label>
                Telefone:
                <input
                  type="text"
                  name="telefone"
                  onChange={(event) => {
                    setNumero(event.target.value);
                  }}
                  value={numero}
                />
              </label>
              <input
                className="bg-red-300 rounded"
                type="submit"
                value="Enviar"
                onClick={updateContato}
              />
            </form>
          </div>
        )}

        <div className="flex flex-col items-center gap-8">
          <p className="text-2xl font-semibold">LISTA DE CONTATOS</p>

          <div className="flex flex-col overflow-auto h-[500px] p-8 gap-8 bg-slate-800 rounded">
            {contatos.map((contato) => {
              return (
                <div className="flex flex-col items-center text-xl bg-slate-200 rounded p-2">
                  <p>Nome: {contato.nome} </p>

                  <p>Idade: {contato.idade} anos</p>

                  <p>
                    Telefone:{" "}
                    {contato.Telefone[contato.Telefone.length - 1].numero}{" "}
                  </p>

                  <div className="flex justify-center gap-8">
                    <button
                      onClick={() => {
                        setEdit(contato);
                        setNome(contato.nome);
                        setIdade(contato.idade);
                        setNumero(
                          contato.Telefone[contato.Telefone.length - 1].numero
                        );
                      }}
                    >
                      <AiOutlineEdit size={20} color={"blue"}></AiOutlineEdit>
                    </button>
                    <button
                      onClick={() => {
                        deleteContato(contato);

                        const date = new Date();
                        console.log(
                          `O contato cujo id é ${contato.id} foi deletado em ${date}`
                        );
                      }}
                    >
                      <AiOutlineDelete
                        size={20}
                        color={"red"}
                      ></AiOutlineDelete>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
