using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace SAF_3T.ViewModels
{
    public class LoginViewModel
    {
        [Required(ErrorMessage = "Informe o CPF do usuário!")]
        public string Cpf { get; set; }

        [Required(ErrorMessage = "Informe a senha do usuário!")]
        public string Senha { get; set; }
    }
}
