using Microsoft.EntityFrameworkCore;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class CorrecaoRepository : ICorrecaoRepository
    {
        SAFContext ctx = new SAFContext();
        public TabelaCorrecao BuscarPorId(int idRecebido)
        {
        return ctx.TabelaCorrecaos
                .AsNoTracking()
                .Include(c => c.IdTipoErroNavigation)
                .Include(c => c.IdCheckListNavigation)
                .FirstOrDefault(c => c.IdCorrecao == idRecebido);
        }

        public void Cadastrar(TabelaCorrecao novoCorrecao)
        {
            ctx.TabelaCorrecaos.Add(novoCorrecao);
            ctx.SaveChanges();
        }

        public void Deletar(int idRecebido)
        {
            ctx.TabelaCorrecaos.Remove(BuscarPorId(idRecebido));
            ctx.SaveChanges();
        }

        public List<TabelaCorrecao> ListarMinhas(int idCheckList)
        {
            return ctx.TabelaCorrecaos
                .AsNoTracking()
                .Include(c => c.IdTipoErroNavigation)
                .Where(c => c.IdCheckList == idCheckList)
                .ToList();
        }

        public List<TabelaCorrecao> ListarTodos()
        {
           return ctx.TabelaCorrecaos
                .AsNoTracking()
                .Include(c => c.IdTipoErroNavigation)
                .Include(c => c.IdCheckListNavigation)
                .ToList();
        }
    }
}
