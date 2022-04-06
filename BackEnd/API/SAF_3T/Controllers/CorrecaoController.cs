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
            return Ok(_CorrecaoRepository.ListarTodos());
        }

        [HttpGet("{idCorrecao}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> ListarPorId(int idCorrecao)
        {
            return Ok(_CorrecaoRepository.BuscarPorId(idCorrecao));
        }

        [HttpGet("Checklist/{idChecklist}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> BuscarMinhas(int idChecklist)
        {
            return Ok(_CorrecaoRepository.ListarMinhas(idChecklist));
        }

        [HttpPost]
        public ActionResult<IEnumerable<TabelaCorrecao>> CadastrarCorrecao(TabelaCorrecao novaCorrecao)
        {
            _CorrecaoRepository.Cadastrar(novaCorrecao);
            return StatusCode(201);
        }

        [HttpDelete("{idCorrecao}")]
        public ActionResult<IEnumerable<TabelaCorrecao>> DeletarCorrecao(int idCorrecao)
        {
            _CorrecaoRepository.Deletar(idCorrecao);
            return StatusCode(204);
        }
    }
}
