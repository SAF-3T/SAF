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
    public class VeiculosController : Controller
    {
        private IVeiculoRepository _veiculosRepository;
        public VeiculosController()
        {
            _veiculosRepository = new VeiculoRepository();
        }
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_veiculosRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
        [HttpGet("/BuscaId/{idVeiculos}")]
        public IActionResult BuscarPorId(int idVeiculo)
        {
                return Ok(_veiculosRepository.BuscarPorId(idVeiculo));
        }

        [HttpGet("/BuscaMarca/{idMarca}")]
        public IActionResult BuscarPorMarca(int idMarca)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorMarca( idMarca));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/BuscaCarroceria/{idCarroceria}")]
        public IActionResult BuscarPorCarroceria(byte idCarroceria)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorCarroceria(idCarroceria));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/Placa/{Placa}")]
        public IActionResult BuscarPorPlaca(string Placa)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorPlaca(Placa));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Veiculo novoVeiculo)
        {
            try
            {
                _veiculosRepository.Cadastrar(novoVeiculo);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/Deletar/{idVeiculo}")]
        public IActionResult Deletar(int idVeiculo)
        {
            try
            {
                _veiculosRepository.Deletar(idVeiculo);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPut("/Atualizar/{id}")]
        public IActionResult Atualizar(int id, Veiculo novoVeiculo)
        {
            if (novoVeiculo != null)
            {
                var VeiculoBuscado = _veiculosRepository.BuscarPorId(id);
                if (VeiculoBuscado != null)
                {
                    try
                    {
                        _veiculosRepository.Atualizar(id, novoVeiculo);
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
