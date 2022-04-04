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
    public class TipoCarroceriaController : Controller
    {
        private ITipoCarroceriaRepository _tipoCarroceriaRepository;
        public TipoCarroceriaController()
        {
            _tipoCarroceriaRepository = new TipoCarroceriaRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_tipoCarroceriaRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{NomeTipoCarroceria}")]
        public IActionResult BuscarPorNomeCarroceria(string NomeTipoCarroceria)
        {
            try
            {
                return Ok(_tipoCarroceriaRepository.BuscarPorNomeCarroceria(NomeTipoCarroceria));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult Cadastrar(TipoCarrocerium novoTipoC)
        {
            try
            {
                _tipoCarroceriaRepository.Cadastrar(novoTipoC);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idTipoCarroceria}")]
        public IActionResult Deletar(int idTipoCarroceria)
        {
            try
            {
                _tipoCarroceriaRepository.Deletar(idTipoCarroceria);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }


    }    
}
