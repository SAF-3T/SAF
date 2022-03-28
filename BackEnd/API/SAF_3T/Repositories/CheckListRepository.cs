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
            return ctx.CheckLists.Find(idRecebido);
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
            throw new NotImplementedException();
        }

        public List<CheckList> ListarTodas()
        {
            return ctx.CheckLists.ToList();
        }
    }
}
