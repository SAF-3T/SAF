using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using SAF_3T.Utils;

namespace SAF_3T.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        private SAFContext ctx;

        public object BCrypt { get; private set; }

        public Usuario BuscarPorCPF(string CPFUsuario)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Cpf == CPFUsuario);
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
            Criptografia.GerarHash(novoUsuario.Senha);
            ctx.Usuarios.Add(novoUsuario);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int idUsuario)
        {
            var encontrar = ctx.Usuarios.FirstOrDefault(c => c.IdUsuario == idUsuario);
            ctx.Usuarios.Remove(encontrar);
        }

        public List<Usuario> ListarTodos()
        {
            return ctx.Usuarios.ToList();
        }

        public Usuario Login(string CPF, string senha)
        {
            var usuario = ctx.Usuarios.FirstOrDefault(u => u.Cpf == CPF && u.Senha == senha);

            if (usuario != null)
            {
                if (usuario.Senha == senha)
                {
                    usuario.Senha = Criptografia.GerarHash(usuario.Senha);
                    ctx.SaveChanges();
                }

                bool comparado = Criptografia.Comparar(senha, usuario.Senha);
                if (comparado)
                    return usuario;
            }
            
            return null; 
        }
    }
}
