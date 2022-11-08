 using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using SAF_3T.Repositories;
using SAF_3T.Utils;
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
            try
            {
            return Ok(_ErroRepository.ListarTodos());
}
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/ListarErro/{idErro}")]
        public ActionResult<IEnumerable<TabelaErro>> ListarPorId(int idErro)
        {
            try
            {
            return Ok(_ErroRepository.BuscarPorId(idErro));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }

        }

        [HttpGet("Checklist/{idChecklist}")]
        public ActionResult<IEnumerable<TabelaErro>> ListarMeus(int idChecklist)
        {
            try
            {
            return Ok(_ErroRepository.ListarMinhas(idChecklist));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("Contagem/{idChecklist}")]
        public IActionResult ContarErros(int idChecklist)
        {
            try
            {
                return StatusCode(200, _ErroRepository.ListarMinhas(idChecklist).Count());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost("CadastrarErro")]
        public IActionResult CadastrarErro([FromForm] TabelaErro novoErro, IFormFile arquivo)
        {
            try
            {
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                string uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas); ;

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                if (uploadResultado == "Sem arquivo")
                {
                    _ErroRepository.Cadastrar(novoErro);
                }

                novoErro.ImagemErro = uploadResultado;

                _ErroRepository.Cadastrar(novoErro);
                return StatusCode(201, novoErro);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idErro}")]
        public ActionResult<IEnumerable<TabelaErro>> DeletarErro(int idErro)
        {
            try
            {
            _ErroRepository.Deletar(idErro);
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
