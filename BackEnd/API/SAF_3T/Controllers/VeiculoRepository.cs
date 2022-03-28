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
    public class VeiculoRepository : IVeiculoRepository
    {
        SAFContext ctx = new SAFContext();
        public void Atualizar(int id, Veiculo veiculoAtualizado)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.Find(veiculoAtualizado);
        }

        public Veiculo BuscarPorCarroceria(string idTipoCarroceria)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdTipoCarroceria == idTipoCarroceria);
        }

        public Veiculo BuscarPorData(DateTime DataAquisicao)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.DataAquisicao == DataAquisicao);
        }

        public Veiculo BuscarPorId(int idTipoVeiculo)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdTipoVeiculos == idTipoVeiculo );
        }

        public Veiculo BuscarPorMarca(string idMarca)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdMarcas == idMarca);
        }

        public Veiculo BuscarPorPlaca(string Placa)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.Placa == Placa);
        }

        public Veiculo BuscarPorUsuario(string idUsuario)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdUsuarios == idUsuario);
        }

        public void Cadastrar(Veiculo novoVeiculo)
        {
            ctx.Veiculos.Add(novoVeiculo);
            ctx.SaveChangesAsync();
        }

        public void Deletar(int id)
        {
            ctx.Veiculos.Remove(BuscarPorId(id));
        }

        public List<Veiculo> Listar()
        {
            return ctx.Veiculos.ToList();
        }
    }
}
