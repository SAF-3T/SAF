using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TabelaCorrecao
    {
        public int IdCorrecao { get; set; }
        public byte IdTipoErro { get; set; }
        public int IdCheckList { get; set; }
        public string DescricaoCorrecao { get; set; }
        public string ImagemCorrecao { get; set; }

        public virtual CheckList IdCheckListNavigation { get; set; }
        public virtual TipoErro IdTipoErroNavigation { get; set; }
    }
}
