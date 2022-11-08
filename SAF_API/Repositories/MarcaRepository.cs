using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class MarcaRepository : IMarcaRepository
    {
        SAFContext ctx = new SAFContext();
        public void CadastrarMarca(Marca novaMarca)
        {
            ctx.Marcas.Add(novaMarca);
            ctx.SaveChanges();
        }

        public void Deletar(int idMarca)
        {
            ctx.Marcas.Remove(ListarPorId(idMarca));
            ctx.SaveChanges();
        }

        public Marca ListarPorId(int idMarca)
        {
            return ctx.Marcas.FirstOrDefault(m => m.IdMarca == idMarca);
        }

        public List<Marca> ListarTodas()
        {
            return ctx.Marcas.ToList();
        }
    }
}
