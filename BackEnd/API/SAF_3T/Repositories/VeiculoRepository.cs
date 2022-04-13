using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    public class VeiculoRepository : IVeiculoRepository
    {
        SAFContext ctx = new SAFContext();
        public void Atualizar(int id, Veiculo veiculoAtualizado)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.Find(id);

            veiculoBuscado.IdTipoVeiculo = veiculoAtualizado.IdTipoVeiculo;
            veiculoBuscado.IdMarca = veiculoAtualizado.IdMarca;
            veiculoBuscado.IdUsuario = veiculoAtualizado.IdUsuario;
            veiculoBuscado.IdCarroceria = veiculoAtualizado.IdCarroceria;
            veiculoBuscado.ImagemVeiculo = veiculoAtualizado.ImagemVeiculo;
            ctx.SaveChanges();
        }

        public void AtualizarStatus(int id, Veiculo veiculoAtualizado)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.FirstOrDefault(v => v.IdVeiculo == id);

            veiculoBuscado.IdStatus = veiculoAtualizado.IdStatus;
            ctx.SaveChanges();
        }

        public Veiculo BuscarPorCarroceria(byte idCarroceria)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .FirstOrDefault(v => v.IdCarroceria == idCarroceria);
        }

        public Veiculo BuscarPorId(int idVeiculo)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .FirstOrDefault(a => a.IdVeiculo == idVeiculo);
        }

        public List<Veiculo> BuscarPorMarca(int idMarca)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Where(v => v.IdMarca == idMarca)
                .ToList();
        }

        public Veiculo BuscarPorPlaca(string Placa)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .FirstOrDefault(v => v.Placa == Placa);
        }

        public void Cadastrar(Veiculo novoVeiculo)
        {
            ctx.Veiculos.Add(novoVeiculo);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int id)
        {
            ctx.Veiculos.Remove(BuscarPorId(id));
            ctx.SaveChanges();
        }

        public List<Veiculo> Listar()
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .ToList();
        }
    }
}

