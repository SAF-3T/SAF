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
    public class CheckListController : ControllerBase   
    {
        private ICheckListRepository _checklistRepository { get; set; }

        public CheckListController()
        {
            _checklistRepository = new CheckListRepository();
        }

        [HttpGet("/ListarMenoresCorrespondentes/{percentual}")]
        public IActionResult ListarMenoresCorrespondentes(int percentual)
        {
            try
            {
                return StatusCode(200, _checklistRepository.ListarPorDanosCriticos(percentual).OrderBy(c => c.PorcentagemFrontal + c.PorcentagemLateralDireita + c.PorcentagemLateralEsquerda + c.PorcentagemTraseira));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet]
        public ActionResult<IEnumerable<CheckList>> ListarChecklists()
        {
            try
            {
            return Ok(_checklistRepository.ListarTodas());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("{idCheckList}")]
        public ActionResult<IEnumerable<CheckList>> ListarPorId(int idCheckList)
        {
            try
            {
            return Ok(_checklistRepository.BuscarPorId(idCheckList));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("Veiculo/{idVeiculo}")]
        public ActionResult<IEnumerable<CheckList>> ListarMinhas(int idVeiculo)
        {
            try
            {
                return StatusCode(200, _checklistRepository.ListarMinhas(idVeiculo));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("MaisRecentes/{idVeiculo}")]
        public IActionResult ListarUltimas(int idVeiculo)
        {
            try
            {
                return StatusCode(200, _checklistRepository.ListarMinhasUltimas(idVeiculo));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
        
        [HttpGet("UltimaCadastrada")]
        public IActionResult ListarUltimaCadastrada()
        {
            try
            {
                return StatusCode(200, _checklistRepository.ListarUltimaCadastrada());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult CadastrarChecklist([FromForm] CheckList novaCheckList, IFormFile imagemFrontal, IFormFile imagemTraseira, IFormFile imagemEsquerda, IFormFile imagemDireita)
        {
            try
            {
                    string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                    string uploadResultadoF = Upload.UploadFile(imagemFrontal, extensoesPermitidas);
                    string uploadResultadoT = Upload.UploadFile(imagemTraseira, extensoesPermitidas);
                    string uploadResultadoE = Upload.UploadFile(imagemEsquerda, extensoesPermitidas);
                    string uploadResultadoD = Upload.UploadFile(imagemDireita, extensoesPermitidas);

                    if (uploadResultadoF == "Sem arquivo" || uploadResultadoT == "Sem arquivo" || uploadResultadoE == "Sem arquivo" || uploadResultadoD == "Sem arquivo")
                    {
                        _checklistRepository.Cadastrar(novaCheckList);
                        return StatusCode(200, novaCheckList);
                    }

                    if (uploadResultadoF == "Extenção não permitida" || uploadResultadoT == "Extenção não permitida" || uploadResultadoE == "Extenção não permitida" || uploadResultadoD == "Extenção não permitida")
                    {
                        return BadRequest("Extensão de arquivo não permitida");
                    }

                    novaCheckList.ImagemFrontal = uploadResultadoF;
                    novaCheckList.ImagemTraseira = uploadResultadoT;
                    novaCheckList.ImagemLateralEsquerda = uploadResultadoE;
                    novaCheckList.ImagemLateralDireita = uploadResultadoD;

                    _checklistRepository.Cadastrar(novaCheckList);
                    return StatusCode(200, novaCheckList);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("AprovaChecklist/{idChecklist}")]
        public IActionResult AprovaChecklist(int idChecklist)
        {
            try
            {
                _checklistRepository.AlteraCorrrespondencia(idChecklist);
                return StatusCode(200);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("{idChecklist}")]
        public ActionResult<CheckList> DeletarCheckList(int idChecklist)
        {
            try
            {
            _checklistRepository.Deletar(idChecklist);
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
