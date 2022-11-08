using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TabelaErro
    {
        public int IdErro { get; set; }
        public byte? IdTipoErro { get; set; }
        public int? IdCheckList { get; set; }
        public string DescricaoErro { get; set; }
        public string ImagemErro { get; set; }

        public virtual CheckList IdCheckListNavigation { get; set; }
        public virtual TipoErro IdTipoErroNavigation { get; set; }
    }
}
