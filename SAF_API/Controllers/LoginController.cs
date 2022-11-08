using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using SAF_3T.Domains;
using SAF_3T.Interfaces;
using SAF_3T.Repositories;
using SAF_3T.ViewModels;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace SAF_3T.Controllers
{
    [Produces("application/json")]

    [Route("api/[controller]")]

    [ApiController]
    public class LoginController : ControllerBase
    {
        private IUsuarioRepository _usuarioRepository { get; set; }
        public LoginController()
        {
            _usuarioRepository = new UsuarioRepository();
        }

        [HttpPost]
        public IActionResult Login( LoginViewModel login)
        {
            var UsuarioBuscado = _usuarioRepository.Login(login.Cpf, login.Senha);
            try
            {
                if(UsuarioBuscado != null)
                {
                    var Claims = new[]
                    {
                    new Claim("cpf", UsuarioBuscado.Cpf),
                    new Claim(ClaimTypes.Role,UsuarioBuscado.IdTipoUsuario.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, UsuarioBuscado.IdUsuario.ToString()),
                    new Claim( "role", UsuarioBuscado.IdTipoUsuario.ToString() )
                    };

                    var Chave = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes("saf-chave-autentica"));
                    var Credenciais = new SigningCredentials(Chave, SecurityAlgorithms.HmacSha256);
                    var Token = new JwtSecurityToken
                        (
                            issuer: "Saf.webAPI",
                            audience: "Saf.webAPI",
                            claims: Claims,
                            signingCredentials: Credenciais
                        );
                    return Ok(new
                    {
                        token = new JwtSecurityTokenHandler().WriteToken(Token)
                    });
                }
                else
                {
                    return NotFound("CPF ou senha inválidos! Usuário não encontrado!");
                }
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
                throw;
            }
        }
    }
    
}
