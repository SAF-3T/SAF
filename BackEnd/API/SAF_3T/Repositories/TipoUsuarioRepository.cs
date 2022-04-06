using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class TipoUsuarioRepository : ITipoUsuarioRepository
    {
        private SAFContext ctx = new SAFContext();

        public void Cadastrar(TipoUsuario novoTipoU)
        {
            ctx.TipoUsuarios.Add(novoTipoU);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int idTipoU)
        {
            var encontrar = ctx.TipoUsuarios.FirstOrDefault(c => c.IdTipoUsuario == idTipoU);
            ctx.TipoUsuarios.Remove(encontrar);
            ctx.SaveChanges();
        }

        public List<TipoUsuario> ListarTodos()
        {
            return ctx.TipoUsuarios.ToList();
        }
    }
}
