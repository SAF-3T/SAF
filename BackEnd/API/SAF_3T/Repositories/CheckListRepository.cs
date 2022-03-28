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
            return ctx.CheckLists.Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdUsuarioNavigation.IdTipoUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdMarcaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCargaNavigation)
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
        }

        public List<CheckList> ListarMinhas(int idVeiculo)
        {
            return ctx.CheckLists.Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdUsuarioNavigation.IdTipoUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdMarcaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .Where(c => c.IdVeiculo == idVeiculo)
                .ToList();
        }

        public List<CheckList> ListarTodas()
        {
            return ctx.CheckLists.Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdUsuarioNavigation.IdTipoUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdMarcaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(c => c.IdVeiculoNavigation.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .ToList();
        }
    }
}
