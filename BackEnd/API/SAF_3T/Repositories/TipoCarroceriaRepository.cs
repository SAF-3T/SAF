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
        public Carroceria BuscarPorNomeCarroceria(string NomeTipoCarroceria)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.NomeCarroceria == NomeTipoCarroceria);
        }

        public List<Carroceria> Listar()
        {
            return ctx.Carroceria.ToList();
        }

    }
}
