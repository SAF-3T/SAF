using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Usuario
    {
        public Usuario()
        {
            CheckLists = new HashSet<CheckList>();
            Veiculos = new HashSet<Veiculo>();
        }

        public int IdUsuario { get; set; }

        [Required(ErrorMessage = "É preciso informar o idTipoUsuario")]
        public byte IdTipoUsuario { get; set; }
        public string ImagemUsuario { get; set; }

        [Required(ErrorMessage = "É preciso informar o nome do usuário")]
        public string Nome { get; set; }

        [Required(ErrorMessage = "É preciso informar o sobrenome do usuário")]
        public string Sobrenome { get; set; }
        public string Ddd { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }

        [Required(ErrorMessage = "É preciso infomar a senha do usuário")]
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<CheckList> CheckLists { get; set; }
        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
