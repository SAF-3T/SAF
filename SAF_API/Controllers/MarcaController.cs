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
    public class MarcaController : ControllerBase
    {
        private IMarcaRepository _marcaRepository { get; set; }
        public MarcaController()
        {
            _marcaRepository = new MarcaRepository();
        }

        [HttpGet]
        public IActionResult ListarMarcas()
        {
            try
            {
                return StatusCode(200, _marcaRepository.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/BuscarPorID/{idRecebido}")]
        public IActionResult ListarPorId(int idRecebido)
        {
            try
            {
                return StatusCode(200, _marcaRepository.ListarPorId(idRecebido));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/IdMarca/{idRecebido}")]
        public IActionResult Deletar(int idRecebido)
        {
            try
            {
                _marcaRepository.Deletar(idRecebido);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(Marca novaMarca)
        {
            try
            {
                _marcaRepository.CadastrarMarca(novaMarca);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
