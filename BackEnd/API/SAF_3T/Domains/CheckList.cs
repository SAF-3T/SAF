using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

        [Required(ErrorMessage = "É necessário informar o tipo de checklist cadastrada")]
        public byte IdTipoCheckList { get; set; }
        
        [Required(ErrorMessage = "É necessário informar a qual veículo esta checklist pertence")]
        public int IdVeiculo { get; set; }

        [Required(ErrorMessage = "É necessário informar qual o usuário efetuou a checklist")]
        public int IdUsuario { get; set; }
        public DateTime DataCheckList { get; set; }

        public virtual TipoCheckList IdTipoCheckListNavigation { get; set; }
        public virtual Usuario IdUsuarioNavigation { get; set; }
        public virtual Veiculo IdVeiculoNavigation { get; set; }
        public virtual ICollection<TabelaCorrecao> TabelaCorrecaos { get; set; }
        public virtual ICollection<TabelaErro> TabelaErros { get; set; }
    }
}
