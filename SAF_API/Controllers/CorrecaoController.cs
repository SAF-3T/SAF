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
    public class CorrecaoController : ControllerBase
    {
        private ICorrecaoRepository _CorrecaoRepository { get; set; }

        public CorrecaoController()
        {
            _CorrecaoRepository = new CorrecaoRepository();
        }

        [HttpGet]
        public ActionResult<IEnumerable<TabelaCorrecao>> ListarTodas()
        {
            try
            {
            return Ok(_CorrecaoRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{idCorrecao}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> ListarPorId(int idCorrecao)
        {
            try
            {
            return Ok(_CorrecaoRepository.BuscarPorId(idCorrecao));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("Checklist/{idChecklist}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> BuscarMinhas(int idChecklist)
        {
            try
            {
            return Ok(_CorrecaoRepository.ListarMinhas(idChecklist));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("Contagem/{idChecklist}")]
        public IActionResult ContarCorrecoes(int idChecklist)
        {
            try
            {
                return StatusCode(200, _CorrecaoRepository.ListarMinhas(idChecklist).Count());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public ActionResult<IEnumerable<TabelaCorrecao>> CadastrarCorrecao(TabelaCorrecao novaCorrecao)
        {
            try
            {
            _CorrecaoRepository.Cadastrar(novaCorrecao);
            return StatusCode(201);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idCorrecao}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> DeletarCorrecao(int idCorrecao)
        {
            try
            {
            _CorrecaoRepository.Deletar(idCorrecao);
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
