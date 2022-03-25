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
        public Usuario LoginWeb(string CPF, string Senha);
        public Usuario LoginMobile(string CPF, string Telefone);
        void Deletar(int idUsuario);
        Usuario BuscarPorId(int idUsuario);
        Usuario BuscarPorNome(string NomeUsuario);
        Usuario BuscarPorCPF(string CPFUsuario);
        Usuario BuscarPorNumero(string NumeroUsuario);

    }
}
