using Microsoft.AspNetCore.Mvc;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Repositories
{
    public class TipoCarroceriaRepository : ITipoCarroceriaRepository
    {
        SAFContext ctx = new SAFContext();
        public TipoCarroceria BuscarPorNomeCarroceria(string NomeTipoCarroceria)
        {
            return ctx.TipoCarroceria.FirstOrDefault(a => a.NomeTipoCarroceria == NomeTipoCarroceria);
        }

        public List<TipoCarroceria> Listar()
        {
            return ctx.TipoCarroceria.ToList();
        }

        public void Deletar(int idTipoCarroceria)
        {
            TipoCarroceria deletado = ctx.TipoCarroceria.FirstOrDefault(t => t.IdTipoCarroceria == idTipoCarroceria);
            ctx.TipoCarroceria.Remove(deletado);
            ctx.SaveChanges();
        }

        
        public void Cadastrar(TipoCarroceria novaCarroceria)
            {
                ctx.TipoCarroceria.Add(novaCarroceria);
                ctx.SaveChanges();
            }
        
    }
}
