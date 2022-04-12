using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TabelaErro
    {
        public int IdErro { get; set; }

        [Required(ErrorMessage = "É preciso informar o tipo do erro")]
        public byte? IdTipoErro { get; set; }

        [Required(ErrorMessage = "É preciso informar o idChecklist")]
        public int? IdCheckList { get; set; }
        public string DescricaoErro { get; set; }
        public string ImagemErro { get; set; }

        public virtual CheckList IdCheckListNavigation { get; set; }
        public virtual TipoErro IdTipoErroNavigation { get; set; }
    }
}
