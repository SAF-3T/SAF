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

    }
}
