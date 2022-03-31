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
            veiculoBuscado.IdTipoCarroceria = veiculoAtualizado.IdTipoCarroceria;
            veiculoBuscado.IdMarca = veiculoAtualizado.IdMarca;
            veiculoBuscado.IdUsuario = veiculoAtualizado.IdUsuario;
            ctx.Veiculos.Update(veiculoBuscado);

            ctx.SaveChanges();
        }

        public List<Veiculo> BuscarPorCarroceria(int idTipoCarroceria)
        {
            return ctx.Veiculos.Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdUsuarioNavigation)
                .ToList(); 
        }

        public List<Veiculo> BuscarPorData(DateTime DataAquisicao)
        {
            return ctx.Veiculos.Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdUsuarioNavigation)
                .ToList();
        }

        public Veiculo BuscarPorId(int idTipoVeiculo)
        {
            return ctx.Veiculos.FirstOrDefault(a => a.IdTipoVeiculos == idTipoVeiculo);
        }

        public List<Veiculo> BuscarPorMarca(int idMarca)
        {
            return ctx.Veiculos.Include(v => v.IdMarcaNavigation).Where(v => v.IdMarca == idMarca).ToList();
        }

        public List<Veiculo> BuscarPorPlaca(string Placa)
        {
            return ctx.Veiculos.Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdUsuarioNavigation)
                .ToList(); 
                
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
            return ctx.Veiculos.Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdUsuarioNavigation)
                .ToList();
        }
    }
}

