using System;
using System.Collections.Generic;

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
        public byte IdTipoUsuario { get; set; }
        public string ImagemUsuario { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Ddd { get; set; }
        public string Telefone { get; set; }
        public string Cpf { get; set; }
        public string Senha { get; set; }

        public virtual TipoUsuario IdTipoUsuarioNavigation { get; set; }
        public virtual ICollection<CheckList> CheckLists { get; set; }
        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
