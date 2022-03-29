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
    public class CarroceriaController : Controller
    {
        private ICarroceriaRepository _carroceriaRepository;
        public CarroceriaController()
        {
            _carroceriaRepository = new CarroceriaRepository(); 
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_carroceriaRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{idCarroceria}")]
        public IActionResult BuscarPorId(int idCarroceria)
        {
            try
            {
                return Ok(_carroceriaRepository.BuscarPorId(idCarroceria));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/peso")]
        public IActionResult BuscarPorPeso(string Peso)
        {
            try
            {
                return Ok(_carroceriaRepository.BuscarPorPeso(Peso));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/cubagem")]
        public IActionResult BuscarPorCubagem(string Cubagem)
        {
            try
            {
                return Ok(_carroceriaRepository.BuscarPorCubagem(Cubagem));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/TipoCarga")]
        public IActionResult BuscarPorTipoCarga(string TipoCarga)
        {
            try
            {
                return Ok(_carroceriaRepository.BuscarPorTipoCarga(TipoCarga));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/TipoCarroceria")]
        public IActionResult BuscarPorTipoCarroceria(string TipoCarroceria)
        {
            try
            {
                return Ok(_carroceriaRepository.BuscarPorTipoCarga(TipoCarroceria));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}
