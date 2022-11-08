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
                .OrderByDescending(c => c.DataCheckList)
                .ToList();
        }

        public List<CheckList> ListarMinhasUltimas(int idVeiculo)
        {
            return ctx.CheckLists
                .AsNoTracking()
                .Include(c => c.IdTipoCheckListNavigation)
                .Include(c => c.IdUsuarioNavigation)
                .Include(c => c.IdVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdTipoVeiculoNavigation)
                .Include(c => c.IdVeiculoNavigation.IdStatusNavigation)
                .Where(c => c.IdVeiculo == idVeiculo)
                .OrderByDescending(c => c.DataCheckList)
                .ToList();
        }

        public CheckList ListarUltimaCadastrada()
        {
            return ctx.CheckLists
                .OrderBy(c => c.DataCheckList)
                .Last();

        }

        public void AlteraCorrrespondencia(int id)
        {
            CheckList checklistVisualizada = new CheckList();
            checklistVisualizada = ctx.CheckLists.FirstOrDefault(v => v.IdCheckList == id);
            checklistVisualizada.PorcentagemFrontal = 100;
            checklistVisualizada.PorcentagemTraseira = 100;
            checklistVisualizada.PorcentagemLateralDireita = 100;
            checklistVisualizada.PorcentagemLateralEsquerda = 100;
            ctx.CheckLists.Update(checklistVisualizada);
            ctx.SaveChanges();
        }

        public List<CheckList> ListarPorDanosCriticos(int percentual)
        {
            return ctx.CheckLists.Where(c => c.PorcentagemFrontal < percentual || c.PorcentagemLateralDireita < percentual || c.PorcentagemLateralEsquerda < percentual || c.PorcentagemTraseira < percentual)
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
