using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SAF_3T.Contexts;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using SAF_3T.Utils;
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
            ctx.SaveChanges();
        }

        public void AtualizarStatus(int id, Veiculo veiculoAtualizado)
        {
            Veiculo veiculoBuscado = new Veiculo();
            veiculoBuscado = ctx.Veiculos.FirstOrDefault(v => v.IdVeiculo == id);
            veiculoBuscado.IdStatus = veiculoAtualizado.IdStatus;
            ctx.Veiculos.Update(veiculoBuscado);
            ctx.SaveChanges();
        }

        public Veiculo BuscarPorCarroceria(byte idCarroceria)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdMarcaNavigation)
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
                .Include(v => v.IdMarcaNavigation)
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
                .Include(v => v.IdMarcaNavigation)
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
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .FirstOrDefault(v => v.Placa == Placa);
        }

        public Veiculo Cadastrar(Veiculo novoVeiculo)
        {
            ctx.Veiculos.Add(novoVeiculo);
            ctx.SaveChangesAsync();
            return novoVeiculo;
        }

        public void Deletar(int id)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.FirstOrDefault(v => v.IdVeiculo == id);
            //Upload.RemoverArquivo(veiculoBuscado.ImagemVeiculo);
            ctx.Veiculos.Remove(veiculoBuscado);
            ctx.SaveChanges();
        }

        public void DeletarImagem(int idRecebido)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.FirstOrDefault(u => u.IdVeiculo == idRecebido);
            Upload.RemoverArquivo(veiculoBuscado.ImagemFrontalPadrao);
            veiculoBuscado.ImagemFrontalPadrao = null;
            ctx.Update(veiculoBuscado);
            ctx.SaveChangesAsync();
        }

        public void AtualizarImagem(int idRecebido, string arquivo)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.FirstOrDefault(v => v.IdVeiculo == idRecebido);

            veiculoBuscado.ImagemFrontalPadrao = arquivo;
            ctx.Update(veiculoBuscado);
            ctx.SaveChangesAsync();
        }

        public List<Veiculo> Listar()
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .OrderByDescending(c => c.DataAquisicao)
                .ToList();
        }

        public List<Veiculo> ListarPorStatus(int idRecebido)
        {
            return ctx.Veiculos
                .AsNoTracking()
                .Include(v => v.IdStatusNavigation)
                .Include(v => v.IdMarcaNavigation)
                .Include(v => v.IdTipoVeiculoNavigation)
                .Include(v => v.IdCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCarroceriaNavigation)
                .Include(v => v.IdCarroceriaNavigation.IdTipoCargaNavigation)
                .Where(v => v.IdStatus == idRecebido)
                .ToList();
        }

        public bool VerificaDisponibilidade(Veiculo tentativaCadastroVeiculo)
        {
            Veiculo veiculoBuscado = ctx.Veiculos.FirstOrDefault(c => c.Placa == tentativaCadastroVeiculo.Placa || c.IdCarroceria == tentativaCadastroVeiculo.IdCarroceria);
            if (veiculoBuscado == null)
            {
                return true;
            }
            return false;
        }
    }
}

