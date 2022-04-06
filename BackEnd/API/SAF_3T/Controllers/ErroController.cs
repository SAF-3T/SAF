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
    public class ErroController : ControllerBase
    {
        private IErroRepository _ErroRepository { get; set; }
        public ErroController()
        {
            _ErroRepository = new ErroRepository();
        }

        [HttpGet]
        public ActionResult<IEnumerable<TabelaErro>> Listartodos()
        {
            return Ok(_ErroRepository.ListarTodos());
        }

        [HttpGet("{idErro}")]
        public ActionResult<IEnumerable<TabelaErro>> ListarPorId(int idErro)
        {
            return Ok(_ErroRepository.BuscarPorId(idErro));
        }

        [HttpGet("Checklist/{idChecklist}")]
        public ActionResult<IEnumerable<TabelaErro>> ListarMeus(int idChecklist)
        {
            return Ok(_ErroRepository.ListarMinhas(idChecklist));
        }

        [HttpPost]
        public ActionResult<IEnumerable<TabelaErro>> CadastrarErro(TabelaErro novoErro)
        {
            _ErroRepository.Cadastrar(novoErro);
            return StatusCode(201);
        }

        [HttpDelete("{idErro}")]
        public ActionResult<IEnumerable<TabelaErro>> DeletarErro(int idErro)
        {
            _ErroRepository.Deletar(idErro);
            return StatusCode(204);
        }
    }
}
