using Microsoft.AspNetCore.Mvc;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    public class TipoVeiculoRepository : ITipoVeiculoRepository
    {
        SAFContext ctx = new SAFContext();
        public void Atualizar(int idTipoVeiculo, Veiculo veiculoAtualizado)
        {
            TipoVeiculo TipoVeiculoBuscado = ctx.TipoVeiculos.Find(veiculoAtualizado);

            if (veiculoAtualizado != null)
            {
                TipoVeiculoBuscado.IdTipoVeiculo = veiculoAtualizado.IdTipoVeiculo;

                ctx.Veiculos.Update(veiculoAtualizado);

                ctx.SaveChanges();
            }
        }

        public Veiculo BuscarPorId(int idTipoVeiculo)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdTipoVeiculos == idTipoVeiculo);
        }

        public Veiculo BuscarPorPlaca(string Placa)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.PlacaVeiculos == Placa);
        }

        public void Cadastrar(Veiculo novoVeiculo)
        {
            ctx.Veiculos.Add(novoVeiculo);
            ctx.SaveChanges();
        }

        public void Deletar(int idTipoVeiculo)
        {
            ctx.Veiculos.Remove(BuscarPorId(idTipoVeiculo));
        }


        public List<Veiculo> Listar()
        {
            return ctx.Veiculos.ToList();
        }
    }
}