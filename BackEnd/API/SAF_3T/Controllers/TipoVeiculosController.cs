using Microsoft.AspNetCore.Mvc;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class TipoVeiculosController : Controller
    {
        private ITipoVeiculoRepository _tipoVRepository;
        public TipoVeiculosController()
        {
            _tipoVRepository = new TipoVeiculoRepository();
        }
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_tipoVRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
        [HttpPost]
        public IActionResult Cadastrar(TipoVeiculo novoTipoV)
        {
            try
            {
                _tipoVRepository.Cadastrar(novoTipoV);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idTipoVeiculo}")]
        public IActionResult Deletar(int idTipoVeiculo)
        {
            try
            {
                _tipoVRepository.Deletar(idTipoVeiculo);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{idTipoVeiculo}")]
        public IActionResult BuscarPorId(int idTipoVeiculo)
        {
            try
            {
                return Ok(_tipoVRepository.BuscarPorId(idTipoVeiculo));

            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPut("{id}")]
        public IActionResult Atualizar(int id, TipoVeiculo novoTVeiculo)
        {
            if (novoTVeiculo != null)
            {
                var TipoVeiculoBucado = _tipoVRepository.BuscarPorId(id);
                if (TipoVeiculoBucado != null)
                {
                    try
                    {
                        _tipoVRepository.Atualizar(id, novoTVeiculo);
                        return NoContent();
                    }
                    catch (Exception erro)
                    {
                        return BadRequest(erro);
                        throw;
                    }
                }
                return BadRequest();

            }
            return BadRequest();
        }
    }
}
