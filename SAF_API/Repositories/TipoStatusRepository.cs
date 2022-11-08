using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class TipoStatusRepository : ITipoStatusRepository
    {
        SAFContext ctx = new SAFContext();
        public void Cadastrar(TipoStatus novoStatus)
        {
            ctx.TipoStatuses.Add(novoStatus);
            ctx.SaveChanges();
        }

        public void Deletar(int idTipoStatus)
        {
            ctx.TipoStatuses.Remove(BuscarPorId(idTipoStatus));
            ctx.SaveChanges();
        }

        public TipoStatus BuscarPorId(int idRecebido)
        {
            return ctx.TipoStatuses.FirstOrDefault(s => s.IdStatus == idRecebido);
        }

        public List<TipoStatus> ListarTudo()
        {
            return ctx.TipoStatuses.ToList();
        }
    }
}
