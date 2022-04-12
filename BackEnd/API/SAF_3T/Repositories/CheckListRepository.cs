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
    public class CheckListRepository : ICheckListRepository
    {
        SAFContext ctx = new SAFContext();

        public CheckList BuscarPorId(int idRecebido)
        {
            return ctx.CheckLists
                .AsNoTracking()
                .Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdStatusNavigation)
                .FirstOrDefault(c => c.IdCheckList == idRecebido);
        }

        public void Cadastrar(CheckList novaChecklist)
        {
            ctx.CheckLists.Add(novaChecklist);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int idRecebido)
        {
            ctx.CheckLists.Remove(BuscarPorId(idRecebido));
            ctx.SaveChanges();
        }

        public List<CheckList> ListarMinhas(int idVeiculo)
        {
            return ctx.CheckLists
                .AsNoTracking()
                .Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdStatusNavigation)
                .Where(c => c.IdVeiculo == idVeiculo)
                .ToList();
        }

        public List<CheckList> ListarTodas()
        {
            return ctx.CheckLists
                .AsNoTracking()
                .Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdStatusNavigation)
                .ToList();
        }
    }
}
