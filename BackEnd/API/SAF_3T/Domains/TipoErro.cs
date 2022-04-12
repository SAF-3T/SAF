using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoErro
    {
        public TipoErro()
        {
            TabelaCorrecaos = new HashSet<TabelaCorrecao>();
            TabelaErros = new HashSet<TabelaErro>();
        }

        public byte IdTipoErro { get; set; }

        [Required(ErrorMessage = "É preciso informar o nome do tipoErro")]
        public string NomeTipoErro { get; set; }

        public virtual ICollection<TabelaCorrecao> TabelaCorrecaos { get; set; }
        public virtual ICollection<TabelaErro> TabelaErros { get; set; }
    }
}
