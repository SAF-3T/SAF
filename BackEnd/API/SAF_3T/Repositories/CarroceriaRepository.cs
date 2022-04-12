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

        public void AlterarConteudo(int idRecebido, Carrocerium atualizaCarroceria)
        {
            Carrocerium carroceriaDesatualizada = ctx.Carroceria.FirstOrDefault(c => c.IdCarroceria == idRecebido);

            carroceriaDesatualizada.Cubagem = atualizaCarroceria.Cubagem;
            carroceriaDesatualizada.Peso = atualizaCarroceria.Peso;
            ctx.SaveChanges();
        }

        public void AlterarTipoCarga(int idRecebido, Carrocerium atualizaCarroceria)
        {
            Carrocerium carroceriaDesatualizada = ctx.Carroceria.FirstOrDefault(c => c.IdCarroceria == idRecebido);

            carroceriaDesatualizada.IdTipoCarga = atualizaCarroceria.IdTipoCarga;
            ctx.SaveChanges();
        }

        public void AtualizarCarroceria(int idRecebido, Carrocerium atualizaCarroceria)
        {
            Carrocerium carroceriaDesatualizada = ctx.Carroceria.FirstOrDefault(c => c.IdCarroceria == idRecebido);

            carroceriaDesatualizada.IdTipoCarga = atualizaCarroceria.IdTipoCarga;
            carroceriaDesatualizada.IdTipoCarroceria = atualizaCarroceria.IdTipoCarroceria;
            carroceriaDesatualizada.Cubagem = atualizaCarroceria.Cubagem;
            carroceriaDesatualizada.Peso = atualizaCarroceria.Peso;
            ctx.SaveChanges();
        }

        public Carrocerium BuscarPorId(int IdCarroceria)
        {
            return ctx.Carroceria
                .AsNoTracking()
                .Include(c => c.IdTipoCarroceriaNavigation)
                .Include(c => c.IdTipoCargaNavigation)
                .FirstOrDefault(c => c.IdCarroceria == IdCarroceria);
        }
        public void Cadastrar(Carrocerium novaCarroceria)
        {
            ctx.Carroceria.Add(novaCarroceria);
            ctx.SaveChanges();
        }

        public void Deletar(int id)
        {
            ctx.Carroceria.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        public List<Carrocerium> Listar()
        {
            return ctx.Carroceria
                .AsNoTracking()
                .Include(c => c.IdTipoCarroceriaNavigation)
                .Include(c => c.IdTipoCargaNavigation)
                .ToList();
        }
    }
}
