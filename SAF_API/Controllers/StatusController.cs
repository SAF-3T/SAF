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
    public class StatusController : ControllerBase
    {
        private ITipoStatusRepository _TipoStatusRepository { get; set; }
        public StatusController()
        {
            _TipoStatusRepository = new TipoStatusRepository();
        }

        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return StatusCode(200, _TipoStatusRepository.ListarTudo());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost("/Cadastrar")]
        public IActionResult Cadastrar(TipoStatus novoStatus)
        {
            try
            {
                _TipoStatusRepository.Cadastrar(novoStatus);
                return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/IdStatus/{idRecebido}")]
        public IActionResult Deletar(int idRecebido)
        {
            try
            {
                _TipoStatusRepository.Deletar(idRecebido);
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
