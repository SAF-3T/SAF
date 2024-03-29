﻿using System;
using System.Collections.Generic;

#nullable disable

namespace SAF_3T.Domains
{
    public partial class Carrocerium
    {
        public Carrocerium()
        {
            Veiculos = new HashSet<Veiculo>();
        }

        public int IdCarroceria { get; set; }
        public byte IdTipoCarga { get; set; }
        public byte IdTipoCarroceria { get; set; }
        public string Cubagem { get; set; }
        public string Peso { get; set; }

        public virtual TipoCarga IdTipoCargaNavigation { get; set; }
        public virtual TipoCarrocerium IdTipoCarroceriaNavigation { get; set; }
        public virtual ICollection<Veiculo> Veiculos { get; set; }
    }
}
