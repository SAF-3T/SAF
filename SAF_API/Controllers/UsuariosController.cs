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
    public class UsuariosController : Controller
    {
        private IUsuarioRepository _usuarioRepository;
        public UsuariosController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpGet]
        public IActionResult Listar()
        {
            try
            {
                return Ok(_usuarioRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("Cargo/{idRecebido}")]
        public IActionResult ListarPorCargo(int idRecebido)
        {
            try
            {
                return StatusCode(201, _usuarioRepository.BuscarPorCargo(idRecebido));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPost]
        public IActionResult CadastrarUsuario([FromForm] Usuario novoUsuario, IFormFile arquivo)
        {
            try
            {
                if (_usuarioRepository.VerificaDisponibilidade(novoUsuario))
                {
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };
                string uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                if (uploadResultado == "Sem arquivo")
                {
                    _usuarioRepository.Cadastrar(novoUsuario);
                }

                novoUsuario.ImagemUsuario = uploadResultado;

                _usuarioRepository.Cadastrar(novoUsuario);
                return StatusCode(201, novoUsuario);
                }
                return StatusCode(204, "CPF ou Telefone já cadastrados");
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("AlterarSenha/{idRecebido}")]
        public IActionResult AlterarSenha(int idRecebido, Usuario usuarioLogadodo)
        {
            try
            {
                _usuarioRepository.AlterarSenha(idRecebido, usuarioLogadodo);
                return Ok("Senha alterada");
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("AlterarFoto/{idRecebido}")]
        public IActionResult AlterarFoto(int idRecebido, IFormFile arquivo)
        {
            try
            {
                string[] extensoesPermitidas = { "jpg", "png", "jpeg", "gif" };

                Usuario usuarioLogado = _usuarioRepository.BuscarPorId(idRecebido);
                string uploadResultado;

                if (usuarioLogado.ImagemUsuario == null)
                {
                    uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);
                    _usuarioRepository.AtualizarFoto(idRecebido, uploadResultado);
                    return StatusCode(200);
                }
                _usuarioRepository.ExcluirFoto(idRecebido);

                uploadResultado = Upload.UploadFile(arquivo, extensoesPermitidas);

                if (uploadResultado == "Extensão não permitida")
                {
                    return BadRequest("Extensão de arquivo não permitida");
                }

                if (uploadResultado == "Sem arquivo")
                {
                    return BadRequest("É necessário informar uma nova foto");
                }
                _usuarioRepository.AtualizarFoto(idRecebido, uploadResultado);

                return StatusCode(200);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpPatch("RemoverFoto/{idRecebido}")]
        public IActionResult RemoverFoto(int idRecebido)
        {
            try
            {
            Usuario usuarioLogado = _usuarioRepository.BuscarPorId(idRecebido);
            Upload.RemoverArquivo(usuarioLogado.ImagemUsuario);
            _usuarioRepository.ExcluirFoto(idRecebido);
            return StatusCode(204);
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpDelete("Deletar/{id}")]
        public IActionResult Deletar(int id)
        {
            try
            {
                _usuarioRepository.Deletar(id);
                return NoContent();
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("BuscarPorId/{idUsuario}")]
        public IActionResult BuscarPorId(int idUsuario)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorId(idUsuario));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/Telefone")]
        public IActionResult BuscarPorNumero(string Telefone)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorNumero(Telefone));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

        [HttpGet("/cpf/{cpf}")]
        public IActionResult BuscarPorCpf(string cpf)
        {
            try
            {
                return Ok(_usuarioRepository.BuscarPorCPF(cpf));
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }

    }
}
