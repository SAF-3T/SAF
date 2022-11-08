using SAF_3T.Domains;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Interfaces
{
    interface IUsuarioRepository 
    {
        void Cadastrar(Usuario novoUsuario);
        List<Usuario> ListarTodos();
        public Usuario Login(string CPF, string Senha);
        void Deletar(int idUsuario);
        Usuario BuscarPorId(int idUsuario);
        Usuario BuscarPorCPF(string CPFUsuario);
        Usuario BuscarPorNumero(string NumeroUsuario);
        void AlterarSenha(int idRecebido, Usuario novaSenha);
        void ExcluirFoto(int idRecebido);
        void AtualizarFoto(int idRecebido, string arquivo);
        List<Usuario> BuscarPorCargo(int idRecebido);
        bool VerificaDisponibilidade(Usuario tentativaDeCadastro);
    }
}
