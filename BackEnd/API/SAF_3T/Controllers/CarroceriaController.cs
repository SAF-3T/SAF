﻿using Microsoft.AspNetCore.Mvc;
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

        [HttpGet("/BuscaId/{idCarroceria}")]
        public IActionResult ListarPorId(int idCarroceria)
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

        [HttpPost]
        public IActionResult Cadastrar(Carrocerium novaCarroceria)
        {
            try
            {
                _carroceriaRepository.Cadastrar(novaCarroceria);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/Deletar/{idCarroceria}")]
        public IActionResult Deletar(int idCarroceria)
        {
            try
            {
                _carroceriaRepository.Deletar(idCarroceria);
                return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
}