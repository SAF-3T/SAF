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
        public void Atualizar(int idTipoVeiculo, TipoVeiculo tipoVeiculoAtualizado)
        {
            var tipoVeiculoBuscado = ctx.TipoVeiculos.FirstOrDefault(t => t.IdTipoVeiculo == idTipoVeiculo);

            if(tipoVeiculoBuscado != null)
            {
                tipoVeiculoBuscado.NomeTipoVeiculo = tipoVeiculoAtualizado.NomeTipoVeiculo;
                ctx.SaveChanges();
            }                
        }

        public TipoVeiculo BuscarPorId(int idTipoVeiculo)
        {
            return ctx.TipoVeiculos.FirstOrDefault(a => a.IdTipoVeiculo == idTipoVeiculo);
        }


        public void Cadastrar(TipoVeiculo novoVeiculo)
        {
            ctx.TipoVeiculos.Add(novoVeiculo);
            ctx.SaveChanges();
        }

        public void Deletar(int idTipoVeiculo)
        {
            ctx.TipoVeiculos.Remove(BuscarPorId(idTipoVeiculo));
            ctx.SaveChanges();
        }


        public List<TipoVeiculo> Listar()
        {
            return ctx.TipoVeiculos.ToList();
        }
    }
}