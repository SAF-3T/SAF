﻿using Microsoft.AspNetCore.Mvc;
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

        public Carroceria BuscarPorId(int IdCarroceria)
        {
            return ctx.Carroceria
                .Include(c => c.IdTipoCarroceriaNavigation)
                .Include(c => c.IdTipoCargaNavigation)
                .FirstOrDefault(c => c.IdCarroceria == IdCarroceria);
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
            return ctx.Carroceria
                .Include(c => c.IdTipoCarroceriaNavigation)
                .Include(c => c.IdTipoCargaNavigation)
                .ToList();
        }
    }
}
