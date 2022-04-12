using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TabelaCorrecao
    {
        public int IdCorrecao { get; set; }

        [Required(ErrorMessage = "É necessário informar qual o idErro")]
        public byte IdTipoErro { get; set; }

        [Required(ErrorMessage = "É necessário informar o idChecklist")]
        public int IdCheckList { get; set; }
        public string DescricaoCorrecao { get; set; }
        public string ImagemCorrecao { get; set; }

        public virtual CheckList IdCheckListNavigation { get; set; }
        public virtual TipoErro IdTipoErroNavigation { get; set; }
    }
}
