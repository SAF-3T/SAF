using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class CheckList
    {
        public CheckList()
        {
            TabelaCorrecaos = new HashSet<TabelaCorrecao>();
            TabelaErros = new HashSet<TabelaErro>();
        }

        public int IdCheckList { get; set; }
        public byte IdTipoCheckList { get; set; }
        public int IdVeiculo { get; set; }
        public int IdUsuario { get; set; }
        public DateTime DataCheckList { get; set; }

        public virtual TipoCheckList IdTipoCheckListNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual Veiculo IdVeiculoNavigation { get; set; }
        public virtual ICollection<TabelaCorrecao> TabelaCorrecaos { get; set; }
        public virtual ICollection<TabelaErro> TabelaErros { get; set; }
    }
}
