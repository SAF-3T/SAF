using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class TipoCarrocerium
    {
        public TipoCarrocerium()
        {
            Carroceria = new HashSet<Carrocerium>();
        }

        public byte IdTipoCarroceria { get; set; }

        [Required(ErrorMessage = "É necessário informar o nome do tipo de carroceria")]
        public string NomeTipoCarroceria { get; set; }

        public virtual ICollection<Carrocerium> Carroceria { get; set; }
    }
}
