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
    public class ErroRepository : IErroRepository
    {
        SAFContext ctx = new SAFContext();
        public void Cadastrar(TabelaErro novoErro)
        {
            ctx.TabelaErros.Add(novoErro);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int idRecebido)
        {
            ctx.TabelaErros.Remove(BuscarPorId(idRecebido));
            ctx.SaveChanges();
        }

        public List<TabelaErro> ListarMinhas(int idCheckList)
        {
            return ctx.TabelaErros
                .AsNoTracking()
                .Include(c => c.IdCheckListNavigation)
                .Include(c => c.IdTipoErroNavigation)
                .Where(c => c.IdCheckList == idCheckList)
                .ToList();
        }

        public TabelaErro BuscarPorId(int idRecebido)
        {
            return ctx.TabelaErros
                .AsNoTracking()
                .Include(c => c.IdTipoErroNavigation)
                .Include(c => c.IdCheckListNavigation)
                .FirstOrDefault(c => c.IdErro == idRecebido);
        }

        public List<TabelaErro> ListarTodos()
        {
            return ctx.TabelaErros
                .AsNoTracking()
                .Include(c => c.IdTipoErroNavigation)
                .Include(c => c.IdCheckListNavigation)
                .ToList();
        }
    }
}
