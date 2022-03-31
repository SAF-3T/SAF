using Microsoft.AspNetCore.Mvc;
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
    public class CarroceriaRepository : ICarroceriaRepository
    {
        SAFContext ctx = new SAFContext();
        public Carroceria BuscarPorCubagem(string Cubagem)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.Cubagem == Cubagem);
        }

        public Carroceria BuscarPorId(int IdCarroceria)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.BuscarId == IdCarroceria);
        }

        public Carroceria BuscarPorPeso(string Peso)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.BuscarPeso == Peso);
        }

        public Carroceria BuscarPorTipoCarga(string IdTipoCarga)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.BuscarTipoCarga == IdTipoCarga);
        }

        public Carroceria BuscarPorTipoCarroceria(string IdTipoCarroceria)
        {
            return ctx.Carroceria.FirstOrDefault(a => a.BuscarTipoCarroceria == IdTipoCarroceria);
        }

        public void Cadastrar(Carroceria novaCarroceria)
        {
            ctx.Carroceria.Add(novaCarroceria);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Carroceria.Remove(BuscarPorId(id));
        }

        public List<Carroceria> Listar()
        {
            return ctx.Carroceria.Include(c=> c.IdTipoCarroceria).ToList();
        }

        
    }
}
