using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using SAF_3T.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]

    [ApiController]
    public class TipoCargasController : ControllerBase
    {
        private ITipoCargaRepository _tipoCargaRepository;
        public TipoCargasController()
        {
            _tipoCargaRepository = new TipoCargaRepository();
        }

        [HttpPost]
        public IActionResult Cadastrar(TipoCarga novaCarga)
        {
            try
            {
                _tipoCargaRepository.Cadastrar(novaCarga);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_tipoCargaRepository.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/VerificaDisponibilidadeNome/{NomeCarga}")]
        public IActionResult VerificarDisponibiliade(string NomeCarga)
        {
            try
            {
                bool disponivel = _tipoCargaRepository.VerificaDisponibilidade(NomeCarga);
                if (disponivel == true)
                {
                    return StatusCode(200, 1);
                }
                return StatusCode(200, 0);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/{idTipoCarga}")]
        public IActionResult Deletar(int idTipoCarga)
        {
            try
            {
                _tipoCargaRepository.Deletar(idTipoCarga);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/{idTipoCarga}")]
        public IActionResult Encontrar(int idTipoCarga)
        {
            try
            {
                return Ok(_tipoCargaRepository.BuscarPorId(idTipoCarga));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

    }
}
