using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
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
    public class VeiculosController : Controller
    {
        private IVeiculoRepository _veiculosRepository;
        public VeiculosController()
        {
            _veiculosRepository = new VeiculoRepository();
        }
        [HttpGet]
        public IActionResult ListarTodos()
        {
            try
            {
                return Ok(_veiculosRepository.Listar());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
        [HttpGet("/BuscarVeiculo/{idVeiculo}")]
        public IActionResult BuscarPorId(int idVeiculo)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorId(idVeiculo));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/BuscaMarca/{idMarca}")]
        public IActionResult BuscarPorMarca(int idMarca)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorMarca(idMarca));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("BuscaStatus/{idRecebido}")]
        public IActionResult BuscarPorStatus(int idRecebido)
        {
            try
            {
                _veiculosRepository.ListarPorStatus(idRecebido);
                return StatusCode(201, _veiculosRepository.ListarPorStatus(idRecebido).Count());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/BuscaCarroceria/{idCarroceria}")]
        public IActionResult BuscarPorCarroceria(byte idCarroceria)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorCarroceria(idCarroceria));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/Placa/{Placa}")]
        public IActionResult BuscarPorPlaca(string Placa)
        {
            try
            {
                return Ok(_veiculosRepository.BuscarPorPlaca(Placa));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult CadastrarVeiculo([FromForm] Veiculo novoVeiculo, IFormFile imagemFrontal, IFormFile imagemTraseira, IFormFile imagemEsquerda, IFormFile imagemDireita)
        {
            try
            {
                if (_veiculosRepository.VerificaDisponibilidade(novoVeiculo))
                {
                    string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                    string uploadResultadoF = Upload.UploadFile(imagemFrontal, extensoesPermitidas);
                    string uploadResultadoT = Upload.UploadFile(imagemTraseira, extensoesPermitidas);
                    string uploadResultadoE = Upload.UploadFile(imagemEsquerda, extensoesPermitidas);
                    string uploadResultadoD = Upload.UploadFile(imagemDireita, extensoesPermitidas);

                    if (uploadResultadoF == "Sem arquivo" || uploadResultadoT == "Sem arquivo" || uploadResultadoE == "Sem arquivo" || uploadResultadoD == "Sem arquivo")
                    {
                        _veiculosRepository.Cadastrar(novoVeiculo);
                        return StatusCode(200, novoVeiculo);
                    }

                    if (uploadResultadoF == "Extenção não permitida" || uploadResultadoT == "Extenção não permitida" || uploadResultadoE == "Extenção não permitida" || uploadResultadoD == "Extenção não permitida")
                    {
                        return BadRequest("Extensão de arquivo não permitida");
                    }

                    novoVeiculo.ImagemFrontalPadrao = uploadResultadoF;
                    novoVeiculo.ImagemTraseiraPadrao = uploadResultadoT;
                    novoVeiculo.ImagemLateralEsquerdaPadrao = uploadResultadoE;
                    novoVeiculo.ImagemLateralDireitaPadrao = uploadResultadoD;

                    _veiculosRepository.Cadastrar(novoVeiculo);
                    return StatusCode(200, novoVeiculo);
                }
                return StatusCode(204, "Placa já cadastrada, ou Carroceria já em uso");
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("AlterarImagem/{idRecebido}")]
        public IActionResult AlterarImagem( int idRecebido, IFormFile arquivo)
        {
            try
            {
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };

                Veiculo veiculoBuscado =  _veiculosRepository.BuscarPorId(idRecebido);
                string uploadResultado;

                if (veiculoBuscado.ImagemFrontalPadrao == null)
                {
                uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);
                    _veiculosRepository.AtualizarImagem(idRecebido, uploadResultado);
                    return StatusCode(200);
                }
                _veiculosRepository.DeletarImagem(idRecebido);

                uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                if(uploadResultado == "Sem arquivo")
                {
                    return BadRequest("É necessário informar uma nova foto");
                }
                _veiculosRepository.AtualizarImagem(idRecebido, uploadResultado);

                return StatusCode(200);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("DeletarImagem/{idRecebido}")]
        public IActionResult Removerimagem(int idRecebido)
        {
            try
            {
            _veiculosRepository.DeletarImagem(idRecebido);

            return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("/Deletar/{idVeiculo}")]
        public IActionResult Deletar(int idVeiculo)
        {
            try
            {
                _veiculosRepository.Deletar(idVeiculo);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPut("/Atualizar/{id}")]
        public IActionResult Atualizar(int id, Veiculo novoVeiculo)
        {
            if (novoVeiculo != null)
            {
                    try
                    {
                        _veiculosRepository.Atualizar(id, novoVeiculo);
                        return NoContent();
                    }
                    catch (Exception erro)
                    {
                        return BadRequest(erro);
                        throw;
                    }
                }
                return BadRequest();
            }

        [HttpPatch("/AtualizarStatus/{id}")]
        public IActionResult AtualizarStatus(int id, Veiculo novoVeiculo)
        {
            if (novoVeiculo != null)
            {
                    try
                    {
                        _veiculosRepository.AtualizarStatus(id, novoVeiculo);
                    return Ok("Status atualizado");
                    }
                    catch (Exception erro)
                    {
                        return BadRequest(erro);
                        throw;
                    }
            }
            return BadRequest();
        }
    }
}
