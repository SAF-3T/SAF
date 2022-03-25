using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private readonly SAFContext ctx;

        public UsuarioRepository(SAFContext appContext)
        {
            ctx = appContext;
        }

        public Usuario BuscarPorCPF(string CPFUsuario)
        {
            throw new NotImplementedException();
        }

        public Usuario BuscarPorId(int idUsuario)
        {
           return ctx.Usuarios.FirstOrDefault(c => c.IdUsuario == idUsuario);
        }

        public Usuario BuscarPorNome(string NomeUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(c => c.Nome == NomeUsuario);
        }

        public Usuario BuscarPorNumero(string NumeroUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(c => c.Telefone == NumeroUsuario);
        }

        public void Cadastrar(Usuario novoUsuario)
        {
            ctx.Usuarios.Add(novoUsuario);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public List<Usuario> ListarTodos()
        {
            throw new NotImplementedException();
        }

        public Usuario LoginMobile(string NomeCompleto, string Telefone)
        {
            throw new NotImplementedException();
        }

        public Usuario LoginWeb(string CPF, string Senha)
        {
            throw new NotImplementedException();
        }
    }
}
